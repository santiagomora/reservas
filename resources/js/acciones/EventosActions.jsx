/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export const EventosActions = (
    key,
    actions
) => {
    return {
        links: [
            {
                title: (
                    <div className="smaller-text text bold">
                        <i className="fas fa-eye inline-box side-margin" />
                        Ver
                    </div>
                ),
                to: `/eventos/${key}`,
                params:{id:key},
                route:'eventos'
            },
            {
                title: (
                    <div className="smaller-text text bold">
                        <i className="fas fa-pen inline-box side-margin" />
                        Editar
                    </div>
                ),
                to: `/eventos/editar/${key}`,
                params:{id:key},
                route:'eventos'
            }
        ],
        buttons: [
            {
                title: (
                    <div className="smaller-text text bold text-center">
                        <i className="fas fa-trash inline-box side-margin" />
                        Eliminar
                    </div>
                ),
                click: actions.eliminar,
                data: key,
                type:'submit'
            }
        ]
    }
};
