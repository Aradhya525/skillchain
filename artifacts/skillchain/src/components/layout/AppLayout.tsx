import React from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Home, Compass, Zap, Calendar, MessageSquare, User, Trophy, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Compass, label: "Discover", href: "/discover" },
  { icon: Zap, label: "My Matches", href: "/matches" },
  { icon: Calendar, label: "Sessions", href: "/sessions" },
  { icon: MessageSquare, label: "Messages", href: "/messages" },
  { icon: Trophy, label: "Leaderboard", href: "/leaderboard" },
  { icon: User, label: "Profile", href: "/profile" },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-2 font-display font-bold text-xl text-primary">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white">S</div>
          SkillChain
        </div>
        <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-transform duration-300 ease-in-out lg:translate-x-0",
        mobileMenuOpen ? "translate-x-0 mt-16 lg:mt-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          <div className="h-20 flex items-center px-8 hidden lg:flex">
            <Link href="/" className="flex items-center gap-3 font-display font-bold text-2xl text-slate-900 dark:text-white transition-opacity hover:opacity-80">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white shadow-lg shadow-primary/20">
                S
              </div>
              SkillChain
            </Link>
          </div>

          <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = location === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 group",
                    isActive 
                      ? "bg-primary text-white shadow-md shadow-primary/25" 
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                  )}
                >
                  <item.icon className={cn("w-5 h-5 transition-transform group-hover:scale-110 duration-300", isActive ? "text-white" : "text-slate-400 group-hover:text-primary")} />
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="p-6 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aradhya&backgroundColor=d1d4f9" alt="User" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">Aradhya Negi</p>
                <p className="text-xs text-slate-500 font-medium">1,250 Trust Score</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-72 pt-16 lg:pt-0">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 min-h-screen">
          {children}
        </div>
      </main>
    </div>
  );
}
