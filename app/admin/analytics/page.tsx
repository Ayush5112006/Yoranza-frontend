"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Download,
  TrendingUp,
  TrendingDown,
  Users,
  Building2,
  Briefcase,
  IndianRupee,
  GraduationCap,
  Target,
  Calendar,
  FileSpreadsheet,
} from "lucide-react"

const placementTrends = [
  { year: "2020", placed: 320, total: 450, percentage: 71 },
  { year: "2021", placed: 380, total: 480, percentage: 79 },
  { year: "2022", placed: 420, total: 500, percentage: 84 },
  { year: "2023", placed: 460, total: 520, percentage: 88 },
  { year: "2024", placed: 490, total: 540, percentage: 91 },
]

const departmentWise = [
  { name: "Computer Science", placed: 145, total: 150, percentage: 97 },
  { name: "Electronics", placed: 98, total: 110, percentage: 89 },
  { name: "Mechanical", placed: 72, total: 90, percentage: 80 },
  { name: "Civil", placed: 55, total: 75, percentage: 73 },
  { name: "Electrical", placed: 68, total: 80, percentage: 85 },
  { name: "IT", placed: 52, total: 55, percentage: 95 },
]

const salaryDistribution = [
  { range: "3-5 LPA", count: 45 },
  { range: "5-8 LPA", count: 120 },
  { range: "8-12 LPA", count: 180 },
  { range: "12-18 LPA", count: 95 },
  { range: "18-25 LPA", count: 40 },
  { range: "25+ LPA", count: 10 },
]

const monthlyPlacements = [
  { month: "Jul", placements: 12, offers: 18 },
  { month: "Aug", placements: 25, offers: 35 },
  { month: "Sep", placements: 45, offers: 60 },
  { month: "Oct", placements: 85, offers: 110 },
  { month: "Nov", placements: 120, offers: 145 },
  { month: "Dec", placements: 95, offers: 120 },
  { month: "Jan", placements: 65, offers: 80 },
  { month: "Feb", placements: 35, offers: 45 },
  { month: "Mar", placements: 18, offers: 25 },
]

const companyTypeDistribution = [
  { name: "Product", value: 35, color: "#0ea5e9" },
  { name: "Service", value: 40, color: "#22c55e" },
  { name: "Startup", value: 15, color: "#f59e0b" },
  { name: "MNC", value: 10, color: "#8b5cf6" },
]

const topRecruiters = [
  { name: "Google", offers: 25, avgPackage: 28 },
  { name: "Microsoft", offers: 22, avgPackage: 26 },
  { name: "Amazon", offers: 30, avgPackage: 24 },
  { name: "TCS", offers: 85, avgPackage: 7 },
  { name: "Infosys", offers: 72, avgPackage: 6.5 },
  { name: "Wipro", offers: 65, avgPackage: 6 },
  { name: "Flipkart", offers: 15, avgPackage: 22 },
  { name: "Adobe", offers: 12, avgPackage: 25 },
]

export default function AnalyticsPage() {
  const [selectedYear, setSelectedYear] = useState("2024")

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Analytics & Reports</h1>
          <p className="text-muted-foreground">
            Comprehensive placement statistics and insights
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
              <SelectItem value="2021">2021</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Placement Rate
            </CardTitle>
            <Target className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">91%</div>
            <div className="flex items-center gap-1 text-sm">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-green-500">+3%</span>
              <span className="text-muted-foreground">from last year</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Package
            </CardTitle>
            <IndianRupee className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.5 LPA</div>
            <div className="flex items-center gap-1 text-sm">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-green-500">+18%</span>
              <span className="text-muted-foreground">from last year</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Highest Package
            </CardTitle>
            <GraduationCap className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48 LPA</div>
            <Badge variant="secondary" className="mt-1">
              Google India
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Companies Visited
            </CardTitle>
            <Building2 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <div className="flex items-center gap-1 text-sm">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-green-500">+12</span>
              <span className="text-muted-foreground">from last year</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Placement Trends (5 Years)</CardTitle>
            <CardDescription>Year-over-year placement statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={placementTrends}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="year" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="placed"
                  name="Placed Students"
                  stroke="#0ea5e9"
                  fill="#0ea5e9"
                  fillOpacity={0.3}
                />
                <Area
                  type="monotone"
                  dataKey="total"
                  name="Total Students"
                  stroke="#94a3b8"
                  fill="#94a3b8"
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Department-wise Placements</CardTitle>
            <CardDescription>Placement statistics by department</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentWise} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis type="number" className="text-xs" />
                <YAxis dataKey="name" type="category" className="text-xs" width={100} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="placed" name="Placed" fill="#22c55e" radius={[0, 4, 4, 0]} />
                <Bar dataKey="total" name="Total" fill="#e2e8f0" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Salary Distribution</CardTitle>
            <CardDescription>Package ranges of placed students</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={salaryDistribution}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="range" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="count" name="Students" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Company Type Distribution</CardTitle>
            <CardDescription>Breakdown by company category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={companyTypeDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {companyTypeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Placements</CardTitle>
            <CardDescription>Placement activity by month</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={monthlyPlacements}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="offers"
                  name="Offers"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dot={{ fill: "#f59e0b" }}
                />
                <Line
                  type="monotone"
                  dataKey="placements"
                  name="Placements"
                  stroke="#22c55e"
                  strokeWidth={2}
                  dot={{ fill: "#22c55e" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Recruiters Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Top Recruiters</CardTitle>
              <CardDescription>Companies with most hires this year</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Export Data
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-sm text-muted-foreground">
                  <th className="pb-3 font-medium">Rank</th>
                  <th className="pb-3 font-medium">Company</th>
                  <th className="pb-3 font-medium">Offers Made</th>
                  <th className="pb-3 font-medium">Avg. Package</th>
                  <th className="pb-3 font-medium">Performance</th>
                </tr>
              </thead>
              <tbody>
                {topRecruiters.map((company, index) => (
                  <tr key={company.name} className="border-b last:border-0">
                    <td className="py-4">
                      <Badge
                        variant={index < 3 ? "default" : "secondary"}
                        className={index < 3 ? "bg-primary" : ""}
                      >
                        #{index + 1}
                      </Badge>
                    </td>
                    <td className="py-4 font-medium">{company.name}</td>
                    <td className="py-4">{company.offers} offers</td>
                    <td className="py-4">{company.avgPackage} LPA</td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-24 overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full bg-primary"
                            style={{ width: `${(company.offers / 85) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {Math.round((company.offers / 85) * 100)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-200/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-blue-500/10 p-3">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Registered</p>
                <p className="text-2xl font-bold">540</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-200/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-green-500/10 p-3">
                <Briefcase className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Placed</p>
                <p className="text-2xl font-bold">490</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border-amber-200/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-amber-500/10 p-3">
                <Calendar className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Drives</p>
                <p className="text-2xl font-bold">186</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-200/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-purple-500/10 p-3">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Offer Acceptance</p>
                <p className="text-2xl font-bold">94%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
