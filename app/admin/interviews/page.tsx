"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Calendar,
  Search,
  Plus,
  Edit,
  Trash2,
  Clock,
  Video,
  MapPin,
  User,
  Building2,
  CheckCircle2,
  XCircle,
  Hourglass
} from "lucide-react";
import { mockInterviews, mockApplications } from "@/lib/mock-data";
import type { Interview } from "@/lib/types";

const roundLabels: Record<string, string> = {
  aptitude: "Aptitude Test",
  technical: "Technical Round",
  hr: "HR Round",
  "group-discussion": "Group Discussion",
};

const statusConfig: Record<string, { color: string; icon: React.ElementType }> = {
  scheduled: { color: "bg-primary/10 text-primary", icon: Calendar },
  completed: { color: "bg-accent/20 text-accent", icon: CheckCircle2 },
  cancelled: { color: "bg-destructive/10 text-destructive", icon: XCircle },
};

const resultConfig: Record<string, { color: string }> = {
  passed: { color: "bg-accent/20 text-accent" },
  failed: { color: "bg-destructive/10 text-destructive" },
  pending: { color: "bg-secondary text-secondary-foreground" },
};

export default function AdminInterviews() {
  const [interviews, setInterviews] = useState<Interview[]>(mockInterviews);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    applicationId: "",
    round: "technical" as Interview["round"],
    roundNumber: "1",
    date: "",
    time: "",
    link: "",
    venue: "",
  });

  const filteredInterviews = interviews.filter((interview) => {
    const app = mockApplications.find((a) => a.id === interview.applicationId);
    const matchesSearch =
      app?.student?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app?.drive?.company?.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || interview.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const resetForm = () => {
    setFormData({
      applicationId: "",
      round: "technical",
      roundNumber: "1",
      date: "",
      time: "",
      link: "",
      venue: "",
    });
  };

  const handleAdd = () => {
    const app = mockApplications.find((a) => a.id === formData.applicationId);
    const newInterview: Interview = {
      id: Date.now().toString(),
      applicationId: formData.applicationId,
      application: app,
      round: formData.round,
      roundNumber: parseInt(formData.roundNumber),
      date: formData.date,
      time: formData.time,
      link: formData.link || undefined,
      venue: formData.venue || undefined,
      mode: formData.link ? "online" : "offline",
      duration: 45,
      status: "scheduled",
      result: "pending",
    };
    
    // Update target student's application status
    if (app) {
      app.status = "interview-scheduled";
    }

    setInterviews([newInterview, ...interviews]);
    setIsAddDialogOpen(false);
    resetForm();
    toast.success(`Successfully scheduled ${formData.round} round for ${app?.student?.name}!`);
  };

  const updateResult = (id: string, result: Interview["result"]) => {
    setInterviews((prev) =>
      prev.map((i) => {
        if (i.id === id) {
          const updated = { ...i, result, status: "completed" as const };
          const app = mockApplications.find((a) => a.id === i.applicationId);
          if (app) {
            if (result === "passed") {
              if (i.round === "hr" || i.roundNumber >= 2) {
                app.status = "selected";
                toast.success(`Result updated: Passed. Student ${app.student?.name} is SELECTED for ${app.drive?.company?.name}!`);
              } else {
                app.status = "shortlisted";
                toast.success(`Result updated: Passed. Student ${app.student?.name} is shortlisted for the next round.`);
              }
            } else if (result === "failed") {
              app.status = "rejected";
              toast.error(`Result updated: Failed. Student ${app.student?.name} has been rejected.`);
            }
          }
          return updated;
        }
        return i;
      })
    );
  };

  const handleDelete = (id: string) => {
    const interviewToDelete = interviews.find((i) => i.id === id);
    setInterviews(interviews.filter((i) => i.id !== id));
    toast.success(`Deleted scheduled interview for ${interviewToDelete?.application?.student?.name}`);
  };

  const stats = {
    total: interviews.length,
    scheduled: interviews.filter((i) => i.status === "scheduled").length,
    completed: interviews.filter((i) => i.status === "completed").length,
    passed: interviews.filter((i) => i.result === "passed").length,
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Interview Management</h1>
          <p className="text-muted-foreground mt-1">Schedule and track interview rounds</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Schedule Interview
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Schedule Interview</DialogTitle>
              <DialogDescription>
                Schedule a new interview round for an applicant.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="application">Application</Label>
                <Select
                  value={formData.applicationId}
                  onValueChange={(value) => setFormData({ ...formData, applicationId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select applicant" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockApplications
                      .filter((a) => a.status === "shortlisted" || a.status === "interview-scheduled")
                      .map((app) => (
                        <SelectItem key={app.id} value={app.id}>
                          {app.student?.name} - {app.drive?.company?.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="round">Round Type</Label>
                  <Select
                    value={formData.round}
                    onValueChange={(value: Interview["round"]) =>
                      setFormData({ ...formData, round: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aptitude">Aptitude Test</SelectItem>
                      <SelectItem value="technical">Technical Round</SelectItem>
                      <SelectItem value="hr">HR Round</SelectItem>
                      <SelectItem value="group-discussion">Group Discussion</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="roundNumber">Round Number</Label>
                  <Input
                    id="roundNumber"
                    type="number"
                    min="1"
                    value={formData.roundNumber}
                    onChange={(e) => setFormData({ ...formData, roundNumber: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="link">Meeting Link (Optional)</Label>
                <Input
                  id="link"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  placeholder="https://meet.google.com/..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="venue">Venue (Optional)</Label>
                <Input
                  id="venue"
                  value={formData.venue}
                  onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                  placeholder="Seminar Hall A"
                />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => {
                  setIsAddDialogOpen(false);
                  resetForm();
                }}>
                  Cancel
                </Button>
                <Button onClick={handleAdd}>Schedule</Button>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{stats.total}</p>
                <p className="text-xs text-muted-foreground">Total Interviews</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-chart-3/20 flex items-center justify-center">
                <Hourglass className="w-5 h-5 text-chart-3" />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{stats.scheduled}</p>
                <p className="text-xs text-muted-foreground">Scheduled</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-secondary-foreground" />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{stats.completed}</p>
                <p className="text-xs text-muted-foreground">Completed</p>
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
                <p className="text-xl font-bold text-foreground">{stats.passed}</p>
                <p className="text-xs text-muted-foreground">Passed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by student name or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Interviews Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Company / Role</TableHead>
                  <TableHead>Round</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Result</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInterviews.map((interview) => {
                  const app = mockApplications.find((a) => a.id === interview.applicationId);
                  const StatusIcon = statusConfig[interview.status]?.icon || Calendar;
                  return (
                    <TableRow key={interview.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="w-4 h-4 text-primary" />
                          </div>
                          <span className="font-medium">{app?.student?.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{app?.drive?.company?.name}</p>
                            <p className="text-xs text-muted-foreground">{app?.drive?.role}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {roundLabels[interview.round]} - R{interview.roundNumber}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span>{interview.date}</span>
                          <Clock className="w-4 h-4 text-muted-foreground ml-2" />
                          <span>{interview.time}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {interview.link ? (
                          <a
                            href={interview.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-primary hover:underline text-sm"
                          >
                            <Video className="w-4 h-4" />
                            Online
                          </a>
                        ) : interview.venue ? (
                          <div className="flex items-center gap-1 text-sm">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            {interview.venue}
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge className={statusConfig[interview.status]?.color}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {interview.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {interview.result && (
                          <Badge className={resultConfig[interview.result]?.color}>
                            {interview.result}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          {interview.status === "scheduled" && (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-accent hover:text-accent"
                                onClick={() => updateResult(interview.id, "passed")}
                              >
                                <CheckCircle2 className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-destructive hover:text-destructive"
                                onClick={() => updateResult(interview.id, "failed")}
                              >
                                <XCircle className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDelete(interview.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {filteredInterviews.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
          <p className="text-muted-foreground">No interviews found</p>
        </div>
      )}
    </div>
  );
}
