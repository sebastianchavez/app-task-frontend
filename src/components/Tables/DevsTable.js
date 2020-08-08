import React from 'react'
import translate from '../../servives/translate'

export default ({devs, onDelete}) => {
    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Acción</th>
                </tr>
            </thead>
            <tbody>
                {
                    devs.map(d => (
                        <tr key={d.id}>
                            <td>{d.name.substr(0, 20)}</td>
                            <td>{d.type ? translate(d.type.substr(0, 30)) : ''}</td>
                            <td className="text-center">{translate(d.state)}</td>
                            <td>
                                <button className="btn btn-sm btn-danger m-1" onClick={() => onDelete(d.id)}>
                                    <i className="material-icons">close</i>
                                </button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}