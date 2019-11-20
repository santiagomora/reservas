import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Redirect} from 'react-router-dom';
import {GET} from '../../utils/api';

export const ubicacionesHandlers = [
    {
        endpoint:'/ubicaciones',
        match:/\/ubicaciones$/,
        callback:(params) =>
            listHandler(`ubicaciones/list/${user.id}`,`/ubicaciones`)
    },
    {
        endpoint:'/ubicaciones/agregar',
        match:/\/ubicaciones\/(agregar)$/,
        callback:(params) =>
            addFormHandler(`ubicaciones/single/${user.id}/${params.id}`,`/ubicaciones/agregar`)
    },
    {
        endpoint:'/ubicaciones/editar/:id',
        match:/\/ubicaciones\/(editar\/\d+)$/,
        callback:(params) =>
            editFormHandler(`ubicaciones/single/${user.id}/${params.id}`,`/ubicaciones/editar/${params.id}`)
    },
    {
        endpoint:'/ubicaciones/:id',
        match: /\/ubicaciones\/(\d+)$/,
        callback: (params) =>
            singleHandler(`/ubicaciones/single/${user.id}/${params.id}`,`/ubicaciones/${params.id}`)

    }
];

const singleHandler  = (endpoint,location) => {
    return function (params) {
        const request = GET({
            endpoint: endpoint,
            download: this.downloadHandler
        });
        request
            .then(
                response => {
                    const data = response.data.ubicaciones[0];
                    this.setState({
                        data: data,
                        nombre:data.nombre,
                        loadFinished:true,
                        redirect:<Redirect to={location}/>
                    });
                }
            )
            .catch(
                error => {
                    console.log(error.message)
                }
            );
    }
}

const listHandler = (
    endpoint,location
) => {
    return function (params) {
        const request = GET({
            endpoint: endpoint,
            download: this.downloadHandler
        });
        request
            .then(
                response => {
                    this.setState({
                        data: response.data.ubicaciones.data,
                        loadFinished:true,
                        redirect:<Redirect to={location}/>
                    });
                }
            )
            .catch(
                error => {
                    console.log(error.message)
                }
            );
    }
}

const editFormHandler = (endpoint,location) => {
    return function (params) {
        const request = GET({
            endpoint: endpoint,
            download: this.downloadHandler
        });
        request
            .then(
                response => {
                    const data = response.data.ubicaciones[0];
                    this.setState({
                        data: data,
                        nombre:data.nombre,
                        loadFinished: true,
                        redirect:<Redirect to={location}/>
                    });
                }
            )
            .catch(
                error => {
                    console.log(error.message)
                }
            );
    }
}

const addFormHandler = (endpoint,location) => {
    return function (params) {
        this.setState({
            data: true,
            loading: 100,
            loadFinished:true,
            redirect:<Redirect to={location}/>
        });
    }
}