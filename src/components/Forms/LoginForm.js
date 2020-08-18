import React from 'react'
import { useForm } from "react-hook-form"


export default ({login, btnLoad, goToRegister}) => {


    const required = "Este campo es requerido"
    const email = "Debe ingresar un email válido"

    const handleClick = values => {
        login({...values, ['type']: 'user'})
    }

    const { register, handleSubmit, errors } = useForm()

    const errorMessage = error => {
        return <div className="invalid-feedback d-block">{error}</div>
    }

    return (
        <div className="row">
            <div className="col-md-8 text-dark mt-5">
                <h2># Simple Task App</h2>
            </div>
            <div className="col-md-4 ml-auto">
                <div className="card">
                    <div className="card-header text-center" style={{color: '#000'}}>
                        <h3>Ingresar</h3>
                    </div>
                    <form className="card-body" onSubmit={handleSubmit(handleClick)}>
                        <div className="form-group">
                            <input type="text" name="email" id="" placeholder="Email" className="form-control"
                            ref={register({ required: true, pattern: /^\S+@\S+$/i })}/>
                            {errors.email && errors.email.type === "required" &&
                                errorMessage(required)}
                            {errors.email && errors.email.type === "pattern" &&
                                errorMessage(email)}
                        </div>
                        <div className="form-group">
                            <input type="password" name="password" id="" placeholder="Contraseña" className="form-control"
                            ref={register({ required: true })}/>
                            {errors.password && errors.password.type === "required" &&
                                errorMessage(required)}
                        </div>
                        <button type="submit" disabled={btnLoad} className="btn btn-block btn-info">
                            Ingresar
                            {
                                btnLoad ? <div className="spinner-grow spinner-grow-sm ml-2"></div> : null
                            }
                        </button>
                        <button type="button" className="btn btn-block btn-success" onClick={() => goToRegister()}>
                            Registrar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}