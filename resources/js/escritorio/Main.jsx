import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//Navigation Components
import Lateral from './contenedores/Lateral';
import Navegacion from './contenedores/Navegacion';
//Panel Components
import Configuracion from './paneles/configuracion/Configuracion';
import Escritorio from './paneles/escritorio/Escritorio';
import Eventos from './paneles/eventos/Eventos';
import Horarios from './paneles/horarios/Horarios';
import Locales from './paneles/locales/Locales';
import Reservas from './paneles/reservas/Reservas';
import Ubicaciones from './paneles/ubicaciones/Ubicaciones';
import BreadCrumb from '../componentes/control/BreadCrumb';

const sidebar = [//get on ajax request
    {
        data: "0",
        disabled: false,
        title: "Escritorio",
        sub: [
            {
                title:"Escritorio 1",
                data:"0"
            },
            {
                title: "Escritorio 2",
                data: "1"
            },
            {
                title:"Escritorio 3",
                data: "2"
            }
        ]
    },
    {
        data: "1",
        disabled: false,
        title: "Reservas",
        sub: [
            {
                title:"Reservas 1",
                data: "0"
            },
            {
                title: "Reservas 2",
                data: "1"
            },
            {
                title: "#eservas 3",
                data: "2"
            }
        ]
    },
    {
        data: "2",
        disabled: false,
        title: "Horarios",
        sub: [
            {
                title: 'Horario de atención',
                data: "0"
            },
            {
                title: 'Días Feriados',
                data: "1"
            }
        ]
    },
    {
        data: "3",
        disabled: false,
        title: "Ubicaciones",
        sub: [
            {
                title: 'Ubicaciones 1',
                data: "0"
            },
            {
                title: 'Ubicaciones 2',
                data: "1"
            },
            {
                title: 'Ubicaciones 3',
                data: "2"
            }
        ]
    },
    {
        data: "4",
        disabled: false,
        title: "Eventos",
        sub: [
            {
                title: 'Eventos 1',
                data: "0"
            },
            {
                title: 'Eventos 2',
                data: "1"
            },
            {
                title: 'Eventos 3',
                data: "2"
            },
        ]
    },
    {
        data: "5",
        disabled: false,
        title: "Locales",
        sub: [
            {
                title: 'Locales 1',
                data: "0"
            },
            {
                title: 'Locales 2',
                data: "1"
            },
            {
                title: 'Locales 3',
                data: "2"
            }
        ]
    },
    {
        data: "6",
        disabled: false,
        title: "Configuración",
        sub: [
            {
                title: 'Configuracion 1',
                data: "0"
            },
            {
                title: 'Configuracion 2',
                data: "1"
            },
            {
                title: 'Configuracion 3',
                data: "2"
            }
        ]
    }
];

//holds reservation state
export default class Main extends Component {
    constructor() {
        super();
        this.changePanel = this.changePanel.bind(this);
        this.changeSubElement = this.changeSubElement.bind(this);
        this.restoreSubElements = this.restoreSubElements.bind(this);
        this.state = {
            showing:"0",
            sidebar: sidebar, 
            crumb: [{ 
                title: "Escritorio", 
                data: "0",
                class:"c-title box-transparent small-v-padding h-padding highlight-title full-width text-left",
                click: this.changePanel
            }]
        };
    }

    changeSubElement(e){
        e.preventDefault();
        let clicked = e.currentTarget.getAttribute('data');
        let sidebar = this.state.sidebar;
        let subElements = sidebar[this.state.showing].sub;
        let crumb = this.state.crumb;
        subElements.map(
            (e, i) => { 
                if (i == clicked){
                    if (crumb[1]){
                        if (crumb[1].data !== clicked){
                            e.class = "highlight-title box-transparent box-padding"; 
                            crumb[1] = e;
                        } else {
                            crumb.pop();
                            e.class = "box-transparent box-padding highlight-hover";
                        }
                    } else {
                        e.class = "highlight-title box-transparent box-padding";
                        crumb.push(e)
                    };
                } else e.class = "box-transparent box-padding highlight-hover"
                return e;
            }
        );
        sidebar[this.state.showing].sub = subElements;
        this.setState({sidebar:sidebar,crumb:crumb});
    }
    restoreSubElements(elements){
        return elements.map(
            e => {
                e.class = "box-transparent box-padding highlight-hover";
                return e;
            }
        );
    }
    changePanel(e){
        e.preventDefault();
        let showing = e.currentTarget.getAttribute('data');
        let sidebar = this.state.sidebar;
        let crumb = [];
        sidebar[this.state.showing].sub = this.restoreSubElements(sidebar[this.state.showing].sub);
        crumb = (this.state.crumb.length > 1) ? 
            this.state.crumb.slice(0, 1) : [{
                title: sidebar[showing].title,
                data: showing,
                class: "c-title small-v-padding box-transparent h-padding highlight-title full-width text-left",
                click: this.changePanel
            }];
        this.setState({ showing: showing, crumb:crumb, sidebar:sidebar});
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <Navegacion/>
                </div>
                <div className="row">
                    <div className="col-md-3 no-padding">
                        <Lateral 
                            current={this.state.showing} 
                            items={this.state.sidebar} 
                            changePanel={this.changePanel}
                            changeSub={this.changeSubElement}/>
                    </div>
                    <div className="col-md-9">
                        <div className="container">
                            <div className="row">
                                <BreadCrumb change={this.changeCrumb} items={this.state.crumb} />
                            </div>
                            <div className="row">
                                <Escritorio classes={(this.state.showing === "0") ? "full-width" : "hidden"} />
                                <Reservas classes={(this.state.showing === "1") ? "full-width" : "hidden"} />
                                <Horarios panel={this.state.showing === "2"} selectInnerElement={this.changeSubElement} subElements={this.state.sidebar[2].sub} currentSub={this.state.crumb[1] ? this.state.crumb[1].data : null}/>
                                <Ubicaciones classes={(this.state.showing === "3") ? "full-width" : "hidden"} />
                                <Eventos classes={(this.state.showing === "4") ? "full-width" : "hidden"} />
                                <Locales classes={(this.state.showing === "5") ? "full-width" : "hidden"} />
                                <Configuracion classes={(this.state.showing === "6") ? "full-width" : "hidden"} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('escritorio-container')) {
    ReactDOM.render(<Main />, document.getElementById('escritorio-container'));
}
