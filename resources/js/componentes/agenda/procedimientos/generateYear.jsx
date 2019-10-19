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
 * constantes
 */
import {MONTHS,monthRows,monthIndex} from '../../../constantes/DaysMonths';

export default function generateYear(date,handler){
    let year = [],
        fourMonths=[],
        currentIndex = monthIndex[date.getMonth()].split('');
    monthRows[currentIndex[0]][currentIndex[1]].class ="selected box-padding v-padding full-width highlight-border";
    for(let row = 0; row<monthRows.length; row++){
        year.push(
            <ButtonList
                key={row}
                clickHandler={handler}
                elems={monthRows[row]}
                displayList="flex-row no-margin nav-list full-width no-padding h-center"
                container="thirty"
                elemClass="box-padding highlight-hover box-transparent full-width"/>
        );
    }
    return year;
}