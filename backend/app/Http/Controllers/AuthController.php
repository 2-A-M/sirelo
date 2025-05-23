<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use PDOException;
use Exception;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        try {
            // Log database connection details (without password)
            Log::info('Database connection info', [
                'host' => config('database.connections.pgsql.host'),
                'port' => config('database.connections.pgsql.port'),
                'database' => config('database.connections.pgsql.database'),
                'username' => config('database.connections.pgsql.username')
            ]);
            
            Log::info('Registration attempt', ['request' => $request->all()]);
            
            // Test database connection
            try {
                DB::connection()->getPdo();
                Log::info('Database connection successful');
            } catch (PDOException $e) {
                Log::error('Database connection failed', [
                    'exception' => $e->getMessage(),
                    'code' => $e->getCode()
                ]);
                return response()->json([
                    'message' => 'Erro de conexão com o banco de dados. Por favor, tente novamente mais tarde.',
                    'error' => $e->getMessage()
                ], 500);
            }
            
            $validated = $request->validate([
                'name' => ['required', 'string', 'max:255'],
                'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
                'password' => ['required', 'string', 'min:8', 'confirmed'], // confirmed busca por password_confirmation
            ]);

            Log::info('Validation passed', ['validated' => $validated]);
            
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            Log::info('User created successfully', ['user_id' => $user->id]);

            // Logar o usuário imediatamente após o registro
            Auth::login($user);
            $token = $user->createToken('auth_token')->plainTextToken;
            
            return response()->json([
                'message' => 'Usuário registrado com sucesso!',
                'user' => $user,
                'access_token' => $token,
                'token_type' => 'Bearer'
            ], 201);
        } catch (ValidationException $e) {
            Log::error('Validation error during registration', [
                'errors' => $e->errors(),
                'request' => $request->all()
            ]);
            return response()->json([
                'message' => 'Erro de validação',
                'errors' => $e->errors()
            ], 422);
        } catch (PDOException $e) {
            Log::error('Database error during registration', [
                'exception' => $e->getMessage(),
                'code' => $e->getCode(),
                'trace' => $e->getTraceAsString(),
                'request' => $request->all()
            ]);
            return response()->json([
                'message' => 'Erro de banco de dados durante o registro.',
                'error' => $e->getMessage()
            ], 500);
        } catch (Exception $e) {
            Log::error('Error during registration', [
                'exception' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'request' => $request->all()
            ]);
            return response()->json([
                'message' => 'Ocorreu um erro durante o registro.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string'],
        ]);

        if (!Auth::attempt($request->only('email', 'password')))
        {
            throw ValidationException::withMessages([
                'email' => [__('Verifique suas credenciais e tente novamente.')], // Mensagem de erro padrão do Laravel
            ]);
        }

        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user // Retorna os dados do usuário logado
        ]);
    }

    public function user(Request $request)
    {
        // O middleware 'auth:sanctum' já garante que o usuário está autenticado
        return $request->user();
    }

    public function logout(Request $request)
    {
        // Revoga o token atual que foi usado para autenticar a requisição
        $request->user()->currentAccessToken()->delete();

        // Alternativamente, para revogar todos os tokens do usuário (deslogar de todos os dispositivos):
        // $request->user()->tokens()->delete();

        return response()->json(['message' => 'Logout realizado com sucesso!']);
    }
}
