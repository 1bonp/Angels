import React, { Component } from "react";
import "./Plan.css";
import { invokeApig } from "../libs/awsLib";
import img from "../images/pin256.png";
import imgassignee from "../images/person-icon-blue-18.png";

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
      boardItemsTemp[key] = {"text":'Enter Task', "assignee":'assign'};
      this.setState({
        isNotesAdded: true,
        boardItems: boardItemsTemp//[...this.state.boardItems, { key,'new value'}]
      });
    }


renderNotes(){

    var boardItemsLength = Object.keys(this.state.boardItems).length;
    var itemsRender = [];
    const renderItems = Object.keys(this.state.boardItems).map((boardItem) =>
    <div keyName={boardItem.toString()} ref="task1" className="task">
    <label for="textarea">Task:  </label>
    <textarea className="task2" defaultValue={this.state.boardItems[boardItem.toString()].text}></textarea>
    <img className="assignee" src={imgassignee}/>
    <span>{this.state.boardItems[boardItem.toString()].assignee}</span>
    <br/>
    </div>
    );

    return <div>{renderItems}</div>;
}

  render() {
    return (
      <div>

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
