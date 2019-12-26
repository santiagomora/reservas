/**
 * react basic
 */
import React, {
    Component,
    useState
} from 'react';
import {
    Route,
    Switch
} from 'react-router-dom';
import {Navegacion} from '../../acciones/ActionsByView'
import ReactDOM from 'react-dom';
import Formulario from './sub/Formulario';
import Eventos from './sub/Eventos';
import VerEvento from './sub/VerEvento';
import ConfirmarModal from '../../componentes/modal/Modal';
import ValidationHandler from '../../hocs/ValidationHandler';
import validation from './validation';
import {createFeriadosList} from '../../utils/Helper';
import {eventosHandlers} from '../../handlers/sub/eventosHandlers';

function EventosRouting (props){
    const   [open,toggle] = useState(false),
            openModal = (e) => {
                e.preventDefault();
                toggle(true);
            },
            closeModal = (e) => {
                e.preventDefault();
                toggle(false);
            };
    return (
        <>
            <ConfirmarModal open={open}
                            closeModal={closeModal}
                            title="Eliminar Franquicia"
                            content="¿estás seguro de eliminar este franquicia?" />
            <Route  path={props.match.url}
                    exact
                    render={
                        (match) => (
                            <Eventos    data={props.data}
                                        toggleModal={openModal}
                                        nav={Navegacion.listado('eventos')}/>
                        )
                    } />
            <Switch>
                <Route  path={`${props.match.url}/editar/:id`}
                        exact
                        render={
                            (match) => {
                                const   data = props.data,
                                        selected = data.selected,
                                        feriados = createFeriadosList(selected.feriados.data),
                                        form = {
                                            id:selected.id,
                                            id_usuario:user.id,
                                            promociones:Object.keys(selected.promociones.list).join(','),
                                            horarios:Object.keys(selected.horarios.list).join(','),
                                            feriados:Object.keys(feriados).join(','),
                                            descripcion:selected.descripcion,
                                            nombre:selected.nombre,
                                            scope:selected.estado==="Activo" ? 1 : 2
                                        };
                                return (
                                        <ValidationHandler  form={form}
                                                            validation={validation}
                                                            sendRequest={eventosHandlers.form.edit}>
                                            <Formulario editar={true}
                                                        data={props.data}
                                                        toggleModal={openModal}
                                                        nav={
                                                            Navegacion.formulario(
                                                                ()=>false,
                                                                match.match.params.id,
                                                                'eventos'
                                                            )
                                                        }
                                                        {...match} />
                                        </ValidationHandler>
                                )
                            }
                        } />
                <Route  path={`${props.match.url}/agregar`}
                        render={
                            (match) => {
                                const form = {
                                    id_usuario:user.id,
                                    promociones:'',
                                    horarios:'',
                                    feriados:'',
                                    descripcion:'',
                                    nombre:'',
                                    scope:1
                                };
                                return (
                                    <ValidationHandler  form={form}
                                                        validation={validation}
                                                        sendRequest={eventosHandlers.form.add}>
                                        <Formulario toggleModal={openModal}
                                                    data={{all:props.data}}
                                                    nav={Navegacion.agregar('eventos')}
                                                    editar={false}/>
                                    </ValidationHandler>
                                )
                            }
                    } />
                <Route  path={`${props.match.url}/:id`}
                        render={
                            (match) => (
                                <VerEvento  data={props.data}
                                            toggleModal={openModal}
                                            nav={
                                                Navegacion.singular(
                                                    ()=>false,
                                                    match.match.params.id,
                                                    'eventos'
                                                )
                                            }
                                            {...match} />
                            )
                        }/>
            </Switch>
        </>
    );
}
export default React.memo(EventosRouting);
