/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * componmentes
 */
import Actions from '../componentes/basic/Actions';
/**
 * dictionaries
 */
import { ReservasActions } from './ReservasActions';
import { FeriadosActions } from './FeriadosActions';
import { HorariosActions } from './HorariosActions';
import { EventosActions } from './EventosActions';
import { UbicacionesActions } from './UbicacionesActions';
import { PromocionesActions } from './PromocionesActions';

export const GenerateActions = {
    reservas: (
        data,
        actions,
        key,
        type,
        fullDate
    ) => {
        let index = '';
        if (data)
            index = data.estado ? data.estado : 'data';
        else
            index = 'no_data';
        const acciones = ReservasActions[type][index](
            actions,
            key,
            fullDate
        );
        return (
            <Actions
                overlay={type === 'month' ? true : false}
                links={acciones.links}
                buttons={acciones.buttons} />
        );
    },
    feriados: (
        data,
        actions,
        key,
        type,
        fullDate
    ) => {
        const index = data ? 'data' : 'no_data',
            acciones = FeriadosActions[type][index](
                key,
                actions
            );
        return acciones;
    },
    horarios: (
        data,
        actions,
        key,
        type
    ) => {
        const index = data ? 'data' : 'no_data',
            acciones = HorariosActions[index](
                key,
                actions
            );
        return acciones;
    },
    ubicaciones: (
        key,
        actions
    ) => {
        const acciones = UbicacionesActions(
            key,
            actions
        );
        return (
            <Actions
                links={acciones.links}
                buttons={acciones.buttons} />
        );
    },
    eventos: (
        key,
        actions
    ) => {
        const acciones = EventosActions(
            key,
            actions
        );
        return (
            <Actions
                links={acciones.links}
                buttons={acciones.buttons} />
        );
    },
    promociones: (
        key,
        actions
    ) => {
        const acciones = PromocionesActions(
            key,
            actions
        );
        return (
            <Actions
                links={acciones.links}
                buttons={acciones.buttons} />
        );
    }
};
