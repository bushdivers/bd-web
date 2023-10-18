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
        Schema::create('contracts', function (Blueprint $table) {
            $table->id();
            $table->string('origin_airport_id');
            $table->integer('total_distance');
            $table->integer('legs');
            $table->integer('total_payload');
            $table->integer('total_pax');
            $table->integer('contract_value');
            $table->boolean('is_available')->default(true);
            $table->boolean('is_completed')->default(false);
            $table->dateTime('expires_at');
            $table->dateTime('completed_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contracts');
    }
};
