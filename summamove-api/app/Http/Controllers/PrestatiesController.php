<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\prestatie;

class PrestatiesController extends Controller
{
    //_______________________________________________________________________________index function_____________________________________________________________________________________________
    public function index()
    {
        $response = [
            'success' => true,
            'data'    => prestatie::All(),
            'access_token' => auth()->user()->createToken('API Token')->plainTextToken,
            'token_type' => 'Bearer'
        ];
        return response()->json($response, 200);
    }
    //_______________________________________________________________________________show function_____________________________________________________________________________________________
    public function show(prestatie $prestatie)
    {
        $response = [
            'success' => true,
            'data'    =>  $prestatie,
            'access_token' => auth()->user()->createToken('API Token')->plainTextToken,
            'token_type' => 'Bearer'
        ];
        return response()->json($response, 200);    
    }
    //_______________________________________________________________________________Create function_____________________________________________________________________________________________
    public function create()
    {
        $response = [
            'success' => true,
            'data'    => prestatie::All(),
            'access_token' => auth()->user()->createToken('API Token')->plainTextToken,
            'token_type' => 'Bearer'
        ];
        return response()->json($response, 200);
    }
    //_______________________________________________________________________________Store function_____________________________________________________________________________________________

    public function store(Request $request)
    {
        error_log($request);
        $response = [
            'success' => true,
            'data'    =>  prestatie::create($request->all()),
            'access_token' => auth()->user()->createToken('API Token')->plainTextToken,
            'token_type' => 'Bearer'
        ];
        return response()->json($request, 200);    
    }
    //_______________________________________________________________________________Update function_____________________________________________________________________________________________
    public function update(Request $request, prestatie $prestatie)
    {
        $request->user()->currentAccessToken()->delete();
        $prestatie->update($request->all());
        $response = [
            'success' => true,
            'data'    =>  $prestatie,
            'access_token' => auth()->user()->createToken('API Token')->plainTextToken,
            'token_type' => 'Bearer'
        ];
        return response()->json($response, 200);  
    }
    //________________________________________________________________________________delete function____________________________________________________________________________________________
    public function destroy(Request $request,prestatie $prestatie)
    {
        $request->user()->currentAccessToken()->delete();
        $prestatie->delete(); 
        $response = [
            'success' => true,
            'access_token' => auth()->user()->createToken('API Token')->plainTextToken,
            'token_type' => 'Bearer'
        ];
        return response()->json($response, 200);  
    }

    public function indexUser(Request $request, $id)
    {
        $request->user()->currentAccessToken()->delete();
        $response = [
            'success' => true,
            'data'    => prestatie::where('userid',$id)->get(),
            'access_token' => auth()->user()->createToken('API Token')->plainTextToken,
            'token_type' => 'Bearer'
        ];
        return response()->json($response, 200);
    }

    public function indexOefeningen(Request $request, $id)
    {
        $request->user()->currentAccessToken()->delete();
        $response = [
            'success' => true,
            'data'    => prestatie::where('oefeningid',$id)->get(),
            'access_token' => auth()->user()->createToken('API Token')->plainTextToken,
            'token_type' => 'Bearer'
        ];
        return response()->json($response, 200);
    }
}

