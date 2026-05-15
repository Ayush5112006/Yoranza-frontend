"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Bell,
  Send,
  Mail,
  MessageSquare,
  Users,
  Building2,
  Filter,
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
  Trash2,
} from "lucide-react"

interface Notification {
  id: string
  title: string
  message: string
  type: "email" | "sms" | "push"
  recipients: string
  status: "sent" | "scheduled" | "draft"
  sentAt?: string
  scheduledFor?: string
  recipientCount: number
}

const notifications: Notification[] = [
  {
    id: "1",
    title: "Google Placement Drive Tomorrow",
    message: "Reminder: Google placement drive is scheduled for tomorrow at 9 AM. Please be present at the auditorium.",
    type: "email",
    recipients: "All Eligible Students",
    status: "sent",
    sentAt: "2024-01-14 10:30 AM",
    recipientCount: 245,
  },
  {
    id: "2",
    title: "Profile Update Required",
    message: "Please update your profile with latest CGPA and certifications before the Microsoft drive.",
    type: "push",
    recipients: "CS & IT Students",
    status: "sent",
    sentAt: "2024-01-13 2:15 PM",
    recipientCount: 180,
  },
  {
    id: "3",
    title: "Amazon Interview Schedule",
    message: "Your interview with Amazon has been scheduled. Check your dashboard for details.",
    type: "email",
    recipients: "Shortlisted Candidates",
    status: "scheduled",
    scheduledFor: "2024-01-16 9:00 AM",
    recipientCount: 35,
  },
  {
    id: "4",
    title: "Placement Season Updates",
    message: "Important updates regarding the upcoming placement season and new companies visiting.",
    type: "email",
    recipients: "Final Year Students",
    status: "draft",
    recipientCount: 0,
  },
  {
    id: "5",
    title: "Resume Submission Deadline",
    message: "Last date to submit updated resume for TCS drive is January 18th.",
    type: "sms",
    recipients: "All Students",
    status: "sent",
    sentAt: "2024-01-12 11:00 AM",
    recipientCount: 540,
  },
]

const notificationTemplates = [
  { id: "1", name: "Drive Reminder", subject: "Upcoming Placement Drive Reminder" },
  { id: "2", name: "Interview Schedule", subject: "Your Interview Has Been Scheduled" },
  { id: "3", name: "Profile Update", subject: "Action Required: Update Your Profile" },
  { id: "4", name: "Result Announcement", subject: "Placement Results Announced" },
  { id: "5", name: "Document Submission", subject: "Document Submission Required" },
]

export default function AdminNotificationsPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [selectedType, setSelectedType] = useState<string>("email")
  const [selectedRecipients, setSelectedRecipients] = useState<string>("all")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "sent":
        return <Badge className="bg-green-100 text-green-700">Sent</Badge>
      case "scheduled":
        return <Badge className="bg-blue-100 text-blue-700">Scheduled</Badge>
      case "draft":
        return <Badge variant="secondary">Draft</Badge>
      default:
        return null
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "email":
        return <Mail className="h-4 w-4" />
      case "sms":
        return <MessageSquare className="h-4 w-4" />
      case "push":
        return <Bell className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground">
            Send announcements and updates to students
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Notification
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Notification</DialogTitle>
              <DialogDescription>
                Send a new notification to students
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Notification Type</Label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Email
                        </div>
                      </SelectItem>
                      <SelectItem value="sms">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4" />
                          SMS
                        </div>
                      </SelectItem>
                      <SelectItem value="push">
                        <div className="flex items-center gap-2">
                          <Bell className="h-4 w-4" />
                          Push Notification
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Recipients</Label>
                  <Select value={selectedRecipients} onValueChange={setSelectedRecipients}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Students</SelectItem>
                      <SelectItem value="final-year">Final Year Students</SelectItem>
                      <SelectItem value="cs-it">CS & IT Department</SelectItem>
                      <SelectItem value="eligible">Eligible for Placements</SelectItem>
                      <SelectItem value="shortlisted">Shortlisted Candidates</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Template (Optional)</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a template" />
                  </SelectTrigger>
                  <SelectContent>
                    {notificationTemplates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Subject / Title</Label>
                <Input placeholder="Enter notification subject" />
              </div>

              <div className="space-y-2">
                <Label>Message</Label>
                <Textarea
                  placeholder="Enter your message here..."
                  rows={5}
                />
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Checkbox id="schedule" />
                  <Label htmlFor="schedule" className="font-normal">
                    Schedule for later
                  </Label>
                </div>
                <Input type="datetime-local" className="w-auto" disabled />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                  Save as Draft
                </Button>
                <Button>
                  <Send className="mr-2 h-4 w-4" />
                  Send Now
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Sent Today</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-blue-100 p-3">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Scheduled</p>
                <p className="text-2xl font-bold">5</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-amber-100 p-3">
                <AlertCircle className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Drafts</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-purple-100 p-3">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Recipients</p>
                <p className="text-2xl font-bold">1,240</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filters:</span>
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
                <SelectItem value="push">Push</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="Search notifications..." className="w-64" />
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
          <CardDescription>View and manage all notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-start justify-between gap-4 rounded-lg border p-4"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-muted p-2">
                    {getTypeIcon(notification.type)}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{notification.title}</h4>
                      {getStatusBadge(notification.status)}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {notification.message}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {notification.recipients}
                        {notification.recipientCount > 0 && ` (${notification.recipientCount})`}
                      </span>
                      {notification.sentAt && (
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Sent: {notification.sentAt}
                        </span>
                      )}
                      {notification.scheduledFor && (
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Scheduled: {notification.scheduledFor}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {notification.status === "draft" && (
                    <Button size="sm">
                      <Send className="mr-2 h-3 w-3" />
                      Send
                    </Button>
                  )}
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Templates */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Notification Templates</CardTitle>
              <CardDescription>Pre-defined templates for quick notifications</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Template
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {notificationTemplates.map((template) => (
              <div
                key={template.id}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div>
                  <p className="font-medium">{template.name}</p>
                  <p className="text-xs text-muted-foreground">{template.subject}</p>
                </div>
                <Button variant="ghost" size="sm">
                  Use
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
