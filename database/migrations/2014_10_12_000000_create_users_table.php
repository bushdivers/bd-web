<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->foreignId('rank_id')->nullable();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('current_airport_id');
            $table->bigInteger('flights')->default(0);
            $table->bigInteger('flights_time')->default(0);
            $table->integer('points')->default(0);
            $table->decimal('cash', 11, 2);
            $table->boolean('is_active')->default(true);
            $table->boolean('is_admin')->default(false);
            $table->uuid('reset_token')->nullable();
            $table->string('api_token')->nullable();
            $table->string('map_style')->default('dark');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
