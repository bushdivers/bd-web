<?php

namespace App\Services\Airports;

use Illuminate\Contracts\Database\Query\Expression;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class GetAirportsNearAirport
{
    public function execute($airport): Collection
    {
        $expression = DB::raw(
            "SELECT *
                        FROM (
                          SELECT
                            airports.*,
                            3956 * ACOS(COS(RADIANS($airport->lat)) * COS(RADIANS(lat)) * COS(RADIANS($airport->lon) - RADIANS(lon)) + SIN(RADIANS($airport->lat)) * SIN(RADIANS(lat))) AS distance
                          FROM airports
                          WHERE
                            lat
                              BETWEEN $airport->lat - (300 / 69)
                              AND $airport->lat + (300 / 69)
                            AND lon
                              BETWEEN $airport->lon - (300 / (69 * COS(RADIANS($airport->lat))))
                              AND $airport->lon + (300 / (69* COS(RADIANS($airport->lat))))
                        ) r
                        WHERE distance BETWEEN 15 AND 150
                        ORDER BY distance ASC"
        );
        $string = $expression->getValue(DB::connection()->getQueryGrammar());
        $result = DB::select($string);
        return collect($result);
    }
}