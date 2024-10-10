"use client";

import Image from "next/image";
import FlipClock from "../flip-clock";
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react';

function Clock() {
    const params = useSearchParams();
    let startTime = 0;

    try { 
        startTime = parseInt(params.get("s") ?? "10")
    } catch(e) {
      console.error(e);  
    }

    return (
        <div className="flex items-center justify-center w-screen h-screen flex-col gap-10">
            <img src="/logo-light.png" alt="logo" width="w-[10vh]"/>
            <div className="font-bold">{params.get("message")}</div>
            <FlipClock initialTime={startTime} controls={true}/>
        </div>
    )
}


export default function () {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Clock />    
        </Suspense>
    )
};