<?php

namespace App\Repositories;

class LocationRepository implements LocationRepositoryInterface
{
    protected string $filePath;

    public function __construct()
    {
        $this->filePath = storage_path('app/locations.json');
    }

    /**
     * @return array
     */
    public function getAll(): array
    {
        if (!file_exists($this->filePath)) {
            return [];
        }

        $json = file_get_contents($this->filePath);
        return json_decode($json, true) ?? [];
    }
}
