/**
 * react basic
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * basic component
 */
import LoadBar from '../../../componentes/control/LoadBar';
/**
 * API
 */
import { GET } from '../../../utils/api';
/**
 * formularios
 */
import { FormularioEstablecimiento } from '../../configuracion/FormularioEstablecimiento';
import { FormularioUsuario } from '../../configuracion/FormularioUsuario';
import { FormularioFranquicia } from '../FormularioFranquicia';
/**
 * components
 */
import Actions from '../../../componentes/basic/Actions';
import Titulo from '../../../componentes/basic/Titulo';
import { Navegacion } from '../Navegacion';
export default class AgregarFormulario extends Component{
    constructor(props){
        super(props);
        this.state = {
            data:null,
            loadFinished : false
        };
        this.fetchData = this.fetchData.bind(this);
        this.downloadHandler = this.downloadHandler.bind(this);
    }

    downloadHandler(pEvent) {
        let
            loading = Math.round((pEvent.loaded * 100) / pEvent.total),
            state = loading !== 100 ?
                { loading, loadFinished: false }
                : { loading, loadFinished: true };
        this.setState(state);
    }

    fetchData() {
        const conf = this.props.editar 
        ?  
            {
                endpoint: '/usuario/local/'+this.props.match.params.id,
                download: this.downloadHandler
            }
        :
            {
                endpoint: '/usuario/add/4/1',
                download: this.props.downloadHandler
            },
            request = GET(conf);
        request
            .then(
                response => {
                    const data = this.props.editar 
                    ?
                        response.data.data
                    :
                        response.data.usuarios.list;
                    this.setState({ data });
                }
            )
            .catch(
                error => {
                    console.log(error.message)
                }
            );
    }

    componentDidMount(){
        this.fetchData();
    }

    render(){
        if (this.state.data && this.state.loadFinished) {
            const nav = Navegacion.formulario(
                this.state.data,
                this.props.editar
            );
            return (
                <form className="full-width box-padding">
                    < Titulo
                        title={
                            this.props.editar
                                ?
                                    this.state.data.nombre
                                : "Agregar Local"
                        }
                        links={nav.links}
                        buttons ={nav.buttons} />
                    <div className="container">
                        <FormularioEstablecimiento data={this.state.data}/>
                        <FormularioUsuario data={this.state.data}/>
                    </div>
                </form>
            )
        }
        return (
            <LoadBar
                loaded={this.state.loading} />
        )
    }
}
