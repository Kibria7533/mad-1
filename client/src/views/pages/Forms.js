import React, { Component } from 'react';
import {Link,Route} from 'react-router-dom';
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
    constructor(){
        super();
        this.state={
           "subholderselect":"",
           "megaholderselect":"",
           "select":"",
            topic:"",
            fetchtype:"",
            megamenus_holder:[],
            submenus_holder:[],
            submenutopic:"",
            megamenutopic:""
        }
    }
    componentDidMount(){
      this.getall_megamenus_holder();
      this.getall_submenu_holder();
  }
    selectchange=(e)=>{
       var name=e.target.name;
       if(e.target.value=='1')
           this.setState({fetchtype:'add_simple_menus'});
       else if(e.target.value=='2')
         this.setState({fetchtype:'add_sub_menu_holder'});
    else if(e.target.value=='3')
            this.setState({fetchtype:'add_mega_menu_holder'});

    this.setState({[name]:e.target.value});

    }
    getall_megamenus_holder=async()=>{
      await axios.get(`http://localhost:5000/getallmegamenuholder`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(data=>{
          if(data.data.length)
            this.setState({megamenus_holder:data.data[0].menuwithmega})
          //  console.log(data.data[0].menuwithmega)
        })
  }
  getall_submenu_holder=async()=>{
      await axios.get(`http://localhost:5000/getallsubmenuholder`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(data=>{
           if(data.data.length)
            this.setState({submenus_holder:data.data[0].menuwithsub})
           // console.log(data.data[0].menuwithsub)
        })
  }

    simplemenusubmit=async (e)=>{
               e.preventDefault();
               const {topic}=this.state
           
               await axios.post(`http://localhost:5000/${this.state.fetchtype}`, {
                "Topic": topic,
              }, {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
              }).then(re=>{
                
                this.getall_megamenus_holder();
                this.getall_submenu_holder();
                this.setState({topic:""});
               
          
              })
    }
  
    megamenuadd=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        this.setState({[name]:value});
    }
    megamenusubmit=async (e)=>{
        e.preventDefault();
        const {megaholderselect,megamenutopic}=this.state;
        await axios.post(`http://localhost:5000/add_sub_menu_on_megamenu_holder`,{"name":megaholderselect,"Topic":megamenutopic}, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          }).then(data=>{
            this.setState({megamenutopic:""});
            this.getall_megamenus_holder();
          })
    }
    subsubmenuadd=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        this.setState({[name]:value});
    }

  subsubmenusubmit=async (e)=>{
        e.preventDefault();
        const {subholderselect,submenutopic}=this.state;
        await axios.post(`http://localhost:5000/add_submenu_on_submenuholder`,{"name":subholderselect,"Topic":submenutopic}, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          }).then(data=>{
            this.setState({submenutopic:""});
          })
    }
   
    render() {
        return (
            <div className="container-fluid">
                 <div className="row">
        <div className="col-lg-12 d-inline-flex justify-content-center navbar portfolio ">
          <ul id="portfolio-flters nav-item">
          <li  className="filter-active nav-link d-inline-flex"><Link exact to="/Supperadmintables">Home</Link></li>
            <li  className="filter-active nav-link d-inline-flex"><Link exact to="/superadminforms">Forms</Link></li>
            <li  className="filter-active nav-link  d-inline-flex"><Link exact to="/Topicstable">Topics Table</Link></li>
            <li  className="filter-active nav-link  d-inline-flex"><Link exact to="/getcomment">Comments and Releted Posts</Link></li>
            <li  className="filter-active nav-link  d-inline-flex"><Link exact to="/usersinfo">User's Info</Link></li>
            <li className="filter-active nav-link  d-inline-flex"><Link  to="/PostQuestion">Add A Question</Link></li>
           
                        <li className="filter-active nav-link  d-inline-flex"><Link  to="/AllQuestion">All Question</Link></li>
          </ul>
        </div>
      </div>
     <Link exact to="/">User Home</Link>
      <CRow>
       
       <CCol xs="12" sm="6"> 
       
         <CCard>
           <CCardHeader>
             Topic add
             <small> Form</small>
            
           </CCardHeader>
           <CCardBody>
           <CForm onSubmit={this.simplemenusubmit}>
             <CRow>
               <CCol xs="12">
                   
               <CSelect custom name="select" id="select" onChange={this.selectchange}>
                     <option value="0">Please select category</option>
                     <option value="1" >Main manu</option>
                     <option value="2">Sub menu holder</option>
                     <option value="3">Mega Menu Holder</option>
                   </CSelect>
                 <CFormGroup>
                   <CLabel htmlFor="name">Topic</CLabel>
                   <CInput id="name" name="topic" value={this.state.topic} onChange={this.selectchange} placeholder="Enter a new topic" required />
                 </CFormGroup>
               </CCol>
             </CRow>
             <CButton type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>
             </CForm>
           </CCardBody>
         </CCard>
       </CCol>
       <CCol xs="12" sm="6"> 
       
         <CCard>
           <CCardHeader>
             Topic add
             <small> On Megamenu</small>
            
           </CCardHeader>
           <CCardBody>
               <CForm onSubmit={this.megamenusubmit}>
             <CRow>
               <CCol xs="12">
               <CSelect custom name="megaholderselect" id="select" onChange={this.megamenuadd}>
                     <option value="0">Please select a Megamenu</option>
                     {this.state.megamenus_holder.map((data,index)=>{
                         return(
                            
                                 <option key={index} value={data.name}>{data.name}</option>
                          
                         )
                     })}
                     
                   </CSelect>
                 <CFormGroup>
                   <CLabel htmlFor="name">Topic</CLabel>
                   <CInput id="name" name="megamenutopic" value={this.state.megamenutopic} onChange={this.megamenuadd} placeholder="Enter a new topic" required />
                 </CFormGroup>
               </CCol>
             </CRow>
             <CButton type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>
             </CForm>
           </CCardBody>
         </CCard>
       </CCol>
       <CCol xs="12" sm="6"> 
       
         <CCard>
           <CCardHeader>
             Topic add
             <small> On submenu Holder</small>
            
           </CCardHeader>
           <CCardBody>
               <CForm onSubmit={this.subsubmenusubmit}>
             <CRow>
               <CCol xs="12">
               <CSelect custom name="subholderselect" id="select" onChange={this.subsubmenuadd}>
                     <option value="0">Please select Submenu Holder</option>
                     {this.state.submenus_holder.map((data,index)=>{
                         return(
                            
                                 <option key={index} value={data.name}>{data.name}</option>
                          
                         )
                     })}
                     
                   </CSelect>
                 <CFormGroup>
                   <CLabel htmlFor="name">Topic</CLabel>
                   <CInput id="name" name="submenutopic" value={this.state.submenutopic} onChange={this.subsubmenuadd} placeholder="Enter a new topic" required />
                 </CFormGroup>
               </CCol>
             </CRow>
             <CButton type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>
             </CForm>
           </CCardBody>
         </CCard>
       </CCol>
      
     </CRow>
    
    
            </div>
        );
    }
}

export default Forms;