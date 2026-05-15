import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background -z-10" />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              Trusted by 100+ colleges
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
              Streamline Your Campus{" "}
              <span className="text-primary">Placements</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              CampusHire is the all-in-one placement management system that helps colleges 
              manage companies, drives, applications, interviews, and analytics - all in one place.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto gap-2">
                  Start Free Trial
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="#demo">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Watch Demo
                </Button>
              </Link>
            </div>
            
            <div className="flex flex-wrap gap-6 pt-4">
              {[
                "No credit card required",
                "14-day free trial",
                "Cancel anytime",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          
          {/* Dashboard Preview */}
          <div className="relative lg:pl-8">
            <div className="relative bg-card rounded-2xl shadow-2xl border border-border overflow-hidden">
              <div className="p-6 border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive" />
                  <div className="w-3 h-3 rounded-full bg-warning" />
                  <div className="w-3 h-3 rounded-full bg-accent" />
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "Students Placed", value: "285", color: "bg-primary" },
                    { label: "Active Drives", value: "12", color: "bg-accent" },
                    { label: "Companies", value: "45", color: "bg-chart-3" },
                  ].map((stat) => (
                    <div key={stat.label} className="p-4 bg-secondary rounded-xl">
                      <div className={`w-8 h-8 ${stat.color} rounded-lg mb-3`} />
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3">
                  <div className="h-3 bg-secondary rounded-full w-full" />
                  <div className="h-3 bg-secondary rounded-full w-4/5" />
                  <div className="h-3 bg-secondary rounded-full w-3/5" />
                </div>
                
                <div className="flex gap-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex-1 h-24 bg-secondary rounded-xl" />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/20 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
