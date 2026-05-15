"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { 
  Briefcase, 
  FileText, 
  Calendar, 
  Bell,
  ArrowRight,
  Building2,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { mockDrives, mockApplications, mockInterviews, mockNotifications, currentStudent } from "@/lib/mock-data";

const statusColors: Record<string, string> = {
  applied: "bg-secondary text-secondary-foreground",
  shortlisted: "bg-primary/10 text-primary",
  rejected: "bg-destructive/10 text-destructive",
  "interview-scheduled": "bg-warning/20 text-warning-foreground",
  selected: "bg-accent/20 text-accent-foreground",
  waitlisted: "bg-muted text-muted-foreground",
};

export default function StudentDashboard() {
  const activeDrives = mockDrives.filter((d) => d.status === "active");
  const studentApplications = mockApplications.filter((a) => a.studentId === currentStudent.id);
  const upcomingInterviews = mockInterviews.filter(
    (i) => i.status === "scheduled" && studentApplications.some((a) => a.id === i.applicationId)
  );
  const unreadNotifications = mockNotifications.filter((n) => !n.read);

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
          Welcome back, {currentStudent.name.split(" ")[0]}!
        </h1>
        <p className="text-muted-foreground mt-1">
          Here&apos;s what&apos;s happening with your placements
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{activeDrives.length}</p>
                <p className="text-sm text-muted-foreground">Active Drives</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                <FileText className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{studentApplications.length}</p>
                <p className="text-sm text-muted-foreground">Applications</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-chart-3/20 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-chart-3" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{upcomingInterviews.length}</p>
                <p className="text-sm text-muted-foreground">Interviews</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                <Bell className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{unreadNotifications.length}</p>
                <p className="text-sm text-muted-foreground">Unread</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Applications */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Applications</CardTitle>
            <Link href="/student/applications">
              <Button variant="ghost" size="sm" className="gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {studentApplications.slice(0, 3).map((app) => (
              <div key={app.id} className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">
                    {app.drive?.company?.name}
                  </p>
                  <p className="text-sm text-muted-foreground truncate">
                    {app.drive?.role}
                  </p>
                </div>
                <Badge className={statusColors[app.status]}>
                  {app.status.replace("-", " ")}
                </Badge>
              </div>
            ))}
            {studentApplications.length === 0 && (
              <div className="text-center py-6 text-muted-foreground">
                <FileText className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p>No applications yet</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Interviews */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Upcoming Interviews</CardTitle>
            <Link href="/student/applications">
              <Button variant="ghost" size="sm" className="gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingInterviews.map((interview) => (
              <div key={interview.id} className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50">
                <div className="w-10 h-10 rounded-lg bg-chart-3/20 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-chart-3" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate capitalize">
                    {interview.round.replace("-", " ")} Round
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{interview.date} at {interview.time}</span>
                  </div>
                </div>
                <Badge variant="outline">Round {interview.roundNumber}</Badge>
              </div>
            ))}
            {upcomingInterviews.length === 0 && (
              <div className="text-center py-6 text-muted-foreground">
                <Calendar className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p>No upcoming interviews</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Active Drives */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Active Placement Drives</CardTitle>
          <Link href="/student/drives">
            <Button variant="ghost" size="sm" className="gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeDrives.slice(0, 3).map((drive) => (
              <div key={drive.id} className="p-4 rounded-xl border border-border bg-card hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-primary" />
                  </div>
                  <Badge variant={drive.type === "internship" ? "secondary" : "default"}>
                    {drive.type}
                  </Badge>
                </div>
                <h3 className="font-semibold text-foreground mb-1">{drive.company?.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{drive.role}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-primary">{drive.package}</span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>Due: {drive.lastDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Profile Completion Alert */}
      {!currentStudent.resumeUrl && (
        <Card className="border-warning/50 bg-warning/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-warning/20 flex items-center justify-center shrink-0">
                <AlertCircle className="w-5 h-5 text-warning-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">Complete Your Profile</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Upload your resume and add skills to increase visibility to recruiters.
                </p>
                <Link href="/student/profile">
                  <Button size="sm">Update Profile</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
