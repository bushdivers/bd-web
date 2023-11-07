<?php

namespace App\Services\Airports;

use Http;

class GetAirportWeather
{
    public function execute(string $icao)
    {
        $metar = $this->getWeatherFromApi($icao);
        return $metar;
    }

    protected function getWeatherFromApi(string $icao)
    {
        $key = config('services.checkwx.key');
        $url = 'https://api.checkwx.com/metar/' . $icao . '/decoded';

        $response = Http::withHeaders([
            'X-API-Key' => $key
        ])->get($url);

        $initialResponse = $response->json();

        if ($response->ok() && $initialResponse['results'] == 0) {
            $response = Http::withHeaders([
                'X-API-Key' => $key
            ])->get('https://api.checkwx.com/metar/' . $icao . '/nearest/decoded');
        }

        if ($response->json()['results'] > 0) {
            return $response->json()['data'][0];
        } else {
            return null;
        }


    }
}