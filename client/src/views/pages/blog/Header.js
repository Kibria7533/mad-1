import React, { Component } from 'react';
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';
import Login from '../login/Login';
import Register from '../register/Register';
import RecoverOrActive from '../RecoverOrActive';
import Changepassword from '../Changepassword';
import CheckandActive from '../CheckandActive';
import Checkrecover from '../Checkrecover';
import Logout from '../Logout';
import Adminregister from '../Adminregister';
import adminlogin from '../Adminlogin';
import Superadminlogin from '../Superadminlogin';
import Body from './Body';
import Roothome from './home/Roothome';
import axios from 'axios';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      "menus": [],
      "menuwithsub": [],
      "menuwithmega": []
    }
  }
  async componentDidMount() {
    await axios.get(`http://localhost:5000/allmenus`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(data => {
      if (data.data.length)
        this.setState({ menus: data.data[0].menus, menuwithsub: data.data[0].menuwithsub, menuwithmega: data.data[0].menuwithmega })


    })
  }
  render() {



    return (

      <div className="row sticky-top">
        <div className="col-lg-12">
          <div className="mynav ">
            <div className="subnav">
              <button className="subnavbtn"><NavLink to="/">Home</NavLink> </button>
            </div>
           
            {this.state.menus.map((data, index) => {
              return (
                <div className="subnav" key={index}>
                  <button className="subnavbtn" ><NavLink to={"/topic/" + data}> {data} </NavLink> </button>
                </div>
              )
            })}

            {this.state.menuwithsub.map((data, index) => {
              return (
                <div className="subnav" key={index}>
                  <button className="subnavbtn"> {data.name} <i className="fa fa-caret-down"></i> </button>
                  <div className="subnav-content">
                    {data.submenus.map((subdata, index) => {
                      return (
                        <NavLink to={"/topic/" + subdata} data={subdata} key={index}>{subdata}</NavLink>
                      )

                    })}


                  </div>
                </div>
              )
            })}


<div className="mymegamenu" >
              <button className="dropbtn"><NavLink to="/css">Cse_Study<i className="fa fa-caret-down"></i></NavLink>
              </button>

              <div className="mymegamenu-content">
                <div className="row">
                  <div className="column">
                    <h3>Robotics</h3>
                    <a href="topic/Raspberrypy">Raspberry py</a>
                    <a href="topic/Aurduno">Aurduno</a>
                    <a href="topic/Humanoid">Humanoid</a>
                  </div>
                  <div className="column">
                    <h3>Networking</h3>
                    <a href="topic/Theory">Theory</a>
                    <a href="topic/Cisco">Cisco</a>
                    <a href="topic/Practicals">Practicals</a>
                  </div>
                  <div className="column">
                    <h3>Others</h3>
                    <a href="topic/Algorithoms">Algorithoms</a>
                    <a href="topic/Autometa">Autometa</a>
                    <a href="topic/codecheflebel3">Computer Archetectur</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mymegamenu" >
              <button className="dropbtn"><NavLink to="/css">Programming-Q<i className="fa fa-caret-down"></i></NavLink>
              </button>

              <div className="mymegamenu-content">
                <div className="row">
                  <div className="column">
                    <h3>UVA</h3>
                    <a href="topic/ulebel1">Level-1</a>
                    <a href="topic/ulebel2">Level-2</a>
                    <a href="topic/ulebel3">Level-3</a>
                  </div>
                  <div className="column">
                    <h3>Codeforces</h3>
                    <a href="topic/Codeforceslebel1">Level-1</a>
                    <a href="topic/Codeforceslebel2">Level-2</a>
                    <a href="topic/Codeforceslebel3">Level-3</a>
                  </div>
                  <div className="column">
                    <h3>Codecheaf</h3>
                    <a href="topic/codecheflebel1">Level-1</a>
                    <a href="topic/codecheflebel2">Level-2</a>
                    <a href="topic/codecheflebel3">Level-3</a>
                  </div>
                </div>
              </div>
            </div>



            <div className="subnav">
              <button className="subnavbtn"><NavLink to="/makequestion">Make Question</NavLink> </button>
            </div>
            <div className="subnav">
              <button className="subnavbtn"><a href="https://kb-quiz.herokuapp.com/" target="_blank">Play Quiz</a></button>
            </div>
            

            {/* <div className="subnav">
              <button className="subnavbtn"><NavLink  to="/SupperAdminDashboard">Supper Admin</NavLink> </button>
            </div> */}
           

           <div className="subnav">
              <button className="subnavbtn " id="dropdownMenu2" data-toggle="dropdown"><NavLink to="/"> <i className="fa fa-caret-down"></i></NavLink> </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
    <button class="dropdown-item" type="button"><NavLink  to="/userlogin">Uer Login</NavLink></button>
    <button class="dropdown-item" type="button"><NavLink  to="/userregister">User Register</NavLink></button>
    <button class="dropdown-item" type="button"><NavLink  to="/adminregister">Become Writter?</NavLink></button>
    <button class="dropdown-item" type="button"><NavLink  to="/adminlogin">Writter Login</NavLink></button>
  </div>
            </div>

 
          </div>

        </div>
      </div>



    );
  }
}

export default Header;