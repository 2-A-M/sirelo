<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ForgotPasswordController;
use App\Http\Controllers\ResetPasswordController;

// Rota de health check para o Railway
Route::get('/health', function () {
    return response()->json(['status' => 'ok']);
});

// Rotas públicas
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgot-password', [ForgotPasswordController::class, 'forgotPassword']);
Route::post('/reset-password', [ResetPasswordController::class, 'resetPassword']);

// Rotas protegidas (requerem autenticação via Sanctum)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

// Rota padrão existente (geralmente para /api/user autenticado)
// Comentada ou removida pois agora temos uma rota /user específica dentro do grupo autenticado
// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum'); 