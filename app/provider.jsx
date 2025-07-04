'use client';
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { supabase } from "@/services/supabase";
import { Userdetailcontext } from "@/context/Userdetailcontext";

export default function Provider({children}){
    const {user}= useUser();
    const [userDetail, setUserdetail]= useState();
    useEffect(()=>{
        user && Createnewuser();
    },[user])
    
    const Createnewuser=async()=>{
        
let { data: users, error } = await supabase
  .from('users')
  .select('*')
  .eq('email', user?.primaryEmailAddress.emailAddress);
  console.log(users);
  if(users.length==0){
    
const { data, error } = await supabase
  .from('users')
  .insert([
    { name: user?.fullName,
      email: user?.primaryEmailAddress.emailAddress
     },
  ])
  .select();
  console.log(data);
  setUserdetail(data[0]);
  return;
          

  }
  setUserdetail(users[0]);

          


    }
    return (
        <Userdetailcontext.Provider value={{userDetail, setUserdetail}}>
            <div className="w-full">
            {children}
        </div>

        </Userdetailcontext.Provider>
        
    )
}