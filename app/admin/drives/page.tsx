"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  Briefcase,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Users,
  DollarSign,
  Building2,
  Clock
} from "lucide-react";
import { mockDrives, mockCompanies, branches } from "@/lib/mock-data";
import type { PlacementDrive } from "@/lib/types";

const statusColors: Record<string, string> = {
  active: "bg-accent/20 text-accent",
  closed: "bg-muted text-muted-foreground",
  upcoming: "bg-primary/10 text-primary",
};

export default function AdminDrives() {
  const [drives, setDrives] = useState<PlacementDrive[]>(mockDrives);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedDrive, setSelectedDrive] = useState<PlacementDrive | null>(null);
  const [formData, setFormData] = useState({
    companyId: "",
    role: "",
    package: "",
    type: "full-time" as "full-time" | "internship",
    lastDate: "",
    interviewDate: "",
    description: "",
    minCgpa: "7.0",
    maxBacklogs: "0",
    graduationYear: "2024",
    selectedBranches: [] as string[],
  });

  const filteredDrives = drives.filter((drive) => {
    const matchesSearch =
      drive.company?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      drive.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || drive.status === statusFilter;
    const matchesType = typeFilter === "all" || drive.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const resetForm = () => {
    setFormData({
      companyId: "",
      role: "",
      package: "",
      type: "full-time",
      lastDate: "",
      interviewDate: "",
      description: "",
      minCgpa: "7.0",
      maxBacklogs: "0",
      graduationYear: "2024",
      selectedBranches: [],
    });
  };

  const handleAdd = () => {
    const company = mockCompanies.find((c) => c.id === formData.companyId);
    const newDrive: PlacementDrive = {
      id: Date.now().toString(),
      companyId: formData.companyId,
      company,
      role: formData.role,
      package: formData.package,
      type: formData.type,
      lastDate: formData.lastDate,
      interviewDate: formData.interviewDate,
      description: formData.description,
      eligibility: {
        minCgpa: parseFloat(formData.minCgpa),
        branches: formData.selectedBranches,
        maxBacklogs: parseInt(formData.maxBacklogs),
        graduationYear: parseInt(formData.graduationYear),
      },
      status: "active",
      applicantsCount: 0,
    };
    setDrives([newDrive, ...drives]);
    setIsAddDialogOpen(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    setDrives(drives.filter((d) => d.id !== id));
  };

  const toggleBranch = (branch: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedBranches: prev.selectedBranches.includes(branch)
        ? prev.selectedBranches.filter((b) => b !== branch)
        : [...prev.selectedBranches, branch],
    }));
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Placement Drives</h1>
          <p className="text-muted-foreground mt-1">Create and manage placement drives</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Create Drive
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Drive</DialogTitle>
              <DialogDescription>
                Set up a new placement or internship drive.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Select
                    value={formData.companyId}
                    onValueChange={(value) => setFormData({ ...formData, companyId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select company" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockCompanies.map((company) => (
                        <SelectItem key={company.id} value={company.id}>
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Job Role</Label>
                  <Input
                    id="role"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="Software Development Engineer"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="package">Package</Label>
                  <Input
                    id="package"
                    value={formData.package}
                    onChange={(e) => setFormData({ ...formData, package: e.target.value })}
                    placeholder="12 LPA or 40K/month"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value: "full-time" | "internship") =>
                      setFormData({ ...formData, type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full Time</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastDate">Last Date to Apply</Label>
                  <Input
                    id="lastDate"
                    type="date"
                    value={formData.lastDate}
                    onChange={(e) => setFormData({ ...formData, lastDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="interviewDate">Interview Date</Label>
                  <Input
                    id="interviewDate"
                    type="date"
                    value={formData.interviewDate}
                    onChange={(e) => setFormData({ ...formData, interviewDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Job description and requirements..."
                  rows={3}
                />
              </div>

              <div className="space-y-4 pt-4 border-t border-border">
                <h4 className="font-semibold text-foreground">Eligibility Criteria</h4>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="minCgpa">Minimum CGPA</Label>
                    <Input
                      id="minCgpa"
                      type="number"
                      step="0.1"
                      min="0"
                      max="10"
                      value={formData.minCgpa}
                      onChange={(e) => setFormData({ ...formData, minCgpa: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxBacklogs">Max Backlogs</Label>
                    <Input
                      id="maxBacklogs"
                      type="number"
                      min="0"
                      value={formData.maxBacklogs}
                      onChange={(e) => setFormData({ ...formData, maxBacklogs: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="graduationYear">Graduation Year</Label>
                    <Select
                      value={formData.graduationYear}
                      onValueChange={(value) => setFormData({ ...formData, graduationYear: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[2024, 2025, 2026, 2027].map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Eligible Branches</Label>
                  <div className="flex flex-wrap gap-2">
                    {branches.map((branch) => (
                      <Badge
                        key={branch}
                        variant={formData.selectedBranches.includes(branch) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleBranch(branch)}
                      >
                        {branch}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => {
                  setIsAddDialogOpen(false);
                  resetForm();
                }}>
                  Cancel
                </Button>
                <Button onClick={handleAdd}>Create Drive</Button>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>
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
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
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
          </div>
        </CardContent>
      </Card>

      {/* Drives Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company / Role</TableHead>
                  <TableHead>Package</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Last Date</TableHead>
                  <TableHead>Applicants</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDrives.map((drive) => (
                  <TableRow key={drive.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{drive.company?.name}</p>
                          <p className="text-sm text-muted-foreground">{drive.role}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-primary">{drive.package}</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={drive.type === "internship" ? "secondary" : "outline"}>
                        {drive.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {drive.lastDate}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        {drive.applicantsCount}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[drive.status]}>{drive.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedDrive(drive)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDelete(drive.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {filteredDrives.length === 0 && (
        <div className="text-center py-12">
          <Briefcase className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
          <p className="text-muted-foreground">No drives found</p>
        </div>
      )}

      {/* Drive Details Dialog */}
      <Dialog open={!!selectedDrive} onOpenChange={() => setSelectedDrive(null)}>
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
                    <p className="text-sm text-muted-foreground mb-1">Applicants</p>
                    <p className="font-semibold text-foreground">{selectedDrive.applicantsCount}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary/50">
                    <p className="text-sm text-muted-foreground mb-1">Status</p>
                    <Badge className={statusColors[selectedDrive.status]}>{selectedDrive.status}</Badge>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Description</h4>
                  <p className="text-muted-foreground">{selectedDrive.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-3">Eligibility Criteria</h4>
                  <div className="space-y-2">
                    <div className="p-3 rounded-lg bg-secondary/50">
                      <span className="text-sm">Minimum CGPA: {selectedDrive.eligibility.minCgpa}</span>
                    </div>
                    <div className="p-3 rounded-lg bg-secondary/50">
                      <span className="text-sm">Max Backlogs: {selectedDrive.eligibility.maxBacklogs}</span>
                    </div>
                    <div className="p-3 rounded-lg bg-secondary/50">
                      <span className="text-sm">Graduation Year: {selectedDrive.eligibility.graduationYear}</span>
                    </div>
                    <div className="p-3 rounded-lg bg-secondary/50">
                      <span className="text-sm">
                        Branches: {selectedDrive.eligibility.branches.join(", ")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-secondary/50">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <Calendar className="w-4 h-4" />
                      Last Date
                    </div>
                    <p className="font-semibold text-foreground">{selectedDrive.lastDate}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary/50">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <Calendar className="w-4 h-4" />
                      Interview Date
                    </div>
                    <p className="font-semibold text-foreground">{selectedDrive.interviewDate}</p>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedDrive(null)}>
                  Close
                </Button>
                <Button>View Applications</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
