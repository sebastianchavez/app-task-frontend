import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import CONSTANTS from '../../constants/constants'

export default ({ devs, data, onHide, addTask, editTask }) => {

    const required = "Este campo es requerido";

    const initialStateValues = {
        name: '',
        description: '',
        plannedHours: 0,
        priority: 'low',
        state: 'created',
        devId: devs[0]._id ? devs[0]._id : null,
        comentary: ''
    }

    const [values, setValues] = useState({...initialStateValues})

    useEffect(() => {
        setValues({...initialStateValues})
        setValuesForm(data)
    },[])

    
    const onSubmit = data => {
        console.log('VALUES:', values)
        if(!values._id){
            addTask(values)
        } else {
            editTask(values)
        }
        onHide()
        setValues({...initialStateValues})
    } 

    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({...values, [name]: value})
    }

    const setValuesForm = data => {
        if(data.action && data.action === 'edit'){
            setValues({...data, devId: data.devId._id})
        }
    }

    const { register, handleSubmit, errors } = useForm();

    const errorMessage = error => {
        return <div className="invalid-feedback d-block">{error}</div>
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <input type="text" name="name" className="form-control" 
                placeholder="Nombre de tarea" ref={register({ required: true })} onChange={handleInputChange} value={values.name}/>
                    {errors.name && errors.name.type === "required" &&
                    errorMessage(required)}
            </div>
            <div className="form-group">
                <textarea name="description" className="form-control" 
                placeholder="Descripcion" rows="3" ref={register({ required: true })} onChange={handleInputChange} value={values.description}></textarea>
                {errors.description && errors.description.type === "required" &&
                    errorMessage(required)}
            </div>
            <div className="form-group">
                <input placeholder="Horas asignadas" className="form-control" type="number" 
                min="0" name="plannedHours" id="" ref={register({ required: true, min: 1 })} value={values.plannedHours} onChange={handleInputChange} />
                {errors.plannedHours && errors.plannedHours.type === "required" &&
                    errorMessage(required)}
                {errors.plannedHours && errors.plannedHours.type === "min" &&
                    errorMessage('El mínimo de horas permitidas es 1')}
            </div>
            <div className="form-group">
                <label>Desarrollos</label>
                <select className="form-control" name="devId" onChange={handleInputChange} value={values.devId}>
                    {
                        devs ?
                        devs.map((d, i) => <option key={i} value={d._id}>{d.name}</option>)
                        : null
                    }
                </select>
            </div>
            {
            data.action === 'edit' ? <>
                <div className="form-group">
                    <label>Estado</label>
                    <select className="form-control" name="state" onChange={handleInputChange} value={values.state}>
                        {CONSTANTS.STATES.map((s, i) => <option key={i+'_state'} value={s.value}>{s.name}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label>Comentario</label>
                    <textarea className="form-control" name="comentary" cols="30" rows="3" onChange={handleInputChange} value={values.comentary}></textarea>
                </div>
                </>
                : null
            }
            <div className="form-group">
                <label>Prioridad</label>
                <select className="form-control" placeholder="prioridad" name="priority" onChange={handleInputChange} value={values.priority}>
                    {CONSTANTS.PRIORITIES.map((p, i) => <option key={i+'_priority'} value={p.value}>{p.name}</option>)}
                </select>
            </div>
            <button type="submit" className="btn btn-block btn-info">
                {data && data.action === 'new' ? 'Guardar' : 'Actualizar'}
            </button>
        </form>
    )
}