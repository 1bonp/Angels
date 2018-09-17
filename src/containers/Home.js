import React, { Component } from "react";
import P5 from "p5";
import "./Home.css";
import img from "../images/pin256.png";
import thumbsimg from "../images/thumbsup.png";

export default class Home extends Component {

  static props = {

    width: 520,
    height: 200,
  };




  render() {
    return (
      <div className="Home">
        <div className="lander">
        <div className="text-block">
       <div className="text-font">A <span className="text-color"> Goal </span>without a plan is just a
       <span className="text-color"> Wish...</span> </div>
       <div className="text-font">Use our <span className="text-color">brainstorming and project planning tool </span>
       with your moms group.</div>

       <br/>
       </div>

       <div className="text-block2">
       <div className="text-font2">
       <ul><li>
       Find an <span className="text-color">angel </span>
       to collaborate/delegate or become an <span className="text-color"> angel</span> to help others in the
       <span className="text-color"> same-boat.</span></li>
        <li>Find plans and templates in the<span className="text-color"> fruition plans marketplace </span>
       to clone/copy or submit your <span className="text-color">fruition plan.</span>
       </li>
       <li>Contact :  <span className="text-color"> help@momswhoplan.com </span>
       </li></ul></div>
       <br/>

       </div>
        </div>

      </div>
    );
  }
}
