<?php

namespace App\Http\Middleware;

use Closure;

class ApiKeyMiddleware
{
    /**
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $apiKey = $request->header('X-API-Key');

        if (!$apiKey || $apiKey !== env('API_KEY')) {
            return response()->json([
                'error' => 'Debe proporcionar una API Key válida'
            ], 401);
        }

        return $next($request);
    }
}
