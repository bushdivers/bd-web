<?php

namespace App\Services\Contracts;

use App\Enums\ContractValueTypes;

class CalContractValue
{
    public function execute($legs): int
    {
        $weightMultiplier = ContractValueTypes::CARGO_VALUE;
        $paxMultiplier = ContractValueTypes::PAX_VALUE;
        $distanceMultiplier = ContractValueTypes::DISTANCE_VALUE;

        $value = 0.00;
        foreach ($legs as $leg) {
            if ($leg['cargo_type'] == 1) {
                $cargoValue = $leg['cargo_qty'] * $weightMultiplier;
                $distanceValue = ($leg['distance'] / 50) * $distanceMultiplier;
                $value = $value + round($cargoValue + $distanceValue);
            } else {
                $cargoValue = $leg['cargo_qty'] * $paxMultiplier;
                $distanceValue = ($leg['distance'] / 50) * $distanceMultiplier;
                $value = $value + round($cargoValue + $distanceValue);
            }
        }
        return round($value);
    }
}