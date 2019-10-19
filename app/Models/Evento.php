<?php

/**
 * Created by Reliese Model.
 * Date: Wed, 24 Jul 2019 15:45:16 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;
use Illuminate\Support\Collection;
use App\Traits\DataFormatting;
use App\Traits\DependencyOptions;

/**
 * Class UsuarioEvento
 * 
 * @property int $id
 * @property int $id_usuario
 * @property string $nombre
 * @property string $descripcion
 * @property string $promocion
 * @property int $descuento
 * @property int $id_estado
 * 
 * @property \App\Models\EstadoEvento $estado_evento
 * @property \App\Models\User $user
 * @property \Illuminate\Database\Eloquent\Collection $reservas
 *
 * @package App\Models
 */
class Evento extends Eloquent
{
	use DataFormatting;
	/**
	 * hasDataFormatting trait constants
	 */
	private static $dataKey = 'id';
	private static $valueKey = 'nombre';
	private static $dataResource = '\\App\\Http\\Resources\\EventosResource';
	/**
	 * Eloquent constants and castings
	 */
	protected $table = 'usuario_evento';
	public $timestamps = false;
	protected $casts = [
		'id_usuario' => 'int',
		'descuento' => 'int',
		'id_estado' => 'int'
	];
	protected $fillable = [
		'id_usuario',
		'nombre',
		'descripcion',
		'id_estado'
	];
	/**
	 * Helper methods
	 */
	public static function eventosQueryCallback ($params) {
		return function ($query) use ($params){
			return $query->{$params->scope}($params);
		};
	}
	/**
	 * Getter methods
	 */
	/**
	 * Model relationship methods
	 */
	public function estado(){
		return $this->belongsTo(
			\App\Models\Query\EstadoEvento::class,
			'id_estado'
		);
	}

	public function user(){
		return $this->belongsTo(
			\App\User::class,
			'id_usuario'
		);
	}

	public function horario(){
		return $this->hasMany(
			\App\Models\Query\HorarioEvento::class,
			'id_evento'
		);
	}

	public function promociones(){
		return $this->belongsToMany(
			\App\Models\Promocion::class,
			'eventos_promociones',
			'id_evento',
			'id_promocion'
		)->withPivot(
			'inicio_promocion',
			'fin_promocion'
		);
	}

	public function horarios(){
		return $this->belongsToMany(
			\App\Models\Horario::class,
			'horario_eventos',
			'id_evento',
			'id_horario'
		);
	}

	public function feriados(){
		return $this->belongsToMany(
			\App\Models\Feriado::class,
			'feriado_eventos',
			'id_evento',
			'id_feriado'
		);
	}
	/**
	 * Model Scopes
	 */
	public function scopeActive($query){
		return $query->where('id_estado',1);
	}
	public function scopeSearchId($query,$params){
		return $query->where('id',$params->id);
	}
	/**
	 * Seeding database
	 * @param (User) $user
	 */
	public static function dataSeeding(
		$user
	){
		return [
			self::class,
			8,
			false,
			$user->eventos(),
			$user->intervalo_reserva
		];
	}
	
}