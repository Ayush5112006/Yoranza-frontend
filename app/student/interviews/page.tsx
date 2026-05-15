"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Clock, 
  Video, 
  MapPin, 
  Building2,
  Search,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  CalendarDays
} from "lucide-react";
import { mockInterviews, mockApplications, currentStudent } from "@/lib/mock-data";

const roundColors: Record<string, string> = {
  aptitude: "bg-chart-1/20 text-chart-1",
  technical: "bg-chart-2/20 text-chart-2",
  hr: "bg-chart-3/20 text-chart-3",
  "group-discussion": "bg-chart-4/20 text-chart-4",
};

const statusColors: Record<string, string> = {
  scheduled: "bg-primary/10 text-primary",
  completed: "bg-accent/20 text-accent",
  cancelled: "bg-destructive/10 text-destructive",
};

export default function StudentInterviewsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("upcoming");

  // Get student's applications and their interviews
  const studentApplications = mockApplications.filter((a) => a.studentId === currentStudent.id);
  const studentInterviews = mockInterviews.filter((interview) =>
    studentApplications.some((app) => app.id === interview.applicationId)
  );

  // Separate upcoming and past interviews
  const today = new Date();
  const upcomingInterviews = studentInterviews.filter((i) => {
    const interviewDate = new Date(i.date);
    return interviewDate >= today && i.status === "scheduled";
  });
  const pastInterviews = studentInterviews.filter((i) => {
    const interviewDate = new Date(i.date);
    return interviewDate < today || i.status !== "scheduled";
  });

  const filteredUpcoming = upcomingInterviews.filter((interview) => {
    const app = studentApplications.find((a) => a.id === interview.applicationId);
    const companyName = app?.drive?.company?.name?.toLowerCase() || "";
    const role = app?.drive?.role?.toLowerCase() || "";
    return (
      companyName.includes(searchQuery.toLowerCase()) ||
      role.includes(searchQuery.toLowerCase()) ||
      interview.round.includes(searchQuery.toLowerCase())
    );
  });

  const filteredPast = pastInterviews.filter((interview) => {
    const app = studentApplications.find((a) => a.id === interview.applicationId);
    const companyName = app?.drive?.company?.name?.toLowerCase() || "";
    const role = app?.drive?.role?.toLowerCase() || "";
    return (
      companyName.includes(searchQuery.toLowerCase()) ||
      role.includes(searchQuery.toLowerCase()) ||
      interview.round.includes(searchQuery.toLowerCase())
    );
  });

  const getApplicationDetails = (applicationId: string) => {
    return studentApplications.find((a) => a.id === applicationId);
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">My Interviews</h1>
        <p className="text-muted-foreground mt-1">View and manage your scheduled interviews</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{upcomingInterviews.length}</p>
                <p className="text-xs text-muted-foreground">Upcoming</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {pastInterviews.filter((i) => i.status === "completed").length}
                </p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-chart-3/20 flex items-center justify-center">
                <Video className="w-5 h-5 text-chart-3" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {studentInterviews.filter((i) => i.mode === "online").length}
                </p>
                <p className="text-xs text-muted-foreground">Online</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-chart-4/20 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-chart-4" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {studentInterviews.filter((i) => i.mode === "offline").length}
                </p>
                <p className="text-xs text-muted-foreground">In-Person</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by company, role, or round..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="upcoming" className="gap-2">
            <CalendarDays className="w-4 h-4" />
            Upcoming ({upcomingInterviews.length})
          </TabsTrigger>
          <TabsTrigger value="past" className="gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Past ({pastInterviews.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-6">
          {filteredUpcoming.length > 0 ? (
            <div className="grid gap-4">
              {filteredUpcoming.map((interview) => {
                const app = getApplicationDetails(interview.applicationId);
                return (
                  <Card key={interview.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col lg:flex-row">
                        {/* Left Section - Date */}
                        <div className="lg:w-32 p-4 bg-primary/5 flex flex-row lg:flex-col items-center justify-center gap-2 lg:gap-1 border-b lg:border-b-0 lg:border-r border-border">
                          <Calendar className="w-5 h-5 text-primary lg:mb-1" />
                          <div className="text-center">
                            <p className="text-lg font-bold text-foreground">{interview.date}</p>
                            <p className="text-sm text-muted-foreground">{interview.time}</p>
                          </div>
                        </div>

                        {/* Right Section - Details */}
                        <div className="flex-1 p-4">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                                <Building2 className="w-5 h-5 text-muted-foreground" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-foreground">
                                  {app?.drive?.company?.name}
                                </h3>
                                <p className="text-sm text-muted-foreground">{app?.drive?.role}</p>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <Badge className={roundColors[interview.round]}>
                                {interview.round.replace("-", " ")} Round
                              </Badge>
                              <Badge variant="outline">Round {interview.roundNumber}</Badge>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{interview.duration} mins</span>
                            </div>
                            <div className="flex items-center gap-1">
                              {interview.mode === "online" ? (
                                <>
                                  <Video className="w-4 h-4" />
                                  <span>Online Interview</span>
                                </>
                              ) : (
                                <>
                                  <MapPin className="w-4 h-4" />
                                  <span>{interview.venue || "Campus"}</span>
                                </>
                              )}
                            </div>
                          </div>

                          {interview.link && interview.mode === "online" && (
                            <a
                              href={interview.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex"
                            >
                              <Button size="sm" className="gap-2">
                                <Video className="w-4 h-4" />
                                Join Meeting
                                <ExternalLink className="w-3 h-3" />
                              </Button>
                            </a>
                          )}

                          {interview.instructions && (
                            <div className="mt-3 p-3 rounded-lg bg-secondary/50">
                              <p className="text-xs font-medium text-muted-foreground mb-1">Instructions:</p>
                              <p className="text-sm text-foreground">{interview.instructions}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-lg font-semibold text-foreground mb-1">No Upcoming Interviews</h3>
                <p className="text-muted-foreground">
                  {searchQuery
                    ? "No interviews match your search criteria"
                    : "You don't have any scheduled interviews at the moment"}
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="past" className="mt-6">
          {filteredPast.length > 0 ? (
            <div className="grid gap-4">
              {filteredPast.map((interview) => {
                const app = getApplicationDetails(interview.applicationId);
                return (
                  <Card key={interview.id} className="overflow-hidden opacity-80">
                    <CardContent className="p-0">
                      <div className="flex flex-col lg:flex-row">
                        {/* Left Section - Date */}
                        <div className="lg:w-32 p-4 bg-secondary/50 flex flex-row lg:flex-col items-center justify-center gap-2 lg:gap-1 border-b lg:border-b-0 lg:border-r border-border">
                          <Calendar className="w-5 h-5 text-muted-foreground lg:mb-1" />
                          <div className="text-center">
                            <p className="text-lg font-bold text-foreground">{interview.date}</p>
                            <p className="text-sm text-muted-foreground">{interview.time}</p>
                          </div>
                        </div>

                        {/* Right Section - Details */}
                        <div className="flex-1 p-4">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                                <Building2 className="w-5 h-5 text-muted-foreground" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-foreground">
                                  {app?.drive?.company?.name}
                                </h3>
                                <p className="text-sm text-muted-foreground">{app?.drive?.role}</p>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <Badge className={roundColors[interview.round]}>
                                {interview.round.replace("-", " ")} Round
                              </Badge>
                              <Badge className={statusColors[interview.status]}>
                                {interview.status}
                              </Badge>
                            </div>
                          </div>

                          {interview.feedback && (
                            <div className="mt-3 p-3 rounded-lg bg-secondary/50">
                              <p className="text-xs font-medium text-muted-foreground mb-1">Feedback:</p>
                              <p className="text-sm text-foreground">{interview.feedback}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <CheckCircle2 className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-lg font-semibold text-foreground mb-1">No Past Interviews</h3>
                <p className="text-muted-foreground">
                  {searchQuery
                    ? "No past interviews match your search criteria"
                    : "You haven't completed any interviews yet"}
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Interview Tips Card */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-primary" />
            Interview Preparation Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" />
              <span>Research the company thoroughly before the interview</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" />
              <span>Test your internet connection for online interviews</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" />
              <span>Join 5-10 minutes early for online meetings</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" />
              <span>Keep your resume and documents ready</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" />
              <span>Practice common technical and HR questions</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" />
              <span>Dress professionally even for online interviews</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
