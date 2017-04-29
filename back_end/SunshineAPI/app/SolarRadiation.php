<?php

namespace App;
use Illuminate\Database\Eloquent\Model;

class SolarRadiation extends Model
{
    protected $primaryKey = 'id';
    protected $table = 'solar_radiation';
    protected $guarded = [];
}
