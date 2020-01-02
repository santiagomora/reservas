
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {withRouter} from 'react-router-dom';
import {DisplaysMessages} from './MessageHandler';
import Actions from '../componentes/basic/Actions';
import {FormActions} from '../acciones/ActionsByView';

const evaluateRule = {
    required:({val,name}) => {
        if (val.length===0 || !val)
            return {
                description:`el campo ${name} no puede estar vacío`,
                type:'required',
                field:name
            };
    },
    isDate: ({val,name}) => {
        if (!(val instanceof Date))
            return {
                description:`el campo ${name} tiene que ser una fecha válida`,
                type:'isDate',
                field:name
            };
    },
    maxVal:({val,maxVal,name}) => {
        if (parseInt(val) > maxVal)
            return {
                description:`el campo ${name} no puede ser mayor a ${maxVal}`,
                type:'max',
                field:name
            };
    },
    minVal:({val,minVal,name}) => {
        if (parseInt(val) < minVal)
            return {
                description:`el campo ${name} no puede ser menor a ${minVal}`,
                type:'min',
                field:name
            };
    },
    maxLen:({val,maxLen,name}) => {
        if (val.length > maxLen){
            return {
                description:`el campo ${name} no puede tener más de ${maxLen} caracteres`,
                type:'max',
                field:name
            };
        }
    },
    minLen:({val,minLen,name}) => {
        if (val.length < minLen){
            return {
                description:`el campo ${name} no puede tener menos de ${minLen} caracteres`,
                type:'max',
                field:name
            };
        }
    },
    alpha_numeric:({val,name}) => {
        if (val.match(/[^a-zA-Z\d\s\,\.ñáéíóú]/gi))
            return {
                description:`el campo ${name} debe contener caracteres alfanuméricos`,
                type:'alpha_numeric',
                field:name
            };
    },
    email:({val,name}) => {
        if (!val.match(/@/gi))
            return {
                description:`el campo ${name} debe ser un correo`,
                type:'email',
                field:name
            };
    },
    numeric: ({val,name}) => {
        if (!parseInt(val))
            return {
                description:`el campo ${name} debe contener únicamente números`,
                type:'numeric',
                field:name
            };
    },
    phone: ({val,name}) => {
        if (val.match(/[^\d\-\s\(\)]/gi))
            return {
                description:`el campo ${name} debe ser un número de teléfono`,
                type:'phone',
                field: name
            };
    }
}

const castValues = {
    array: ($value) => {
        if ($value)
            return $value.split(',').map(e => parseInt(e));
        else return [];
    },
    integer: ($value) => parseInt($value)
}

const extFields =  ['maxLen','minVal','maxVal','minLen'];

function validateValue (
    val,
    {rules,fieldName}
) {
    return Object.keys(rules).reduce(
        (t,r) => {
            const arg = {
                val:val,
                name:fieldName
            };
            if (extFields.indexOf(r)!==-1){
                arg[r] = rules[r];
            }
            const err = evaluateRule[r](arg);
            if (err)
                t.push(err);
            return t;
        }, []
    );
}

function formatErrors (
    errors,
    name,
    ind
) {
    return (
        <li key={ind}>
            <ul className="h-padding">
            {
                errors.map(
                    (e,i) =>
                        <li key={i} className="smaller-text small-v-padding">
                            {e.description||e}
                        </li>
                )
            }
            </ul>
        </li>
    );
}

export function searchErrors (
    errors,
    fields,
    form
) {
    const frmtErrs = Object.keys(form).reduce(
            (t,e,i) => {
                const   flds = (errors[e]||[]).length>0
                            ? errors[e]
                            : validateValue(form[e],fields[e]),
                        err = flds.length>0
                            ? formatErrors(
                                flds,
                                fields[e].fieldName,
                                i
                            )
                            : null;
                errors[e] = flds;
                if (err)
                    t.push(err);
                return t;
            },
            []
        );
    return [frmtErrs,errors];
}

function resetDependencies (
    form,
    vali,
    err,
    name
) {
    vali[name].dependencies.map(
        e => {
            form[e] = "";
            err[e] = validateValue("",vali[e]);
        }
    );
    return [form,err];
}

function assignValues (
    value,
    name,
    form,
    validate,
    err
) {
    if ((validate[name].dependencies||[]).length > 0 && (value === "" || value === null))
        [form,err] = resetDependencies(
            form,
            validate,
            err,
            name
        );
    form[name] =  value;
    err[name] = validateValue(value,validate[name])
    return [form,err];
};

const castBeforeSending = (values,validation) =>
    Object.keys(values).reduce(
        (final,current) => {
            const type = validation[current].casting;
            final[current] = type
                ? castValues[type](values[current])
                : values[current];
            return final;
        }
    ,{});

class ValidationHandler extends Component{
    constructor(props){
        super(props);

        this.enviarFormulario = this.enviarFormulario.bind(this);
        this.cancelarFormulario = this.cancelarFormulario.bind(this);
        this.changeFormField = this.changeFormField.bind(this);
        this.actions = FormActions(this.enviarFormulario,this.cancelarFormulario);
        this.requestHandler = this.props.sendRequest.bind(this);
        this.requestSent = this.requestSent.bind(this);

        this.state = {
            form:this.props.form,
            errors:{},
            validation:this.props.validation,
            sent:false
        };
    }

    static contextType = DisplaysMessages;

    changeFormField(e){
        const   input = e.currentTarget||e,
                name = input.getAttribute('name'),
                value = input.getAttribute('needsvalue') === '1'
                    ? input.value
                    : input.getAttribute('value'),
                [form,errors] = assignValues(
                    value,
                    name,
                    this.state.form,
                    this.state.validation,
                    this.state.errors
                );
        this.setState({form,errors});
    }

    requestSent(bool,callback){
        this.setState(
            {sent:bool},
            () =>
                callback()
                    .then(
                        (response) => {
                            this.props.history.push({
                                pathname:response.data.redirect,
                                state:{message:response.data}
                            })
                        }
                    )
                    .catch(
                        (err) =>
                            this.context.validationError({
                                error:err,
                                validation:this.state.validation,
                                form:this.state.form,
                                target:this
                            })
                    )
        );
    }

    enviarFormulario(e){
        e.preventDefault();
        const   [hasErrors,errors] = searchErrors(
                    this.state.errors,
                    this.state.validation,
                    this.state.form
                );
        if (hasErrors.length>0)
            this.setState(
                {errors},
                () => this.context.frontEndError(hasErrors)
            )
        else
            this.requestSent(
                true,
                () => this.requestHandler(
                    castBeforeSending(
                        this.state.form,
                        this.state.validation
                    )
                )
            )
    }

    cancelarFormulario(e){
        e.preventDefault();
        this.context({
            message:{
                data:'cancelar from Ubicaciones form',
                type:'failure',
                update:false
            }
        })
    }

    render(){
        console.log(this.state.form)
        const   Form = React.cloneElement(
                this.props.children,
                {
                    fields:this.state.form,
                    change:this.changeFormField,
                    errors:this.state.errors
                }
            );
        return (
            <>
                <div className="visible relative">
                    <div    className={this.state.sent
                                ? "top-padding full-width overlay"
                                : "hidden"}
                            style={{marginLeft:"-15px"}}/>
                    <form className="full-width">
                        {Form}
                        <div className="row justify-content-end h-padding">
                            <Actions buttons={Object.values(this.actions)}/>
                        </div>
                    </form>
                </div>
            </>
        )
    }
}
export default withRouter(ValidationHandler)
