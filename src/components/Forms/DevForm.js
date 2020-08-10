import React, { useState } from 'react'
import translate from '../../servives/translate'
import { useForm } from "react-hook-form";

export default ({addDev}) => {

    const required = 'Este campo es requerido'

    const initialValues = {
        name:'',
        type:'web',
        state:'pending'
    }

    const states = [
        { value:'pending' },
        { value:'developing' },
        { value:'finish' }
    ]

    const typesDev = [
        { value: 'web' },
        { value: 'mobile' },
        { value: 'desktop' },
        { value: 'game' },
        { value: 'devops' }
    ]

    const [values, setValues] = useState(initialValues)
    const { register, handleSubmit, errors } = useForm();
    
    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({...values, [name]: value})
    }

    const onSubmit = e => {
        addDev(values)
        setValues({...initialValues})
    }

    const errorMessage = error => {
        return <div className="invalid-feedback d-block">{error}</div>
    }

    return (
        <form className="card card-body" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <input type="text" className="form-control" placeholder="Nombre" name="name" id="" 
                value={values.name} onChange={handleInputChange} ref={register({ required: true })}/>
                {errors.name && errors.name.type === "required" &&
                    errorMessage(required)}
            </div>
            <div className="form-group">
                <label>Tipo</label>
                <select className="form-control" name="type" id="" value={values.type} onChange={handleInputChange}>
                    {
                        typesDev.map((v, i) => <option key={i} value={v.value}>{translate(v.value)}</option>)
                    }
                </select>
            </div>
            <div className="form-group">
                <label>Estado</label>
                <select className="form-control" name="state" id="" value={values.type} onChange={handleInputChange}>
                    {
                        states.map((v, i) => <option key={i} value={v.value} >{translate(v.value)}</option>)
                    }
                </select>
            </div>
            <button className="btn btn-block btn-info">
                Guardar
            </button>
        </form>
    )
}