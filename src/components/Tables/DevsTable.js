import React from 'react'
import translate from '../../servives/translate'

export default ({ devs, onDelete, openEditModal, openViewModal }) => {

    return (
        <table className="table table-hover">
            <thead className="table-primary">
                <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col" className="text-center">Tipo</th>
                    <th scope="col" className="text-center">Estado</th>
                    <th scope="col" className="text-right">Acción</th>
                </tr>
            </thead>
            <tbody>
                {
                    devs.length > 0 ?
                    devs.map(d => (
                        <tr key={d.dev._id}>
                            <td>{d.dev.name.substr(0, 20)}</td>
                            <td className="text-center">{d.dev.type ? translate(d.dev.type.substr(0, 30)) : ''}</td>
                            <td className="text-center">{translate(d.dev.state)}</td>
                            <td className="text-right">
                                <button className="btn btn-sm btn-outline-info m-1" onClick={() => openViewModal(d.dev)}>
                                    <i className="material-icons">remove_red_eye</i>
                                </button>
                                <button className="btn btn-sm btn-outline-warning m-1" onClick={() => openEditModal(d.dev)}>
                                    <i className="material-icons">create</i>
                                </button>
                                {
                                    d.count === 0 ?
                                    <button className="btn btn-sm btn-outline-danger m-1" onClick={() => onDelete(d.dev._id)}>
                                        <i className="material-icons">close</i>
                                    </button> :
                                    null
                                }
                            </td>
                        </tr>
                    )) : null
                }
            </tbody>
        </table>
    )
}