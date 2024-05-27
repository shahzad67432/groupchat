"use client";
import { cn } from '@/lib/utilis';
import React, { useEffect, useState } from 'react';

interface MessageProps {
  msg: string;
  index: number;
  sender: string;
  currentUser: string;
}

export default function Message({ msg, index, sender, currentUser}: MessageProps) {
  const isOwnMessage = currentUser === sender;
  return (
    <div key={index} className={cn("flex py-1", isOwnMessage ? "justify-end" : "justify-start")}>
      <h1 className={cn("p-2 font-bold px-4 text-white bg-blue-500 flex items-center text-center rounded-full cursor-pointer", isOwnMessage ? "invisible" : "visible")} title={sender}>
        {sender && sender[0]}
      </h1>
      <p className={cn("p-2 bg-slate-50 text-blue-500", isOwnMessage ? "text-black": "")}>{msg}</p>
    </div>
  );
}