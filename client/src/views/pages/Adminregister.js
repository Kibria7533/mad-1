import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
import Header from './blog/Header';



class Adminregister extends Component {
  constructor() {
    super();
    this.state = {
      fullname: "",
      EducationLevel:"",
      eductioninstitute:"",
      DepertmentName:"",
      Address:"",
      Mobile:"",
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
    await axios.post('http://localhost:5000/api/users/register-admin', {
      "fullname": this.state.fullname,
      "EducationLevel":this.state.EducationLevel,
      "eductioninstitute":this.state.eductioninstitute,
      "DepertmentName":this.state.DepertmentName,
      "Address":this.state.Address,
      "Mobile":this.state.Mobile,
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
    // console.log(err.response.data.message.msg)
   

    })
   
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
                    <h1>Writter Register</h1>
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
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Education Level" name="EducationLevel" onChange={this.savetostate} value={this.state.EducationLevel} autoComplete="EducationLevel" />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Eduction Institute" name="eductioninstitute" onChange={this.savetostate} value={this.state.eductioninstitute} autoComplete="eductioninstitute" />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Depertment Name" name="DepertmentName" onChange={this.savetostate} value={this.state.DepertmentName} autoComplete="DepertmentName" />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Address" name="Address" onChange={this.savetostate} value={this.state.Address} autoComplete="Address" />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Mobile" name="Mobile" onChange={this.savetostate} value={this.state.Mobile} autoComplete="Mobile" />
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
                      <CInput type="text" placeholder="User name" name="username" onChange={this.savetostate} value={this.state.username} autoComplete="username" />
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
                  </CForm>
                </CCardBody>
               
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </div>
      </div>
    )
  }

}

export default Adminregister
