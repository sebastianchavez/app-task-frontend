import React from 'react'
import { Link } from 'react-router-dom'

export default () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="collapse navbar-collapse" id="navbarColor03">
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
            </div>
        </nav>
    )
}