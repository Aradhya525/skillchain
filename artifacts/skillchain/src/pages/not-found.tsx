import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center">
      <div className="text-center space-y-6 max-w-md p-8 bg-white rounded-3xl shadow-xl border border-slate-100">
        <div className="text-6xl font-display font-extrabold text-slate-200">404</div>
        <h1 className="text-2xl font-bold text-slate-900">Page not found</h1>
        <p className="text-slate-600">The page you're looking for doesn't exist or has been moved.</p>
        <Link href="/">
          <Button variant="gradient" className="w-full">Go Back Home</Button>
        </Link>
      </div>
    </div>
  );
}
