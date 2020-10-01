import React, { Component } from 'react'
import axios from 'axios';
import {
  CButton,
  CCol,
  CContainer,
  CInput,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CForm,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

class RecoverOrActive extends Component {
    constructor(){
        super();
        this.state={
            email:"",
        }
    }
    onchange=(e)=>{
        this.setState({email:e.target.value});
    }
    sub=async (e)=>{
        e.preventDefault();
        await axios.post('http://localhost:5000/api/users/forgotpassordorusername',this.state,{
            headers:{
              'Accept':'application/json',
              'Content-Type':'application/json'
            }
          }).then(data=>{
            this.props.history.push("/checkrecover");
          })

    }
render(){
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="6">
            <span className="clearfix">
              <h1 className="float-left display-3 mr-4">Forgot Your Username?.Or want to reset your password?</h1>
              <h2 className="pt-3">Or forgot to activate?</h2>
              <p className="text-muted float-left">Please enter your gmail to activate and reset your password</p>
            </span>
            < CForm onSubmit={this.sub}>
            <CInputGroup className="input-prepend">
              <CInputGroupPrepend>
                <CInputGroupText>
                  <CIcon name="cil-magnifying-glass" />
                </CInputGroupText>
              </CInputGroupPrepend>
              <CInput size="16" type="text" name="email" onChange={this.onchange}value={this.state.email} placeholder="Recovery gmail" />
              <CInputGroupAppend>
                <CButton color="info" type="submit">Recover</CButton>
              </CInputGroupAppend>
            </CInputGroup>
            </CForm>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}
}

export default RecoverOrActive;
