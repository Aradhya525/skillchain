import React, { useState } from "react";
import { useListUsers } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { getAvatarUrl } from "@/lib/utils";
import { Search, MapPin, Star, GraduationCap } from "lucide-react";

export default function Discover() {
  const { data: users, isLoading } = useListUsers();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Programming", "Design", "Language", "Music", "Photography", "Marketing"];

  // Provide realistic dummy data if API returns empty array for demo purposes
  const displayUsers = users && users.length > 0 ? users : [
    { id: 2, name: "Elena Rodriguez", location: "Remote", trustScore: 98, skillsOffered: [{ name: "Figma UI/UX", level: "expert" }], skillsWanted: [{ name: "React JS", level: "beginner" }] },
    { id: 3, name: "David Kim", location: "New York", trustScore: 85, skillsOffered: [{ name: "Python", level: "advanced" }], skillsWanted: [{ name: "Spanish", level: "beginner" }] },
    { id: 4, name: "Sarah Chen", location: "London", trustScore: 92, skillsOffered: [{ name: "Digital Marketing", level: "expert" }], skillsWanted: [{ name: "Video Editing", level: "intermediate" }] },
    { id: 5, name: "Michael Chang", location: "Remote", trustScore: 78, skillsOffered: [{ name: "Guitar", level: "intermediate" }], skillsWanted: [{ name: "Singing", level: "beginner" }] },
  ];

  const filteredUsers = displayUsers.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.skillsOffered.some(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-display font-extrabold text-slate-900">Discover Talent</h1>
        <p className="text-lg text-slate-600 mt-2 font-medium">Find people with the skills you need.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <Input 
            placeholder="Search by name or skill..." 
            className="pl-12 bg-white"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map(cat => (
            <Button 
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              onClick={() => setSelectedCategory(cat)}
              className="rounded-full whitespace-nowrap"
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="overflow-hidden flex flex-col group">
            <div className="h-24 bg-gradient-to-r from-primary/10 to-accent/10 relative">
              <div className="absolute -bottom-8 left-6">
                <img 
                  src={user.avatar || getAvatarUrl(user.name)} 
                  alt={user.name} 
                  className="w-16 h-16 rounded-2xl border-4 border-white bg-white shadow-md"
                />
              </div>
              <div className="absolute top-4 right-4 bg-white/80 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm text-slate-700">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                {user.trustScore} Trust
              </div>
            </div>
            
            <CardContent className="pt-12 pb-6 px-6 flex-1 flex flex-col">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">{user.name}</h3>
                <div className="flex items-center text-sm text-slate-500 mt-1 gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {user.location || "Remote"}
                </div>
              </div>

              <div className="space-y-4 flex-1">
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5" /> Offers
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {user.skillsOffered.map((skill: any, i: number) => (
                      <Badge key={i} variant="default" className="bg-primary/5 hover:bg-primary/10 text-primary border-primary/20">
                        {skill.name} • {skill.level}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Wants</p>
                  <div className="flex flex-wrap gap-2">
                    {user.skillsWanted.map((skill: any, i: number) => (
                      <Badge key={i} variant="secondary" className="bg-slate-100 text-slate-600 border-slate-200">
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <Button className="w-full rounded-xl" variant="outline">View Profile</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
