import React from 'react'
import { Redirect } from 'react-router-dom'

class Logout extends React.Component {
    render() {

        localStorage.removeItem('auth');

        return (
            <Redirect to={{ pathname: '/login' }} />
        );
    }
}

export default Logout;