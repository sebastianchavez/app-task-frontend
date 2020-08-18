import React from 'react'
import translate from '../../servives/translate'

export default ({ tasks, onDelete, handleShow, openViewModal }) => {
    return (
        <table className="table table-hover">
            <thead className="table-primary">
                <tr>
                    <th scope="col">Taréa</th>
                    <th scope="col">Proyecto</th>
                    <th scope="col" className="text-center">Horas asignadas</th>
                    <th scope="col" className="text-center">Prioridad</th>
                    <th scope="col" className="text-center">Estado</th>
                    <th scope="col" className="text-center">Acción</th>
                </tr>
            </thead>
            <tbody>
                {
                    tasks.map(t => (
                        <tr key={t._id} className={`${t.state === 'finish' ? "table-secondary" : ""}`}>
                            <td>{t.name.substr(0, 40)}</td>
                            <td>{t.devId && t.devId.name ? t.devId.name.substr(0, 30) : ''}</td>
                            <td className="text-center">{t.resolutionHours ? t.resolutionHours : t.plannedHours} Hrs.</td>
                            <td className="text-center">{translate(t.priority)}</td>
                            <td className="text-center">{translate(t.state)}</td>
                            <td className="text-center">
                                <button className="btn btn-sm btn-outline-info m-1" onClick={() => openViewModal(t)}>
                                    <i className="material-icons">remove_red_eye</i>
                                </button>
                                <button className="btn btn-sm btn-outline-warning m-1" onClick={() => handleShow(t)}>
                                    <i className="material-icons">create</i>
                                </button>
                                <button className="btn btn-sm btn-outline-danger m-1" onClick={() => onDelete(t._id)}>
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