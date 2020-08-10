import React from 'react'
import translate from '../../servives/translate'

export default ({data}) => {

    return (<div className="container-fluid">
        <label>Nombre:</label>
        <h5>{data.name}</h5>
        <hr />
        <label>Descripción:</label>
        <p>{data.description}</p>
        <hr />
        <label>Horas:</label>
        <h5>{data.resolutionHours ? data.resolutionHours : data.plannedHours} hrs.</h5>
        <hr />
        <label>Prioridad:</label>
        <h5>{translate(data.priority)}</h5>
        <hr />
        <label>Desarrollo:</label>
        <h5>{data.devId && data.devId.name ? data.devId.name : ''}</h5>
        <hr />
        <label>Estado:</label>
        <h5>{translate(data.state)}</h5>
        {
            data.comentary && data.comentary !== '' ?
            <>
            <hr/>
            <label>Comentario:</label>
            <p>{data.comentary}</p>
            </> : null
        }
    </div>)
}