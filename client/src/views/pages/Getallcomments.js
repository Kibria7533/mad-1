import React, { Component,useState } from 'react';
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
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CSelect,
  CRow,
  CSwitch
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

class Getallcomments extends Component {
    constructor(){
        super();
        this.state={
            data:[],
            topic:"",
            chapters:[],
            chapter:"",
            show:false,
            comments:[],
            reletedposts:[],
            showreletedpostform:false,
            relposttopic:"",
            relchapters:[],
            small:false,
        }
    }
  
    async componentDidMount(){
        axios.get(`http://localhost:5000/getalltopics`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(val => {
            
            if(val.data.length)
            this.setState({data:val.data});

        }).catch(err => {
            console.log(err);
        })
    }
  
    selectchange= async (e)=>{
        this.setState({show:false,chapter:"",chapters:"",reletedposts:[],comments:[],showreletedpostform:false})
        if(e.target.value=='0')
        {
            alert('Please Select A Topic')
        }
        else{
             this.setState({topic:e.target.value});
             
            await axios.post(`http://localhost:5000/allchapter/${e.target.value}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(val => {
                
                 if(val.data.length)
                 this.setState({chapters:val.data[0].posts,show:true});
              
    
            }).catch(err => {
                console.log(err);
            })
        }
    }
    settopic=async(e)=>{
        this.setState({chapter:e.target.value,showreletedpostform:true});
        const {topic}=this.state;
        await axios.post(`http://localhost:5000/allcomments`,{"Topic":topic,"ch":e.target.value}, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(async (val) => {
            
             if(val.data.length)
             this.setState({comments:val.data[0].comments[0].comment});
             else {
               alert('No Comment to show')}
           // console.log(val.data[0].comments[0].comment);
           await axios.post(`http://localhost:5000/reletedposts`,{"Topic":topic,"ch":this.state.chapter}, {
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          }
      }).then(data=> {
          
           if(data.data.length){
          this.setState({reletedposts:data.data[0].reletedposts[0].reletedpost,show:true});
         // console.log(data.data[0].reletedposts[0].reletedpost);
           }
          else{
            alert('No reletedposts to show')}
           

      }).catch(err => {
          console.log(err);
      })

        }).catch(err => {
            console.log(err);
        })
       
    }

