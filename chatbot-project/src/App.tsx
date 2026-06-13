import { useEffect, useState } from 'react'
import {Chatbot} from 'supersimpledev'

import { ChatInput } from './components/ChatInput' //named export
import  ChatMessages from './components/ChatMessages'; //default export
import './App.css'

        function App(){
          const[chatMessages,setChatMessages] =useState(
            JSON.parse(localStorage.getItem('messages')) || []);
           
            const title = `${chatMessages.length} Messages`
         // const [chatMessages]=array;
         // const[setChatMessages]=array;
         // const chatMessages=array[0];
         //const setChatMessages=array[1];

         useEffect(()=>{
           Chatbot.addResponses({
              'what are you doing':'i am unable to answer this question',
              'who r you?':'i am a chatbot'
           });
         },[])

         useEffect(()=>{
          localStorage.setItem('messages',JSON.stringify(chatMessages))
         },[chatMessages])

            return(
              <>
                  <title>{title}</title>
             <link rel="icon" type="image/svg+xml" href="robot.png" />

                <div className="app-container">
                    <p className='welcome-message'>{chatMessages.length === 0 && 
                      'Welcome to the chatbot project!Send a message using the textbox below'}
                    </p>
                    <ChatMessages chatMessages={chatMessages}/>
                    <ChatInput 
                    chatMessages={chatMessages} 
                    setChatMessages={setChatMessages}
                     />
                </div>
               </> 
        )
        }

export default App
