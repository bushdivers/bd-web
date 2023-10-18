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
        Schema::create('airline_transactions', function (Blueprint $table) {
            $table->id();
            $table->string('transaction_type');
            $table->decimal('total', 11, 2);
            $table->string('memo')->nullable();
            $table->uuid('pirep_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('airline_transactions');
    }
};
