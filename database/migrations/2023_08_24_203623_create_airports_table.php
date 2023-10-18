<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('airports', function (Blueprint $table) {
            $table->id();
            $table->string('identifier', 5)->index();
            $table->string('name');
            $table->string('location')->nullable();
            $table->string('country')->nullable();
            $table->boolean('is_hub');
            $table->decimal('lat', 11, 5)->index();
            $table->decimal('lon', 11, 5)->index();
            $table->decimal('magnetic_variance', 11, 5)->default(0);
            $table->integer('altitude')->nullable();
            $table->integer('size')->nullable();
            $table->integer('longest_runway_length')->nullable();
            $table->integer('longest_runway_width')->nullable();
            $table->string('longest_runway_surface')->nullable();
            $table->boolean('has_avgas')->default(false);
            $table->boolean('has_jetfuel')->default(false);
            $table->decimal('current_avgas', 11, 2)->default(0);
            $table->decimal('current_jetfuel', 11, 2)->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('airports');
    }
};
