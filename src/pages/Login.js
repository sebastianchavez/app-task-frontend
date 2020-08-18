//******** React ********/
import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

//******** Services ********/
import { put, accessToken } from '../servives/api'
import { log, error } from '../servives/logger'
import { toast } from '../servives/messages'

//******** Components ********/
import LoginForm from '../components/Forms/LoginForm'
import Header from '../components/Headers/LoginHeader'
import DescriptionSection from '../components/Sections/LoginDescriptionSection'
import DefaultFooter from '../components/Footers/DefaultFooter'

export default ({userAuth, setUserAuth}) => {
    
    const [btnLoad, setBtnLoad] = useState(false)
    const [goRegister, setGoRegister] = useState(false)

    const login = async value => {
        try {
            setBtnLoad(true)
            console.log(value)
            let response = await put(`users/login`, value)
            await localStorage.setItem('currentUser', JSON.stringify(response.data))
            log('Login', 'login', {info: 'Success login', response})
            await localStorage.setItem('isLogin',true)
            toast('Usuario autenticado')
            // accessToken = response.data.accessToken
            setBtnLoad(false)
            setUserAuth(true)
        } catch (e) {
            setBtnLoad(false)
            let msg = e.response && e.response.data && e.response.data.message ? e.response.data.message : 'Problemas al ingresar'
            toast(msg, 'error')
            error('Login', 'login', {info: 'Catch error', error: e})
        }
    }

    const goToRegister = () => {
        setGoRegister(true)
    }
    if(goRegister){
        return <Redirect to="/register" />
    }
    if(userAuth){
        return <Redirect to="/" />
    }
    return (
        <>
        <Header>
            <div className="container">
                    <LoginForm {...{login, btnLoad, goToRegister}} />
            </div>
        </Header>
        <DescriptionSection />
        <DefaultFooter />
        </>
    )
}