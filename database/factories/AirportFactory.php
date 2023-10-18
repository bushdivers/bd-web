<?php

namespace Database\Factories;

use App\Models\Airport;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Airport>
 */
class AirportFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'identifier' => 'AYMH',
            'name' => 'Mount Hagen',
            'is_hub' => 0,
            'lat' => -5.82962,
            'lon' => 144.29884,
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'longest_runway_surface' => 'A',
            'longest_runway_length' => 7185,
            'altitude' => 5383,
        ];
    }
}
