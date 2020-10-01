import React, { Component } from 'react';

class Hometotalcourse extends Component {
    render() {
        return (
            <div>
                <div id="course-sec" className="container set-pad">
  <div className="row text-center">
    <div className="col-lg-8 col-lg-offset-2 col-md-8 col-sm-8 col-md-offset-2 col-sm-offset-2">
      <h1 data-scroll-reveal="enter from the bottom after 0.1s" className="header-line">OUR COURSES </h1>
      <p data-scroll-reveal="enter from the bottom after 0.3s">
        We are profiding webdevelopments and robotics tutorials.
        As per your step we make sure you to help cordialy.
       If are hungry enough to learn please join with us.
        If you want to be a writter please register to be a writerr.
      </p>
    </div>
  </div>
  {/*/.HEADER LINE END*/}
  <div className="row set-row-pad">
    <div className="col-lg-6 col-md-6 col-sm-6 " data-scroll-reveal="enter from the bottom after 0.4s">
      <img src="assets/img/building.jpg" className="img-thumbnail" />
    </div>
    <div className="col-lg-4 col-md-4 col-sm-4 col-lg-offset-1 col-md-offset-1 col-sm-offset-1">
      <div className="panel-group" id="accordion">
        <div className="panel panel-default" data-scroll-reveal="enter from the bottom after 0.5s">
          <div className="panel-heading">
            <h4 className="panel-title">
              <a data-toggle="collapse" data-parent="#accordion" href="#collapse1" className="collapsed">
                <strong>   350+</strong> DESIGNING COURSES 
              </a>
            </h4>
          </div>
          <div id="collapse1" className="panel-collapse collapse" style={{height: '0px'}}>
            <div className="panel-body">
              <p>In those tutorials you will come to know basic to advance on html,css,bootstrap,javascript.</p>
            </div>
          </div>
        </div>
        <div className="panel panel-default" data-scroll-reveal="enter from the bottom after 0.7s">
          <div className="panel-heading">
            <h4 className="panel-title">
              <a data-toggle="collapse" data-parent="#accordion" href="#collapse2" className="collapsed">
                <strong>   250+</strong>SOFTWARE ENGINEERING COURSES 
              </a>
            </h4>
          </div>
          <div id="collapse2" className="panel-collapse collapse" style={{height: '0px'}}>
            <div className="panel-body">
              <p>
                We are providing you With Nodejs ,Laravel,Django Tutorials Including Some Awesome Projects
              </p>
            </div>
          </div>
        </div>
        <div className="panel panel-default" data-scroll-reveal="enter from the bottom after 0.9s">
          <div className="panel-heading">
            <h4 className="panel-title">
              <a data-toggle="collapse" data-parent="#accordion" href="#collapse3" className="collapsed">
                <strong>   50+</strong> ROBOTICS COURSES 
              </a>
            </h4>
          </div>
          <div id="collapse3" className="panel-collapse collapse" style={{height: '0px'}}>
            <div className="panel-body">
              <p>
               We work with aurduno and raspberry pi.All this robotics tutorial will be well explained.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="alert alert-info" data-scroll-reveal="enter from the bottom after 1.1s">
        <span style={{fontSize: '40px'}}>
          <strong> 25 + </strong> 
          <hr />
         Live Projects
        </span>
      </div>
    </div>
  </div>
</div>

            </div>
        );
    }
}

export default Hometotalcourse;