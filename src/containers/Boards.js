import React, { Component } from "react";
import { PageHeader, ListGroup, ListGroupItem, Form, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./Boards.css";
import { invokeApig } from "../libs/awsLib";

export default class NewBoard extends Component {

  constructor(props) {
    super(props);

    this.name =  "";
    this.state = {
      isLoading:null,
      boardName: "",
      type:"white-board",
       boards: []
    };

  }

  validateForm() {
    return this.state.boardName.length >0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    try {
    await this.createBoard({
      boardName: this.state.boardName
    });
    this.getBoards();
    this.setState({ isLoading: false });
    this.props.history.push("/boards");

  } catch (e) {
    alert(e);
    this.setState({ isLoading: false });
  }
  }

  createBoard(board) {
    return invokeApig({
      path: "/boards",
      method: "POST",
      body: board
    });
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }

    this.getBoards();
  }

  async getBoards()
  {
    try {
      const results = await this.boards();
      this.setState({ boards: results });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  boards() {
    return invokeApig({ path: "/boards" });
  }

  renderBoardsList(boards) {
    return [{}].concat(boards).map(
    (board, i) =>
      i !== 0
        ? <ListGroupItem
            key={board.boardid}
            href={`/board/${board.boardid}`}
            onClick={this.handleboardClick}
            header={board.type}
          >  Name : {board.boardName}
            {" Created: " + new Date(board.createdAt).toLocaleString()}
          </ListGroupItem>:<div></div>

  );
}


  render() {
    return (
      <div>
     <div className="NewBoard">
       <Form inline onSubmit={this.handleSubmit}>
         <FormGroup controlId="boardName">
           <FormControl
             onChange={this.handleChange}
             value={this.state.boardName}
            placeholder="Enter Board name"
             type="text"
           />
         </FormGroup>
         <LoaderButton
           bsStyle="primary"
           bsSize="large"
           disabled={!this.validateForm()}
           type="submit"
           isLoading={this.state.isLoading}
           text="Create"
           loadingText="Creating…"
         />
       </Form>
     </div>
     <div className="boards">
       <PageHeader>Your Boards</PageHeader>
       <ListGroup>
         {!this.state.isLoading && this.renderBoardsList(this.state.boards)}
       </ListGroup>
     </div>
     </div>

   );
  }
}
