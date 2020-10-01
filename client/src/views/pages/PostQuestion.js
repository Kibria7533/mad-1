import React from 'react';
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

class PostQuestion extends React.Component {

  constructor(props) {
    super();
    this.state = {
      file: null,
      class: "",
      dept: "",
      sub: "",
      ch: "",
      type: "",
      uddipok:"",
      question:"",
      answer:""
    };
  }
  setclass = async (data) => {
    this.setState({ class: data.target.value })
  }
  setdept = async (data) => {
    this.setState({ dept: data.target.value })
  }
  setsub = async (data) => {
    this.setState({ sub: data.target.value })
  }
  setch = async (data) => {
    this.setState({ ch: data.target.value })
  }
  settype = async (data) => {
    this.setState({ type: data.target.value })
  }
  setnumber = async (data) => {
    this.setState({ number: data.target.value })
  }
  onchangehandeler = (data) => {
    let names = data.target.name;
    this.setState({ [names]: data.target.value })
  }
  onFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('myImage', this.state.file);
    formData.append('class', this.state.class);
    formData.append('dept', this.state.dept);
    formData.append('sub', this.state.sub);
    formData.append('ch', this.state.ch);
    formData.append('type', this.state.type);
    formData.append('uddipok', this.state.uddipok);
    formData.append('question', this.state.question);
    formData.append('answer', this.state.answer);

    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
    axios.post("/upload", formData, config)
      .then((response) => {
        this.setState({
          class: "",
          dept: "",
          sub: "",
          ch: "",
          type: "",
          uddipok:"",
          question:"",
          answer: ""
        })
        alert("The questions added  successfully ");
      }).catch((error) => {
      });
  }
  onChange = (e) => {
    this.setState({ file: e.target.files[0] });

  }


  render() {
    return (
      <div className="container-fluid">

        <div className="row">
          <div className="col-lg-12 d-inline-flex justify-content-center navbar portfolio ">
            <ul id="portfolio-flters nav-item">
              <li className="filter-active nav-link d-inline-flex"><Link to="/Supperadmintables">Home</Link></li>
              <li className="filter-active nav-link d-inline-flex"><Link to="/superadminforms">Forms</Link></li>
              <li className="filter-active nav-link  d-inline-flex"><Link to="/Topicstable">Topics Table</Link></li>
              <li className="filter-active nav-link  d-inline-flex"><Link to="/getcomment">Comments and Releted Posts</Link></li>
              <li className="filter-active nav-link  d-inline-flex"><Link to="/usersinfo">User's Info</Link></li>
              <li className="filter-active nav-link  d-inline-flex"><Link to="/PostQuestion">Add A Question</Link></li>
              <li className="filter-active nav-link  d-inline-flex"><Link to="/AllQuestion">All Question</Link></li>



            </ul>
          </div>
        </div>
        <Link to="/">Back to User Home</Link>

        <CForm encType="multipart/form-data" onSubmit={this.onFormSubmit} >
          <CRow >

            <CCol xs="12" md="12">
              <CCard>

                <CCardBody>

                  <CFormGroup row>

                    <CCol xs="12" md="2">
                      Sellect className:
                      <CSelect custom name="class" value={this.state.class} id="select" onChange={this.setclass}>
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
                        <option value="commerce">Not Applicable</option>


                      </CSelect>
                    </CCol>



                    <CCol xs="12" md="2">
                      Sellect Subject:
                        <CSelect custom name="sub" value={this.state.sub} id="select" onChange={this.setsub} >
                        <option value="0">Please select subject</option>

                        <option value="English">English</option>
                        <option value="Bangla">Bangla</option>
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
                        <CSelect custom name="ch" id="select" value={this.state.ch} onChange={this.setch}>
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
                       <CSelect custom name="type" id="select" value={this.state.type} onChange={this.settype}>
                        <option value="0">Please select Type</option>

                        <option value="MCQ">MCQ</option>
                        <option value="CQ">CQ</option>



                      </CSelect>

                    </CCol>

                  </CFormGroup>

                </CCardBody>
              </CCard>
            </CCol>
          </CRow>

          <CRow>

            <CCol xs="12" sm="12">
              <CCard>
                <CCardHeader>


                  <div className="d-flex justify-content-center">
                    <div className="p-2">  Question add form</div>
                   
                  </div>
                </CCardHeader>
                <CCardBody>

                  <CFormGroup>
                    <CLabel htmlFor="vat">Add any image if need</CLabel>

                    <input type="file" name="myImage" onChange={this.onChange} />


                  </CFormGroup>
                  <CFormGroup row>

                    <CCol xs="12" md="12">
                      <CTextarea
                        name="uddipok"
                        id="textarea-input"
                        rows="9"
                        placeholder="Uddipok"
                        value={this.state.uddipok}
                        onChange={this.onchangehandeler}
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>

                    <CCol xs="12" md="12">
                      <CTextarea
                        name="question"
                        id="textarea-input"
                        rows="9"
                        placeholder="Question"
                        value={this.state.question}
                        onChange={this.onchangehandeler}
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>

                    <CCol xs="12" md="12">
                      <CTextarea
                        name="answer"
                        id="textarea-input"
                        rows="9"
                        placeholder="Answer"
                        value={this.state.answer}
                        onChange={this.onchangehandeler}
                      />
                    </CCol>
                  </CFormGroup>
                  <div className="d-flex justify-content-end">
                    <div className="p-2">   <CButton type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton></div>
                  </div>


                </CCardBody>
              </CCard>
            </CCol>

          </CRow>

        </CForm>

      </div>
    )
  }
}

export default PostQuestion;