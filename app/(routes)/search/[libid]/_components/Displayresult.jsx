'use client';
import React, { useState, useEffect, useRef } from "react";
import {
  Loader2,
  Loader2Icon,
  LucideImage,
  LucideList,
  LucideSparkles,
  LucideVideo,
  Send
} from "lucide-react";
import Answerdisplay from "./Answerdisplay";
import axios from "axios";
import { supabase } from "@/services/supabase";
import { useParams } from "next/navigation";
import ImagelistTab from "./ImagelistTab";
import Sourcelisttab from "./Sourcelisttab";
import VideolistTab from "./VideolistTab";
import { Button } from "@/components/ui/button";

export default function Displayresult({ searchInputrecord }) {
  const [activeTab, setActiveTab] = useState("Answer");
  const [searchresult, setSearchresult] = useState(null);
  const { libid } = useParams();
  const [loadingsearch, setLoadingsearch] = useState(false);
  const [userinput, setuserinput] = useState();
  const resultRef = useRef(null); // Scroll-to-latest-chat ref

  useEffect(() => {
    if (!searchInputrecord) return;

    if (searchInputrecord?.chats?.length === 0) {
      getSearchapiResult();
    } else {
      setSearchresult(searchInputrecord);
    }
  }, [searchInputrecord]);

  const getSearchapiResult = async () => {
    setLoadingsearch(true);

    const searchInputValue = userinput ?? searchInputrecord?.searchinput;

    const { data: existingChats } = await supabase
      .from("chats")
      .select("*")
      .eq("libid", libid);

    const existingChat = existingChats?.find(
      chat => chat.usersearchinput?.trim().toLowerCase() === searchInputValue?.trim().toLowerCase()
    );

    if (existingChat) {
      console.log("⚠️ Same chat already exists. Using existing data.");
      await Generateairesp(existingChat.searchResult, existingChat.id);
      await GetsearchRecords(); // Fetch fresh list so scroll target is valid
      setLoadingsearch(false);

      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);

      return;
    }

    const result = await axios.post("/api/brave-search-api", {
      searchInput: searchInputValue,
      searchType: searchInputrecord?.type ?? 'Search',
    });

    const searchResp = result.data;

    const formattedsearchresp = [
      ...(searchResp?.web?.results || []),
      ...(searchResp?.videos?.results || [])
    ].map((item) => ({
      title: item?.title,
      description: item?.description,
      long_name: item?.profile?.long_name ?? null,
      img: item?.profile?.img ?? null,
      url: item?.url,
      thumbnail: item?.thumbnail?.src,
      creator: item?.video?.creator ?? null,
      duration: item?.video?.duration ?? null,
      type: item?.video?.creator ? "video" : "web"
    }));

    const { data } = await supabase
      .from("chats")
      .insert([
        {
          libid,
          searchResult: formattedsearchresp,
          usersearchinput: searchInputValue
        },
      ])
      .select();

    await Generateairesp(formattedsearchresp, data?.[0]?.id);
    await GetsearchRecords(); // Refetch to include new chat
    setLoadingsearch(false);

    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 200);
  };

  const Generateairesp = async (formattedsearchresp, recordId) => {
    const result = await axios.post("/api/llm-model", {
      searchinput: searchInputrecord?.searchinput,
      searchResult: formattedsearchresp,
      recordId
    });

    const runid = result.data;

    const interval = setInterval(async () => {
      const runresp = await axios.post("/api/get-inngest-status", {
        runid
      });

      if (runresp.data.data[0]?.status === "Completed") {
        clearInterval(interval);
        await GetsearchRecords();
      }
    }, 1000);
  };

  const GetsearchRecords = async () => {
    const { data } = await supabase
      .from("Library")
      .select("*, chats(*)")
      .eq("libid", libid);

    const record = data?.[0];

    setSearchresult({
      ...record,
      chats: Array.isArray(record?.chats) ? record.chats : [],
    });
  };

  if (!searchresult) return null;

  return (
    <div className="mt-7">
      {!searchresult?.chats && <div>
        <div className='w-full h-5 bg-accent animate-pulse rounded-md'></div>
        <div className='w-1/2 mt-2 h-5 bg-accent animate-pulse rounded-md'></div>
        <div className='w-[70%] mt-2 h-5 bg-accent animate-pulse rounded-md'></div>
      </div>}

      {Array.isArray(searchresult?.chats) &&
        [...searchresult.chats]
          .sort((a, b) => a.id - b.id) // ✅ sort oldest to newest
          .map((chat, index, arr) => {
            const isLast = index === arr.length - 1; // 🟡 identify the last item
            const sourceCount = chat?.searchResult?.filter(r => r.type === "web")?.length || 0;
            const videoCount = chat?.searchResult?.filter(r => r.type === "video")?.length || 0;
            const imageCount = chat?.searchResult?.filter(r => r.img)?.length || 0;

            const tabs = [
              { label: "Answer", icon: LucideSparkles },
              { label: "Images", icon: LucideImage, badge: imageCount },
              { label: "Videos", icon: LucideVideo, badge: videoCount },
              { label: "Sources", icon: LucideList, badge: sourceCount }
            ];

            return (
              <div
                key={chat.id}
                ref={isLast ? resultRef : null} // ✅ scroll to latest only
                className="mt-10 transition-shadow duration-500 shadow-md rounded-md"
              >
                <h2 className="text-4xl font-bold text-neutral-800 dark:text-neutral-200">
                  {chat?.usersearchinput || searchInputrecord?.searchinput}
                </h2>

                <div className="flex items-center space-x-6 border-b border-gray-200 dark:border-gray-700 pb-2 mt-6">
                  {tabs.map(({ label, icon: Icon, badge }) => (
                    <button
                      key={label}
                      onClick={() => setActiveTab(label)}
                      className={`flex items-center gap-1 relative text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white ${
                        activeTab === label ? "text-black dark:text-white" : ""
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{label}</span>
                      {badge > 0 && (
                        <span className="ml-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-1.5 py-0.5 rounded">
                          {badge}
                        </span>
                      )}
                      {activeTab === label && (
                        <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-black dark:bg-white rounded"></span>
                      )}
                    </button>
                  ))}
                  <div className="ml-auto text-sm text-gray-500 dark:text-gray-400">
                    1 task <span className="ml-1">↗</span>
                  </div>
                </div>

                <div className="mt-4">
                  {activeTab === "Answer" ? (
                    <Answerdisplay chat={chat} loadingsearch={loadingsearch} />
                  ) : activeTab === "Images" ? (
                    <ImagelistTab chat={chat} />
                  ) : activeTab === "Sources" ? (
                    <Sourcelisttab chat={chat} />
                  ) : activeTab === "Videos" ? (
                    <VideolistTab chat={chat} />
                  ) : null}
                </div>

                <hr className="my-6 border-gray-300 dark:border-gray-600" />
              </div>
            );
          })}

      <div className="bg-white dark:bg-gray-900 w-full border rounded-lg border-gray-300 dark:border-gray-700 text-foreground shadow-md p-3 px-5 flex justify-between fixed bottom-6 max-w-md lg:max-w-xl xl:max-w-3xl">
        <input type="text" placeholder="Type Anything..." className="outline-none"
          onChange={(e) => setuserinput(e.target.value)} />
        {userinput?.length && <Button onClick={getSearchapiResult} disabled={loadingsearch}>
          {loadingsearch ? <Loader2Icon className="animate-spin" /> : <Send />}
        </Button>}
      </div>
    </div>
  );
}
