import dayjs from 'dayjs'
import { useState } from 'react'
import {Chatbot} from 'supersimpledev'
import loadingSpinner from '../assets/loading-spinner.gif'
import './ChatInput.css'


export function ChatInput({chatMessages,setChatMessages}){
          const[inputText,setInputText]=useState('');
          const[isLoading,setIsLoading]=useState(false);


          function saveInputText(event){
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
                  message:<img className='loading-image' src={loadingSpinner}></img>,
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
                  id:crypto.randomUUID()
                }
                 ]);
                 
               setIsLoading(false); 
          }
        
         function keyDownEvent(event){
         
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
              size="30"
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