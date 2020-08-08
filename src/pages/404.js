import React from 'react'
import gif from '../assets/imgs/404.gif'

export default () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-8 offset-md-2 text-center">
                <h1>Página no encontrada</h1>
                <img src={gif} alt="" className="mt-4"/>
                </div>
            </div>
        </div>
    )
}