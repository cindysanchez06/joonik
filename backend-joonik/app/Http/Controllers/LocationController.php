<?php

namespace App\Http\Controllers;

use App\Repositories\LocationRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Laravel\Lumen\Routing\Controller as BaseController;

class LocationController extends BaseController
{
    protected $locationRepository;

    /**
     * @param LocationRepositoryInterface $locationRepository
     */
    public function __construct(LocationRepositoryInterface $locationRepository)
    {
        $this->locationRepository = $locationRepository;
    }

    /**
     * @return JsonResponse
     */
    public function index()
    {
        $locations = $this->locationRepository->getAll();

        if (empty($locations)) {
            return response()->json(['error' => 'No hay sedes disponibles'], 404);
        }

        return response()->json($locations);
    }
}
