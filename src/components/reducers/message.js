import socket from '../../socket';
let initialState = {
    messages :[]
}
function message(state = initialState, action) {
    switch (action.type) {
        case 'send':
            let me={
                position: 'right',
                type: 'text',
                text: action.text,
                date: new Date(),
            }
            socket.emit('message',{text:action.text,token:localStorage.getItem('key')})
            // return Object.assign({}, state, {
            //     messages:[...state.messages,me]
            // });
            return state;
        case 'receive':{
            console.log(action)
            let me={
                title:action.message.sender,
                position:action.message.sender==action.cuser? 'right':'left',
                type: 'text',
                text: action.message.text,
                date: new Date(),
            }

            return Object.assign({}, state, {
                messages:[...state.messages,me]
            });
        }
        case 'load':{
            let me = action.messages.map((mi)=>{
                let temp ={
                    title:mi.sender.username,
                    position: mi.sender.username==action.cuser?'right':'left',
                    type: 'text',
                    text: mi.text,
                    date: new Date(),
                };
                return temp;
                
            })
            return Object.assign({}, state, {
                messages:[...state.messages,...me]
            });
        }
        case 'clear':{
            return Object.assign({}, state, {
                messages:[]
            });
        }
        default:
            return state
    }
}
export default message;