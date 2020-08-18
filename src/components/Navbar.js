import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'

export default ({userAuth, setUserAuth}) => {

    const [show, setShow] = useState(false)

    const logOut = async () => {
        await localStorage.clear()
        setUserAuth(false)
    }

    if(!userAuth){
        return <Redirect to="/login" />
    }

    return (
        <>
        {
            userAuth ?
            <div style={{ marginBottom: 100 }}>
                <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
                    <a className="navbar-brand" href="#">Simple Tasks App</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarColor01">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">
                                    Tareas
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/devs">
                                    Desarrollos
                                </Link>
                            </li>                           
                        </ul>
                        <ul className="navbar-nav ml-auto mr-5">
                        <li onClick={() => setShow(!show)} className={`mr-5 pr-4 nav-item dropdown ${show ? 'show' : ''}`}>
                                <a className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">Perfil</a>
                                <div className={`dropdown-menu ${show ? 'show' : ''}`}>
                                    <a className="dropdown-item" >Mi perfil</a>
                                    <a className="dropdown-item pointer" onClick={logOut}>Cerrar sesion</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div> :
            null
        }
        </>
    )
}