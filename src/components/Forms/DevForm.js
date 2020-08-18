import React, { useState } from 'react'
import translate from '../../servives/translate'
import { useForm } from "react-hook-form"
import CONSTANTS from '../../constants/constants'

export default ({addDev, data}) => {

    const required = 'Este campo es requerido'

    const initialValues = {
        name:'',
        type:'web',
        state:'pending'
    }

    const [values, setValues] = useState({...initialValues, ...data})
    const { register, handleSubmit, errors } = useForm()
    
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
        <form onSubmit={handleSubmit(onSubmit)}>
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
                        CONSTANTS.TYPES.map((v, i) => <option key={i} value={v.value}>{translate(v.value)}</option>)
                    }
                </select>
            </div>
            <div className="form-group">
                <label>Estado</label>
                <select className="form-control" name="state" id="" value={values.type} onChange={handleInputChange}>
                    {
                        CONSTANTS.STATES.map((v, i) => <option key={i} value={v.value} >{translate(v.value)}</option>)
                    }
                </select>
            </div>
            <button className="btn btn-block btn-success">
                Guardar
            </button>
        </form>
    )
}