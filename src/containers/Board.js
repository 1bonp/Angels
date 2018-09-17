import React, { Component } from "react";
import "./Board.css";
import { invokeApig } from "../libs/awsLib";
import img from "../images/pin256.png";
import thumbsimg from "../images/thumbsup.png";

export default class Boards extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      board: null,
      boardItems:{},
      isNotesAdded:null,
      content: ""
    };
  }

  async componentDidMount() {
    try {
      this.updateDimensions();
      window.addEventListener("resize", this.updateDimensions.bind(this));
      //this.refs.dragpin.addEventListener("mousemove", this.moveNote.bind(this));
      const results = await this.getBoard();
      this.setState({
        board: results,
        content: results.content
      });
    } catch (e) {
      alert(e);
    }
  }

  getBoard() {
    return invokeApig({ path: `/boards/${this.props.match.params.id}` });
  }
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

  async componentDidUpdate(){
    console.log("update:", this)
  }


    handleClick = () => {
      console.log('this is:', this);
      var key = Object.keys(this.state.boardItems).length+1;
      let boardItemsTemp = this.state.boardItems;
      boardItemsTemp[key] = {"text":'Enter Idea', "likeCount":0};
      this.setState({
        isNotesAdded: true,
        boardItems: boardItemsTemp//[...this.state.boardItems, { key,'new value'}]
      });
    }

    imageClick = (boardItem) => {
      let boardItemsTemp = this.state.boardItems;
      let boardItemTemp = this.state.boardItems[boardItem.toString()];
      let likeCountIncrement = this.state.boardItems[boardItem.toString()].likeCount+1;
      boardItemTemp.likeCount=likeCountIncrement;
      boardItemsTemp[boardItem.toString()]= boardItemTemp;
      this.setState({
        isNotesAdded: true,
        boardItems: boardItemsTemp
      });
    }


renderNotes(){

    var boardItemsLength = Object.keys(this.state.boardItems).length;
    var itemsRender = [];


    const renderItems = Object.keys(this.state.boardItems).map((boardItem) =>
    <div keyName={boardItem.toString()} ref="sticky2" className="note note2">
    <img className="pin" src={img}/>
    <textarea className="sticky sticky2" defaultValue={this.state.boardItems[boardItem.toString()].text}></textarea>
    <img className="pin" src={thumbsimg} onClick={() => this.imageClick(boardItem)}/>
    <span>{this.state.boardItems[boardItem.toString()].likeCount}</span>
    <br/>
    </div>
    );

    return <div>{renderItems}</div>;
}

  render() {
    return (
      <div>
      <canvas ref="myCanvas" >

      </canvas>

      <div className="addnotes">


      <button type="button" onClick={this.handleClick} className="btn btn-default" aria-label="Left Align">
      <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
      </button>
      </div>
      <div className="notes">
      {this.state.isNotesAdded && this.renderNotes(this.state.boardItems)}

      </div>

      </div>
    );
  }
}
