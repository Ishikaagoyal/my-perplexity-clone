'use client';

import { useParams } from "next/navigation";
import { supabase } from "@/services/supabase";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import Header from "./_components/Header";
import { SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Displayresult from "./_components/Displayresult";



export default function SearchQueryresult() {
  const { libid } = useParams();
  const { isLoaded, isSignedIn, user } = useUser();

  const [searchInputrecord, setSearchInputrecord] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded && isSignedIn && libid) {
      fetchRecord();
    }
  }, [isLoaded, isSignedIn, libid]);

  const fetchRecord = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("Library")
      .select("*, chats(*)")
      .eq("libid", libid);
      

    if (error) {
      console.error("Supabase error:", error.message);
    } else {
      setSearchInputrecord(data?.[0] || null);
      console.log(data?.[0])
    }
    

    setLoading(false);
  };

  if (!isLoaded) return <div className="p-4">Loading session...</div>;

  if (!isSignedIn) {
    return (
      <div className="p-4">
        <p className="mb-4">You're not signed in.</p>
        <SignInButton mode="modal">
          <Button>Sign In</Button>
        </SignInButton>
      </div>
    );
  }

  if (loading) return <div className="p-4">Loading data...</div>;
  if (!searchInputrecord) return <div className="p-4">No record found.</div>;

  return (
    <div>
      <Header searchInputrecord={searchInputrecord} />
      <div className="px-10 md:px-20 lg:px-36 xl:px-56 mt-20">
        <Displayresult searchInputrecord= {searchInputrecord}/>

      </div>
      
    </div>
  );
}
