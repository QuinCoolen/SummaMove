<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\oefeningen;

class OefeneningenController extends Controller
{
/**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $response = [
            'success' => true,
            'data'    => oefeningen::All(),
            'access_token' => auth()->user()->createToken('API Token')->plainTextToken,
            'token_type' => 'Bearer'
        ];
        return response()->json($response, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $response = [
            'success' => true,
            'data'    => oefeningen::All(),
            'access_token' => auth()->user()->createToken('API Token')->plainTextToken,
            'token_type' => 'Bearer'
        ];
        return response()->json($response, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        error_log($request);
        $request->user()->currentAccessToken()->delete();
        $response = [
            'success' => true,
            'data'    =>  oefeningen::create($request->all()),
            'access_token' => auth()->user()->createToken('API Token')->plainTextToken,
            'token_type' => 'Bearer'
        ];
        return response()->json($response, 200);    
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(oefeningen $oefeningen)
    {
     
        $response = [
            'success' => true,
            'data'    =>  $oefeningen,
            'access_token' => auth()->user()->createToken('API Token')->plainTextToken,
            'token_type' => 'Bearer'
        ];
        return response()->json($response, 200);     
    }

    public function update(Request $request, oefeningen $oefeningen)
    {
        
        $request->user()->currentAccessToken()->delete();
        $oefeningen->update($request->all());
        $response = [
            'success' => true,
            'data'    =>  $oefeningen,
            'access_token' => auth()->user()->createToken('API Token')->plainTextToken,
            'token_type' => 'Bearer'
        ];
        return response()->json($response, 200);  
    }

    public function destroy(Request $request,oefeningen $oefeningen)
    {
        $request->user()->currentAccessToken()->delete();
        $oefeningen->delete(); 
        $response = [
            'success' => true,
            'access_token' => auth()->user()->createToken('API Token')->plainTextToken,
            'token_type' => 'Bearer'
        ];
        return response()->json($response, 200);  
    }
    
    public function indexNoLOG()
    {  
        $response = [
            'success' => true,
            'data'    => oefeningen::All(),
        ];
        return response()->json($response, 200);
    }
    public function showNoLog(oefeningen $oefeningen, $id)
    {
        $response = [
            'success' => true,
            'data'    =>  oefeningen::find($id),
            
        ];
        return response()->json($response, 200);     
    }
}
    

