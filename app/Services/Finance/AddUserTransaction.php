<?php

namespace App\Services\Finance;

use App\Models\User;
use App\Models\UserTransaction;

class AddUserTransaction
{
    public function execute(string $transactionType, float $total, int $userId, $pirepId = null)
    {
        $userTransaction = new UserTransaction();
        $userTransaction->transaction_type = $transactionType;
        $userTransaction->user_id = $userId;
        $userTransaction->total = $total;
        $userTransaction->pirep_id = $pirepId;
        $userTransaction->save();

        $user = User::find($userId);
        $user->cash = $user->cash + $total;
        $user->save();
    }
}