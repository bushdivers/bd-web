<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CargoTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('cargo_types')->insert([
            ['type' => 1, 'text' => 'Food'],
            ['type' => 1, 'text' => 'Luggage'],
            ['type' => 1, 'text' => 'Supplies'],
            ['type' => 1, 'text' => 'Equipment'],
            ['type' => 1, 'text' => 'Building Materials']
        ]);
    }
}
