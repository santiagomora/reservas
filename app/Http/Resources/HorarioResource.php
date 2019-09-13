<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Collection;
use App\Traits\DataFormatting;

class HorarioResource extends JsonResource
{
    use DataFormatting;
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    private static $dataKey = 'id';
    private static $valueKey = 'nombre';
    private static $dataResource = 'App\\Http\\Resources\\HorarioEventoResource';
    private static $formatOptions = [
        'keyData'=>'data',
        'listData'=>'list'
    ];
    public $preserveKeys = true;
    
    public function toArray($request)
    {
        $trimstr = str_replace(" ","_",$this->estado->descripcion);
        return [
            "id"=>$this->id,
            "diaSemana"=>$this->id_dia_semana,
            "estado"=>strtolower($trimstr),
            "apertura" => [
                "reserva" => [
                    "hora" => $this->apertura_reserva->hora,
                    "minuto" => $this->apertura_reserva->minuto
                ],
                "atencion"=> [
                    "hora"=>$this->apertura_atencion->hora,
                    "minuto"=> $this->apertura_atencion->minuto 
                ]
            ],
            "cierre" => [
                "reserva" => [
                    "hora" => $this->cierre_reserva->hora,
                    "minuto" => $this->cierre_reserva->minuto
                ],
                "atencion"=> [
                    "hora"=>$this->cierre_atencion->hora,
                    "minuto"=>$this->cierre_atencion->minuto
                ]
            ],
            'eventos' => self::getFormattedData($this->eventos->where('id_estado',1))
        ];
    }
}

