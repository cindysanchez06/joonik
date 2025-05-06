<?php

use Laravel\Lumen\Testing\TestCase;

class ApiKeyMiddlewareTest extends TestCase
{
    
    public function createApplication()
    {
        return require __DIR__ . '/../../../../bootstrap/app.php';
    }

    /** @test */
    public function it_returns_unauthorized_if_bearer_token_is_missing()
    {
        $response = $this->get('/api/locations');
        $response->seeStatusCode(401);
        $response->seeJson(['error' => 'Se requiere un token de autenticación válido']);
    }

    /** @test */
    public function it_returns_unauthorized_if_bearer_token_is_invalid()
    {
        $response = $this->get('/api/locations', ['Authorization' => 'Bearer invalid']);
        $response->seeStatusCode(401);
        $response->seeJson(['error' => 'Token inválido']);
    }

    /** @test */
    public function it_returns_unauthorized_if_bearer_token_format_is_invalid()
    {
        $response = $this->get('/api/locations', ['Authorization' => 'invalid']);
        $response->seeStatusCode(401);
        $response->seeJson(['error' => 'Se requiere un token de autenticación válido']);
    }

    /** @test */
    public function it_allows_access_with_valid_bearer_token()
    {
        $validKey = env('API_KEY', '123456');
        $response = $this->get('/api/locations', ['Authorization' => 'Bearer ' . $validKey]);
        $response->seeStatusCode(200);
    }
}
