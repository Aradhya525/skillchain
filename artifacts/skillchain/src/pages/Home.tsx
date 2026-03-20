import React from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useGetPlatformStats } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Users, Zap, Star, ShieldCheck, Sparkles, BookOpen } from "lucide-react";

export default function Home() {
  const { data: stats, isLoading } = useGetPlatformStats();

  const displayStats = stats || {
    totalUsers: 12450,
    totalSessions: 8430,
    totalSkills: 450,
    avgTrustScore: 94
  };

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 min-h-[600px] flex items-center">
        <img 
          src={`${import.meta.env.BASE_URL}images/hero-bg.png`} 
          alt="Abstract gradient background" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
        
        <div className="relative z-10 p-8 md:p-16 max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white backdrop-blur-md border border-white/20 text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4 text-accent" />
              SkillChain AI Matching is Live
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-extrabold text-white leading-tight">
              Opportunities defined by <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-accent">skills</span>, not by money.
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mt-6 max-w-2xl mx-auto font-medium">
              Trade what you know for what you want to learn. Our AI connects you with the perfect skill exchange partner instantly.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/discover">
              <Button size="lg" variant="gradient" className="w-full sm:w-auto h-14 px-8 text-lg rounded-2xl">
                Start Exploring <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/matches">
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-lg rounded-2xl bg-white/10 text-white border-white/20 hover:bg-white/20 hover:border-white/30 backdrop-blur-md">
                View My AI Matches
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Platform Stats */}
      <section>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {[
            { label: "Active Users", value: displayStats.totalUsers.toLocaleString(), icon: Users, color: "text-blue-500" },
            { label: "Skills Exchanged", value: displayStats.totalSessions.toLocaleString(), icon: Zap, color: "text-purple-500" },
            { label: "Available Skills", value: displayStats.totalSkills.toLocaleString(), icon: BookOpen, color: "text-pink-500" },
            { label: "Avg Trust Score", value: `${displayStats.avgTrustScore}%`, icon: ShieldCheck, color: "text-emerald-500" },
          ].map((stat, i) => (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              key={stat.label}
            >
              <Card className="text-center py-8">
                <CardContent className="p-0 space-y-2">
                  <div className={`mx-auto w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-4 ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-3xl font-display font-bold text-slate-900">{stat.value}</h3>
                  <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section className="text-center space-y-12">
        <div className="space-y-4 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold">How SkillChain Works</h2>
          <p className="text-slate-600 font-medium">A structured, fair, and trust-based system to exchange skills.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-1/2 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 -z-10" />
          
          {[
            { step: "01", title: "List Your Skills", desc: "Create a profile detailing what you can teach and what you want to learn." },
            { step: "02", title: "Get AI Matched", desc: "Our smart algorithm finds the perfect partner based on mutual needs." },
            { step: "03", title: "Connect & Exchange", desc: "Book a session, learn together, and leave reviews to build trust." },
          ].map((item, i) => (
            <div key={item.step} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 relative z-10 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center text-2xl font-bold font-display mx-auto mb-6 shadow-lg shadow-primary/30">
                {item.step}
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
