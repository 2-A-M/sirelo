<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'], // confirmed busca por password_confirmation
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Opcional: Logar o usuário imediatamente após o registro
        // Auth::login($user);
        // $token = $request->user()->createToken('auth_token')->plainTextToken;
        // return response()->json(['access_token' => $token, 'token_type' => 'Bearer', 'user' => $user]);

        // Ou apenas retornar sucesso
        return response()->json(['message' => 'Usuário registrado com sucesso!'], 201);
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
                'email' => [__('auth.failed')], // Mensagem de erro padrão do Laravel
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
