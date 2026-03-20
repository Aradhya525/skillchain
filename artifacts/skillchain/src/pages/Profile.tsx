import React from "react";
import { useGetUser } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { getAvatarUrl } from "@/lib/utils";
import { MapPin, Trophy, Star, Clock, Heart, Award } from "lucide-react";

export default function Profile() {
  const { data: user, isLoading } = useGetUser(1);

  const displayUser = user || {
    name: "Aradhya Negi",
    location: "San Francisco, CA",
    bio: "Passionate developer looking to exchange coding skills for design and language knowledge. Believes in the power of community learning.",
    trustScore: 92,
    sessionsCompleted: 45,
    badges: ["Top Teacher", "Quick Learner", "Trusted Exchanger", "Skill Master"],
    skillsOffered: [{ name: "React", level: "expert" }, { name: "Node.js", level: "advanced" }],
    skillsWanted: [{ name: "UI Design", level: "beginner" }, { name: "Spanish", level: "intermediate" }]
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header Profile Card */}
      <Card className="overflow-hidden border-0 shadow-2xl shadow-primary/5">
        <div className="h-48 bg-gradient-to-r from-primary via-purple-500 to-accent relative">
          <div className="absolute top-4 right-4">
            <Badge variant="outline" className="bg-white/20 text-white border-white/40 backdrop-blur-md">
              Joined Jan 2024
            </Badge>
          </div>
        </div>
        <CardContent className="px-8 pb-8 pt-0 relative">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-end -mt-16 mb-6">
            <img 
              src={getAvatarUrl(displayUser.name)} 
              className="w-32 h-32 rounded-3xl border-4 border-white shadow-xl bg-white" 
              alt="Profile" 
            />
            <div className="flex-1 pb-2">
              <h1 className="text-3xl font-display font-extrabold text-slate-900">{displayUser.name}</h1>
              <p className="text-slate-500 flex items-center gap-1 mt-1 font-medium">
                <MapPin className="w-4 h-4" /> {displayUser.location}
              </p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex gap-6 text-center w-full md:w-auto">
              <div>
                <p className="text-2xl font-bold text-primary">{displayUser.sessionsCompleted}</p>
                <p className="text-xs font-semibold text-slate-500 uppercase">Sessions</p>
              </div>
              <div className="w-px bg-slate-200"></div>
              <div>
                <p className="text-2xl font-bold text-amber-500 flex justify-center items-center gap-1">
                  {displayUser.trustScore}
                </p>
                <p className="text-xs font-semibold text-slate-500 uppercase">Trust Score</p>
              </div>
            </div>
          </div>

          <p className="text-slate-600 text-lg leading-relaxed max-w-3xl">
            {displayUser.bio}
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <Card>
            <CardContent className="p-6 space-y-6">
              <h3 className="text-xl font-bold font-display border-b pb-4">Skills & Exchange Preferences</h3>
              
              <div>
                <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Skills I Offer</h4>
                <div className="flex flex-wrap gap-2">
                  {displayUser.skillsOffered.map((skill: any, i: number) => (
                    <Badge key={i} className="px-4 py-2 text-sm bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                      {skill.name} • <span className="opacity-70 ml-1">{skill.level}</span>
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3 mt-6">Skills I Want to Learn</h4>
                <div className="flex flex-wrap gap-2">
                  {displayUser.skillsWanted.map((skill: any, i: number) => (
                    <Badge key={i} variant="secondary" className="px-4 py-2 text-sm">
                      {skill.name} • <span className="opacity-70 ml-1">{skill.level}</span>
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold font-display border-b pb-4 mb-6">Recent Reviews</h3>
              <div className="space-y-6">
                {[
                  { name: "Elena R.", rating: 5, text: "Amazing teacher! Explained React hooks so clearly.", time: "2 days ago" },
                  { name: "David K.", rating: 5, text: "Very patient and knowledgeable. Highly recommend.", time: "1 week ago" }
                ].map((review, i) => (
                  <div key={i} className="flex gap-4">
                    <img src={getAvatarUrl(review.name)} className="w-10 h-10 rounded-full" />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-slate-900">{review.name}</span>
                        <div className="flex text-amber-400">
                          {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                        </div>
                        <span className="text-xs text-slate-400 ml-2">{review.time}</span>
                      </div>
                      <p className="text-sm text-slate-600">{review.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold font-display mb-6">Trust & Reputation</h3>
              
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2 font-bold">
                  <span className="text-slate-700">Excellent Standing</span>
                  <span className="text-primary">{displayUser.trustScore}/100</span>
                </div>
                <Progress value={displayUser.trustScore} className="h-3" />
                <p className="text-xs text-slate-500 mt-2">Based on successful sessions and peer reviews.</p>
              </div>

              <div className="space-y-4 pt-6 border-t border-slate-100">
                <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Earned Badges</h4>
                {displayUser.badges.map((badge: string, i: number) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-200 to-orange-400 flex items-center justify-center text-white shadow-sm">
                      <Award className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-sm text-slate-800">{badge}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
