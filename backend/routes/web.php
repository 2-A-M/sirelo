<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// Rota de teste para verificar o processamento
Route::get('/api-test', function () {
    return response()->json(['message' => 'API funcionando corretamente!']);
});
