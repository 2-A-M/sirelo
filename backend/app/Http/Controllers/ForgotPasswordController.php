<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\App;

class ForgotPasswordController extends Controller
{
    public function forgotPassword(Request $request)
    {
        $request->validate(['email' => ['required', 'string', 'email']]);

        // Log language headers for debugging
        Log::info('Password reset language headers', [
            'accept_language' => $request->header('Accept-Language'),
            'x_language' => $request->header('X-Language'),
            'language_param' => $request->input('language'),
            'lang_param' => $request->input('lang'),
        ]);

        // Envia o link de redefinição de senha usando o Password Broker padrão
        $status = Password::sendResetLink($request->only('email'));

        // Verifica o status retornado pelo Password Broker
        if ($status === Password::RESET_LINK_SENT) {
            return response()->json(['message' => __($status)]); // Retorna a mensagem de sucesso padrão do Laravel
        }
        
        // Return a proper JSON error response instead of throwing an exception
        // This makes it easier for the frontend to display a toast message
        if ($status === Password::INVALID_USER) {
            return response()->json([
                'message' => __('There was an error sending the reset link. Please try again.'),
                'errors' => [
                    'email' => [__('passwords.email_not_found')]
                ]
            ], 422);
        }

        // Handle other error cases
        return response()->json([
            'message' => __($status),
            'errors' => [
                'email' => [__($status)]
            ]
        ], 422);
    }
}
