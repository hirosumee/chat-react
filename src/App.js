import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,UncontrolledDropdown
  ,DropdownToggle
  ,DropdownMenu,DropdownItem } from 'reactstrap';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import {connect} from 'react-redux';
import socket from './socket';

class App extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
    socket.on('afterLog',(data)=>{
      if(data.err){
          
      } else {
        if(data.token){
          localStorage.setItem('key',data.token);
        }        
        this.props.AfterLog(data.username);
        socket.emit('loadMessage-c',{size:10,token:localStorage.getItem('key')}); 
      }
    }); 
    socket.on('messagee',(data)=>{
      this.props.ReceiveMessage(data,this.props.auth.user.name);
    });
    socket.on('loadMessage-s',(data)=>{
      this.props.LoadMessage(data,this.props.auth.user.name)
    });
    socket.emit('checkLogin',localStorage.getItem('key'));  
    socket.emit('loadMessage-c',{size:10,token:localStorage.getItem('key')}); 
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  logout() {
    this.props.Logout();
    localStorage.clear();
    this.props.ClearMessage();
  }
  showBtnNavbar(){
    
    if(this.props.auth.isLogin){
        return (<UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          {this.props.auth.user.name}
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem onClick={()=>{this.logout()}}>
            Logout
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>)
    }
    
  }
  render() {
    return (
      <Router>
      <div>
        <Navbar color="primary" dark expand="md">
          <NavbarBrand href="/">Chat React</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {/* <NavItem>
                <Link to="/" style={{color:'white',marginRight:10}}>
                  Home
                </Link> 
              </NavItem> */}
                {this.showBtnNavbar()}
              {/* <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Option 1
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown> */}
            </Nav>
          </Collapse>
        </Navbar>
        <Container>
          {/* my app body */}
            <div>
              <Route exact path="/" component={Home}></Route>
              <Route path="/login" component={Login}></Route>
            </div>
        </Container>
      </div>
      </Router>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
      AfterLog:(username)=>{
        dispatch({type:'AfterLog',username})
      },
      ReceiveMessage:(message,cuser)=>{
        dispatch({type:'receive',message,cuser});
      },
      LoadMessage:(messages,cuser)=>{
        dispatch({type:'load',messages,cuser});
      },
      Logout:()=>{
        dispatch({type:'Logout'});
      },
      ClearMessage:()=>{
        dispatch({type:'clear'})
      }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
