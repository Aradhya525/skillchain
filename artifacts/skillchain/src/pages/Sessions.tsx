import React, { useState } from "react";
import { useListSessions, useUpdateSession } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Calendar, Clock, Video, CheckCircle, XCircle } from "lucide-react";
import { getAvatarUrl } from "@/lib/utils";

export default function Sessions() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const { data: sessions, isLoading, refetch } = useListSessions({ userId: 1 });
  const { mutate: updateSession, isPending } = useUpdateSession();

  // Dummy fallback data
  const displaySessions = sessions && sessions.length > 0 ? sessions : [
    {
      id: 1, status: "confirmed", scheduledAt: new Date(Date.now() + 86400000).toISOString(), duration: 60,
      skillOffered: "React JS", skillRequested: "UI Design",
      partner: { name: "Elena Rodriguez" }
    },
    {
      id: 2, status: "pending", scheduledAt: new Date(Date.now() + 172800000).toISOString(), duration: 45,
      skillOffered: "English", skillRequested: "Spanish",
      partner: { name: "David Kim" }
    },
    {
      id: 3, status: "completed", scheduledAt: new Date(Date.now() - 86400000).toISOString(), duration: 60,
      skillOffered: "Python", skillRequested: "Data Analysis",
      partner: { name: "Sarah Chen" }
    }
  ];

  const upcoming = displaySessions.filter((s: any) => ["pending", "confirmed"].includes(s.status));
  const past = displaySessions.filter((s: any) => ["completed", "cancelled"].includes(s.status));

  const handleStatusChange = (id: number, status: "completed" | "cancelled" | "confirmed") => {
    updateSession({ id, data: { status } }, {
      onSuccess: () => refetch()
    });
  };

  const SessionCard = ({ session }: { session: any }) => (
    <Card className="mb-4 overflow-hidden border-l-4" style={{ borderLeftColor: session.status === 'confirmed' ? '#8b5cf6' : session.status === 'pending' ? '#f59e0b' : '#10b981' }}>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl min-w-[120px]">
            <Calendar className="w-6 h-6 text-primary mb-2" />
            <span className="text-sm font-bold text-slate-900">{format(new Date(session.scheduledAt), "MMM d")}</span>
            <span className="text-xs text-slate-500">{format(new Date(session.scheduledAt), "h:mm a")}</span>
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
              <img src={getAvatarUrl(session.partner.name)} className="w-8 h-8 rounded-full" />
              <h3 className="text-lg font-bold text-slate-900">Exchange with {session.partner.name}</h3>
              <Badge variant={
                session.status === "confirmed" ? "default" : 
                session.status === "pending" ? "outline" : 
                session.status === "completed" ? "success" : "destructive"
              }>
                {session.status.toUpperCase()}
              </Badge>
            </div>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-slate-600 mt-4">
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {session.duration} min</span>
              <span className="flex items-center gap-1 font-medium"><span className="text-primary">Teaching:</span> {session.skillOffered}</span>
              <span className="flex items-center gap-1 font-medium"><span className="text-accent">Learning:</span> {session.skillRequested}</span>
            </div>
          </div>

          <div className="flex gap-2">
            {session.status === "confirmed" && (
              <>
                <Button variant="default" className="gap-2">
                  <Video className="w-4 h-4" /> Join Call
                </Button>
                <Button variant="outline" size="icon" onClick={() => handleStatusChange(session.id, "completed")}>
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                </Button>
              </>
            )}
            {session.status === "pending" && (
              <>
                <Button variant="outline" onClick={() => handleStatusChange(session.id, "confirmed")}>Accept</Button>
                <Button variant="ghost" className="text-destructive" onClick={() => handleStatusChange(session.id, "cancelled")}>Decline</Button>
              </>
            )}
            {session.status === "completed" && (
              <Button variant="outline" className="gap-2 text-primary border-primary/20">
                Leave Review
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-display font-extrabold text-slate-900">Sessions</h1>
          <p className="text-lg text-slate-600 mt-1 font-medium">Manage your upcoming and past skill exchanges.</p>
        </div>
      </div>

      <div className="flex gap-4 border-b border-border">
        <button 
          onClick={() => setActiveTab("upcoming")}
          className={`pb-4 text-sm font-bold transition-colors ${activeTab === "upcoming" ? "text-primary border-b-2 border-primary" : "text-slate-500 hover:text-slate-900"}`}
        >
          Upcoming ({upcoming.length})
        </button>
        <button 
          onClick={() => setActiveTab("past")}
          className={`pb-4 text-sm font-bold transition-colors ${activeTab === "past" ? "text-primary border-b-2 border-primary" : "text-slate-500 hover:text-slate-900"}`}
        >
          Past Sessions ({past.length})
        </button>
      </div>

      <div className="space-y-4">
        {activeTab === "upcoming" ? (
          upcoming.length > 0 ? upcoming.map((s: any) => <SessionCard key={s.id} session={s} />) : <div className="p-12 text-center text-slate-500">No upcoming sessions.</div>
        ) : (
          past.length > 0 ? past.map((s: any) => <SessionCard key={s.id} session={s} />) : <div className="p-12 text-center text-slate-500">No past sessions.</div>
        )}
      </div>
    </div>
  );
}
