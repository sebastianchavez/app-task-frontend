import React from 'react'

export default ({setAuthUser}) => {

    const handleClick = e => {
        e.preventDefault()
        setAuthUser(true)
    }

    return (
        <div className="row pt-5">
            <div className="col-md-4 mx-auto">
                <div className="card">
                    <div className="card-header text-center">
                        <h3>Ingresar</h3>
                    </div>
                    <form className="card-body" onSubmit={handleClick}>
                        <div className="form-group">
                            <input type="text" name="" id="" placeholder="Email" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <input type="text" name="" id="" placeholder="Contraseña" className="form-control"/>
                        </div>
                        <button type="submit" className="btn btn-block btn-info">
                            Ingresar
                        </button>
                        <button type="button" className="btn btn-block btn-success">
                            Registrar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}