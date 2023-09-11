<?php

namespace App\Services\Finance;

use App\Models\AirlineTransaction;

class AddAirlineTransaction
{
    public function execute(string $transactionType, float $total, string $memo = null, $pirepId = null)
    {
        $airlineTransaction = new AirlineTransaction();
        $airlineTransaction->transaction_type = $transactionType;
        $airlineTransaction->memo = $memo;
        $airlineTransaction->total = $total;
        $airlineTransaction->pirep_id = $pirepId;
        $airlineTransaction->save();
    }
}