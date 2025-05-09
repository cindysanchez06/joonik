<?php

/** @var \Laravel\Lumen\Routing\Router $router */

$router->get('/', function () use ($router) {
    return $router->app->version();
});


$router->group(['prefix' => 'api/'], function () use ($router) {
    $router->get('locations',  [
        'middleware' => 'apikey',
        'uses' => 'LocationController@index'
    ]);
});

