<?php

namespace App\Services\Geo;

use App\Enums\DistanceTypes;
use Location\Coordinate;
use Location\Distance\Haversine;

class CalcDistanceBetweenPoints
{
    public function execute($latFrom, $lonFrom, $latTo, $lonTo): int
    {
        $dep = new Coordinate($latFrom, $lonFrom);
        $arr = new Coordinate($latTo, $lonTo);

        $distance = $dep->getDistance($arr, new Haversine());

        return round($distance / DistanceTypes::MetersToNauticalMiles, 1);
    }
}