<?php

namespace App;
use Illuminate\Database\Eloquent\Model;

class Humidity extends Model
{
    protected $primaryKey = 'id';
    protected $table = 'humidity';
    protected $guarded = [];
}