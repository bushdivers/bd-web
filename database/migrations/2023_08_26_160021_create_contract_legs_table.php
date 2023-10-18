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
        Schema::create('contract_legs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('contract_id');
            $table->integer('cargo_type');
            $table->string('dep_airport_id');
            $table->string('arr_airport_id');
            $table->string('current_airport_id');
            $table->string('cargo_desc');
            $table->integer('cargo_qty');
            $table->decimal('distance');
            $table->integer('heading');
            $table->boolean('is_completed')->default(false);
            $table->dateTime('completed_at')->nullable();
            $table->foreignId('user_id')->nullable();
            $table->uuid('active_pirep')->nullable();
            $table->uuid('completed_pirep')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contract_legs');
    }
};
