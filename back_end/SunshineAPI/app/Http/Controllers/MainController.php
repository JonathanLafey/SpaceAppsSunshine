<?php

namespace App\Http\Controllers;
  
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\SolarRadiation;
  
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




	// TODO: Do high level computational magic
	$weekly_report = [(object)['timestamp' => '1', 'estimate' => '2'],
                          (object) ['timestamp' => '2', 'estimate' => '2'],
                          (object) ['timestamp' => '3', 'estimate' => '2'],
                          (object) ['timestamp' => '4', 'estimate' => '2'],
                          (object) ['timestamp' => '5', 'estimate' => '2'],
                          (object) ['timestamp' => '6', 'estimate' => '2'],
                          (object) ['timestamp' => '7', 'estimate' => '2']];

    header("Access-Control-Allow-Origin: *");


	// following example about querying DB for models
	$weekly_report=SolarRadiation::query()->whereLocaldateAndLocaltime('2016-09-30', '23:45:24')->first();

        return response()->json($weekly_report);
    }

}

?>
