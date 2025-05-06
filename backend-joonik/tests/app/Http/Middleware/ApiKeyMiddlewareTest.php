<?php

use Laravel\Lumen\Testing\TestCase;

class ApiKeyMiddlewareTest extends TestCase
{
    
    public function createApplication()
    {
        return require __DIR__ . '/../../../../bootstrap/app.php';
    }

    /** @test */
     public function it_returns_unauthorized_if_api_key_is_missing()
     {
        $response = $this->get('/api/locations');
        $response->seeStatusCode(401);
        $response->seeJson(['error' => 'Debe proporcionar una API Key válida']);
     }

    /** @test */
    public function it_returns_unauthorized_if_api_key_is_invalid()
    {
        $response = $this->get('/api/locations', ['X-API-KEY' => 'invalid']);
        $response->seeStatusCode(401);
        $response->seeJson(['error' => 'Debe proporcionar una API Key válida']);
    }

    /** @test */
    public function it_allows_access_with_valid_api_key()
    {
        $validKey = env('API_KEY', '123456');
        $response = $this->get('/api/locations', ['X-API-KEY' => $validKey]);
        $response->seeStatusCode(200);
    }
}
