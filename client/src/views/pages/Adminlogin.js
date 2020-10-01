import { Link } from 'react-router-dom';
import axios from 'axios';
import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Header from './blog/Header';

class adminlogin extends Component
 {
  constructor(){
    super();
    this.state={
      username:"",
      password:"",
      mesg:"",
    
    }
  }
  notify = () => toast.error(this.state.mesg);
savetostate=async (data)=>{
  const name=data.target.name;
  const value=data.target.value;
    this.setState({[name]:value});
}
formsubmit=async (data)=>{
  data.preventDefault();
  await axios.post('http://localhost:5000/api/users/login-admin', {
    "username": this.state.username,
    "password": this.state.password,
  },{
    headers:{
      'Accept':'application/json',
      'Content-Type':'application/json'
    }
  }).then(data=>{
    localStorage.setItem('auth',data.data);
    this.props.history.push("/");
  }).catch(err=>{
    this.setState({mesg:err.response.data.message})
    this.notify();
    console.log(err.response.data.message)
  })
}

   render(){
    return (
      <div>
        <Header/>
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="8">
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm onSubmit={this.formsubmit}>
                      <h1>Admin Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-user" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="text" placeholder="Username"name="username" onChange={this.savetostate} value={this.state.username}autoComplete="email" />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="password" name="password" onChange={this.savetostate} value={this.state.password} placeholder="Password" autoComplete="current-password" />
                      </CInputGroup>
                      <CRow>
                        <CCol xs="6">
                          <CButton color="primary" type="submit"className="px-4">Login</CButton>
                        </CCol>
                        <ToastContainer
                    position="top-right"
                    autoClose={15000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    />
                    {/* Same as */}
                    <ToastContainer />
                        <CCol xs="6" className="text-right">
                          <Link to="/recoveroractive"> 
                          <CButton color="link" className="px-0">Forgot password or Recover account?</CButton>
                          </Link>
                         
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
                <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CCardBody className="text-center">
                    <div>
                      <h2>Don't have a account?</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Link to="/adminregister">
                        <CButton color="primary" className="mt-3"  active tabIndex={-1}>Register Now!</CButton>
                      </Link>
                    </div>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
      </div>
    )
   }
  
}

export default adminlogin
