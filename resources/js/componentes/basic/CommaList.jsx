import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';

function CommaListMemo(props) {
    return Object.keys(props.list).map(
        (e,i) =>
            <li
                key={i}
                className="bold highlight-title inline-block side-margin small-v-margin smaller-text button-border border-box">
                <Link to={props.endpoint+'/'+e}>
                    {props.list[e]}
                </Link>
            </li>
    );
}
export const CommaList = React.memo(CommaListMemo);
