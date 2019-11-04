<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Traits\hasDependencies;

class UsuarioResource extends JsonResource
{
    use hasDependencies;
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    private static $dependencies = [
        'usuario.add'=>[],
        'usuario.local'=>[
            'franquicia'=>false
        ],
        'usuario.locales'=>[],
        'usuario.franquicia'=>[
            'locales' => 'key'
        ],
        'usuario.franquicias'=>[]
    ];

    public $preserveKeys = true;

    public function toArray($request)
    {
        $user = $this->resource;
        $dependencies = self::getDependencies($request->route()->action['as']);
        if($user){
            $data = [
                'id'=>$user->id,
                'administrador'=>$user->administrador->nombre,
                'franquicia'=> isset($dependencies['franquicia']) || is_null($user->franquicia) ? null : $user->franquicia->nombre,
                'nombre' => $user->nombre,
                'admEmail'=> $user->correo_adm,
                'admNombre'=> $user->nombre_adm,
                'admTelefono'=> $user->telefono_adm,
                'correoLocal'=> $user->correo_local,
                'telefonoLocal'=> $user->telefono_local,
                'razonSocial'=> $user->razon_social,
                'cuitCuil'=> $user->cuit_cuil,
                'provincia'=> $user->provincia,
                'direccionLocal'=> $user->direccion,
                'username' => $user->username,
                'email'=> $user->email,
                'intervalo'=> $user->intervalo,
                'caida'=> $user->caida_reserva,
                'antelacionReserva'=> $user->antelacion_reserva
            ];
            $dependencyData = self::formatResults(
                $user,
                $dependencies
            );
            return array_merge($data,$dependencyData);
        }
    }
}
