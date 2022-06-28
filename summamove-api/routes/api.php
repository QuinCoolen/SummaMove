<?php // api.php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\OefeneningenController;
use App\Http\Controllers\PrestatiesController;


// _________________________________________________________________________login/register______________________________________________________
Route::post('/register', [AuthenticationController::class, 'register']);
Route::post('/login', [AuthenticationController::class, 'login']);

Route::get('oefeningenNO', [OefeneningenController::class, 'indexNoLOG']);
Route::get('oefeningenNO/{id}', [OefeneningenController::class, 'showNoLog']);

//_______________________________________________________________________________auth____________________________________________________________

 Route::group(['middleware' => ['auth:sanctum']], function () {
     Route::get('profile', function(Request $request) {
         return auth()->user();
     });
     Route::get('/users', [AuthenticationController::class, 'index']);
     Route::patch('/users/{user}', [AuthenticationController::class, 'update']);
     Route::delete('/users/{user}', [AuthenticationController::class, 'destroy']);

     Route::apiResource('prestaties', PrestatiesController::class)->parameters(['prestaties' => 'prestatie']);;
     Route::apiResource('/oefeningen', OefeneningenController::class);
     Route::get('prestaties/{id}/users', [PrestatiesController::class, 'indexUser']);
     Route::get('prestaties/{id}/oefeningen', [PrestatiesController::class, 'indexOefeningen']);

    Route::get('/oefening/{id}/prestatie/{presid}', [PrestatiesController::class, 'indexUseroef']);

    Route::post('/logout', [AuthenticationController::class, 'logout']);

});
Route::fallback(function () {
    return response()->json([
        'message' => 'Page Not Found'
    ], 404);
});
