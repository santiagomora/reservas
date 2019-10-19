<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\PromocionesResource as Resource;
use App\Traits\hasDependencies;
use Carbon\Carbon;
use App\User;

class PromocionController extends Controller
{
    use hasDependencies;

    protected $model = '\\App\\Models\\Promocion';
    
    public function __construct () {
        $this->middleware('length');
    }
    
    protected static $dependencies = [
        'list' => [
            'promociones'        => 'key',
            'promociones.eventos'=> false
        ],
        'add' => [
            'eventos'=> 'list'
        ],
        'single' => [
            'promociones' => false,
            'promociones.eventos'=> false,
            'eventos'=> 'list'
        ],
    ];

    public function list (
        $route,
        $id
    ){
        $dependencies = self::getDependencies($route);
        $relations = $this->getDependencyScopes(
            array_keys($dependencies),
            array()
        );

        $user = User::with(
            $relations
        )->find($id);
        

        $data = self::formatResults(
            $user,
            $dependencies
        );
        return response($data,200)->header('Content-Type','application/json');
    }

    public function add (
        $route,
        $id
    ){
        $dependencies = self::getDependencies($route);
        $relations = $this->getDependencyScopes(
            array_keys($dependencies),
            array()
        );

        $user = User::with(
            $relations
        )->find($id);
        
        $data = self::formatResults(
            $user,
            $dependencies
        );
        return response($data,200)->header('Content-Type','application/json');
    }

    public function single (
        $route,
        $userId,
        $id
    ){
        $dependencies = self::getDependencies($route);

        $relations = $this->getDependencyScopes(
            array_keys($dependencies),
            array('promociones' => (object)['id'=>$id,'scope'=>'searchId'])
        );

        $user = User::with(
            $relations
        )->find($userId);
        
        $data = self::formatResults(
            $user,
            $dependencies
        );
        
        return response($data,200)->header('Content-Type','application/json');
    }
    
    public function create (){
        return response(['respuesta'=>'create'],200)
            ->header('Content-Type','application/json');
    }
    public function update (){
        return response(['respuesta'=>'update'],200)
            ->header('Content-Type','application/json');
    }
    public function delete (){
        return response(['respuesta'=>'delete'],200)
            ->header('Content-Type','application/json');
    }
}