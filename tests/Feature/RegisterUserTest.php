<?php

namespace Tests\Feature;

use App\Enums\AirlineTransactionTypes;
use App\Enums\UserTransactionTypes;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class RegisterUserTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic feature test example.
     */
    public function test_user_created(): void
    {
        $data = [
            'email' => 'john@john.com',
            'name' => 'John',
            'password' => 'password'
        ];
        $this->post('/register', $data);
        $this->assertDatabaseHas('users', [
            'email' => 'john@john.com',
            'cash' => 200.00
        ]);
    }

    public function test_transactions_recorded(): void
    {
        $data = [
            'email' => 'john@john.com',
            'name' => 'John',
            'password' => 'password'
        ];
        $this->post('/register', $data);
        $this->assertDatabaseHas('airline_transactions', [
            'transaction_type' => AirlineTransactionTypes::PILOT_BONUS,
            'total' => -200.00
        ]);

        $this->assertDatabaseHas('user_transactions', [
            'transaction_type' => UserTransactionTypes::BONUS,
            'total' => 200.00
        ]);
    }
}
