
'use client';
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRight,
  Atom,
  AudioLines,
  Cpu,
  Globe,
  Mic,
  Paperclip,
  SearchCheck,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AImodelsOptions } from "@/services/Shared";
import { useUser } from "@clerk/nextjs";
import { supabase } from "@/services/supabase";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

export default function Chatinputbox() {
  const [usersearchinput, setuserstateinput] = useState();
  const { user } = useUser();
  const [loading, setloading] = useState(false);
  const [searchtype, setsearchtype] = useState("search");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const htmlClass = document.documentElement.classList;
    const observer = new MutationObserver(() => {
      setIsDarkMode(htmlClass.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    setIsDarkMode(htmlClass.contains("dark"));

    return () => observer.disconnect();
  }, []);

  const onSearchQuery = async () => {
    setloading(true);
    const libid = uuidv4();

    const { data } = await supabase.from("Library").insert([
      {
        searchinput: usersearchinput,
        useremail: user?.primaryEmailAddress?.emailAddress,
        type: searchtype,
        libid: libid,
      },
    ]).select();

    router.push("/search/" + libid);
    // Don't set loading false — Next.js handles route transition
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center w-full">
      <Image
        src={isDarkMode ? "/image.png" : "/image1.png"}
        alt="logo"
        width={260}
        height={250}
      />

      <div className="p-2 w-full max-w-2xl border rounded-2xl mt-10">
        <div className="flex justify-between items-end">
          <Tabs defaultValue="Search" className="w-[400px]">
            <TabsContent value="Search">
              <input
                type="text"
                placeholder="Ask anything..."
                className="p-4 w-full outline-none"
                onChange={(e) => setuserstateinput(e.target.value)}
              />
            </TabsContent>
            <TabsContent value="Research">
              <input
                type="text"
                placeholder="Research anything..."
                className="p-4 w-full outline-none"
                onChange={(e) => setuserstateinput(e.target.value)}
              />
            </TabsContent>
            <TabsList>
              <TabsTrigger
                value="Search"
                className="text-primary"
                onClick={() => setsearchtype("search")}
              >
                <SearchCheck /> Search
              </TabsTrigger>
              <TabsTrigger
                value="Research"
                className="text-primary"
                onClick={() => setsearchtype("research")}
              >
                <Atom /> Research
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  <Cpu className="text-gray-500 h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {AImodelsOptions.map((model, index) => (
                  <DropdownMenuItem key={index}>
                    <div className="mb-1">
                      <h2 className="text-sm text-primary font-semibold">
                        {model.name}
                      </h2>
                      <p className="text-xs text-gray-500">{model.desc}</p>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost">
              <Globe className="text-gray-500 h-5 w-5" />
            </Button>
            <Button variant="ghost">
              <Paperclip className="text-gray-500 h-5 w-5" />
            </Button>
            <Button variant="ghost">
              <Mic className="text-gray-500 h-5 w-5" />
            </Button>

            <Button
              disabled={!usersearchinput || loading}
              onClick={() => {
                if (usersearchinput) onSearchQuery();
              }}
              className={`ml-2 ${loading ? "opacity-50 pointer-events-none" : ""}`}
            >
              {loading ? (
                <Loader2 className="animate-spin h-5 w-5 text-gray-800" />
              ) : !usersearchinput ? (
                <AudioLines className="text-black h-5 w-5" />
              ) : (
                <ArrowRight className="text-black h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
