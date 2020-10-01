import React from 'react'
import { Redirect } from 'react-router-dom'

class ProtectedRoute extends React.Component {

    render() {
        const Component = this.props.component;
       // const token=localStorage.getItem('auth');
        let isAuthenticated=true;
        // if(!token)
        // isAuthenticated = false; 
        return isAuthenticated ? (
            <Component />
        ) : (
            <Redirect to={{ pathname: '/userlogin' }} />
        );
    }
}

export default ProtectedRoute;