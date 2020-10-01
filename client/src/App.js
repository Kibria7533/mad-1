
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './scss/style.scss';

import Logout from './views/pages/Logout';
import ProtectedRoute from './ProtectedRoute';
import Adminregister from './views/pages/Adminregister';
import Adminlogin from './views/pages/Adminlogin';
import Superadminlogin from './views/pages/Superadminlogin';
import CheckandActive from './views/pages/CheckandActive';
import RecoverOrActive from './views/pages/RecoverOrActive';
import Checkrecover from './views/pages/Checkrecover';
import Changepassword from './views/pages/Changepassword';
import Roothome from './views/pages/blog/home/Roothome';
import Header from './views/pages/blog/Header';
import Body from './views/pages/blog/Body';
import WritterDashboard from './views/pages/WritterDashboard';
import Login from './views/pages/login/Login';
import Register from './views/pages/register/Register';
import Page404 from './views/pages/page404/Page404';
import Page500 from './views/pages/page500/Page500';
import Forms from './views/pages/Forms';
import PostsForms from './views/pages/PostsForms';
import SupperAdminDashboard from './views/pages/SupperAdminDashboard';
import Superadmintables from './views/pages/Superadmintables';
import Topicstable from './views/pages/Topicstable';
import Getallcomments from './views/pages/Getallcomments';
import Usersinfo from './views/pages/Usersinfo';
import writters from './views/pages/writters';
import writteraplicants from './views/pages/writteraplicants';
import Modals from './views/pages/MOdals';
import makequestion from './views/pages/makequestion';
import PostQuestion from './views/pages/PostQuestion';
import AllQuestions from './views/pages/AllQuestions';
import Homeinfo from './views/pages/Homeinfo';
import Teachersinfo from './views/pages/Teachersinfo';



class App extends Component {

  render() {
    return (
      <BrowserRouter>
        
        <Switch>
          <Route  path="/"exact  component={Roothome} />
          <Route  path="/userlogin" exact  component={Login } />
          <Route  path="/userregister" exact  component={Register} />
          <Route  path="/checkactivationlink"exact  component={CheckandActive} />
          <Route  path="/recoveroractive"exact  component={RecoverOrActive} />
          <Route  path="/checkrecover"exact  component={Checkrecover} />
          <Route  path="/forgotpassword/:token" exact component={Changepassword} />
          <Route  path="/404" exact  component={Page404} />
          <Route  path="/500" exact component={Page500} />
          <Route  path="/logout"exact  component={Logout} />
          <Route  path="/adminregister"exact  component={Adminregister} />
          <Route  path="/adminlogin"exact  component={Adminlogin} />
          <Route  path="/Superadminlogin"exact  component={Superadminlogin} />
+         <Route  path="/topic/:html" exact component={Body} />
          <Route  path="/writterdashboard"exact  component={WritterDashboard} />
          <Route  path="/superadminforms" exact component={Forms} />
          <Route  path="/writerforms" exact component={PostsForms} />
          <Route  path="/SupperAdminDashboard" exact component={SupperAdminDashboard} />
          <Route  path="/Supperadmintables" exact component={Superadmintables} />
          <Route  path="/Topicstable" exact component={Topicstable} />
          <Route  path="/getcomment" exact component={Getallcomments} />
          <Route  path="/usersinfo" exact component={Usersinfo} />
          <Route  path="/writter" exact component={writters} />
          <Route  path="/writteraplicant" exact component={writteraplicants} />
          <Route  path="/modal" exact component={Modals} />
          <Route  path="/makequestion"exact  component={makequestion} />
          <Route path="/PostQuestion" exact component={PostQuestion}/>
          <Route path="/AllQuestion" exact component={AllQuestions}/>
          <Route path="/homeinfo" exact component={Homeinfo}/>
          <Route path="/teachers" exact component={Teachersinfo}/>
        </Switch>

      </BrowserRouter>
    );
  }
}

export default App;
