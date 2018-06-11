import React, { Component } from 'react';
import 'react-chat-elements/dist/main.css';
import {Button,ButtonGroup,Col,Row} from 'reactstrap';
import { MessageList,ChatList,Input  } from 'react-chat-elements';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
class Home extends Component {
    constructor(props) {
        super(props);
        
    }
    
    render() {
        if(!this.props.auth.isLogin){
            return <Redirect to='/login' />;
        }
        return (
            <Row>
                <Col md="3">
                    <ChatList
                        className='chat-list'
                        dataSource={[
                            {
                                avatar: 'https://facebook.github.io/react/img/logo.svg',
                                alt: 'Reactjs',
                                title: 'Facebook',
                                subtitle: 'What are you doing?',
                                date: new Date(),
                                unread: 0,
                            }
                    ]} />
                </Col>
                <Col>
                    {/* message list */}
                    <div style={{height:500,padding: '8px 24px', overflowY: 'scroll'}}>
                        <MessageList
                        className='message-list'
                        lockable={true}
                        toBottomHeight={'100%'}
                        dataSource={this.props.message.messages} />
                    </div>
                    <Input
                        ref={(node)=>{this.messageRef = node}}
                        placeholder="Type here..."
                        multiline={false}
                        rightButtons={
                            <Button
                                onClick={()=>{
                                    this.props.SendMessage(this.messageRef.state.value)
                                }}
                                color='success'
                                >Send</Button>
                    }/>
                </Col>
            </Row> 
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        message: state.message,
        auth:state.auth
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        SendMessage: (text) => {
            dispatch({type:'send',text})
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Home);