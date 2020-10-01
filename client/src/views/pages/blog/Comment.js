import React, { Component } from 'react';
import axios from 'axios';
class Comment extends Component {
  constructor() {
    super();
    this.state = {
      message: ""
    }
  }

  onchange = (e) => {
    this.setState({ message: e.target.value });
  }
  onsubmit = async (e) => {
    e.preventDefault();
    const {message}=this.state;
    await axios.post(`http://localhost:5000/savecomment`,{ "Topic":this.props.topic, "ch": this.props.cha,"username": "kibria", "message":message}, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(data=>{
     
      this.setState({message:""});
      this.props.aftercomment(this.props.cha)
    }).catch(err=>{
      console.log(err);
    })

  }
  render() {
    return (
      <div>
        <h4 style={{"color":"ActiveCaption","textAlign":"center"}}>Comments</h4>
        <hr></hr>
        {this.props.fetchcomment.map((data) => (
          <div className="comment" key={Math.random()}>
            <span className="time-right">User:{data.username}</span>
            <p>telling:{data.comment}</p>

          </div>
        ))}


        <form onSubmit={this.onsubmit}>
          <textarea name="message" onChange={this.onchange} value={this.state.message} rows={2} cols={100} />
          <br /><br />
          <input type="submit" />
        </form>

      </div>
    );
  }
}

export default Comment;