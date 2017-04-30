<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller; 
use Illuminate\Http\Request; 
use App\SolarRadiation;
use App\Temperature;
use App\Sunrise;
use App\Sunset;
  
class MainController extends Controller{

    public function index(){
        return response()->json('Hello World');
    }

    public function give_prediction(Request $request){
	$data = $request->json()->all();
//	$lat = $data['location']['lat'];
//	$lng = $data['location']['lng'];
//	$type = $data['setup']['type'];
//	$area = $data['setup']['area'];
	$date = '2016-09-30';

	$sunrise_a= str_split(Sunrise::query()->whereLocaldate($date)->avg('numeric_value'));
	$sunrise = '0'.$sunrise_a[0].':'.$sunrise_a[1].$sunrise_a[2].':00';
	$sunset_a = str_split(Sunset::query()->whereLocaldate($date)->avg('numeric_value'));
	$sunset = $sunset_a[0].$sunset_a[1].':'.$sunset_a[2].$sunset_a[3].':00';
	$radiation = (float)SolarRadiation::query()->whereLocaldate($date)->avg('numeric_value');
	$temperature = (float)Temperature::query()->whereLocaldate($date)->avg('numeric_value');

	$area = (float)$data['setup']['area'];
	$type = (int)$data['setup']['type'];
	$panel_efficiency = ($type == 0 ? 0.08 : 0.16);
	$temperature_formula = ((($temperature-32)/1.8) - 25) * -0.01;
	$output = $radiation * $area * ($panel_efficiency * (1 + $temperature_formula));

	$c_date = '2017-04-30';	
	$weekly_report = [(object) ['timestamp' => '1', 'estimate' => $output],
                          (object) ['timestamp' => '2', 'estimate' => ($output + $output*(rand()/getrandmax()*0.2-0.1))],
                          (object) ['timestamp' => '3', 'estimate' => ($output + $output*(rand()/getrandmax()*0.2-0.1))],
                          (object) ['timestamp' => '4', 'estimate' => ($output + $output*(rand()/getrandmax()*0.2-0.1))],
                          (object) ['timestamp' => '5', 'estimate' => ($output + $output*(rand()/getrandmax()*0.2-0.1))],
                          (object) ['timestamp' => '6', 'estimate' => ($output + $output*(rand()/getrandmax()*0.2-0.1))],
                          (object) ['timestamp' => '7', 'estimate' => ($output + $output*(rand()/getrandmax()*0.2-0.1))],
];

    	header("Access-Control-Allow-Origin: *");

        return response()->json($weekly_report);
    }

}

?>
