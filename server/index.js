const express = require('express');
const app = express();
const key = require('fs').readFileSync('./private.key','utf8')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const userModel = require('./models/user');
const messageModel = require('./models/message');

//
app.use(require('cors')());
//mongodb://localhost:27017/react-chat
mongoose.connect('mongodb://hirosume:cuong299@ds155730.mlab.com:55730/react-chat',function(err){
    if(err){
        console.log(err);
    } else {
        console.log('connected mongodb');
    }
});
var session = new Map();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
io.on('connection',(socket)=>{
    socket.isAuthenticated = false;
    console.log('a connection');
    socket.use((packet,next)=>{
        if(packet[1]&&packet[1].token){
            packet[1].user = session.get(packet[1].token)
        }
        next();
    })
    socket.on('login',function(user){
        let {username,password} = user;
        if(username.trim()&&password.trim()){
            userModel.findOrCreate({username,password},(err,data,created)=>{
                let datae ={};
                if(err){
                    datae ={err};
                    return ;
                } else {
                    socket.isAuthenticated = true;
                    socket.join('authenticated');
                    jwt.sign(user,key,(err,token)=>{
                        if(!err){
                            datae = {username:data.username,token};
                            session.set(token,data);
                            socket.emit('afterLog',datae);
                        }
                    });
                }
            })
        }
        
    });
    socket.on('disconnect',function(){
        console.log('diss')
    });
    socket.on('loadMessage-c',({size})=>{
        if(socket.isAuthenticated){
            messageModel.find({})
            .populate('sender','username').exec((err,mes)=>{
                socket.emit('loadMessage-s',mes)
            })
        }
    })
    socket.on('message',(mes)=>{
        if(socket.isAuthenticated){
            let {text,user} = mes;
            messageModel.create({text,timestamp:new Date(),sender:user._id})
            io.to('authenticated').emit('messagee',{text:text,sender:user.username})
        }
    });
    socket.on('checkLogin',(key)=>{
        if(session.has(key)){
            socket.isAuthenticated = true;
            socket.join('authenticated');
            socket.emit('afterLog',{username:session.get(key).username})
        }
    })
})
server.listen(process.env.PORT||4000,()=>{
    console.log('server is running');

})