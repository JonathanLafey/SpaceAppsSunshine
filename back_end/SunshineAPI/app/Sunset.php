<?php

namespace App;
use Illuminate\Database\Eloquent\Model;

class Sunset extends Model
{
    protected $primaryKey = 'id';
    protected $table = 'sunset';
    protected $guarded = [];
}