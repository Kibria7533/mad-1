import React, { Component } from 'react';
import Homeslider from './Home.slider';
import Homecourse from './Home.course';
import Hometotalcourse from './Home.totalcourse';
import Homecontact from './Home.contact';
import Homefooter from './Home.footer';
import Hometeacher from './Home.teacher';
import Header from '../Header';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import '../../blog/blog.css'
import Logout from '../../../pages/Logout';
// import ProtectedRoute from './ProtectedRoute';
import Adminregister from '../../../pages/Adminregister';
import Adminlogin from '../../../pages/Adminlogin';
import Superadminlogin from '../../../pages/Superadminlogin';
import CheckandActive from '../../../pages/CheckandActive';
import RecoverOrActive from '../../../pages/RecoverOrActive';
import Checkrecover from '../../../pages/Checkrecover';
import Changepassword from '../../../pages/Changepassword';
import Dashboard from '../../WritterDashboard';
import Login from '../../../pages/login/Login';
import Register from '../../../pages/register/Register';
import Page404 from '../../../pages/page404/Page404';
import Page500 from '../../../pages/page500/Page500';
import Body from '../Body';

class Roothome extends Component {
    constructor(props){
            super()
    }
    render() {
        return (
           
            <div>
                 
                 <Header/>
                <Homeslider/>
                <Homecourse/>
                <Hometeacher/>
                <Hometotalcourse/>
                <Homecontact/>
                <Homefooter/>
        
            </div>
           
        );
    }
}

export default Roothome;