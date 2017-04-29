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

        response()->header('Access-Control-Allow-Methods', 'HEAD, GET, POST, PUT, PATCH, DELETE');
        response()->header('Access-Control-Allow-Headers', $request->header('Access-Control-Request-Headers'));
        response()->header('Access-Control-Allow-Origin', '*');


	// following example about querying DB for models
	//$test=SolarRadiation::query()->get()->forPage(0, 1)->all();
        return response()->json($weekly_report);
    }

}

?>
