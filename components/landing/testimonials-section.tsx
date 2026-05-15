import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "CampusHire has completely transformed how we manage placements. What used to take weeks now takes hours.",
    author: "Dr. Priya Mehta",
    role: "TPO, IIT Delhi",
    avatar: "PM",
  },
  {
    quote: "The analytics dashboard gives us insights we never had before. We can now make data-driven decisions for our placement strategies.",
    author: "Prof. Rajesh Kumar",
    role: "Placement Coordinator, NIT Trichy",
    avatar: "RK",
  },
  {
    quote: "As a student, I love how easy it is to track my applications and get notified about new opportunities instantly.",
    author: "Ananya Sharma",
    role: "Student, VIT Vellore",
    avatar: "AS",
  },
];

const stats = [
  { value: "100+", label: "Colleges" },
  { value: "50,000+", label: "Students" },
  { value: "500+", label: "Companies" },
  { value: "98%", label: "Satisfaction" },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            Trusted by Leading Institutions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what placement officers and students are saying about CampusHire.
          </p>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center p-6 bg-card rounded-2xl border border-border">
              <p className="text-3xl sm:text-4xl font-bold text-primary mb-2">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
        
        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.author} className="bg-card border-border">
              <CardContent className="p-6">
                <Quote className="w-8 h-8 text-primary/30 mb-4" />
                <p className="text-foreground mb-6 leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">
                      {testimonial.avatar}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
