<?php

namespace App\Services\Contracts;

use Illuminate\Support\Facades\DB;

class GenerateContracts
{
    protected GenerateContractLegDetails $generateContractLegDetails;
    protected GenerateContractHeader $generateContractHeader;

    public function __construct(
        GenerateContractLegDetails $generateContractLegDetails,
        GenerateContractHeader $generateContractHeader
    ) {
        $this->generateContractLegDetails = $generateContractLegDetails;
        $this->generateContractHeader = $generateContractHeader;
    }

    public function execute($airport, int $numberToGenerate, $airports): ?array
    {
        // get airports within radius


        $allAirports = collect($airports);
        // set number to gen based on airport count
        if ($allAirports->count() === 0) {
            return null;
        }

        if ($allAirports->count() === 1) {
            $numberToGenerate = 4;
        }

        if ($allAirports->count() < $numberToGenerate && $allAirports->count() > 1) {
            $numberToGenerate = $numberToGenerate / 2;
        }

        $contracts = [];
        $i = 1;
        while ($i <= $numberToGenerate) {
            $legs = $this->getWeightedLegs();
            $contractLegs = [];
            $g = 1;
            $destAirport = null;
            while ($g <= $legs) {
                do {
                    $destAirport = $allAirports->random(1);
                } while ($destAirport[0]->identifier == $airport->identifier);
                $contractLeg = $this->generateContractLegDetails->execute($airport, $destAirport[0]);
                $contractLegs[] = $contractLeg;
                $g++;
            }
            $contractHeader = $this->generateContractHeader->execute($airport->identifier, $contractLegs);

            $contract = ['header' => $contractHeader, 'contract_legs' => $contractLegs];

            $contracts[] = $contract;

            $i++;
        }
        return $contracts;
    }

    function getWeightedLegs(): ?int
    {
        $legsToGenerate = [
            1 => 10,
            2 => 3,
            3 => 2
        ];

        $legsChosen = null;
        $totalWeight = array_sum(array_values($legsToGenerate));
        $selection = random_int(1, $totalWeight);

        $count = 0;
        foreach ($legsToGenerate as $legs => $weight) {
            $legsChosen = $legs;
            $count += $weight;
            if ($count >= $selection) {
                break;
            }
        }
        return $legsChosen;
    }
}