"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { 
  Users, 
  Building2, 
  Briefcase, 
  Award,
  TrendingUp,
  ArrowRight,
  Calendar,
  FileText,
  Clock
} from "lucide-react";
import { mockAnalytics, mockDrives, mockApplications, mockStudents } from "@/lib/mock-data";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))"];

export default function AdminDashboard() {
  const recentApplications = mockApplications.slice(0, 5);
  const activeDrives = mockDrives.filter((d) => d.status === "active");

  const pieData = mockAnalytics.departmentWisePlacements.map((d) => ({
    name: d.department,
    value: d.placed,
  }));

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">Overview of placement activities</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{mockAnalytics.totalStudents}</p>
                <p className="text-sm text-muted-foreground">Total Students</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                <Award className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{mockAnalytics.placedStudents}</p>
                <p className="text-sm text-muted-foreground">Placed Students</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-chart-3/20 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-chart-3" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{mockAnalytics.companiesVisited}</p>
                <p className="text-sm text-muted-foreground">Companies</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 lg:p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-chart-4/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-chart-4" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{mockAnalytics.placementPercentage}%</p>
                <p className="text-sm text-muted-foreground">Placement Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Package Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6 text-center">
            <p className="text-3xl font-bold text-primary">{mockAnalytics.highestPackage}</p>
            <p className="text-sm text-muted-foreground mt-1">Highest Package</p>
          </CardContent>
        </Card>
        <Card className="bg-accent/5 border-accent/20">
          <CardContent className="p-6 text-center">
            <p className="text-3xl font-bold text-accent">{mockAnalytics.averagePackage}</p>
            <p className="text-sm text-muted-foreground mt-1">Average Package</p>
          </CardContent>
        </Card>
        <Card className="bg-chart-3/5 border-chart-3/20">
          <CardContent className="p-6 text-center">
            <p className="text-3xl font-bold text-chart-3">{mockAnalytics.internshipCount}</p>
            <p className="text-sm text-muted-foreground mt-1">Internships</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Monthly Placements Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Monthly Placements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockAnalytics.monthlyPlacements}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="placements" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Department-wise Placements */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Department-wise Placements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/admin/drives" className="block">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Briefcase className="w-4 h-4" />
                Create New Drive
              </Button>
            </Link>
            <Link href="/admin/companies" className="block">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Building2 className="w-4 h-4" />
                Add Company
              </Button>
            </Link>
            <Link href="/admin/students" className="block">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Users className="w-4 h-4" />
                Manage Students
              </Button>
            </Link>
            <Link href="/admin/analytics" className="block">
              <Button variant="outline" className="w-full justify-start gap-2">
                <TrendingUp className="w-4 h-4" />
                View Reports
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Active Drives */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Active Drives</CardTitle>
            <Link href="/admin/drives">
              <Button variant="ghost" size="sm" className="gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {activeDrives.slice(0, 4).map((drive) => (
              <div key={drive.id} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {drive.company?.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{drive.applicantsCount} applicants</p>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {drive.type}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Applications */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Applications</CardTitle>
            <Link href="/admin/applications">
              <Button variant="ghost" size="sm" className="gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentApplications.map((app) => (
              <div key={app.id} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {app.student?.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {app.drive?.company?.name}
                  </p>
                </div>
                <Badge
                  variant={app.status === "shortlisted" ? "default" : "secondary"}
                  className="text-xs"
                >
                  {app.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
