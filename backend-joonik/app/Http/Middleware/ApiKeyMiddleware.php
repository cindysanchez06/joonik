<?php

namespace App\Http\Middleware;

use Closure;

class ApiKeyMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
       
        if ($request->getMethod() === 'OPTIONS') {
            return $next($request);
        }

       
        $authHeader = $request->header('Authorization');
        $token = null;

        if ($authHeader && preg_match('/Bearer\s+(.*)$/i', $authHeader, $matches)) {
            $token = $matches[1];
        }

        
        if (!$token) {
            $token = $request->header('X-API-Key');
        }

        if (!$token) {
            return response()->json([
                'error' => 'Se requiere un token de autenticación válido'
            ], 401);
        }

        if ($token !== env('API_KEY')) {
            return response()->json([
                'error' => 'Token inválido'
            ], 401);
        }

        return $next($request);
    }
}
