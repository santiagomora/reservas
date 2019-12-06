<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Http\Resources\UsuarioResource;

class EscritorioController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //$this->middleware('auth')->only('index');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $user = json_encode(['data'=>new UsuarioResource(User::where('id',5)->first())]);
        return view('escritorio',compact('user'));
    }
    /**
     * Mostrar formulario de reservas
     *
     * @return \Illuminate\Contracts\Support\Renderable
     **/
    public function reservas()
    {
        return view('reserva');
    }
}
