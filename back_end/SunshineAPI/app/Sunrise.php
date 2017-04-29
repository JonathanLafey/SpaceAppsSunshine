<?php

namespace App;
use Illuminate\Database\Eloquent\Model;

class Sunrise extends Model
{
    protected $primaryKey = 'id';
    protected $table = 'sunrise';
    protected $guarded = [];

    public function getSunriseTime($lat, $lng){
        return "06:00";
    }
}