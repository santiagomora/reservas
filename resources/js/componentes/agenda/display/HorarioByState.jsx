/**
 * react basic
 */
import React, { Component, useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import CardList from '../../basic/CardList';
import {CommaList} from '../../basic/CommaList';
import { DAYS, MONTHS } from '../../../constantes/DaysMonths';
import { CLASSBYSTATE } from '../../../constantes/CardObject';
import CustomLink from '../../basic/CustomLink';
import {ExpandableComponent} from '../../../hocs/ExpandableComponent';


export const HorarioWeekByState = {
    laboral: (
        renderActions,
        sectionData,
        statusIndex,
        originalActions,
        dataIndex
    ) =>{
        const eventos = sectionData.eventos.list,
            eventoLength = Object.keys(eventos).length,
            linkParam={
                to:`/horarios/${dataIndex}`,
                params:{id:dataIndex},
                route:'horarios'
            };
        return {
            content: () =>
                <ExpandableComponent    show  = {true}
                                        links = {renderActions.links}
                                        buttons = {renderActions.buttons}
                                        title = {
                                            <CustomLink params={linkParam}>
                                                <span className="h-padding mid-title subrayado" style={{color:'var(--light-danger)'}}>
                                                    {DAYS[sectionData.diaSemana - 1]}
                                                </span>
                                            </CustomLink>
                                        }>
                    <div className="row">
                        <div className="col-md-6 container">
                            <div className="inline-block m-font">
                                {`${eventoLength} Eventos encontrados`}
                            </div>
                            <div className="v-padding ">
                                {
                                    eventoLength > 0
                                    ?
                                            <CommaList  list={eventos}
                                                        route='eventos' />
                                    :
                                        "No hay eventos que mostrar."
                                }
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="text-right bold m-font">
                                Día laboral
                            </div>
                            <div className="row m-font">
                                Horarios de atención
                            </div>
                            <div className="row">
                                <div className="col-md-6 no-padding">
                                    <div className="bold">
                                        Reservas
                                    </div>
                                    <div>
                                        {`${sectionData.apertura.reserva.hora}:${sectionData.apertura.reserva.minuto} horas - ${sectionData.cierre.reserva.hora}:${sectionData.cierre.reserva.minuto} horas`}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="bold">
                                        Atención
                                    </div>
                                    <div>{`${sectionData.apertura.atencion.hora}:${sectionData.apertura.atencion.minuto} horas - ${sectionData.cierre.atencion.hora}:${sectionData.cierre.atencion.minuto} horas`}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ExpandableComponent>,
            class: sectionData.diaSemana === 7
                ? 'extra-v-padding extra-h-padding'
                : 'extra-v-padding extra-h-padding border-bottom'
        };
    },
    no_laboral: (
        renderActions,
        sectionData,
        statusIndex,
        originalActions,
        dataIndex
    ) =>
        {
            const linkParam = {
                to:`/horarios/${dataIndex}`,
                params:{id:dataIndex},
                route:'horarios'
            };
            return {
                content: () => {
                    return (
                        <div className="container">
                            <div className="row col-md-12">
                                <ExpandableComponent    show  = {true}
                                                        links = {renderActions.links}
                                                        buttons = {renderActions.buttons}
                                                        title = {
                                                            <CustomLink params={linkParam}>
                                                                <span className="h-padding highlight mid-title subrayado">
                                                                    {DAYS[sectionData.diaSemana - 1]}
                                                                </span>
                                                            </CustomLink>
                                                        }>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="m-font">
                                                Sin apertura
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="text-right bold m-font">
                                                Día no laboral
                                            </div>
                                            <div className="half box-padding inline-block">
                                                <div className="highlight m-font">
                                                    Descripción
                                                </div>
                                                <div>
                                                    {sectionData.descripcion||"sin descripcion"}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </ExpandableComponent>
                            </div>
                        </div>
                    )
                },
                class: "background-border bottom-border"
            }
        },
    no_data: (
        renderActions,
        sectionData,
        statusIndex,
        originalActions,
        dataIndex
    ) =>
        ({
            content: () =>
                <ExpandableComponent    show  = {true}
                                        links = {renderActions.links}
                                        title = {
                                            <div className="h-padding highlight mid-title">
                                                {DAYS[dataIndex - 1]}
                                            </div>
                                        }>
                    <div className="row m-font justify-content-end h-padding bold">
                        Aun no has asignado un horario de reservas
                    </div>
                    <div className="row v-padding">
                        <div className="col-md-6 highlight m-font">
                            Sin horario
                        </div>
                        <div className="col-md-6 highlight m-font">
                            Sin Eventos
                        </div>
                    </div>
                </ExpandableComponent>,
            class: dataIndex === 7
                ? "extra-v-padding extra-h-padding"
                : "extra-h-padding extra-v-padding border-bottom"
        })
};
