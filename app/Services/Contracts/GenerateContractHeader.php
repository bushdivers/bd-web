<?php

namespace App\Services\Contracts;

use App\Enums\WeightTypes;
use Carbon\Carbon;

class GenerateContractHeader
{
    protected CalContractValue $calContractValue;

    public function __construct(CalContractValue $calContractValue)
    {
        $this->calContractValue = $calContractValue;
    }

    public function execute($origin, $contractLegs): array
    {
        // get cargo jobs
        $cargoLegs = array_filter($contractLegs, function ($obj) {
            return $obj['cargo_type'] == 1;
        });
        $paxLegs = array_filter($contractLegs, function ($obj) {
            return $obj['cargo_type'] == 2;
        });


        $distance = 0;
        $payload = 0;
        $pax = 0;
        $expiry = Carbon::now()->addDays(rand(1, 8));

        foreach ($contractLegs as $leg) {
            $distance += $leg['distance'];
        }

        foreach ($paxLegs as $leg) {
            $pax += $leg['cargo_qty'];
        }

        foreach ($cargoLegs as $leg) {
            $payload += $leg['cargo_qty'];
        }
        $payload += ($pax * WeightTypes::PERSON_WEIGHT);

        $expiryMultiplier = match (true) {
            $expiry > Carbon::now()->addDays(5) && $expiry < Carbon::now()->addDays(7) => 1.2,
            $expiry > Carbon::now()->addDays(3) && $expiry < Carbon::now()->addDays(5) => 1.5,
            $expiry > Carbon::now()->addDays(1) && $expiry < Carbon::now()->addDays(3) => 1.8,
            $expiry < Carbon::now()->addHours(24) => 2.0,
            default => 1.0,
        };

        $contractValue = $this->calContractValue->execute($contractLegs);
        $contractValue = $contractValue * $expiryMultiplier;

        $contractHeader = [
            'origin_airport_id' => $origin,
            'total_distance' => $distance,
            'total_payload' => $payload,
            'total_pax' => $pax,
            'contract_value' => (int) $contractValue,
            'legs' => count($contractLegs),
            'expires_at' => $expiry
        ];

        return $contractHeader;
    }
}