<?php

namespace App;
use Illuminate\Database\Eloquent\Model;

class WindDirection extends Model
{
    protected $primaryKey = 'id';
    protected $table = 'wind_direction';
    protected $guarded = [];
}