<?php

namespace App\Services\Geo;

use Location\Bearing\BearingSpherical;
use Location\Coordinate;

class CalcBearingBetweenPoints
{
    public function execute($latFrom, $lonFrom, $latTo, $lonTo, $destVariance): int
    {
        $dep = new Coordinate($latFrom, $lonFrom);
        $arr = new Coordinate($latTo, $lonTo);

        $bearingCalc = new BearingSpherical();
        $bearing = $bearingCalc->calculateBearing($dep, $arr);

        $alteredBearing = $bearing - $destVariance;

        return round($alteredBearing < 0 ? $alteredBearing + 360 : $alteredBearing);
    }
}