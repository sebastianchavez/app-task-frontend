import React from 'react'
import CONSTANTS from '../../constants/constants'

export default ({searchDev, setFilter, filter}) => {
    return (<header className="card">
        <div className="card-body">
            <form onSubmit={searchDev}>
                <div className="row">
                    <div className="col-md-3">
                        <label>Nombre</label>
                        <input type="text" className="form-control" name="name" id="" onChange={e => setFilter({ ...filter, name: e.target.value })} />
                    </div>
                    <div className="col-md-3">
                        <label>Tipo</label>
                        <select name="type" className="form-control" id="" onChange={e => setFilter({ ...filter, type: e.target.value })}>
                            <option value=""></option>
                            {CONSTANTS.TYPES.map((t, i) => <option key={i + '_type'} value={t.value}>{t.name}</option>)}
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label>Estado</label>
                        <select name="state" className="form-control" id="" onChange={e => setFilter({ ...filter, state: e.target.value })}>
                            <option value=""></option>
                            {CONSTANTS.STATES.map((s, i) => <option key={i + '_state'} value={s.value}>{s.name}</option>)}
                        </select>
                    </div>
                    <div className="col-md-3">
                        <button type="submit" className="btn btn-success btn-block" style={{marginTop: 30}}>
                            Buscar
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </header>)
}