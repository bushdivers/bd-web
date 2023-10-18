<?php

namespace Tests\Unit\Contracts;

use App\Models\Airport;
use App\Services\Contracts\GenerateContractLegDetails;
use Database\Seeders\CargoTypeSeeder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class GenerateContractLegDetailsTest extends TestCase
{
    use RefreshDatabase;

    protected GenerateContractLegDetails $generateContractLegDetails;
    protected Model $origin;
    protected Model $dest;

    protected function setUp(): void
    {
        parent::setUp(); // TODO: Change the autogenerated stub
        $this->generateContractLegDetails = app()->make(GenerateContractLegDetails::class);
        $this->origin = Airport::factory()->create();
        $this->dest = Airport::factory()->create();
        $seeder = new CargoTypeSeeder();
        $seeder->run();
    }

    /**
     * A basic unit test example.
     */
    public function test_contract_leg_returns_array(): void
    {
        $leg = $this->generateContractLegDetails->execute($this->origin, $this->dest);
        $this->assertIsArray($leg);
        $this->assertArrayHasKey('cargo_type', $leg);
    }
}
