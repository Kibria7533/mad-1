import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import axios from 'axios';
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CCollapse,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFade,
  CForm,
  CFormGroup,
  CFormText,
  CValidFeedback,
  CInvalidFeedback,
  CTextarea,
  CInput,
  CInputFile,
  CInputCheckbox,
  CInputRadio,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupPrepend,
  CDropdown,
  CInputGroupText,
  CLabel,
  CSelect,
  CRow,
  CSwitch
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

class makequestion extends Component {
  constructor(){
    super()
    this.state={
      class:"",
      dept:"",
      sub:"",
      ch:"",
      type:"",
      number:"",
      data:[]
    }
  }
 
  setclass=async(data)=>{
    this.setState({class:data.target.value})
  }
  setdept=async(data)=>{
    this.setState({dept:data.target.value})
  }
  setsub=async(data)=>{
    this.setState({sub:data.target.value})
  }
  setch=async(data)=>{
    this.setState({ch:data.target.value})
  }
  settype=async(data)=>{
    this.setState({type:data.target.value})
  }
  setnumber=async(data)=>{
    this.setState({number:data.target.value})
  }
  getquestions=async(e)=>{
    e.preventDefault();
    await axios.post(`http://localhost:5000/getallquestionsbynumber`,{
      "classname":this.state.class,
    "dept":this.state.dept,
    "sub":this.state.sub,
    "ch":this.state.ch,
    "Type":this.state.type,
    "number":this.state.number},{
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      }
    }).then(data=>{
      this.setState({
        class: "0",
        dept: "0",
        sub: "0",
        ch: "0",
        type: "0",
        number:"0"
      })
      if(data.data.length)
      this.setState({data:data.data});
      else
      this.setState({data:[]});
      console.log(data.data);
    })
  }
  render() {

    return (

      <div className="container-fluid">

        <div className="row">
          <div className="col-lg-12 d-inline-flex justify-content-center navbar portfolio ">
            <ul id="portfolio-flters nav-item">
              <li className="filter-active nav-link d-inline-flex">To make a question please select all Criteria</li>

             
             
            </ul>
          </div>
        </div>
        <Link to="/">Back to User Home</Link>

        <CRow>
        
            <CCol xs="12" md="12">
              <CCard>
              
                <CCardBody>
                  <CFormGroup row>
                  <CCol xs="12" md="2">
                        Sellect className:
                      <CSelect custom name="class" value={this.state.class} id="select"  onChange={this.setclass}>
                        <option value="0">Please select class</option>
                        <option value="1" >Class One</option>
                        <option value="2" >Class Two</option>
                        <option value="3" >Class Three</option>
                        <option value="4" >Class Four</option>
                        <option value="5" >Class Five</option>
                        <option value="6" >Class Six</option>
                        <option value="7" >Class Seven</option>
                        <option value="8" >Class Eight</option>
                        <option value="9" >Class Nine</option>
                        <option value="10" >Class Ten</option>
                        <option value="11" >Class Eleven</option>
                        <option value="12" >Class Twelve</option>
                        
                      </CSelect>
                    </CCol>
                   

                      <CCol xs="12" md="2">
                      
                      Sellect Section:
                        <CSelect custom name="dept" id="select" value={this.state.dept} onChange={this.setdept} >
                          <option value="0">Please select Section</option>
                          

                              <option value="science">Science</option>
                              <option value="arts">Arts</option>
                              <option value="commerce">Commerce</option>
                              <option value="N/A">Not Applicable</option>


                        </CSelect>
                      </CCol>
                     
                  

                      <CCol xs="12" md="2">
                      Sellect Subject:
                        <CSelect custom name="sub" value={this.state.sub}id="select" onChange={this.setsub} >
                          <option value="0">Please select subject</option>
                         
                          <option value="English">English Gramer</option>
                          <option value="Bangla">Bangla-ssc</option>
                          <option value="Physics">Physics</option>
                          <option value="Mathematics">Mathematics</option>
                          <option value="Chemistry">Chemistry</option>
                          <option value="Biology">Biology</option>
                          <option value="Sociolgy">Sociolgy</option>
                          <option value="English-2">English-2</option>
                          <option value="English-3">English-3</option>
                          <option value="English-4">English-4</option>
                          <option value="English-5">English-5</option>
                          <option value="English-6">English-6</option>
                          <option value="English-7">English-7</option>
                          <option value="English-8">English-8</option>
                          <option value="English-9">English-9</option>
                          <option value="English-10">English-10</option>

                         



                        </CSelect>
                       
                      
                      </CCol>
                     
                  

                      <CCol xs="12" md="2">
                       Please select Chapter number
                        <CSelect custom name="ch" id="select" value={this.state.ch}  onChange={this.setch}>
                          <option value="0">Chapter number</option>
                        
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                          <option value="11">11</option>
                          <option value="12">12</option>
                          <option value="13">13</option>
                          <option value="14">14</option>
                          <option value="15">15</option>
                          <option value="16">16</option>
                        


                        </CSelect>
                         
                      </CCol>
                      <CCol xs="12" md="2">
                       Please Select Question Type:
                       <CSelect custom name="type" id="select" value={this.state.type}  onChange={this.settype}>
                         <option value="0">Please select Type</option>
                       
                          <option value="MCQ">MCQ</option>
                          <option value="CQ">CQ</option>
                       


                       </CSelect>
                        
                     </CCol>
                     <CCol xs="12" md="2">
                      select Number of Question:
                       <CSelect custom name="number" value={this.state.number} onChange={this.setnumber} id="select" >
                         <option value="0">Please select Number</option>
                       
                         <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                          <option value="11">11</option>
                          <option value="12">12</option>
                          <option value="13">13</option>
                          <option value="14">14</option>
                          <option value="15">15</option>
                          <option value="16">16</option>
                       


                       </CSelect>
                        
                     </CCol>
                    
                  </CFormGroup>
                </CCardBody>
              </CCard>
            </CCol> 
        </CRow>
<CRow>
    <CCol>
    <div className="d-flex justify-content-end">
  <div className="p-2 my-2">   <CButton type="button"  size="sm" onClick={this.getquestions} color="primary"><CIcon name="cil-scrubber" /> Submit</CButton></div>
</div>
    </CCol>
</CRow>
<CRow>
    <CCol>
      
        
    <div className="d-flex justify-content-center">
  <div className="p-2">Your Questions</div>
</div>
    <div className="d-flex justify-content-start">
  <div className="p-2">Download</div>
</div>
   <CCard>
   {this.state.data.map((q,index)=>{
  return(
    <div key={index} >
     {q.img?<img src={`/uploads/${q.img}`} alt="image" size={{"width":"100px","heigth":"100px"}}/>:""}
  <CCardBody>{q.question}</CCardBody>

    </div>
  )
})}
       
      
      
   </CCard>
   <div className="d-flex justify-content-center">
  <div className="p-2">Your Answer</div>
</div>
   <CCard>
   {this.state.data.map((q,index)=>{
  return(
    <div key={index} >
    
  <CCardBody>{q.answer}</CCardBody>

    </div>
  )
})}
       
       
      
   </CCard>
    </CCol>
</CRow>

      </div>
    );
  }
}

export default makequestion;