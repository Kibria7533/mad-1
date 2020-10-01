import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
class Homecontact extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      messege: ""
    }
  }
  notify = () => toast("Email has been send!");
  save = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  submit = async (e) => {
    e.preventDefault();

  
    await  axios.post(`http://localhost:5000/mail`,this.state,{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(data=>{
      this.setState({name:"",email:"",messege:""});
       this.notify();
      }).catch(err=>{
        console.log('tttt')
        console.log(err)
      })
      
   
    
  }
    render() {
        return (
            <div>
               <div>
          <div id="contact-sec">
            <div className="overlay">
              <div className="container set-pad">
                <div className="row text-center">
                  <div className="col-lg-8 col-lg-offset-2 col-md-8 col-sm-8 col-md-offset-2 col-sm-offset-2">
                    <h1 data-scroll-reveal="enter from the bottom after 0.1s" className="header-line">CONTACT US</h1>
                    <p data-scroll-reveal="enter from the bottom after 0.3s">
                    All of the above can be taught in engaging ways and reviewed in any of the ways below.  
                    The content for testing can also be reviewed in the ways below. 
                     The only limitation is your imagination!
                    </p>
                  </div>
                </div>
                {/*/.HEADER LINE END*/}
                <div className="row set-row-pad" data-scroll-reveal="enter from the bottom after 0.5s">
                  <div className="col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2 col-sm-8 col-sm-offset-2">
                    <form onSubmit={this.submit}>
                      <div className="form-group">
                        <input type="text" name="name" value={this.state.name} onChange={this.save} className="form-control " required="required" placeholder="Your Name" />
                      </div>
                      <div className="form-group">
                        <input type="email" name="email" value={this.state.email} onChange={this.save} className="form-control " required="required" placeholder="Your Email" />
                      </div>
                      <div className="form-group">
                        <input type="text" name="messege" value={this.state.messege} onChange={this.save} required="required" className="form-control" style={{minHeight: '150px'}} placeholder="Message"  />
                      </div>
                      <div className="form-group">
                        <button type="submit" className="btn btn-info btn-block btn-lg">SUBMIT </button>
                      </div>
                    </form>
                    <ToastContainer
position="bottom-center"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
                  </div>
                </div>
              </div>
            </div> 
          </div>
          <div className="container">
            <div className="row set-row-pad">
              <div className="col-lg-4 col-md-4 col-sm-4   col-lg-offset-1 col-md-offset-1 col-sm-offset-1 " data-scroll-reveal="enter from the bottom after 0.4s">
                <h2><strong>Our Location </strong></h2>
                <hr />
                <div>
                  <h4>234/80 -UFG , Banani,</h4>
                  <h4>Dhaka.</h4>
                  <h4><strong>Call:</strong>  +8801720588884 </h4>
                  <h4><strong>Email: </strong>tenminuteversity@gmail.com</h4>
                </div>
              </div>
      <div className="col-lg-4 col-md-4 col-sm-4   col-lg-offset-1 col-md-offset-1 col-sm-offset-1" data-scroll-reveal="enter from the bottom after 0.4s">
        <h2><strong>Social Conectivity </strong></h2>
        <hr />
        <div>
          <a href="https://www.facebook.com/profile.php?id=100005904976462">  <img src="assets/img/Social/facebook.png" alt="" /> </a>
          <a href="https://www.youtube.com/channel/UCKpbhNRh9pp1UHFAHsGcunQ?view_as=subscriber"> <img src="assets/img/Social/google-plus.png" alt="" /></a>
          <a href="https://twitter.com/ominuteversity"> <img src="assets/img/Social/twitter.png" alt="" /></a>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
          
        );
    }
}

export default Homecontact;