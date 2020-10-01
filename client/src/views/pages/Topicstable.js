import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
class Topicstable extends Component {
  constructor() {
    super();
    this.state = {
      "menus": [],
      "menuwithsub": [],
      "menuwithmega": []
    }
  }
  async componentDidMount() {
    await axios.get(`http://localhost:5000/allmenus`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(data => {
      if (data.data[0].menus.length)
        this.setState({ menus: data.data[0].menus });
      else
        this.setState({ menus: [] });

      if (data.data[0].menuwithsub.length)
        this.setState({ menuwithsub: data.data[0].menuwithsub });
      else
        this.setState({ menuwithsub: [] });

      if (data.data[0].menuwithmega.length)
        this.setState({ menuwithmega: data.data[0].menuwithmega });
      else
        this.setState({ menuwithmega: [] });


    })
  }
  deletesimplemenu = async (topic) => {
    await axios.post(`http://localhost:5000/deleteasimplemenue`, { "topic": topic }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(async (data) => {
      this.componentDidMount();

      await axios.post(`http://localhost:5000/removetopic`, { "Topic": topic }, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(data => {

        alert('Removed')

      })


    })
  }
  deletesubmenuholder = async (submenholder) => {
    {this.state.menuwithsub.map((value) => {
        if (value.name===submenholder) {
         
          value.submenus.map(async (subdata) => {

            await axios.post(`http://localhost:5000/removetopic`, { "Topic": subdata }, {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
            })
          })
        }
      })
    }

    await axios.post(`http://localhost:5000/delete_a_subholeder`, { "subholder": submenholder }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(data => {
      this.componentDidMount();
  alert('Deleted')

    })
  }
  delete_sub_submenu = async (submenuholder, submenu) => {

    await axios.post(`http://localhost:5000/delete_a_sub_submenu`, { submenuholder, submenu }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(async (data) => {
      this.componentDidMount();
      await axios.post(`http://localhost:5000/removetopic`, { "Topic": submenu }, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(data => {

        alert('Removed')

      })


    })
  }
  delete_mega_menuholder = async (megaholder) => {

    {this.state.menuwithmega.map((value) => {
      if (value.name===megaholder) {
       
        value.submenus.map(async (subdata) => {

          await axios.post(`http://localhost:5000/removetopic`, { "Topic": subdata }, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
        })
      }
    })
  }

    await axios.post(`http://localhost:5000/delete_a_megaholder`, { megaholder }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(data => {
      this.componentDidMount();
      alert('Removed')

    })
  }
  delete_sub_mega = async (megamenuholder, submenu) => {
    await axios.post(`http://localhost:5000/delete_a_sub_megamenu`, { megamenuholder, submenu }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(async (data) => {
      this.componentDidMount();
      await axios.post(`http://localhost:5000/removetopic`, { "Topic": submenu }, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(data => {

        alert('Removed')

      })


    })
  }
  simplemenuedit=async(data)=>{

  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12 d-inline-flex justify-content-center navbar portfolio ">
            <ul id="portfolio-flters nav-item">
              <li className="filter-active nav-link d-inline-flex"><Link  to="/Supperadmintables">Home</Link></li>
              <li className="filter-active nav-link d-inline-flex"><Link  to="/superadminforms">Forms</Link></li>
              <li className="filter-active nav-link  d-inline-flex"><Link  to="/Topicstable">Topics Table</Link></li>
              <li className="filter-active nav-link  d-inline-flex"><Link  to="/getcomment">Comments and Releted Posts</Link></li>
              <li className="filter-active nav-link  d-inline-flex"><Link  to="/usersinfo">User's Info</Link></li>
              <li className="filter-active nav-link  d-inline-flex"><Link  to="/PostQuestion">Add A Question</Link></li>
              <li className="filter-active nav-link  d-inline-flex"><Link  to="/AllQuestion">All Question</Link></li>

            </ul>
          </div>
        </div>
        <div className="container">
          <Link  to="/">Back to Home</Link>
          <h3>#############Simple menus#############</h3>
          {this.state.menus.length ? <div className="col-md-12 ">


            {this.state.menus.map((value, index) => {
              return (
                <div key={index}>
                  <li>{value}<button type="button" onClick={this.simplemenuedit}>Edit</button>/<button type="button" onClick={() => this.deletesimplemenu(value)}>Delete</button></li>
                  <hr></hr>
                </div>

              )
            })}
          </div> : <h6>You dint add any menu yet</h6>}
          <h2>#############Sub Menus#############</h2>
          {this.state.menuwithsub.length ? <div className="col-md-12 ">
            <h5>Submenu Holder</h5>
            {this.state.menuwithsub.map((value, index) => {
              return (
                <div key={index}>
                  <ul>{value.name}<button type="submit">Edit</button>/<button type="button" onClick={() => this.deletesubmenuholder(value.name)}>Delete</button>
                    <hr></hr>
                    {value.submenus.map((subdata, index) => {
                      return (
                        <li key={index}>{subdata}<button type="submit">Edit</button>/<button type="button" onClick={() => this.delete_sub_submenu(value.name, subdata)}>Delete</button></li>
                      )

                    })}
                  </ul>
                </div>

              )
            })}
          </div> : <h6>You dint add any Submenu Holder Yet</h6>}
          <h2>#############Mega Menus#############</h2>
          {this.state.menuwithmega.length ? <div className="col-md-12 ">
            <h5>Megamenu Holder</h5>
            {this.state.menuwithmega.map((value, index) => {
              return (
                <div key={index}>
                  <ul>{value.name}<button type="submit">Edit</button>/<button type="button" onClick={() => this.delete_mega_menuholder(value.name)}>Delete</button>
                    <hr></hr>
                    {value.submenus.map((subdata, index) => {
                      return (
                        <li key={index}>{subdata}<button type="submit">Edit</button>/<button type="button" onClick={() => this.delete_sub_mega(value.name, subdata)}>Delete</button></li>
                      )

                    })}
                  </ul>
                </div>

              )
            })}
          </div> : <h6>You dint add any Megamenu yet</h6>}
        </div>

      </div>
    );
  }
}

export default Topicstable;