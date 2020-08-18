import React, { useState } from 'react'
import { useForm } from "react-hook-form"


export default ({goToLogin, registerUser, btnLoad}) => {

    const required = "Este campo es requerido"
    const email = "Debe ingresar un email válido"
    const confirmPwd = 'La contraseña debe ser la misma'
    const minLength = 'Mínimo 6 caracteres'
    
    const [pwd, setPwd] = useState('')

    const handleClick = values => {
        registerUser({...values, ['type']: 'user'})
    }

    const { register, handleSubmit, errors } = useForm()

    const errorMessage = error => {
        return <div className="invalid-feedback d-block">{error}</div>
    }

    return (
        <form className="card" onSubmit={handleSubmit(handleClick)}>
            <div className="card-header text-center">
                <h3>Registro</h3>
            </div>
            <div className="card-body">
                <div className="form-group">
                    <input type="text" placeholder="Email" className="form-control" name="email"
                    ref={register({ required: true, pattern: /^\S+@\S+$/i })}/>
                    {errors.email && errors.email.type === "required" &&
                        errorMessage(required)}
                    {errors.email && errors.email.type === "pattern" &&
                        errorMessage(email)}
                </div>
                <div className="form-group">
                    <input type="password" placeholder="Contraseña" className="form-control" name="password"
                    ref={register({ required: true, minLength: 6 })} onChange={e => setPwd(e.target.value)}/>
                    {errors.password && errors.password.type === "required" &&
                        errorMessage(required)}
                    {errors.password && errors.password.type === "minLength" &&
                        errorMessage(minLength)}
                </div>
                <div className="form-group">
                    <input type="password" placeholder="Repetir contraseña" className="form-control" name="confirmPassword"
                    ref={register({ required: true , validate: value => value === pwd })}/>
                    {errors.confirmPassword && errors.confirmPassword.type === "required" &&
                        errorMessage(required)}
                    {errors.confirmPassword && errors.confirmPassword.type === "validate" &&
                        errorMessage(confirmPwd)}
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-block btn-success" disabled={btnLoad}>Registrar</button>
                    <button className="btn btn-block btn-info mt-2" onClick={goToLogin}>Volver a Login</button>
                </div>
            </div>
        </form>
    )
}