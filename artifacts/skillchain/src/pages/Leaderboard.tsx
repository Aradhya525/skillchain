import React from "react";
import { useListUsers } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { getAvatarUrl } from "@/lib/utils";
import { Trophy, Medal, Star, Flame } from "lucide-react";

export default function Leaderboard() {
  const { data: users, isLoading } = useListUsers();

  const displayUsers = users && users.length > 0 ? users : [
    { id: 2, name: "Elena Rodriguez", trustScore: 98, sessionsCompleted: 82 },
    { id: 1, name: "Aradhya Negi", trustScore: 92, sessionsCompleted: 45 },
    { id: 3, name: "David Kim", trustScore: 85, sessionsCompleted: 30 },
    { id: 4, name: "Sarah Chen", trustScore: 82, sessionsCompleted: 28 },
    { id: 5, name: "Michael Chang", trustScore: 78, sessionsCompleted: 15 },
  ];

  const sortedUsers = [...displayUsers].sort((a, b) => b.trustScore - a.trustScore);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
          <Trophy className="w-8 h-8 text-amber-600" />
        </div>
        <h1 className="text-4xl font-display font-extrabold text-slate-900">Top Exchangers</h1>
        <p className="text-lg text-slate-600 mt-2 font-medium">The most trusted and active members of the SkillChain community.</p>
      </div>

      <div className="space-y-4">
        {sortedUsers.map((user, index) => {
          const isTop3 = index < 3;
          return (
            <Card key={user.id} className={`overflow-hidden transition-transform duration-300 hover:scale-[1.01] ${index === 0 ? 'border-2 border-amber-300 shadow-xl shadow-amber-500/10' : ''}`}>
              <CardContent className="p-0">
                <div className={`flex items-center p-4 sm:p-6 ${index === 0 ? 'bg-gradient-to-r from-amber-50 to-white' : ''}`}>
                  <div className="w-12 text-center flex-shrink-0 font-display font-extrabold text-2xl">
                    {index === 0 ? <span className="text-amber-500">1</span> : 
                     index === 1 ? <span className="text-slate-400">2</span> : 
                     index === 2 ? <span className="text-amber-700">3</span> : 
                     <span className="text-slate-300">{index + 1}</span>}
                  </div>
                  
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <img 
                      src={getAvatarUrl(user.name)} 
                      alt={user.name} 
                      className={`w-12 h-12 rounded-full ${index === 0 ? 'border-2 border-amber-400' : ''}`}
                    />
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 truncate flex items-center gap-2">
                        {user.name} 
                        {index === 0 && <Medal className="w-4 h-4 text-amber-500" />}
                      </h3>
                      <p className="text-sm text-slate-500">{user.sessionsCompleted} sessions completed</p>
                    </div>
                  </div>

                  <div className="text-right pl-4 border-l border-slate-100">
                    <div className="flex items-center justify-end gap-1 mb-1">
                      <Star className={`w-4 h-4 ${isTop3 ? 'text-amber-500 fill-amber-500' : 'text-slate-400'}`} />
                      <span className="text-xl font-bold font-display text-slate-900">{user.trustScore}</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-500 uppercase">Trust Score</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
