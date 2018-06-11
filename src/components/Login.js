import React, { Component } from 'react';
import {ButtonGroup , Button} from 'reactstrap';
import { connect } from 'react-redux';
import { Form , FormGroup, Label, Input} from 'reactstrap';
import {Redirect} from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {click:false};
        
    }
    signIn(){
        this.props.Login({username:this.usernameRef.value,password:this.passwordRef.value});
    }
    showForm(){
        if(this.state.click){
            return (
                    <Form inline>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="exampleEmail" className="mr-sm-2">Email</Label>
                        <Input  type="email" innerRef={(node)=>{this.usernameRef=node;}} name="email" id="exampleEmail" placeholder="something@idk.cool" />
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="examplePassword" className="mr-sm-2">Password</Label>
                        <Input type="password" innerRef={(node)=>{this.passwordRef=node;}} name="password" id="examplePassword" placeholder="don't tell!" />
                        </FormGroup>
                        <Button color="primary" onClick={()=>{this.signIn()}}>Login or Sign up</Button>
                    </Form>
            )
        }
    }
    render() {
        if(this.props.auth.isLogin){
            return <Redirect to='/' />
        }
        return (
            <div>
                <div className="h-100 d-flex justify-content-center" style={{paddingTop:100}}>
                    <div className="my-auto">
                        <ButtonGroup>
                            <Button color="danger">Google</Button>
                            <Button color="secondary" onClick={()=>{this.setState({click:!this.state.click})}}>Manual</Button>
                            <Button color="primary">Facebook</Button>
                        </ButtonGroup>
                    </div>   
                </div>
                <div className="h-100 d-flex justify-content-center" style={{paddingTop:100}}>
                    <div className="my-auto">
                        {this.showForm()}
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        auth:state.auth
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        Login: (user) => {
            dispatch({type:'Login',user});
        },
        AfterLog:(username)=>{
            dispatch({type:'AfterLog',username})
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login);