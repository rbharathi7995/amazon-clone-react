
import dayjs from 'dayjs'

import userProfileImage from '../assets/girl-profile-pic.png'
import robotProfileImage from '../assets/robot.png'
import './ChatMessage.css'



export  function ChatMessage({message,sender,time}){
    //const message=props.message;
    //const sender=props.sender;
    //const {message,sender}=props;

    /* if(sender === 'robot'){
        return(
            <div>
            {message}
            <img src="robot.png" width="50"/>
            </div>

        )
    }
    */
   
        return(
            
        <div className={
        sender === 'robot'
            ? 'chat-message-robot'
            : 'chat-message-user'
        }>
        {sender === 'robot' && (
            <img src={robotProfileImage} className='chat-message-profile'/>
        )}
        
        <div className="chat-message-text">
            {message}
            <div className='message-time'>
             {dayjs(time).format('h:mma')}
            </div>
           
        </div>
        
        {sender === 'user' && (
            <img src={userProfileImage} className='chat-message-profile'/> 
        )}   
        </div>
        )

    }