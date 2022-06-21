<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class prestatie extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = ["userid", "oefeningid","datum","starttijd","eindtijd","aantal"];
}
