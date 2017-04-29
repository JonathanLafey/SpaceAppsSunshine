<?php

namespace App;
use Illuminate\Database\Eloquent\Model;

class Sunrise extends Model
{
    protected $primaryKey = 'id';
    protected $table = 'sunrise';
    protected $guarded = [];
}