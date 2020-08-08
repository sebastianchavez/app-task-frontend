import React, { useEffect } from 'react'
import LoginForm from '../components/Forms/LoginForm'

export default (props) => {


    useEffect(() => {
        getAuthUser()
    },[])

    const getAuthUser = async () => {
        let isLogin = await localStorage.getItem('isLogin')
        if(isLogin){
            // props.setUserAuth(true)
        } else {
            // props.setUserAuth(false)
        }
    }

    const setAuthUser = async () => {
        try {
            await localStorage.setItem('isLogin',true)
            // props.setUserAuth(true)
        } catch (error) {
            
        }
    }

    return (
        <div className="bg-moonlit-asteroid">
            <div className="container">
                <LoginForm setAuthUser={setAuthUser} />
            </div>
        </div>
    )
}