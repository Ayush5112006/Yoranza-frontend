"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building2,
  Calendar,
  Clock,
  Search,
  ExternalLink,
  Video,
  MapPin,
  FileText,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Hourglass
} from "lucide-react";
import { mockApplications, mockInterviews, currentStudent } from "@/lib/mock-data";

const statusConfig: Record<string, { color: string; icon: React.ElementType }> = {
  applied: { color: "bg-secondary text-secondary-foreground", icon: Hourglass },
  shortlisted: { color: "bg-primary/10 text-primary", icon: CheckCircle2 },
  rejected: { color: "bg-destructive/10 text-destructive", icon: XCircle },
  "interview-scheduled": { color: "bg-chart-3/20 text-chart-3", icon: Calendar },
  selected: { color: "bg-accent/20 text-accent", icon: CheckCircle2 },
  waitlisted: { color: "bg-muted text-muted-foreground", icon: AlertCircle },
};

export default function StudentApplications() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const studentApplications = mockApplications.filter((a) => a.studentId === currentStudent.id);
  const studentInterviews = mockInterviews.filter((i) =>
    studentApplications.some((a) => a.id === i.applicationId)
  );

  const filteredApplications = studentApplications.filter((app) => {
    const matchesSearch =
      app.drive?.company?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.drive?.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getInterviewForApplication = (applicationId: string) => {
    return studentInterviews.find((i) => i.applicationId === applicationId);
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">My Applications</h1>
        <p className="text-muted-foreground mt-1">Track your application status and interviews</p>
      </div>

      <Tabs defaultValue="applications" className="space-y-6">
        <TabsList>
          <TabsTrigger value="applications" className="gap-2">
            <FileText className="w-4 h-4" />
            Applications ({studentApplications.length})
          </TabsTrigger>
          <TabsTrigger value="interviews" className="gap-2">
            <Calendar className="w-4 h-4" />
            Interviews ({studentInterviews.filter((i) => i.status === "scheduled").length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="applications" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by company or role..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="applied">Applied</SelectItem>
                    <SelectItem value="shortlisted">Shortlisted</SelectItem>
                    <SelectItem value="interview-scheduled">Interview Scheduled</SelectItem>
                    <SelectItem value="selected">Selected</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="waitlisted">Waitlisted</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Applications List */}
          <div className="space-y-4">
            {filteredApplications.map((app) => {
              const StatusIcon = statusConfig[app.status]?.icon || AlertCircle;
              const interview = getInterviewForApplication(app.id);

              return (
                <Card key={app.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <Building2 className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground">{app.drive?.company?.name}</h3>
                          <p className="text-sm text-muted-foreground">{app.drive?.role}</p>
                          <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              Applied: {app.appliedAt}
                            </span>
                            <span>{app.drive?.package}</span>
                            <Badge variant={app.drive?.type === "internship" ? "secondary" : "outline"}>
                              {app.drive?.type}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Badge className={`${statusConfig[app.status]?.color} gap-1`}>
                          <StatusIcon className="w-3 h-3" />
                          {app.status.replace("-", " ")}
                        </Badge>
                      </div>
                    </div>

                    {/* Interview Info (if scheduled) */}
                    {interview && interview.status === "scheduled" && (
                      <div className="mt-4 p-4 rounded-lg bg-secondary/50 border border-border">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <p className="font-medium text-foreground capitalize">
                              {interview.round.replace("-", " ")} Round - Round {interview.roundNumber}
                            </p>
                            <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {interview.date}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {interview.time}
                              </span>
                              {interview.venue && (
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  {interview.venue}
                                </span>
                              )}
                            </div>
                          </div>
                          {interview.link && (
                            <a href={interview.link} target="_blank" rel="noopener noreferrer">
                              <Button size="sm" className="gap-2">
                                <Video className="w-4 h-4" />
                                Join Meeting
                              </Button>
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}

            {filteredApplications.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                <p className="text-muted-foreground">No applications found</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="interviews" className="space-y-6">
          {/* Upcoming Interviews */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">Upcoming Interviews</h2>
            <div className="space-y-4">
              {studentInterviews
                .filter((i) => i.status === "scheduled")
                .map((interview) => {
                  const app = studentApplications.find((a) => a.id === interview.applicationId);
                  return (
                    <Card key={interview.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                          <div className="flex items-start gap-4 flex-1">
                            <div className="w-12 h-12 rounded-lg bg-chart-3/20 flex items-center justify-center shrink-0">
                              <Calendar className="w-6 h-6 text-chart-3" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-foreground capitalize">
                                {interview.round.replace("-", " ")} Round
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {app?.drive?.company?.name} - {app?.drive?.role}
                              </p>
                              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {interview.date}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {interview.time}
                                </span>
                                {interview.venue && (
                                  <span className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    {interview.venue}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant="outline">Round {interview.roundNumber}</Badge>
                            {interview.link && (
                              <a href={interview.link} target="_blank" rel="noopener noreferrer">
                                <Button className="gap-2">
                                  <Video className="w-4 h-4" />
                                  Join Meeting
                                </Button>
                              </a>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}

              {studentInterviews.filter((i) => i.status === "scheduled").length === 0 && (
                <div className="text-center py-12">
                  <Calendar className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                  <p className="text-muted-foreground">No upcoming interviews</p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
