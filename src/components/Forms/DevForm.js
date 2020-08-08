import React, { useState } from 'react'
import translate from '../../servives/translate'

export default (props) => {

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
        { value: 'game' }
    ]

    const [values, setValues] = useState(initialValues)
    
    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({...values, [name]: value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        props.addDev(values)
        setValues({...initialValues})
    }

    return (
        <form className="card card-body" onSubmit={handleSubmit}>
            <div className="form-group">
                <input type="text" className="form-control" placeholder="Nombre" name="name" id="" value={values.name} onChange={handleInputChange}/>
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