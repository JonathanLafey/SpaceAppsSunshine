<?php

namespace App;
use Illuminate\Database\Eloquent\Model;

class Sunset extends Model
{
    protected $primaryKey = 'id';
    protected $table = 'sunset';
    protected $guarded = [];

    public function getSunsetTime($lat, $lng){
        return "18:00";
    }
}