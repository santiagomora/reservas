import {
    DAYS,
    MONTHS
} from '../../../app/constantes/DaysMonths';
import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';

import Titulo from '../../../app/componentes/basic/Titulo';
import horarioGenerator from '../../../app/generators/horarioGenerator';
import GraphicHolder from '../../../app/componentes/graphics/GraphicHolder';

const links = [
    {
        title: (
            <div className="smaller-text text bold">
                <i className="fas fa-calendar-day inline-box side-margin" />
                Feriados
            </div>
        ),
        to:`/feriados`
    }
];

export default function Horarios (props) {
    const week = horarioGenerator(
        props.data,
        {eliminar: props.toggleModal}
    );
    return (
        <>
            <Titulo title="Horarios"
                links={links}/>
            <GraphicHolder titulo="Métricas para los horarios"
                monthly="/horarios/resumen/mensual/$month/$year"
                yearly="/horarios/resumen/anual/$year"/>
            <ul className="v-padding justify no-padding full-width flex-column nav-list h-center">
                {
                    week.map(
                        (elem, index) =>
                            <li key={index} className={elem.class}>
                                <elem.content />
                            </li>
                    )
                }
            </ul>
        </>
    );
}
