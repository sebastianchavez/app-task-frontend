//******** React ********/
import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

//******** Services ********/
import { post } from '../servives/api'
import { log, error } from '../servives/logger'
import { toast } from '../servives/messages'

//******** Components ********/
import RegisterForm from '../components/Forms/RegisterForm'

export default () => {

    const [btnLoad, setBtnLoad] = useState(false)
    const [goLogin, setGoLogin] = useState(false)

    const register = async value => {
        try {
            setBtnLoad(true)
            let response = await post('users/register', value)
            toast('Usuario registrado')
            log('Register', 'register', {info: 'Succes', response})
            setBtnLoad(false)
            setGoLogin(true)
        } catch (e) {
            let msg = e.response && e.response.data && e.response.data.message ? e.response.data.message : 'Problemas al registrar, intente más tarde'
            toast(msg, 'error')
            error('Register', 'register', {info: 'Catch error', error: e})
            setBtnLoad(false)
        }
    }

    const goToLogin = () => {
        setGoLogin(true)
    }

    if(goLogin){
        return <Redirect to="/login" />
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-5 mx-auto mt-5">
                 <RegisterForm {...{goToLogin, btnLoad}} registerUser={register} />
                </div>
            </div>
        </div>
    )
}