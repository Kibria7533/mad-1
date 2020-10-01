import axios from 'axios';
import React, { Component } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
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

class Changepassword extends Component
 {
  constructor(){
    super();
    this.state={
        password:"",
        password_confirm:""
    
    }
  }
savetostate=async (data)=>{
  const name=data.target.name;
  const value=data.target.value;
    this.setState({[name]:value});
}
formsubmit=async (data)=>{
  data.preventDefault();
  await axios.post(`http://localhost:5000/api/users/forgotpassword/forms/${this.props.match.params.token}`,this.state,{
    headers:{
      'Accept':'application/json',
      'Content-Type':'application/json'
    }
  }).then(data=>{
    
    this.props.history.push("/");
  })
}
   render(){
    return (
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="8">
             
                <CCard className="p-4">
                  <CCardBody>
                    <CForm onSubmit={this.formsubmit}>
                      <h1>Change Your password</h1>
                      <p className="text-muted">Please give a secure password</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-user" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="password" placeholder="New password"name="password" onChange={this.savetostate} value={this.state.password}/>
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput type="password" name="password_confirm" onChange={this.savetostate} value={this.state.password_confirm} placeholder="Repete Your password"  />
                      </CInputGroup>
                      <CRow>
                        <CCol xs="6">
                          <CButton color="primary" type="submit"className="px-4">Change password</CButton>
                        </CCol>

                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    )
   }
  
}
export default Changepassword;
