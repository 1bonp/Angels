import React, { Component } from "react";
import P5 from "p5";
import "./Home.css";
import img from "../images/pin256.png";
import thumbsimg from "../images/thumbsup.png";
import fyingspider from "../images/flyingspider.jpg";

export default class Demo extends Component {

  static props = {

    width: 520,
    height: 200,
  };

  updateDimensions() {
    const canvas = this.refs.myCanvas;
    const ctx = canvas.getContext("2d");
    ctx.canvas.width = window.innerWidth-30;
    ctx.canvas.height = window.innerHeight-30;
    ctx.beginPath();
    ctx.rect(10, 10, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "black";
    ctx.strokeRect(10, 10, ctx.canvas.width-10, ctx.canvas.height-10);
  }

  moveNote(e){
    console.log("dragging"+e.clientX+","+e.clientY);
//this.refs.sticky1.style.position = "absolute";
//this.refs.sticky1.style.top=e.clientX-e.offsetX+"px";
//this.refs.sticky1.style.left=e.clientY-e.offsetY+"px";
//console.log("dragging"+e.clientX+","+e.clientY);
  }
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
    this.refs.dragpin.addEventListener("mousemove", this.moveNote.bind(this));
  }


  render() {
    return (
<div className="Home">
  <div className="lander">
  <canvas ref="myCanvas" ></canvas>
    <div className="board">
      <div ref="sticky1" className="note note1">
      <img ref="dragpin" className="pin" src={img}/>
      <textarea className="sticky sticky1">enter idea</textarea>
      <img className="pin" src={thumbsimg}/>
      </div>

      <div ref="sticky2" className="note note2">
      <img className="pin" src={img}/>
      <textarea className="sticky sticky2">enter idea</textarea>
      <img className="pin" src={thumbsimg}/>
      </div>

      <div ref="sticky3" className="note note3">
      <img className="pin" src={img}/>
      <textarea className="sticky sticky3">enter idea</textarea>
      <img className="pin" src={thumbsimg}/>
      </div>

      <div ref="sticky4" className="note note4">
      <img className="pin" src={img}/>
      <img className="webImage" src={fyingspider}/>
      <textarea className=" sticky4">https://www.yelp.com/biz/flying-spider-saint-louis?osq=kids+activities</textarea>
      <img className="pin" src={thumbsimg}/>
      </div>
    </div>
  </div>

</div>
    );
  }
}
