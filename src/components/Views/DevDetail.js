import React from 'react'
import translate from '../../servives/translate'

export default ({data}) => {

    return (<div className="container-fluid">
        <label>Nombre:</label>
        <h5>{data.name}</h5>
        <hr />
        <label>Tipo:</label>
        <p>{translate(data.type)}</p>
        <hr />
        <label>Estado:</label>
        <h5>{translate(data.state)}</h5>
    </div>)
}