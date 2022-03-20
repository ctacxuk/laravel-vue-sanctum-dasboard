<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    const GENDER_MALE = 1;
    const GENDER_FEMALE = 2;

    const GENDERS = [
        self::GENDER_MALE => 'М',
        self::GENDER_FEMALE => 'Ж'
    ];


    public function group()
    {
        return $this->belongsTo(Group::class);
    }
}
