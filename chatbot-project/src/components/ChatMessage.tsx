
import dayjs from 'dayjs'

import userProfileImage from '../assets/girl-profile-pic.png'
import robotProfileImage from '../assets/robot.png'
import loadingSpinner from '../assets/loading-spinner.gif'
import './ChatMessage.css'


type ChatMessageProps ={
    message : string;
    sender : string;
    time: number;
}
export  function ChatMessage({message,sender,time} : ChatMessageProps){
    if (message === "Loading...") {
    return (
      <img
        className="loading-image"
        src={loadingSpinner}
        alt="Loading"
      />
    );
  }
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