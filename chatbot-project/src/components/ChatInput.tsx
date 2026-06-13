import dayjs from 'dayjs'
import React, { useState } from 'react'
import {Chatbot} from 'supersimpledev'
import './ChatInput.css'

type ChatInputProps = {
  chatMessages:{
    id : string;
    message :string;
    sender : string;
    time: number
  }[];

  setChatMessages : (chatMessages :{
    id : string;
    message :string;
    sender : string;
    time: number
  }[]) => void;
};


export function ChatInput({chatMessages,setChatMessages} : ChatInputProps){
          const[inputText,setInputText]=useState('');
          const[isLoading,setIsLoading]=useState(false);


          function saveInputText(
            event : {
            target :{
              value : string;
            }
          }) {
           setInputText(event.target.value);
          }
        
        async function sendMessage(){
         
         if(inputText==='' || isLoading){
            return;
          }

          setIsLoading(true);
          
            const newChatMessages=[  
                 ...chatMessages,
                {
                  message:inputText,
                  sender:'user',
                  id:crypto.randomUUID(),
                  time:dayjs().valueOf()
                }
                 ];
                setChatMessages(newChatMessages); //because we using setChatMessages function ,react will also updating the html
                  setInputText('');

                setChatMessages([  //because we using setChatMessages function react will also updating the html
               
                ...newChatMessages,
                
                {
                  message:"Loading",
                  sender:'robot',
                  id:crypto.randomUUID(),
                  time:dayjs().valueOf()
                   
                }  
                 ]);

                 const response=await Chatbot.getResponseAsync(inputText);
              
                setChatMessages([  //because we using setChatMessages function react will also updating the html
                 ...newChatMessages,
                {
                  message:response,
                  sender:'robot',
                  id:crypto.randomUUID(),
                  time:dayjs().valueOf()

                }
                 ]);
                 
               setIsLoading(false); 
          }
        
         function keyDownEvent(
          event: React.KeyboardEvent<HTMLInputElement>
              //This tells TypeScript:
              //event is a keyboard event
              //It comes from an HTML input element
        ){
         
             if(event.key === "Enter"){
              sendMessage();
             }

             if(event.key === "Escape"){
              setInputText('')
             }

         }

         function clearMessages(){
           setChatMessages([])
         }
 
        return(
         <div className="input-container">
            <input
              placeholder="Send a message to Chatbot" 
              size={30} 
              onChange={saveInputText}
              value={inputText}
              onKeyDown={keyDownEvent}
              className="input-name"
             
            />
            <button onClick={sendMessage}
            className='send-button'>Send</button>  
            <button onClick={clearMessages}
            className='chat-clear-button'>Clear</button>
         </div>  
        )

        }