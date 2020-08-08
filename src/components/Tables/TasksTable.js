import React from 'react'
import translate from '../../servives/translate'

export default ({ tasks, setCurrentId, onDelete, openModal }) => {
    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Taréa</th>
                    <th scope="col">Proyecto</th>
                    <th scope="col">Horas asignadas</th>
                    <th scope="col">Prioridad</th>
                    <th scope="col">Acción</th>
                </tr>
            </thead>
            <tbody>
                {
                    tasks.map(t => (
                        <tr key={t.id}>
                            <td>{t.name.substr(0, 20)}</td>
                            <td>{t.dev ? t.dev.substr(0, 30) : ''}</td>
                            <td className="text-center">{t.hours}</td>
                            <td className="text-center">{translate(t.priority)}</td>
                            <td>
                                <button className="btn btn-sm btn-success m-1" onClick={() => openModal(t)}>
                                    <i className="material-icons">remove_red_eye</i>
                                </button>
                                <button className="btn btn-sm btn-warning m-1" onClick={() => setCurrentId(t.id)}>
                                    <i className="material-icons">create</i>
                                </button>
                                <button className="btn btn-sm btn-danger m-1" onClick={() => onDelete(t.id)}>
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