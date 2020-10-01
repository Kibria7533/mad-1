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

class Forms extends Component {
  constructor() {
    super();
    this.state = {
      "select": "",
      topic: "",
      fetchtype: "",
      megamenus_holder: [],
      submenus_holder: [],
      menus: [],
      postmenus: [],
      showselect: false,
      showmenuselect: false,
      showmegamenuselect: false,
      showtopic: false,
      activmenus: [],
      sub_sub: false,
      mega_sub: false,
      chapter: "",
      contentinput: "",
      codeinput: "",
      longdescriptioninput: ""



    }
  }
  componentDidMount() {
    this.getall_megamenus_holder();
    this.getall_submenu_holder();
    this.getonlysimple_menus();
  }

  getall_megamenus_holder = async () => {
    await axios.get(`http://localhost:5000/getallmegamenuholder`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(data => {
      if(data.data.length)
      this.setState({ megamenus_holder: data.data[0].menuwithmega })
      // console.log(data.data)
    })
  }
  getall_submenu_holder = async () => {
    await axios.get(`http://localhost:5000/getallsubmenuholder`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(data => {
      if(data.data.length)
      this.setState({ submenus_holder: data.data[0].menuwithsub })
      // console.log(data.data)
    })
  }
  getonlysimple_menus = async () => {
    await axios.get(`http://localhost:5000/only_menus`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(data => {
      if(data.data.length)
      this.setState({ menus: data.data[0].menus })
      //console.log(data.data[0].menus)
    })
  }

  selectchange = (e) => {
    this.setState({ topic: "" });
    if (e.target.value ==='1') {
      this.setState({ postmenus: this.state.menus })
      this.setState({ showmenuselect: true, showselect: false, showmegamenuselect: false, });
    }
    else if (e.target.value ==='2') {
      this.setState({ postmenus: this.state.submenus_holder })
      this.setState({ showselect: true, showmenuselect: false, showmegamenuselect: false, sub_sub: true, mega_sub: false });
    }
    else if (e.target.value === '3') {
      this.setState({ postmenus: this.state.megamenus_holder })
      this.setState({ showmegamenuselect: true, showmenuselect: false, showselect: false, sub_sub: false, mega_sub: true });
    }
  }

  settopic = async (e) => {
    this.setState({ topic: e.target.value });
  }
  setholder = async (e) => {
    const topicholder = e.target.value;
    this.setState({ showtopic: false, topic: "" })

    //console.log('select hoder ' + topicholder, 'fetchtype ' + this.state.sub_sub);
    if (this.state.sub_sub && topicholder !== '0') {
      await axios.post(`http://localhost:5000/get_particuler_submenus`, { "topic": topicholder }, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(data => {
        
        this.setState({ activmenus: data.data[0].menuwithsub[0].submenus, showtopic: true })
       // console.log(data.data[0].menuwithsub[0].submenus)
      })
    }
    else if (!this.state.sub_sub && topicholder !== '0') {
      await axios.post(`http://localhost:5000/get_particuler_mega_submenus`, { "topic": topicholder }, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(data => {
        if(data.data.length)
        this.setState({ activmenus: data.data[0].menuwithmega[0].submenus, showtopic: true })
       // console.log(data.data[0].menuwithmega[0].submenus)
      })
    }
  }
  onchangehandeler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  postsubmit = async () => {
   
    const { topic, chapter, contentinput, codeinput, longdescriptioninput } = this.state;
    await axios.post(`http://localhost:5000/createchapter`, { "Topic": topic, "ch": chapter, "intro": contentinput, "code": codeinput, "blogtext": longdescriptioninput }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(data => {
      console.log(data.data);
      this.setState({chapter:"",contentinput:"",codeinput:"",longdescriptioninput:""})
    })

  }
  render() {

    return (

      <div className="container-fluid">

        <div className="row">
          <div className="col-lg-12 d-inline-flex justify-content-center navbar portfolio ">
            <ul id="portfolio-flters nav-item">
              <li className="filter-active nav-link d-inline-flex"><Link  to="/writterdashboard">Tables</Link></li>

             
             
            </ul>
          </div>
        </div>
        <Link to="/">Back to User Home</Link>

        <CRow>
          {/* <CForm onSubmit={this.postsubmit} > */}
            <CCol xs="12" sm="12">
              <CCard>
                <CCardHeader>
                  Chapter add
             <small> Form</small>
                </CCardHeader>
                <CCardBody>
                  <CFormGroup row>

                    <CCol xs="12" md="12">
                      <CSelect custom name="select" id="select" onChange={this.selectchange}>
                        <option value="0">Please select category</option>
                        <option value="1" >Main manu</option>
                        <option value="2">Post On Sub menu holder</option>
                        <option value="3">Post On Mega Menu Holder</option>
                      </CSelect>
                    </CCol>
                    {this.state.showmenuselect ?

                      <CCol xs="12" md="12">
                        <br></br>

                        <CSelect custom name="select" id="select" onChange={this.settopic}>
                          <option value="0">Please select</option>
                          {this.state.menus.map((data,index)=> {
                            return (

                              <option key={index} value={data}>{data}</option>

                            )
                          })}

                        </CSelect>
                      </CCol>
                      : ""}
                    {this.state.showselect ?

                      <CCol xs="12" md="12">
                        <br></br>
                        <CSelect custom name="select" id="select" onChange={this.setholder}>
                          <option value="0">Please select submenu holder</option>
                          {this.state.postmenus.map((data,index)=> {
                            return (<option key={index} value={data.name} onSelect={this.setholder}>{data.name}</option>)
                          })}



                        </CSelect>
                        <br></br>
                        <br></br>
                        {this.state.showtopic ?
                          <CSelect custom name="select" id="select" onChange={this.settopic}>
                            <option value="0">Please select topic</option>
                            {this.state.activmenus.map((data,index)=> {
                              return (
                                <option key={index}value={data} onSelect={this.settopic}>{data}</option>

                              )
                            })}
                          </CSelect> : ""}
                      </CCol>
                      : ""}
                    {this.state.showmegamenuselect ?

                      <CCol xs="12" md="12">
                        <br></br>
                        <CSelect custom name="select" id="select" onChange={this.setholder}>
                          <option value="0">Please select Megamenu</option>
                          {this.state.postmenus.map((data,index)=> {
                            return (<option key={index} value={data.name}>{data.name}</option>)
                          })}


                        </CSelect>
                        <br></br>
                        <br></br>
                        {this.state.showtopic ?
                          <CSelect custom name="select" id="select" onChange={this.settopic}>
                            <option value="0">Please select topic</option>
                            {this.state.activmenus.map((data,index)=> {
                              return (
                                <option key={index} value={data} onSelect={this.settopic}>{data}</option>

                              )
                            })}
                          </CSelect> : ""}
                      </CCol>
                      : ""}
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="vat">Write chapter name</CLabel>
                    <CInput id="vat" name="chapter" value={this.state.chapter} placeholder="chapter" onChange={this.onchangehandeler} />
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="textarea-input">Content intro here</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CTextarea
                        name="contentinput"
                        id="textarea-input"
                        rows="9"
                        value={this.state.contentinput}
                        placeholder="Content..."
                        onChange={this.onchangehandeler}
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="textarea-input">Content code here</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CTextarea
                        name="codeinput"
                        id="textarea-input"
                        rows="9"
                        placeholder="Content..."
                        value={this.state.codeinput}
                        onChange={this.onchangehandeler}
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="textarea-input">Content long description here</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CTextarea
                        name="longdescriptioninput"
                        id="textarea-input"
                        rows="9"
                        placeholder="Content..."
                        value={this.state.longdescriptioninput}
                        onChange={this.onchangehandeler}
                      />
                    </CCol>
                  </CFormGroup>

                  <CButton type="button" onClick={this.postsubmit} size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>

                </CCardBody>
              </CCard>
            </CCol>
          {/* </CForm> */}
        </CRow>


      </div>
    );
  }
}

export default Forms;