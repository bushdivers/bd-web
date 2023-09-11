<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    protected $appends = [
        'private_name',
        'pilot_id',
        'user_roles'
    ];

    public function getPrivateNameAttribute()
    {
        $split = explode(' ', $this->name);

        if (count($split) >= 2) {
            return $split[0].' '.mb_substr($split[1], 0, 1);
        } else {
            return $this->name;
        }
    }

    public function getPilotIdAttribute()
    {
        $number = str_pad($this->id, 4, "0", STR_PAD_LEFT);
        return 'BDV'.$number;
    }

    public function getRank()
    {
        //return Rank::find($this->rank_id);
        return '';
    }

    public function getUserRolesAttribute()
    {
//        $r = [];
//        foreach ($this->roles as $role) {
//            $r[] = $role->role;
//        }
//
//        return $r;
        return [];
    }

    public function transactions(): HasMany
    {
        return $this->hasMany(UserTransaction::class);
    }

    public function rank(): BelongsTo
    {
        return $this->belongsTo(Rank::class);
    }

}
