<?php

use Laravel\Lumen\Testing\TestCase;
use App\Repositories\LocationRepositoryInterface;
use App\Http\Controllers\LocationController;

class LocationControllerTest extends TestCase
{
    protected $validKey;
    protected $repository;
    protected $controller;

    public function createApplication()
    {
        return require __DIR__ . '/../../../../bootstrap/app.php';
    }

    protected function setUp(): void
    {
        parent::setUp();
        $this->validKey = env('API_KEY', '123456');
        
        $this->repository = $this->createMock(LocationRepositoryInterface::class);
        $this->controller = new LocationController($this->repository);
    }

    /** @test */
    public function it_returns_all_locations()
    {
        $testData = [
            [
                'id' => 1,
                'name' => 'Sede Principal',
                'url' => 'https://example.com/sede1.jpg',
                'created_at' => '2024-03-20T10:00:00Z'
            ]
        ];

        $this->repository->method('getAll')
            ->willReturn($testData);

        $response = $this->controller->index();
        
        $this->assertEquals(200, $response->status());
        $this->assertEquals($testData, json_decode($response->getContent(), true));
    }

    /** @test */
    public function it_returns_404_when_no_locations()
    {
        $this->repository->method('getAll')
            ->willReturn([]);

        $response = $this->controller->index();
        
        $this->assertEquals(404, $response->status());
        $this->assertEquals(
            ['error' => 'No hay sedes disponibles'],
            json_decode($response->getContent(), true)
        );
    }
} 