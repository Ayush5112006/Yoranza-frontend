"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  User, 
  Mail, 
  Phone, 
  BookOpen, 
  Calendar,
  Link as LinkIcon,
  Github,
  Linkedin,
  Upload,
  Plus,
  X,
  Save,
  FileText
} from "lucide-react";
import { currentStudent, branches, skillsList } from "@/lib/mock-data";

export default function StudentProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: currentStudent.name,
    email: currentStudent.email,
    phone: currentStudent.phone || "",
    branch: currentStudent.branch,
    cgpa: currentStudent.cgpa.toString(),
    graduationYear: currentStudent.graduationYear.toString(),
    backlogs: currentStudent.backlogs.toString(),
    github: currentStudent.github || "",
    linkedin: currentStudent.linkedin || "",
    skills: currentStudent.skills,
    certifications: currentStudent.certifications,
  });
  const [newSkill, setNewSkill] = useState("");
  const [newCertification, setNewCertification] = useState("");

  const addSkill = () => {
    if (newSkill && !profile.skills.includes(newSkill)) {
      setProfile({ ...profile, skills: [...profile.skills, newSkill] });
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setProfile({ ...profile, skills: profile.skills.filter((s) => s !== skill) });
  };

  const addCertification = () => {
    if (newCertification && !profile.certifications.includes(newCertification)) {
      setProfile({ ...profile, certifications: [...profile.certifications, newCertification] });
      setNewCertification("");
    }
  };

  const removeCertification = (cert: string) => {
    setProfile({ ...profile, certifications: profile.certifications.filter((c) => c !== cert) });
  };

  const handleSave = () => {
    // Here you would save to backend
    setIsEditing(false);
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">My Profile</h1>
          <p className="text-muted-foreground mt-1">Manage your personal and academic information</p>
        </div>
        <Button
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          className="gap-2"
        >
          {isEditing ? (
            <>
              <Save className="w-4 h-4" />
              Save Changes
            </>
          ) : (
            "Edit Profile"
          )}
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Overview Card */}
        <Card className="lg:col-span-1">
          <CardContent className="p-6 text-center">
            <div className="w-24 h-24 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <span className="text-3xl font-bold text-primary">
                {profile.name.split(" ").map((n) => n[0]).join("")}
              </span>
            </div>
            <h2 className="text-xl font-semibold text-foreground">{profile.name}</h2>
            <p className="text-muted-foreground">{profile.branch}</p>
            <div className="mt-4 space-y-2">
              <Badge variant="secondary" className="text-sm">
                CGPA: {profile.cgpa}
              </Badge>
              <Badge variant="outline" className="text-sm ml-2">
                {profile.graduationYear}
              </Badge>
            </div>
            
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground mb-3">Resume</p>
              {currentStudent.resumeUrl ? (
                <div className="flex items-center justify-center gap-2 text-sm">
                  <FileText className="w-4 h-4 text-primary" />
                  <span className="text-foreground">resume.pdf</span>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No resume uploaded</p>
              )}
              <Button variant="outline" size="sm" className="mt-3 gap-2">
                <Upload className="w-4 h-4" />
                {currentStudent.resumeUrl ? "Update Resume" : "Upload Resume"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  disabled
                  className="bg-muted"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  disabled={!isEditing}
                  placeholder="+91 9876543210"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="branch" className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Branch
                </Label>
                {isEditing ? (
                  <Select
                    value={profile.branch}
                    onValueChange={(value) => setProfile({ ...profile, branch: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {branches.map((branch) => (
                        <SelectItem key={branch} value={branch}>
                          {branch}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input value={profile.branch} disabled />
                )}
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cgpa">CGPA</Label>
                <Input
                  id="cgpa"
                  type="number"
                  step="0.01"
                  min="0"
                  max="10"
                  value={profile.cgpa}
                  onChange={(e) => setProfile({ ...profile, cgpa: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="graduationYear" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Graduation Year
                </Label>
                {isEditing ? (
                  <Select
                    value={profile.graduationYear}
                    onValueChange={(value) => setProfile({ ...profile, graduationYear: value })}
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
                ) : (
                  <Input value={profile.graduationYear} disabled />
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="backlogs">Active Backlogs</Label>
                <Input
                  id="backlogs"
                  type="number"
                  min="0"
                  value={profile.backlogs}
                  onChange={(e) => setProfile({ ...profile, backlogs: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-border">
              <div className="space-y-2">
                <Label htmlFor="github" className="flex items-center gap-2">
                  <Github className="w-4 h-4" />
                  GitHub Profile
                </Label>
                <Input
                  id="github"
                  value={profile.github}
                  onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                  disabled={!isEditing}
                  placeholder="https://github.com/username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin" className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4" />
                  LinkedIn Profile
                </Label>
                <Input
                  id="linkedin"
                  value={profile.linkedin}
                  onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                  disabled={!isEditing}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              {profile.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="gap-1 py-1.5 px-3">
                  {skill}
                  {isEditing && (
                    <button
                      onClick={() => removeSkill(skill)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </Badge>
              ))}
            </div>
            {isEditing && (
              <div className="flex gap-2">
                <Select value={newSkill} onValueChange={setNewSkill}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select a skill" />
                  </SelectTrigger>
                  <SelectContent>
                    {skillsList
                      .filter((s) => !profile.skills.includes(s))
                      .map((skill) => (
                        <SelectItem key={skill} value={skill}>
                          {skill}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <Button onClick={addSkill} size="icon" variant="outline">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Certifications */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Certifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-4">
              {profile.certifications.map((cert) => (
                <div key={cert} className="flex items-center justify-between p-2 rounded-lg bg-secondary/50">
                  <span className="text-sm">{cert}</span>
                  {isEditing && (
                    <button
                      onClick={() => removeCertification(cert)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            {isEditing && (
              <div className="flex gap-2">
                <Input
                  value={newCertification}
                  onChange={(e) => setNewCertification(e.target.value)}
                  placeholder="Add certification"
                  onKeyDown={(e) => e.key === "Enter" && addCertification()}
                />
                <Button onClick={addCertification} size="icon" variant="outline">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
