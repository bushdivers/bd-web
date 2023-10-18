<?php

namespace App\Services\User;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class CreateUserService
{
    public function execute(string $name, string $email, string $password): User
    {
        $user = new User();
        $user->name = $name;
        $user->email = $email;
        $user->password = Hash::make($password);
        $user->current_airport_id = 'AYMR';
        $user->rank_id = 1;
        $user->cash = 0.00;
        $user->save();

        return $user;
    }
}
