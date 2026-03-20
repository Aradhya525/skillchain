import React from "react";
import { motion } from "framer-motion";
import { useListMatches, useCreateSession } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { getAvatarUrl } from "@/lib/utils";
import { Sparkles, ArrowRightLeft, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";

export default function Matches() {
  // Using userId 1 as the current user
  const { data: matches, isLoading } = useListMatches({ userId: 1 });
  const { mutate: bookSession, isPending } = useCreateSession();

  // Provide realistic dummy data if API is empty
  const displayMatches = matches && matches.length > 0 ? matches : [
    { 
      id: 1, 
      matchScore: 95, 
      sharedSkills: [], 
      complementarySkills: ["React JS", "Figma UI/UX"], 
      status: "suggested",
      user: { id: 2, name: "Elena Rodriguez", trustScore: 98, location: "Remote" }
    },
    { 
      id: 2, 
      matchScore: 82, 
      sharedSkills: ["JavaScript"], 
      complementarySkills: ["Node.js", "Python"], 
      status: "suggested",
      user: { id: 3, name: "David Kim", trustScore: 85, location: "New York" }
    }
  ];

  const handleBookSession = (partnerId: number, offered: string, requested: string) => {
    bookSession({
      initiatorId: 1,
      partnerId,
      skillOffered: offered,
      skillRequested: requested,
      scheduledAt: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
      duration: 60
    }, {
      onSuccess: () => alert("Session booked successfully!"),
      onError: () => alert("Failed to book session. Please try again.")
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
          <img src={`${import.meta.env.BASE_URL}images/ai-brain.png`} alt="AI Brain" className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-4xl font-display font-extrabold text-slate-900">AI Matches</h1>
          <p className="text-lg text-slate-600 mt-1 font-medium">Smart recommendations based on your skills and goals.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {displayMatches.map((match: any, i: number) => (
          <motion.div
            key={match.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="h-full border-2 border-primary/10 hover:border-primary/30">
              <CardContent className="p-8">
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-4">
                    <img 
                      src={getAvatarUrl(match.user.name)} 
                      alt={match.user.name} 
                      className="w-16 h-16 rounded-full shadow-md"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{match.user.name}</h3>
                      <p className="text-sm font-medium text-slate-500">{match.user.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                      {match.matchScore}%
                    </div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Match</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                    <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary" /> Perfect Synergy
                    </h4>
                    
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1 text-center">
                        <p className="text-xs text-slate-500 mb-1">You teach</p>
                        <Badge variant="default">{match.complementarySkills[0] || "Your Skill"}</Badge>
                      </div>
                      
                      <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0 border border-slate-100">
                        <ArrowRightLeft className="w-4 h-4 text-slate-400" />
                      </div>
                      
                      <div className="flex-1 text-center">
                        <p className="text-xs text-slate-500 mb-1">They teach</p>
                        <Badge variant="secondary">{match.complementarySkills[1] || "Their Skill"}</Badge>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-semibold text-slate-700 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Trust Score
                      </span>
                      <span className="font-bold">{match.user.trustScore}/100</span>
                    </div>
                    <Progress value={match.user.trustScore} />
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full" variant="gradient" size="lg">
                        Propose Exchange
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Propose Skill Exchange</DialogTitle>
                        <DialogDescription>
                          You are about to request a session with {match.user.name}.
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="py-6 space-y-6">
                        <div className="flex items-center justify-center gap-6 p-6 bg-slate-50 rounded-2xl">
                          <div className="text-center">
                            <img src={getAvatarUrl("Aradhya")} className="w-12 h-12 rounded-full mx-auto mb-2" />
                            <p className="text-sm font-bold">You</p>
                          </div>
                          <ArrowRightLeft className="text-primary w-6 h-6" />
                          <div className="text-center">
                            <img src={getAvatarUrl(match.user.name)} className="w-12 h-12 rounded-full mx-auto mb-2" />
                            <p className="text-sm font-bold">{match.user.name}</p>
                          </div>
                        </div>
                        <p className="text-sm text-center text-slate-600">
                          This will send a proposal to teach <strong className="text-slate-900">{match.complementarySkills[0]}</strong> in exchange for learning <strong className="text-slate-900">{match.complementarySkills[1]}</strong>.
                        </p>
                      </div>

                      <DialogFooter>
                        <Button 
                          variant="gradient" 
                          className="w-full" 
                          disabled={isPending}
                          onClick={() => handleBookSession(match.user.id, match.complementarySkills[0], match.complementarySkills[1])}
                        >
                          {isPending ? "Sending Proposal..." : "Send Proposal"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
