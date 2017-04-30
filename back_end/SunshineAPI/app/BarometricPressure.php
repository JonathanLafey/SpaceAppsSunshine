<?php

namespace App;
use Illuminate\Database\Eloquent\Model;

class BarometricPressure extends Model
{
    protected $primaryKey = 'id';
    protected $table = 'barometric_pressure';
    protected $guarded = [];
}