  refresh=async()=>{
    this.setState({showreletedpostform:false})
    const {topic,chapter}=this.state;
    await axios.post(`http://localhost:5000/reletedposts`,{"Topic":topic,"ch":chapter}, {
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }
  }).then(data=> {
      
       if(data.data.length){
      this.setState({reletedposts:data.data[0].reletedposts[0].reletedpost,showreletedpostform:true});
     // console.log(data.data[0].reletedposts[0].reletedpost);
       }
      else{
        alert('Added Succesfully')}

  }).catch(err => {
      console.log(err);
  })
  }
    reletedselectchange=async(e)=>{
    //  this.setState({relposttopic:e.target.value})
      this.setState({relchapter:"",relchapters:[]})
        if(e.target.value=='0')
        {
            alert('Please Select A Topic')
        }
        else{
             this.setState({relposttopic:e.target.value});
             
              await axios.post(`http://localhost:5000/allchapter/${e.target.value}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(val => {
                
                 if(val.data.length)
                 this.setState({relchapters:val.data[0].posts});

              
    
            }).catch(err => {
                console.log(err);
            })
        }
    }
    addreletedpost=(e)=>{
      this.setState({relchapter:e.target.value})

    }
    addreleted=async(e)=>{
      e.preventDefault();
      const {topic,chapter,relchapter}=this.state;
      await axios.post(`http://localhost:5000/addreletedpost`,{"relted":relchapter,"Topic":topic,"ch":chapter} ,{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(val => {
        
        //  if(val.data.length)
        //  //this.setState({relchapters:val.data[0].posts,showreletedpostform:true});
        //  console.log(val.data.length);
  this.refresh();
      

    }).catch(err => {
        console.log(err);
    })


    }
   
    deletecomment=async (username,comment)=>{
      
      const{topic,chapter}=this.state
      await axios.post(`http://localhost:5000/deleteacomment`,{"topic":topic,"username":username,"ch":chapter,"comment":comment} ,{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(async(val) => {
        
      await axios.post(`http://localhost:5000/allcomments`,{"Topic":topic,"ch":chapter}, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(data=>{
      if(data.data.length)
      this.setState({comments:data.data[0].comments[0].comment});
      else {
        alert('No Comment to show')}
    })
   console.log(val);
      

    }).catch(err => {
        console.log(err);
    })
    }


    deletereletedpost=async (reletedpost)=>{
      
      const{topic,chapter}=this.state
      await axios.post(`http://localhost:5000/deleteareletedpost`,{"topic":topic,"reletedpost":reletedpost,"ch":chapter} ,{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(async(val) => {
        
      await axios.post(`http://localhost:5000/reletedposts`,{"Topic":topic,"ch":chapter}, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(data=> {
        
         if(data.data.length){
        this.setState({reletedposts:data.data[0].reletedposts[0].reletedpost,showreletedpostform:true});
       // console.log(data.data[0].reletedposts[0].reletedpost);
         }
       
  
    }).catch(err => {
        console.log(err);
    })
  
      

    }).catch(err => {
        console.log(err);
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
        <Link exact to="/">Back to User Home</Link>

        <CRow>
        
            <CCol xs="12" sm="12">
            
              <CCard>
                <CCardHeader>
                  To get Comment please select Topic and Chapter
            
                </CCardHeader>
                <CCardBody>
                  <CFormGroup row>

                    <CCol xs="12" md="12">
                      <CSelect custom name="select" id="select" onChange={this.selectchange}>
                        <option value="0">Please select Topic</option>
                        {this.state.data.map((item)=>{
                            return(
                            <option key={item.Topic} value={item.Topic} >{item.Topic}</option>    
                            )
                        })}
                       
                      </CSelect>
                      <br></br>
                      <br></br>
                       {this.state.show ? <CSelect custom name="chapter" id="select" onChange={this.settopic}>
                        <option value="0">Please select Topic</option>
                        {this.state.chapters.map((item)=>{
                            return(
                            <option key={item.ch} value={item.ch} >{item.ch}</option>    
                            )
                        })}
                        
                      </CSelect>:""}
                     
                    </CCol>
                    
                  </CFormGroup>
                <CRow>
                  <CCol md="9">
                  <table className="table">
                                <tbody>
                                    <tr>
                                      <th>Username</th>
                                        <th>Comment</th>
                                        <th>EDIT</th>
                                        <th>DELETE</th>
                                    </tr>
                                    {this.state.comments.map((value) => {
                    return (
                       
                           <tr>
                           <td>{value.username}</td>
                           <td>{value.comment}</td>
                             <td> <button type="submit" className="btn btn-primary">Edit</button> </td>
                             <td> <button type="button" onClick={()=>this.deletecomment(value.username,value.comment)} className="btn btn-primary">Delete</button> </td>
                             </tr>
                         
                    ) 
                     })}
                 
                    </tbody>
                     </table>
                       
                     </CCol>
                     <CCol md="3">
                       <CRow>
                     <table className="table">
                                <tbody>
                                    <tr>
                                      <th>Releted Posts</th>
                                        <th>DELETE</th>
                                    </tr>
                                    {this.state.reletedposts.map(value=> {
                    return (
                           <tr>
                           <td>{value}</td>
                             <td> <button type="button" onClick={()=>this.deletereletedpost(value)} className="btn btn-primary">Delete</button> </td>
                             </tr>  
                    ) 
                     })}
                 
                    </tbody>
                     </table>
                     </CRow>
                     <CRow>
                       {this.state.showreletedpostform?<div><h3>Add One Releted Post</h3>
                     <CSelect custom name="relposttopic" id="select" onChange={this.reletedselectchange}>
                        <option value="0">Please select Topic</option>
                        {this.state.data.map((item)=>{
                            return(
                            <option key={item.Topic} value={item.Topic} >{item.Topic}</option>    
                            )
                        })}
                       
                      </CSelect>
                      <br></br>
                      <br></br>
                       {this.state.show ? <CSelect custom name="chapter" id="select" onChange={this.addreletedpost}>
                        <option value="0">Please select Topic</option>
                        {this.state.relchapters.map((item)=>{
                            return(
                            <option key={item.ch} value={item.ch} >{item.ch}</option>    
                            )
                        })}
                        
                      </CSelect>:""}
                      <button type="button" onClick={this.addreleted}>Add</button></div>:""}
                    
                     </CRow>
                     </CCol>
                     </CRow>
                </CCardBody>
              </CCard>
             
            </CCol>
            
           
        </CRow>
        <CButton onClick={() => this.setState({small:!this.state.small})} className="mr-1">
              Launch small modal
            </CButton>
        <CModal 
              show={this.state.small} 
              onClose={() =>this.setState({small:!this.state.small})}
              size="sm"
            >
              <CModalHeader closeButton>
                <CModalTitle>Modal title</CModalTitle>
              </CModalHeader>
              <CModalBody>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
              </CModalBody>
              <CModalFooter>
                <CButton color="primary" onClick={() => this.setState({small:!this.state.small})}>Do Something</CButton>{' '}
                <CButton color="secondary" onClick={() => this.setState({small:!this.state.small})}>Cancel</CButton>
              </CModalFooter>
            </CModal>

      </div>
    );
  }
}

export default Getallcomments;