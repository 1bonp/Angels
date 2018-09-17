import React, { Component } from "react";
import { PageHeader, ListGroup, ListGroupItem, Form, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./Plans.css";
import { invokeApig } from "../libs/awsLib";

export default class Plans extends Component {

  constructor(props) {
    super(props);

    this.name =  "";
    this.state = {
      isLoading:null,
      boardName: "",
      type:"plan",
       plans: []
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
    await this.createPlan({
      boardName: this.state.boardName
    });
    this.getPlans();
    this.setState({ isLoading: false });
    this.props.history.push("/plans");

  } catch (e) {
    alert(e);
    this.setState({ isLoading: false });
  }
  }

  createPlan(plan) {
    return invokeApig({
      path: "/boards",
      method: "POST",
      body: plan
    });
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }

    this.getPlans();
  }

  async getPlans()
  {
    try {
      const results = await this.plans();
      this.setState({ plans: results });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  plans() {
    return invokeApig({ path: "/boards" });
  }

  renderPlansList(plans) {
    return [{}].concat(plans).map(
    (plan, i) =>
      i !== 0
        ? <ListGroupItem
            key={plan.boardid}
            href={`/plan/${plan.boardid}`}
            onClick={this.handlePlanClick}
            header={plan.type}
          >   {plan.boardName}
            {"  " + new Date(plan.createdAt).toLocaleString()}
          </ListGroupItem>:<div></div>

  );
}


  render() {
    return (
      <div>
     <div className="NewPlan">
       <Form inline onSubmit={this.handleSubmit}>
         <FormGroup controlId="boardName">
           <FormControl
             onChange={this.handleChange}
             value={this.state.boardName}
            placeholder="Enter Plan Name"
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
     <div className="plans">
       <PageHeader>Your Plans</PageHeader>
       <ListGroup>
         {!this.state.isLoading && this.renderPlansList(this.state.plans)}
       </ListGroup>
     </div>
     </div>

   );
  }
}
