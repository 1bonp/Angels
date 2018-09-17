import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Image, Nav, NavDropdown, MenuItem, Navbar, NavItem} from "react-bootstrap";
import "./App.css";
import Routes from "./Routes";
import RouteNavItem from "./components/RouteNavItem";
import { authUser, signOutUser } from "./libs/awsLib";


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated});
  }

  handleLogout = event => {

    signOutUser();
    this.userHasAuthenticated(false);
    this.props.history.push("/login")
  }

  async componentDidMount() {
    try {
      if(await authUser()) {
        this.userHasAuthenticated(true);
      }
    }
    catch(e) {
      alert(e);
    }
    this.setState({ isAuthenticating: false });
  }

  render() {
  const childProps = {
    isAuthenticated: this.state.isAuthenticated,
    userHasAuthenticated: this.userHasAuthenticated
  };

  return (
    !this.state.isAuthenticating &&
    <div>

    <Navbar fluid collapseOnSelect className="top-bar">
         <Navbar.Header>
           <Navbar.Brand >
             <Link to="/">Angel planners</Link>
           </Navbar.Brand>
           <Navbar.Toggle />
         </Navbar.Header>
    <Navbar.Collapse>
           <Nav pullRight>
           {this.state.isAuthenticated
             ? [<NavItem key={0} onClick={this.handleLogout}>Logout</NavItem>,
               <RouteNavItem key={5} href="/boards">WhiteBoards</RouteNavItem>,
            // <RouteNavItem key={6} href="/boats/new">Same-Boats</RouteNavItem>,
           <RouteNavItem key={8} href="/plans">ActionPlans</RouteNavItem>]
             : [
               <RouteNavItem key={2} href="/Login">
          Login
        </RouteNavItem>,
        <RouteNavItem key={1} href="/Signup">
          Signup
        </RouteNavItem>
        ]}

        <RouteNavItem key={3} href="/Features">Features</RouteNavItem>
        <RouteNavItem key={7} href="/contactus">Contact-us</RouteNavItem>


           </Nav>
           </Navbar.Collapse>

       </Navbar>


     <Routes childProps={childProps} />
    </div>
  );
}
}
export default withRouter(App);
