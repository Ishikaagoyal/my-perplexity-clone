"use client";
import { UserButton } from "@clerk/nextjs";
import { Clock, Link, Send } from "lucide-react";
import React, { useState } from "react";
import moment from "moment";
import { Button } from "@/components/ui/button";

export default function Header({ searchInputrecord }) {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check this out!",
          text: "Here's something interesting I found.",
          url: window.location.href
        });
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      } catch (err) {
        alert("Share cancelled or failed.");
      }
    } else {
      alert("Sharing not supported on this device.");
    }
  };

  return (
    <div className="p-4 border-b flex justify-between items-center bg-background dark:bg-background">
      {/* Left */}
      <div className="flex gap-2 items-center">
        <UserButton />
        <div className="flex gap-1 items-center">
          <Clock className="h-5 w-5 text-gray-500" />
          <h2 className="text-sm text-gray-500">
            {moment.utc(searchInputrecord?.created_at).local().calendar()}
          </h2>
        </div>
      </div>

      {/* Middle */}
      <h2 className="line-clamp-1 max-w-md truncate font-medium text-lg text-muted-foreground">
        {searchInputrecord?.searchinput}
      </h2>

      {/* Right */}
      <div className="flex gap-3 items-center relative">
        <Button onClick={handleCopy} variant="outline" size="sm">
          <Link className="w-4 h-4 mr-1" />
          Copy
        </Button>

        <Button onClick={handleShare} variant="outline" size="sm">
          <Send className="w-4 h-4 mr-1" />
          Share
        </Button>

        {(copied || shared) && (
          <div className="absolute top-12 right-0 text-sm bg-foreground text-background px-3 py-1 rounded shadow transition-opacity animate-fade-in-out z-50">
            {copied ? "Link copied!" : "Shared!"}
          </div>
        )}
      </div>
    </div>
  );
}
