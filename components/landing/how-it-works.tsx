import { UserPlus, Search, Send, Award } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Register & Setup",
    description: "Create your college account and configure placement settings. Add students and companies to the system.",
  },
  {
    icon: Search,
    step: "02",
    title: "Create Drives",
    description: "Post placement drives with eligibility criteria. Students get automatically notified and can apply instantly.",
  },
  {
    icon: Send,
    step: "03",
    title: "Shortlist & Interview",
    description: "Filter and shortlist candidates based on criteria. Schedule interviews with automated reminders.",
  },
  {
    icon: Award,
    step: "04",
    title: "Track & Analyze",
    description: "Publish results, track placements, and generate comprehensive reports for stakeholders.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            How CampusHire Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get started in minutes and transform your placement process with our simple 4-step workflow.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, index) => (
            <div key={item.step} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-full h-0.5 bg-border" />
              )}
              
              <div className="relative bg-card rounded-2xl p-6 border border-border hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <span className="text-4xl font-bold text-secondary">{item.step}</span>
                </div>
                <h3 className="font-semibold text-foreground text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
