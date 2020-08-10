import React from 'react'
import translate from '../../servives/translate'
import Swal from 'sweetalert2'

export default ({ devs, onDelete, onEdit }) => {

    const confirmDelete = id => {
        // Swal.fire({t}).then(res => {

        // })
    }

    return (
        <div className="card">
            <div className="card-body">
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
                                <tr key={d._id}>
                                    <td>{d.name.substr(0, 20)}</td>
                                    <td>{d.type ? translate(d.type.substr(0, 30)) : ''}</td>
                                    <td className="text-center">{translate(d.state)}</td>
                                    <td>
                                    <button className="btn btn-sm btn-outline-warning m-1" onClick={() => onEdit(d)}>
                                            <i className="material-icons">create</i>
                                        </button>
                                        <button className="btn btn-sm btn-danger m-1" onClick={() => onDelete(d._id)}>
                                            <i className="material-icons">close</i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

            </div>
        </div>
    )
}