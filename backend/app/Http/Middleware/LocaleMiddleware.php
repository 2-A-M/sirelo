<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Log;

class LocaleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // Get language from headers
        $locale = $request->header('Accept-Language');
        
        // Also check X-Language header that our frontend might be sending
        if (!$locale || !in_array($locale, ['en', 'pt'])) {
            $locale = $request->header('X-Language');
        }
        
        // Check query parameter as a last resort
        if (!$locale || !in_array($locale, ['en', 'pt'])) {
            $locale = $request->input('lang');
        }
        
        // Default to Portuguese if no valid locale found
        if (!$locale || !in_array($locale, ['en', 'pt'])) {
            $locale = 'pt';
        }
        
        // Set the application locale
        App::setLocale($locale);
        
        // Log the locale being used for debugging
        Log::info("Application locale set to: {$locale}");
        
        return $next($request);
    }
} 