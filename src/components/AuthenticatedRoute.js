import React, { useState } from 'react'
import { Route, Redirect } from 'react-router-dom'

export default ({ component: C, appProps, ...rest }) => {
    
    const [isAuth, setIsAuth] = useState(false)

    const isLogin = async () => {
        
    }

    return (
      <Route
        {...rest}
        render={props =>
          appProps.isAuthenticated
            ? <C {...props} {...appProps} />
            : <Redirect
                to={`/login`}
              />}
      />
    );
  }
  