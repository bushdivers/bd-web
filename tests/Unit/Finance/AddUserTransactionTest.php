<?php

namespace Tests\Unit\Finance;

use App\Enums\UserTransactionTypes;
use App\Models\User;
use App\Services\Finance\AddUserTransaction;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AddUserTransactionTest extends TestCase
{

    use RefreshDatabase;

    protected Model $user;
    protected AddUserTransaction $addUserTransaction;

    protected function setUp(): void
    {
        parent::setUp(); // TODO: Change the autogenerated stub
        $this->user = User::factory()->create(['cash' => 200.00]);
        $this->addUserTransaction = app()->make(AddUserTransaction::class);
    }

    /**
     * A basic unit test example.
     */
    public function test_positive_transaction_created(): void
    {
        $this->addUserTransaction->execute(UserTransactionTypes::BONUS, 100.00, $this->user->id);
        $this->assertDatabaseHas('user_transactions', [
            'transaction_type' => UserTransactionTypes::BONUS,
            'total' => 100.00
        ]);
    }

    public function test_positive_transaction_updates_cash(): void
    {
        $this->addUserTransaction->execute(UserTransactionTypes::BONUS, 100.00, $this->user->id);
        $this->user->refresh();
        $this->assertEquals(300.00, $this->user->cash);
    }

    public function test_negative_transaction_created(): void
    {
        $this->addUserTransaction->execute(UserTransactionTypes::BONUS, -100.00, $this->user->id);
        $this->assertDatabaseHas('user_transactions', [
            'transaction_type' => UserTransactionTypes::BONUS,
            'total' => -100.00
        ]);
    }

    public function test_negative_transaction_updates_cash(): void
    {
        $this->addUserTransaction->execute(UserTransactionTypes::BONUS, -100.00, $this->user->id);
        $this->user->refresh();
        $this->assertEquals(100.00, $this->user->cash);
    }
}
