<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;

class ForgotPasswordController extends Controller
{
    public function forgotPassword(Request $request)
    {
        $request->validate(['email' => ['required', 'string', 'email']]);

        // Envia o link de redefinição de senha usando o Password Broker padrão
        $status = Password::sendResetLink($request->only('email'));

        // Verifica o status retornado pelo Password Broker
        if ($status === Password::RESET_LINK_SENT) {
            return response()->json(['message' => __($status)]); // Retorna a mensagem de sucesso padrão do Laravel
        }

        // Se o status não for de sucesso (ex: usuário não encontrado), lança uma exceção
        throw ValidationException::withMessages([
            'email' => [__($status)],
        ]);
    }
}
