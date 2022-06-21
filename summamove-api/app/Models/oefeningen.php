<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class oefeningen extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = ["naam", "beschrijvingNL","beschrijvingENG", "foto"];
}