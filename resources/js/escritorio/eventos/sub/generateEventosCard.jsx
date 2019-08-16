/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * componentes
 */
import ButtonList from '../../../componentes/basic/ButtonList';
/**
 * funciones
 */
import { generateActions } from '../../../funciones/generateActions';

export default function generateEventosCard(
    eventos,
    actions
) {
    return Object.keys(eventos).map(
        e => {
            const acciones = generateActions['feriados'](
                true,
                actions,
                e,
                true,
                false
            );
            const links = [
                {
                    title: (
                        <div className="smaller-text text bold">
                            <i className="fas fa-plus-circle inline-box side-margin" />
                            Editar
                        </div>
                    ),
                    to: '/eventos/editar'
                }
            ];
            return {
                title: {
                    data: (
                        <div className="full-width">
                            <span className="sub-title text-super side-margin inline-block align-center">{eventos[e].nombre}</span>
                            <ButtonList
                                displayList="flex-row nav-list h-center no-padding inline-block  align-center"
                                container="side-margin inline-block"
                                elemClass="full-width box-transparent highlight-hover border-box button-border"
                                elems={acciones} />
                        </div>
                    )
                },
                content: {
                    data: (
                        <div className="container">
                            <div className="row">
                                <div className="col-md-9">
                                    <div>{eventos[e].promocion}</div>
                                </div>
                                <div className="col-md-3 big-font text-right no-padding">
                                    <span className="big-font side-margin light-danger">{eventos[e].descuento}</span>
                                    <span className="side-margin">%</span>
                                </div>
                            </div>
                        </div>
                    ),
                },
                container: {
                    class: "box-padding border-bottom "
                }
            }
        }
    );
}