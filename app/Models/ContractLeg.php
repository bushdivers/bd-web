<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContractLeg extends Model
{
    use HasFactory;

    public function contract()
    {
        return $this->belongsTo(Contract::class);
    }

    public function depAirport()
    {
        return $this->belongsTo(Airport::class, 'dep_airport_id', 'identifier');
    }

    public function arrAirport()
    {
        return $this->belongsTo(Airport::class, 'arr_airport_id', 'identifier');
    }

    public function currentAirport()
    {
        return $this->belongsTo(Airport::class, 'current_airport_id', 'identifier');
    }
}
