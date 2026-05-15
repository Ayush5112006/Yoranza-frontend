"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Building2, 
  Calendar, 
  Clock, 
  Search, 
  Filter,
  MapPin,
  DollarSign,
  Users,
  CheckCircle2,
  AlertCircle,
  ExternalLink
} from "lucide-react";
import { mockDrives, currentStudent, branches } from "@/lib/mock-data";
import type { PlacementDrive } from "@/lib/types";

export default function StudentDrives() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [branchFilter, setBranchFilter] = useState<string>("all");
  const [selectedDrive, setSelectedDrive] = useState<PlacementDrive | null>(null);
  const [applyDialogOpen, setApplyDialogOpen] = useState(false);

  const filteredDrives = mockDrives.filter((drive) => {
    const matchesSearch =
      drive.company?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      drive.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || drive.type === typeFilter;
    const matchesBranch =
      branchFilter === "all" || drive.eligibility.branches.includes(branchFilter);
    const isActiveOrUpcoming = drive.status !== "closed";
    return matchesSearch && matchesType && matchesBranch && isActiveOrUpcoming;
  });

  const checkEligibility = (drive: PlacementDrive) => {
    const eligible = {
      cgpa: currentStudent.cgpa >= drive.eligibility.minCgpa,
      branch: drive.eligibility.branches.includes(currentStudent.branch),
      backlogs: currentStudent.backlogs <= drive.eligibility.maxBacklogs,
      year: currentStudent.graduationYear === drive.eligibility.graduationYear,
    };
    return {
      ...eligible,
      isEligible: eligible.cgpa && eligible.branch && eligible.backlogs && eligible.year,
    };
  };

  const handleApply = () => {
    // Here you would submit the application
    setApplyDialogOpen(false);
    setSelectedDrive(null);
    // Show success message
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Placement Drives</h1>
        <p className="text-muted-foreground mt-1">Browse and apply to active placement opportunities</p>
      </div>

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
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="full-time">Full Time</SelectItem>
                <SelectItem value="internship">Internship</SelectItem>
              </SelectContent>
            </Select>
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
          </div>
        </CardContent>
      </Card>

      {/* Drives List */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredDrives.map((drive) => {
          const eligibility = checkEligibility(drive);
          return (
            <Card key={drive.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{drive.company?.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{drive.role}</p>
                    </div>
                  </div>
                  <Badge variant={drive.status === "active" ? "default" : "secondary"}>
                    {drive.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <DollarSign className="w-4 h-4" />
                    <span>{drive.package}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span className="truncate">{drive.company?.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>Due: {drive.lastDate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{drive.applicantsCount} applied</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {drive.eligibility.branches.slice(0, 2).map((branch) => (
                    <Badge key={branch} variant="outline" className="text-xs">
                      {branch}
                    </Badge>
                  ))}
                  {drive.eligibility.branches.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{drive.eligibility.branches.length - 2} more
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-border">
                  {eligibility.isEligible ? (
                    <span className="flex items-center gap-1 text-sm text-accent">
                      <CheckCircle2 className="w-4 h-4" />
                      Eligible
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-sm text-destructive">
                      <AlertCircle className="w-4 h-4" />
                      Not Eligible
                    </span>
                  )}
                  <div className="flex-1" />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedDrive(drive)}
                  >
                    Details
                  </Button>
                  <Button
                    size="sm"
                    disabled={!eligibility.isEligible || drive.status !== "active"}
                    onClick={() => {
                      setSelectedDrive(drive);
                      setApplyDialogOpen(true);
                    }}
                  >
                    Apply
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredDrives.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
          <p className="text-muted-foreground">No drives found matching your criteria</p>
        </div>
      )}

      {/* Drive Details Dialog */}
      <Dialog open={!!selectedDrive && !applyDialogOpen} onOpenChange={() => setSelectedDrive(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedDrive && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Building2 className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <DialogTitle className="text-xl">{selectedDrive.company?.name}</DialogTitle>
                    <DialogDescription>{selectedDrive.role}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              
              <div className="space-y-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-secondary/50">
                    <p className="text-sm text-muted-foreground mb-1">Package</p>
                    <p className="font-semibold text-foreground">{selectedDrive.package}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary/50">
                    <p className="text-sm text-muted-foreground mb-1">Type</p>
                    <p className="font-semibold text-foreground capitalize">{selectedDrive.type}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary/50">
                    <p className="text-sm text-muted-foreground mb-1">Last Date</p>
                    <p className="font-semibold text-foreground">{selectedDrive.lastDate}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary/50">
                    <p className="text-sm text-muted-foreground mb-1">Interview Date</p>
                    <p className="font-semibold text-foreground">{selectedDrive.interviewDate}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Description</h4>
                  <p className="text-muted-foreground">{selectedDrive.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-3">Eligibility Criteria</h4>
                  <div className="space-y-2">
                    {(() => {
                      const eligibility = checkEligibility(selectedDrive);
                      return (
                        <>
                          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                            <span className="text-sm">Minimum CGPA: {selectedDrive.eligibility.minCgpa}</span>
                            {eligibility.cgpa ? (
                              <CheckCircle2 className="w-5 h-5 text-accent" />
                            ) : (
                              <AlertCircle className="w-5 h-5 text-destructive" />
                            )}
                          </div>
                          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                            <span className="text-sm">
                              Branches: {selectedDrive.eligibility.branches.join(", ")}
                            </span>
                            {eligibility.branch ? (
                              <CheckCircle2 className="w-5 h-5 text-accent" />
                            ) : (
                              <AlertCircle className="w-5 h-5 text-destructive" />
                            )}
                          </div>
                          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                            <span className="text-sm">Max Backlogs: {selectedDrive.eligibility.maxBacklogs}</span>
                            {eligibility.backlogs ? (
                              <CheckCircle2 className="w-5 h-5 text-accent" />
                            ) : (
                              <AlertCircle className="w-5 h-5 text-destructive" />
                            )}
                          </div>
                          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                            <span className="text-sm">
                              Graduation Year: {selectedDrive.eligibility.graduationYear}
                            </span>
                            {eligibility.year ? (
                              <CheckCircle2 className="w-5 h-5 text-accent" />
                            ) : (
                              <AlertCircle className="w-5 h-5 text-destructive" />
                            )}
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>

                {selectedDrive.company?.website && (
                  <a
                    href={selectedDrive.company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:underline"
                  >
                    Visit Company Website
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedDrive(null)}>
                  Close
                </Button>
                <Button
                  disabled={!checkEligibility(selectedDrive).isEligible || selectedDrive.status !== "active"}
                  onClick={() => setApplyDialogOpen(true)}
                >
                  Apply Now
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Apply Confirmation Dialog */}
      <Dialog open={applyDialogOpen} onOpenChange={setApplyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Application</DialogTitle>
            <DialogDescription>
              You are about to apply for {selectedDrive?.role} at {selectedDrive?.company?.name}.
              Make sure your profile and resume are up to date.
            </DialogDescription>
          </DialogHeader>
          <div className="p-4 rounded-lg bg-secondary/50 text-sm">
            <p className="font-medium mb-2">Your Details:</p>
            <p>Name: {currentStudent.name}</p>
            <p>Branch: {currentStudent.branch}</p>
            <p>CGPA: {currentStudent.cgpa}</p>
            <p>Resume: {currentStudent.resumeUrl ? "Uploaded" : "Not uploaded"}</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setApplyDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleApply}>Confirm Application</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
