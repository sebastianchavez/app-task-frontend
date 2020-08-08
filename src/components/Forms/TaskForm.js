import React, { useState, useEffect } from 'react'
import { db } from '../../firebase'

export default (props) => {

    const initialStateValues = {
        name:'',
        description: '',
        hours: 0,
        priority: 'low',
        state: 'created',
        devs: null,
        created: Date.now()
    }

    const [values, setValues] = useState({...initialStateValues})

    useEffect(() => {
        if(props.currentId === ''){
            setValues({...initialStateValues})
        } else {
            getTaskById(props.currentId)
            console.log('edit')
        }
    },[props.currentId])

    
    const handleSubmit = e => {
        e.preventDefault()
        props.addOrEdit(values)
        setValues({...initialStateValues})
    } 

    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({...values, [name]: value})
    }

    const getTaskById = async id => {
        try {
            const doc = await db.collection('tasks').doc(id).get()
            setValues(doc.data())
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <form className="card card-body" onSubmit={handleSubmit}>
            <div className="form-group">
                <input type="text" name="name" className="form-control" placeholder="Nombre" onChange={handleInputChange} value={values.name}/>
            </div>
            <div className="form-group">
                <textarea name="description" className="form-control" placeholder="Descripcion" rows="3" onChange={handleInputChange} value={values.description}></textarea>
            </div>
            <div className="form-group">
                <input placeholder="Horas asignadas" className="form-control" type="number" min="0" name="hours" id="" onChange={handleInputChange} value={values.hours}/>
            </div>
            <div className="form-group">
                <label>Desarrollos</label>
                <select className="form-control" name="dev" onChange={handleInputChange} value={values.dev}>
                    {
                        props.devs ?
                        props.devs.map((d, i) => <option key={i} value={d.name}>{d.name}</option>)
                        : null
                    }
                </select>
            </div>
            <div className="form-group">
                <label>Prioridad</label>
                <select className="form-control" placeholder="prioridad" name="priority" onChange={handleInputChange} value={values.priority}>
                    <option value="low">Baja</option>
                    <option value="medium">Media</option>
                    <option value="high">Alta</option>
                    <option value="veryHigh">Muy alta</option>
                </select>
            </div>
            <button className="btn btn-block btn-info">
                {props.currentId === '' ? 'Guardar' : 'Actualizar'}
            </button>
            {
                props.currentId ?
                <button className="btn btn-block btn-danger" onClick={() => setValues({...initialStateValues, cancel: true})}>
                    Cancelar
                </button>
                : null
            }
        </form>
    )
}