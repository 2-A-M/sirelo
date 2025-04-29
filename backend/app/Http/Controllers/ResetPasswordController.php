<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\Rules\Password as PasswordRules;
use Illuminate\Validation\ValidationException;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Str;

class ResetPasswordController extends Controller
{
    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => ['required'],
            'email' => ['required', 'email'],
            'password' => ['required', 'confirmed', PasswordRules::defaults()], // Usa as regras de senha padrão do Laravel
        ]);

        // Tenta redefinir a senha usando o Password Broker
        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                // Callback para atualizar a senha do usuário
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(Str::random(60)); // Opcional: Invalida sessões antigas gerando novo remember_token

                $user->save();

                // Dispara o evento PasswordReset
                event(new PasswordReset($user));
            }
        );

        // Verifica o status da redefinição
        if ($status === Password::PASSWORD_RESET) {
            return response()->json(['message' => __($status)]); // Retorna a mensagem de sucesso padrão
        }

        // Se a redefinição falhar (ex: token inválido), lança uma exceção
        throw ValidationException::withMessages([
            'email' => [__($status)], // Geralmente o erro está ligado ao email/token
        ]);
    }
}
