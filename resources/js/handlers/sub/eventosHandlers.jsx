import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from 'react-router-dom';
import {
    GET,
    POST,
    PUT
} from '../../utils/api';
import {assignHorarios} from '../../utils/Helper';

export const eventosHandlers = {
    list: [
        {
            endpoint:'/eventos',
            match:/\/eventos$/,
            callback:(params) =>
                listHandler(`/eventos/list/${user.id}`)
        },
        {
            endpoint:'/eventos/agregar',
            match:/\/eventos\/(agregar)$/,
            callback:(params) =>
                addFormHandler(`/eventos/add/${user.id}`)
        },
        {
            endpoint:'/eventos/editar/:id',
            match:/\/eventos\/(editar\/\d+)$/,
            callback:(params) =>
                editFormHandler(`eventos/single/${user.id}/${params.id}`)
        },
        {
            endpoint:'/eventos/:id',
            match: /\/eventos\/(\d+)$/,
            callback: (params) =>
                singleHandler(`/eventos/single/${user.id}/${params.id}`)
        }
    ],
    form: {
        add:sendPostRequest,
        edit:sendPutRequest
    }
};

const editFormHandler = (endpoint) => {
    return function () {
        const request = GET({
            endpoint: endpoint,
            download: this.downloadHandler
        });
        return  request
                .then(
                    response => {
                        let data =  {
                            selected: response.data.eventos[0],
                            all: {
                                feriados: response.data.feriados,
                                horarios: response.data.horarios,
                                promociones: response.data.promociones
                            }
                        };
                        data.selected.horarios.list = assignHorarios(data.selected.horarios.list)[0];
                        data.all.horarios.list = assignHorarios(data.all.horarios.list)[0];
                        this.setState({
                            data: {...data},
                            nombre:data.selected.nombre,
                            loadFinished:true,
                            location:this.props.location
                        });
                        return true;
                    }
                );
    }
}

const addFormHandler = (endpoint) => {
    return function () {
        const request = GET({
            endpoint: endpoint,
            download: this.downloadHandler
        });

        return  request
                .then(
                    response => {
                        let data = response.data;
                        data.horarios.list = assignHorarios(data.horarios.list)[0];
                        this.setState({
                            data: {...data},
                            nombre:null,
                            loadFinished:true,
                            location:this.props.location
                        });
                        return true;
                    }
                )
    }
}

const listHandler = (endpoint) => {
    return function () {
        const request = GET({
            endpoint: endpoint,
            download: this.downloadHandler
        });

        return  request
                .then(
                    response => {
                        this.setState({
                            data: response.data.eventos.data,
                            loadFinished:true,
                            nombre:null,
                            location:this.props.location
                        });
                        return true;
                    }
                )
    }
}

const singleHandler = (endpoint) => {
    return function () {
        const request = GET({
            endpoint: endpoint,
            download: this.downloadHandler
        });

        return  request
                .then(
                    response => {
                        const data = response.data.eventos[0];
                        this.setState({
                            data:data,
                            nombre:data.nombre,
                            loadFinished:true,
                            location:this.props.location
                        });
                        return true;
                    }
                )
    }
}

export function sendPostRequest (data) {
    return POST({
        endpoint: 'eventos/create',
        data: JSON.stringify(data)
    });
}

export function sendPutRequest (data) {
    return PUT({
        endpoint: 'eventos/update',
        data: JSON.stringify(data)
    });
}
