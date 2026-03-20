import React, { useState } from "react";
import { useListMessages, useSendMessage } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { getAvatarUrl } from "@/lib/utils";
import { Send, Phone, Video, Info } from "lucide-react";

export default function Messages() {
  const partnerId = 2; // Hardcoded to Elena for prototype
  const { data: messages, refetch } = useListMessages({ userId: 1, partnerId });
  const { mutate: sendMessage, isPending } = useSendMessage();
  const [newMessage, setNewMessage] = useState("");

  const displayMessages = messages && messages.length > 0 ? messages : [
    { id: 1, senderId: 2, content: "Hi Aradhya! I saw we matched. I'd love to learn React from you.", createdAt: new Date(Date.now() - 3600000).toISOString() },
    { id: 2, senderId: 1, content: "Hey Elena! Yes, and I really want to improve my UI skills in Figma. Are you free this weekend?", createdAt: new Date(Date.now() - 3000000).toISOString() },
    { id: 3, senderId: 2, content: "Sunday at 10 AM works perfectly. I'll send a session request.", createdAt: new Date(Date.now() - 1000000).toISOString() },
  ];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    sendMessage({ senderId: 1, receiverId: partnerId, content: newMessage }, {
      onSuccess: () => {
        setNewMessage("");
        refetch();
      }
    });
  };

  return (
    <Card className="flex h-[calc(100vh-120px)] overflow-hidden bg-white">
      {/* Contact List */}
      <div className="w-80 border-r border-slate-100 hidden md:flex flex-col bg-slate-50/50">
        <div className="p-4 border-b border-slate-100 bg-white">
          <h2 className="font-bold text-lg">Messages</h2>
        </div>
        <div className="p-2 space-y-1 overflow-y-auto">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-primary/10 cursor-pointer">
            <div className="relative">
              <img src={getAvatarUrl("Elena Rodriguez")} className="w-12 h-12 rounded-full" />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <p className="font-bold text-sm text-slate-900">Elena Rodriguez</p>
              <p className="text-xs text-slate-500 truncate">Sunday at 10 AM works...</p>
            </div>
          </div>
          {/* Dummy extra contacts */}
          <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 cursor-pointer transition-colors">
            <img src={getAvatarUrl("David Kim")} className="w-12 h-12 rounded-full opacity-60" />
            <div>
              <p className="font-bold text-sm text-slate-700">David Kim</p>
              <p className="text-xs text-slate-400">Can we reschedule?</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        <div className="h-16 border-b border-slate-100 flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <img src={getAvatarUrl("Elena Rodriguez")} className="w-10 h-10 rounded-full" />
            <div>
              <p className="font-bold text-slate-900">Elena Rodriguez</p>
              <p className="text-xs text-emerald-500 font-medium">Online</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-primary"><Phone className="w-5 h-5" /></Button>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-primary"><Video className="w-5 h-5" /></Button>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-primary"><Info className="w-5 h-5" /></Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="text-center">
            <span className="text-xs font-semibold bg-slate-100 text-slate-500 px-3 py-1 rounded-full">Today</span>
          </div>
          
          {displayMessages.map((msg: any) => {
            const isMe = msg.senderId === 1;
            return (
              <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] p-4 rounded-2xl ${isMe ? 'bg-primary text-white rounded-tr-sm' : 'bg-slate-100 text-slate-800 rounded-tl-sm'}`}>
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-4 border-t border-slate-100 bg-slate-50">
          <form onSubmit={handleSend} className="flex gap-2">
            <Input 
              placeholder="Type a message..." 
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              className="flex-1 bg-white border-slate-200"
            />
            <Button type="submit" size="icon" variant="gradient" disabled={!newMessage.trim() || isPending}>
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </Card>
  );
}
