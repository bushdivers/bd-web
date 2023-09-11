<?php

namespace App\Services\Contracts;

use App\Models\Contract;
use App\Models\ContractLeg;

class StoreContracts
{
    public function execute($contracts, $isAvailable = true, $isCustom = false, $userId = null)
    {
        foreach ($contracts as $contractInfo) {
            $contract = new Contract();
            $contract->origin_airport_id = $contractInfo['header']['origin_airport_id'];
            $contract->total_distance = $contractInfo['header']['total_distance'];
            $contract->legs = $contractInfo['header']['legs'];
            $contract->total_payload = $contractInfo['header']['total_payload'];
            $contract->total_pax = $contractInfo['header']['total_pax'];
            $contract->contract_value = $contractInfo['header']['contract_value'];
            $contract->expires_at = $contractInfo['header']['expires_at'];
            $contract->is_available = $isAvailable;
            $contract->save();
//            if ($isCustom) {
//                $contract->user_id = $userId;
//                $contract->is_custom = true;
//            }
            foreach ($contractInfo['contract_legs'] as $legInfo) {
                $leg = new ContractLeg();
                $leg->contract_id = $contract->id;
                $leg->cargo_type = $legInfo['cargo_type'];
                $leg->dep_airport_id = $legInfo['dep_airport_id'];
                $leg->arr_airport_id = $legInfo['arr_airport_id'];
                $leg->current_airport_id = $legInfo['current_airport_id'];
                $leg->cargo_desc = $legInfo['cargo_desc'];
                $leg->cargo_qty = $legInfo['cargo_qty'];
                $leg->distance = $legInfo['distance'];
                $leg->heading = $legInfo['heading'];
                $leg->user_id = $userId;
                $leg->save();
            }
        }
    }
}