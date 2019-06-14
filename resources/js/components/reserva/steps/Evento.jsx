import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Select from "../../input/Select.jsx";
import Imagen from "../../miscellaneous/Imagen.jsx";

function Evento(props) {
    let imgs = props.select.images;
    let displayImgs = Object.keys(imgs).map(function (ind) {
        return <Imagen key={ind} keyVal={ind} source={imgs[ind]} change={props.change} class={(props.select.selected === ind) ? "highlight-image image" : "image"} name={props.select.name} />;
    });
    <Select {...props.select} titulo="Selecciona tipo de evento de tu reserva" change={props.change} toggle={props.showToggle} />
    return (
        <div className={(props.show) ? "align-center" : "hidden"}>
            <h1 class="highlight-title">Seleccionar Evento</h1>
            <div className="flex flex-row h-center box-padding">
                {displayImgs}
            </div>
            <Select {...props.select} titulo="Selecciona tipo de evento de tu reserva" change={props.change} toggle={props.showToggle} />
        </div>
    );
}

export default Evento;