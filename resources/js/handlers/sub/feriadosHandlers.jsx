import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from 'react-router-dom';
import {
    GET,
    POST,
    PUT
} from '../../utils/api';
import {generateHoursFromInterval} from '../../utils/Helper';

export const feriadosHandlers = {
    list:[
        {
            endpoint:`/feriados`,
            match:/(\/feriados)$/,
            callback:(params) =>
                listHandler(`/feriados/list/${user.id}/`,`/horarios/feriados`)
        },
        {
            endpoint:`/feriados/agregar`,
            match:/(\/feriados\/agregar)$/,
            callback:(params) =>
                addFormHandler(`/feriados/add/${user.id}/`,`/horarios/feriados/agregar`)
        },
        {
            endpoint:`/feriados/editar/:id`,
            match:/\/(feriados\/editar\/\d+)$/,
            callback:(params) =>
                editFormHandler(`/feriados/single/${user.id}/${params.id}`,`/horarios/feriados/editar/${params.id}`)
        },
        {
            endpoint:`/feriados/:id`,
            match: /\/feriados\/(\d+)$/,
            callback: (params) =>
                singleHandler(`/feriados/single/${user.id}/${params.id}`,`/horarios/feriados/${params.id}`)
        }
    ],
    form: {
        add:sendPostRequest,
        edit:sendPutRequest,
        update:updateScope
    }
};

const editFormHandler = (endpoint,location) => {
    return function (params){
        const request = GET({
            endpoint: endpoint,
            download: this.downloadHandler
        });
        request
            .then(
                response => {
                    const data = response.data.feriados[0];
                    this.setState({
                        data: {
                            date: new Date(response.data.feriados[0].fecha),
                            feriados: data,
                            eventos: response.data.eventos,
                            minutes: generateHoursFromInterval(response.data.intervalo),
                            side: response.data.feriados[0].estado === 'laboral'
                        },
                        nombre:data.nombre,
                        loadFinished: true,
                        location:this.props.location
                    });
                }
            )
    }
}

const addFormHandler = (endpoint,location) => {
    return function (params){
        const date = params.date ? params.date : new Date();
        const request = GET({
            endpoint: endpoint + (date.getMonth() + 1) + '/' + date.getFullYear(),
            download: this.downloadHandler
        });
        request
            .then(
                response => {
                    this.setState({
                        data: {
                            date: date,
                            feriados: response.data.feriados.list,
                            eventos: response.data.eventos,
                            minutes: generateHoursFromInterval(response.data.intervalo),
                        },
                        loadFinished: true,
                        location:this.props.location
                    });
                }
            )
    }
}

const listHandler = (endpoint,location) => {
    return function (params){
        const date = params.date||new Date(),
            request = GET({
                endpoint: endpoint + (date.getMonth() + 1) + '/' + date.getFullYear(),
                download: this.downloadHandler
            });
        request
            .then(
                response => {
                    this.setState({
                        data:{
                            date:date,
                            data: response.data.feriados.data||{},
                            intervalo: response.data.intervalo,
                            show: params.show||"2"
                        },
                        loadFinished:true,
                        location:this.props.location
                    });
                }
            )
    }
}


const singleHandler = (endpoint,location) => {
    return function (params){
        const request = GET({
            endpoint: endpoint,
            download: this.downloadHandler
        });

        request
            .then(
                response => {
                    const data = response.data.feriados[0];
                    this.setState({
                        data: {
                            data:data,
                            eventos:response.data.eventos,
                            intervalo:response.data.intervalo
                        },
                        nombre:data.nombre,
                        location:this.props.location,
                        loadFinished:true
                    });
                }
            )

    }
}
export function sendPostRequest () { }

export function updateScope () { }

export function sendPutRequest () { }
