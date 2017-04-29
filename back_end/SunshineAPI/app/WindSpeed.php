<?php

namespace App;
use Illuminate\Database\Eloquent\Model;

class WindSpeed extends Model
{
    protected $primaryKey = 'id';
    protected $table = 'wind_speed';
    protected $guarded = [];
}