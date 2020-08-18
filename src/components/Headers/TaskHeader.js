import React from 'react'
import CONSTANTS from '../../constants/constants'

export default ({searchTask, setFilter, filter, devs}) => {
    return (<header className="card">
        <div className="card-body">
            <form onSubmit={searchTask}>
                <div className="row">
                    <div className="col-md-3">
                        <label>Nombre</label>
                        <input type="text" className="form-control" name="name" id="" onChange={e => setFilter({ ...filter, name: e.target.value })} />
                    </div>
                    <div className="col-md-3">
                        <label>Estado</label>
                        <select name="state" className="form-control" id="" onChange={e => setFilter({ ...filter, state: e.target.value })}>
                            <option value=""></option>
                            {CONSTANTS.STATES.map((s, i) => <option key={i + '_state'} value={s.value}>{s.name}</option>)}
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label>Desarrollo</label>
                        <select name="dev" className="form-control" id="" onChange={e => setFilter({ ...filter, devId: e.target.value })}>
                            <option value=""></option>
                            {devs.map((d, i) => <option key={i + '_dev'} value={d.dev._id}>{d.dev.name}</option>)}
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label>Prioridad</label>
                        <select name="priority" className="form-control" id="" onChange={e => setFilter({ ...filter, priority: e.target.value })}>
                            <option value=""></option>
                            {CONSTANTS.PRIORITIES.map((p, i) => <option key={i + '_priority'} value={p.value}>{p.name}</option>)}
                        </select>
                    </div>
                    <div className="col-md-3">
                        <button type="submit" className="btn btn-success btn-block mt-4">
                            Buscar
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </header>)
}