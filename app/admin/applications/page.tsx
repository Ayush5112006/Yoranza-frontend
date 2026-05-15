"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  FileText,
  Search,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Calendar,
  Clock,
  Building2,
  User,
  Download
} from "lucide-react";
import { mockApplications } from "@/lib/mock-data";
import type { Application } from "@/lib/types";

const statusConfig: Record<string, { color: string; label: string }> = {
  applied: { color: "bg-secondary text-secondary-foreground", label: "Applied" },
  shortlisted: { color: "bg-primary/10 text-primary", label: "Shortlisted" },
  rejected: { color: "bg-destructive/10 text-destructive", label: "Rejected" },
  "interview-scheduled": { color: "bg-chart-3/20 text-chart-3", label: "Interview" },
  selected: { color: "bg-accent/20 text-accent", label: "Selected" },
  waitlisted: { color: "bg-muted text-muted-foreground", label: "Waitlisted" },
};

export default function AdminApplications() {
  const [applications, setApplications] = useState<Application[]>(mockApplications);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.student?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.drive?.company?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.drive?.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateStatus = (id: string, newStatus: Application["status"]) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    );
  };

  const stats = {
    total: applications.length,
    applied: applications.filter((a) => a.status === "applied").length,
    shortlisted: applications.filter((a) => a.status === "shortlisted").length,
    selected: applications.filter((a) => a.status === "selected").length,
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Applications</h1>
          <p className="text-muted-foreground mt-1">Review and manage student applications</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Export
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{stats.total}</p>
                <p className="text-xs text-muted-foreground">Total Applications</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <Clock className="w-5 h-5 text-secondary-foreground" />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{stats.applied}</p>
                <p className="text-xs text-muted-foreground">Pending Review</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-chart-3/20 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-chart-3" />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{stats.shortlisted}</p>
                <p className="text-xs text-muted-foreground">Shortlisted</p>
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
                <p className="text-xl font-bold text-foreground">{stats.selected}</p>
                <p className="text-xs text-muted-foreground">Selected</p>
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
                placeholder="Search by student name, company, or role..."
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

      {/* Applications Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Company / Role</TableHead>
                  <TableHead>Applied On</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xs font-semibold text-primary">
                            {app.student?.name.split(" ").map((n) => n[0]).join("")}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{app.student?.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {app.student?.branch} | CGPA: {app.student?.cgpa}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-foreground">{app.drive?.company?.name}</p>
                          <p className="text-xs text-muted-foreground">{app.drive?.role}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {app.appliedAt}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusConfig[app.status]?.color}>
                        {statusConfig[app.status]?.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => updateStatus(app.id, "shortlisted")}>
                            <CheckCircle2 className="w-4 h-4 mr-2 text-primary" />
                            Shortlist
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updateStatus(app.id, "interview-scheduled")}>
                            <Calendar className="w-4 h-4 mr-2 text-chart-3" />
                            Schedule Interview
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updateStatus(app.id, "selected")}>
                            <CheckCircle2 className="w-4 h-4 mr-2 text-accent" />
                            Mark Selected
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updateStatus(app.id, "waitlisted")}>
                            <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                            Waitlist
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => updateStatus(app.id, "rejected")}
                            className="text-destructive"
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Reject
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {filteredApplications.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
          <p className="text-muted-foreground">No applications found</p>
        </div>
      )}
    </div>
  );
}
