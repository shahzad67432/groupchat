import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import React from 'react';
import Message from './Message';

type Props = {
  newMessage: Array<{ msg: string, sender: string }>;
  currentUser: string;
};

function MessageList({ newMessage, currentUser }: Props) {

  return (
    <div className="w-full h-[70vh] px-20">
      {newMessage.map((message, index) => (
        <>
          <Message 
          msg={message.msg} sender={message.sender} key={index} currentUser={currentUser} index={index}/>
        </>
      ))}
    </div>
  );
}

export default MessageList;
