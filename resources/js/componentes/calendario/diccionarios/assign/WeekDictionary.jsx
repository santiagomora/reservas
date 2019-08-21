/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * componentes
 */
import CardList from '../../../basic/CardList';
import ButtonList from '../../../basic/ButtonList';
/**
 * funciones
 */
import { assignActionsByStatus } from '../../../../acciones/generateActions';
/**
 * constantes
 */
import { DAYS, MONTHS } from '../../../../constantes/DaysMonths';
import { CLASSBYSTATE } from '../../../../constantes/CardObject';
/**
 * data dictionaries
 */
import { HorarioByState } from '../display/HorarioByState';
import { FeriadoWeekByState } from '../display/FeriadoByState';
import { ReservaWeekByState } from '../display/ReservaByState';

const assignWeekElementType = {
    horarios: (
        acciones,
        sectionData,
        data
    ) => {
        const state = sectionData
            ? sectionData.estado
            : 'no_laboral',
            facade = HorarioByState[state](
                data,
                sectionData,
                acciones
            );
        if (data !== 6)
            facade.container.class+=' border-bottom';
        return facade;
    },
    reservas: (
        acciones,
        sectionData,
        data,
        actions,
        show
    ) => {
        let dt = new Date(data),
            tdy = new Date(),
            tcnd = tdy.getDate() === dt.getDate() && tdy.getMonth() === dt.getMonth() && tdy.getFullYear() === dt.getFullYear(),
            index = sectionData 
                ? 'data'
                : 'no_data',
            elC = dt.getDay() !== 6 ?
                "box-padding margin-box box-transparent full-width border-bottom" :
                "box-padding margin-box box-transparent full-width";
        
        return ReservaWeekByState[index] (
            dt,
            tcnd,
            elC,
            sectionData,
            acciones,
            actions
        );
    },
    feriados: (
        acciones,
        sectionData,
        data
    ) => {
        const date = new Date(data),
            today = new Date(),
            todayCond = today.getDate() === date.getDate() && today.getMonth() === date.getMonth() && today.getFullYear() === date.getFullYear(),
            status = sectionData
                ? sectionData.estado
                : 'no_data',
            facade = FeriadoWeekByState[status](
                todayCond,
                date,
                acciones,
                sectionData
            );
        if (date.getDay() !== 6)
            facade.container.class += " border-bottom";
        return facade;
    }
};

export default assignWeekElementType;