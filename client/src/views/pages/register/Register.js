import React, { Component } from 'react';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
import { Redirect } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './fb.css';

import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
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
import Header from '../blog/Header';



class Register extends Component {
  constructor() {
    super();
    this.state = {
      fullname: "",
      email: "",
      username: "",
      password: "",
      password_confirmation: "",
      redirect: false,
      redirecttocheck: false,
      error:"",
    }

  }

   
  notify = () => toast.error(this.state.error);
  savetostate = async (data) => {
    const name = data.target.name;
    const value = data.target.value;
    this.setState({ [name]: value });
  }

  formsubmit = async (data) => {
    data.preventDefault();
    await axios.post('http://localhost:5000/api/users/register-user', {
      "fullname": this.state.fullname,
      "email": this.state.email,
      "username": this.state.username,
      "password": this.state.password,
      "password_confirmation": this.state.password_confirmation

    }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(re=>{
         
      this.setState({ redirecttocheck: true })

    }).catch(err=>{
      this.setState({error:err.response.data.message.msg})
      this.notify();
     console.log(err.response.data.message.msg)
   

    })
   
  }
  SresponseGoogle = (response) => {
    axios.post('http://localhost:5000/google', { tokenId: response.tokenId }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(data => {
      localStorage.setItem('auth', data.data);
      console.log(data.data);

    }).finally(()=> this.setState({ redirect: true }));

  }
  FresponseGoogle = (response) => {
    console.log(response);
  }
  responseFacebook =async (response) => {
    
    await axios.post('http://localhost:5000/facebook', { accessToken: response.accessToken,userId:response.userID }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(data => {
      localStorage.setItem('auth', data.data);
      console.log(data.data);

    }).finally(()=> this.setState({ redirect: true })); 
    
    
  }
  render() {
    if (this.state.redirect) {
      return (<Redirect to={{ pathname: '/' }} />)
    }
    if (this.state.redirecttocheck) {
      return (<Redirect to={{ pathname: '/checkactivationlink' }} />)
    }
    return (
      <div>
        <Header/>
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="9" lg="7" xl="6">
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <CForm onSubmit={this.formsubmit}>
                    <h1>User Register</h1>
                    <p className="text-muted">Create your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Fullname" name="fullname" onChange={this.savetostate} value={this.state.fullname} autoComplete="fullname" />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>@</CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="email" name="email" onChange={this.savetostate} value={this.state.email} placeholder="Email" autoComplete="email" />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Username" name="username" onChange={this.savetostate} value={this.state.username} autoComplete="username" />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" name="password" onChange={this.savetostate} value={this.state.password} placeholder="Password" autoComplete="new-password" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" name="password_confirmation" onChange={this.savetostate} value={this.state.password_confirmation} placeholder="Repeat password" autoComplete="new-password" />
                    </CInputGroup>
                    <CButton color="success" type="submit" block>Create Account</CButton>
                  </CForm>
                </CCardBody>
                <CCardFooter className="p-4">
                  <CRow>
                    <CCol xs="12" sm="6">

                      <GoogleLogin
                        clientId="255391627954-db7ql852ppnpie0iflmk23fhabuff7lv.apps.googleusercontent.com"
                        buttonText="google Login"
                        onSuccess={this.SresponseGoogle}
                        onFailure={this.FresponseGoogle}
                        cookiePolicy={'single_host_origin'}
                      />
                    </CCol>
                    <CCol xs="12" sm="6">

                    <FacebookLogin
                        appId="335565637562761"
                        autoLoad={false}
                        callback={this.responseFacebook}
                        cssClass="my-facebook-button-class"
                       
                        icon="fa-facebook"
                         />
                
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
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
                    </CCol>
                  </CRow>
                </CCardFooter>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </div>
      </div>
    )
  }

}

export default Register
