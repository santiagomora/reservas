import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const evaluateRule = {
    required:({val,name}) => {
        if (val.length===0 || !val)
            return {
                description:`el campo ${name} no puede estar vacío`,
                type:'required',
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

const extFields = ['maxLen','minVal','maxVal','minLen'];

export function validateValue (
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

export function formatErrors (
    errors,
    name,
    ind
) {
    return (
        <li key={ind}>
            <div className="bold smaller-text">
                {`En el campo ${name}`}
            </div>
            <ul className="h-padding">
            {
                errors.map(
                    (e,i) => <li key={i} className="smaller-text">{e.description}</li>
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
                if (err){
                    t.push(err);
                }
                return t;
            }, []
        );
    return [frmtErrs,errors];
}

export function resetDependencies (
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

export function assignValues (
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
}