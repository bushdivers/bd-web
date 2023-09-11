<?php

namespace App\Services\Contracts;

use App\Services\Geo\CalcBearingBetweenPoints;
use App\Services\Geo\CalcDistanceBetweenPoints;
use Illuminate\Support\Facades\DB;

class GenerateContractLegDetails
{
    protected CalcDistanceBetweenPoints $calcDistanceBetweenPoints;
    protected CalcBearingBetweenPoints $calcBearingBetweenPoints;

    public function __construct(
        CalcDistanceBetweenPoints $calcDistanceBetweenPoints,
        CalcBearingBetweenPoints $calcBearingBetweenPoints
    ) {
        $this->calcDistanceBetweenPoints = $calcDistanceBetweenPoints;
        $this->calcBearingBetweenPoints = $calcBearingBetweenPoints;
    }

    public function execute(
        $origin,
        $destination
    ) {
        $minCargo = 350;
        $maxCargo = 4000;
        $minPax = 1;
        $maxPax = 9;

        $cargoType = $this->getWeightedType();
        $name = '';
        $qty = 0;
        $type = null;
        if ($cargoType == 1) {
            $types = DB::table('cargo_types')->get();
            $cargo = $types->random();
            $qty = rand($minCargo, $maxCargo);
            $name = $cargo->text;
            $type = 1;
        } else {
            $qty = rand($minPax, $maxPax);
            $name = 'PAX';
            $type = 2;
        }

        return [
            'cargo_desc' => $name,
            'cargo_type' => $type,
            'cargo_qty' => $qty,
            'dep_airport_id' => $origin->identifier,
            'current_airport_id' => $origin->identifier,
            'arr_airport_id' => $destination->identifier,
            'distance' => $this->calcDistanceBetweenPoints->execute($origin->lat, $origin->lon, $destination->lat,
                $destination->lon),
            'heading' => $this->calcBearingBetweenPoints->execute($origin->lat, $origin->lon, $destination->lat,
                $destination->lon, $destination->magnetic_variance)
        ];
    }

    function getWeightedType(): ?int
    {
        $cargoType = [
            1 => 10,
            2 => 4
        ];

        $cargoTypeChosen = null;
        $totalWeight = array_sum(array_values($cargoType));
        $selection = random_int(1, $totalWeight);

        $count = 0;
        foreach ($cargoType as $c => $weight) {
            $cargoTypeChosen = $c;
            $count += $weight;
            if ($count >= $selection) {
                break;
            }
        }
        return $cargoTypeChosen;
    }


}