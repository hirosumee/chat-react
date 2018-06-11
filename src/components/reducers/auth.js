import socket from '../../socket';
export default (state = {isLogin:false,user:{}}, action) => {
    switch (action.type) {
        case 'Login': 
            socket.emit('login',action.user);
            return state;
        case 'AfterLog':
            return Object.assign({}, state, {
                isLogin:true,
                user:{name:action.username}
            })
        case 'Logout':{
            return Object.assign({}, state, {
                isLogin:false,
                user:{}
            })
        }
        default:
            return state;
    }
};