<?php

namespace App;
use Illuminate\Database\Eloquent\Model;

class Sunrise extends Model
{
    protected $primaryKey = 'id';
    protected $table = 'sunrise';
    protected $guarded = [];



    public static function getSunriseTime($lat, $lng){
        $display = file_get_contents('http://api.openweathermap.org/data/2.5/weather?lat='.$lat.'&lon='.$lng.'&appid=18a2b1bef5eb5f76f35776ae10ede502');
        $output= json_decode($display, true);
        if (!empty($output["sys"]) and !empty($output["sys"]["sunrise"])){
            return date('Y-m-d H:i:s', $output["sys"]["sunrise"]);
        }else{
            return date("Y-m-d 06:00");
        }
    }
}