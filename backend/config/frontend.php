<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Frontend URL
    |--------------------------------------------------------------------------
    |
    | Esta URL é usada pelo backend para gerar links para o frontend,
    | como por exemplo o link de redefinição de senha. Deve ser definido
    | como a URL base do seu aplicativo frontend.
    |
    */
    'url' => env('FRONTEND_URL', 'https://front-production-2f2b.up.railway.app'),

    /*
    |--------------------------------------------------------------------------
    | Rotas do Frontend
    |--------------------------------------------------------------------------
    |
    | Aqui você pode especificar os caminhos para as diferentes páginas
    | do frontend, como a página de redefinição de senha.
    |
    */
    'routes' => [
        'reset_password' => '/reset-password/'
    ],
]; 