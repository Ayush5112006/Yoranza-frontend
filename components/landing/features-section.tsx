import { Card, CardContent } from "@/components/ui/card";
import { 
  Users, 
  Building2, 
  Calendar, 
  FileText, 
  Bell, 
  BarChart3,
  Shield,
  Smartphone
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Student Management",
    description: "Manage student profiles, resumes, skills, and track placement status all in one place.",
  },
  {
    icon: Building2,
    title: "Company Portal",
    description: "Organize company information, HR contacts, and hiring history efficiently.",
  },
  {
    icon: Calendar,
    title: "Drive Management",
    description: "Create and manage placement drives with eligibility criteria and automatic filtering.",
  },
  {
    icon: FileText,
    title: "Application Tracking",
    description: "Track applications from submission to selection with real-time status updates.",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Automated email and in-app notifications for drives, interviews, and results.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Comprehensive analytics on placements, packages, and department-wise statistics.",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Enterprise-grade security with role-based access control and data encryption.",
  },
  {
    icon: Smartphone,
    title: "Mobile Responsive",
    description: "Access the platform from any device - desktop, tablet, or mobile.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            Everything You Need to Manage Placements
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A complete suite of tools designed specifically for Training and Placement Officers 
            to streamline the entire placement process.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={feature.title} 
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border bg-card"
            >
              <CardContent className="p-6">
                <div 
                  className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
