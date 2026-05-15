"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Users,
  Search,
  Filter,
  Download,
  Eye,
  Mail,
  Phone,
  BookOpen,
  Github,
  Linkedin,
  FileText,
  CheckCircle2,
  XCircle,
  Clock
} from "lucide-react";
import { mockStudents, branches } from "@/lib/mock-data";
import type { Student } from "@/lib/types";

const statusConfig: Record<string, { color: string; icon: React.ElementType }> = {
  "not-placed": { color: "bg-secondary text-secondary-foreground", icon: Clock },
  placed: { color: "bg-accent/20 text-accent", icon: CheckCircle2 },
  "opted-out": { color: "bg-muted text-muted-foreground", icon: XCircle },
};

export default function AdminStudents() {
  const [searchQuery, setSearchQuery] = useState("");
  const [branchFilter, setBranchFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const filteredStudents = mockStudents.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBranch = branchFilter === "all" || student.branch === branchFilter;
    const matchesStatus = statusFilter === "all" || student.placementStatus === statusFilter;
    return matchesSearch && matchesBranch && matchesStatus;
  });

  const stats = {
    total: mockStudents.length,
    placed: mockStudents.filter((s) => s.placementStatus === "placed").length,
    notPlaced: mockStudents.filter((s) => s.placementStatus === "not-placed").length,
    optedOut: mockStudents.filter((s) => s.placementStatus === "opted-out").length,
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Student Management</h1>
          <p className="text-muted-foreground mt-1">Manage and monitor student profiles</p>
        </div>
        <Button className="gap-2">
          <Download className="w-4 h-4" />
          Export Data
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{stats.total}</p>
                <p className="text-xs text-muted-foreground">Total Students</p>
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
                <p className="text-xl font-bold text-foreground">{stats.placed}</p>
                <p className="text-xs text-muted-foreground">Placed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-chart-3/20 flex items-center justify-center">
                <Clock className="w-5 h-5 text-chart-3" />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{stats.notPlaced}</p>
                <p className="text-xs text-muted-foreground">Not Placed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <XCircle className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{stats.optedOut}</p>
                <p className="text-xs text-muted-foreground">Opted Out</p>
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
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={branchFilter} onValueChange={setBranchFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Branch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Branches</SelectItem>
                {branches.map((branch) => (
                  <SelectItem key={branch} value={branch}>
                    {branch}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="placed">Placed</SelectItem>
                <SelectItem value="not-placed">Not Placed</SelectItem>
                <SelectItem value="opted-out">Opted Out</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Branch</TableHead>
                  <TableHead>CGPA</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Backlogs</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => {
                  const StatusIcon = statusConfig[student.placementStatus]?.icon || Clock;
                  return (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-xs font-semibold text-primary">
                              {student.name.split(" ").map((n) => n[0]).join("")}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{student.name}</p>
                            <p className="text-xs text-muted-foreground">{student.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{student.branch}</TableCell>
                      <TableCell>
                        <span className={student.cgpa >= 8 ? "text-accent font-medium" : ""}>
                          {student.cgpa}
                        </span>
                      </TableCell>
                      <TableCell>{student.graduationYear}</TableCell>
                      <TableCell>
                        <span className={student.backlogs > 0 ? "text-destructive" : "text-accent"}>
                          {student.backlogs}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${statusConfig[student.placementStatus]?.color} gap-1`}>
                          <StatusIcon className="w-3 h-3" />
                          {student.placementStatus.replace("-", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedStudent(student)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {filteredStudents.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
          <p className="text-muted-foreground">No students found matching your criteria</p>
        </div>
      )}

      {/* Student Details Dialog */}
      <Dialog open={!!selectedStudent} onOpenChange={() => setSelectedStudent(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedStudent && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xl font-bold text-primary">
                      {selectedStudent.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <DialogTitle className="text-xl">{selectedStudent.name}</DialogTitle>
                    <DialogDescription>{selectedStudent.branch}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-secondary/50">
                    <p className="text-sm text-muted-foreground mb-1">CGPA</p>
                    <p className="font-semibold text-foreground">{selectedStudent.cgpa}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary/50">
                    <p className="text-sm text-muted-foreground mb-1">Graduation Year</p>
                    <p className="font-semibold text-foreground">{selectedStudent.graduationYear}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary/50">
                    <p className="text-sm text-muted-foreground mb-1">Backlogs</p>
                    <p className="font-semibold text-foreground">{selectedStudent.backlogs}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary/50">
                    <p className="text-sm text-muted-foreground mb-1">Status</p>
                    <Badge className={statusConfig[selectedStudent.placementStatus]?.color}>
                      {selectedStudent.placementStatus.replace("-", " ")}
                    </Badge>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-3">Contact Information</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span>{selectedStudent.email}</span>
                    </div>
                    {selectedStudent.phone && (
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span>{selectedStudent.phone}</span>
                      </div>
                    )}
                    {selectedStudent.github && (
                      <a
                        href={selectedStudent.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                      >
                        <Github className="w-4 h-4 text-muted-foreground" />
                        <span className="text-primary">{selectedStudent.github}</span>
                      </a>
                    )}
                    {selectedStudent.linkedin && (
                      <a
                        href={selectedStudent.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                      >
                        <Linkedin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-primary">{selectedStudent.linkedin}</span>
                      </a>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-3">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedStudent.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-3">Certifications</h4>
                  <div className="space-y-2">
                    {selectedStudent.certifications.map((cert) => (
                      <div key={cert} className="p-3 rounded-lg bg-secondary/50">
                        {cert}
                      </div>
                    ))}
                  </div>
                </div>

                {selectedStudent.resumeUrl && (
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <FileText className="w-5 h-5 text-primary" />
                    <span className="flex-1">Resume uploaded</span>
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
