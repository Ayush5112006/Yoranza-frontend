"use client";

import { useState, useRef } from "react";
import { toast } from "sonner";
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

  // Resume Upload Dropzone State
  const [resumes, setResumes] = useState([
    { id: "1", name: "arjun-patel-resume-main.pdf", active: true, size: "1.2 MB", date: "2024-03-01" }
  ]);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadingName, setUploadingName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type !== "application/pdf") {
      toast.error("Invalid file format. Please upload a PDF resume.");
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error("File is too large. Maximum size allowed is 5MB.");
      return;
    }

    setUploadingName(file.name);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            const newResume = {
              id: Date.now().toString(),
              name: file.name,
              active: resumes.length === 0,
              size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
              date: new Date().toISOString().split("T")[0]
            };
            setResumes((prevResumes) => [...prevResumes, newResume]);
            setUploadingName("");
            setUploadProgress(0);
            toast.success("Resume uploaded successfully!");
          }, 300);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  const deleteResume = (id: string) => {
    const resumeToDelete = resumes.find(r => r.id === id);
    setResumes(resumes.filter(r => r.id !== id));
    toast.success(`Deleted ${resumeToDelete?.name}`);
  };

  const setActiveResume = (id: string) => {
    setResumes(resumes.map(r => ({
      ...r,
      active: r.id === id
    })));
    toast.success("Active resume updated!");
  };

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
              <p className="text-sm font-semibold text-foreground mb-3 text-left">Resumes ({resumes.length})</p>
              
              {/* List of resumes */}
              {resumes.length > 0 ? (
                <div className="space-y-2 mb-4">
                  {resumes.map((res) => (
                    <div key={res.id} className={`flex items-center gap-3 p-3 rounded-lg border text-left ${res.active ? "border-primary/50 bg-primary/5" : "border-border bg-secondary/30"}`}>
                      <FileText className={`w-5 h-5 ${res.active ? "text-primary" : "text-muted-foreground"}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{res.name}</p>
                        <p className="text-xs text-muted-foreground">{res.size} • Uploaded {res.date}</p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        {res.active ? (
                          <Badge variant="default" className="text-[10px] py-0 px-1.5 bg-primary text-primary-foreground font-semibold">Active</Badge>
                        ) : (
                          <Button variant="ghost" size="sm" className="h-7 text-xs px-2 text-muted-foreground hover:text-foreground" onClick={() => setActiveResume(res.id)}>
                            Set Active
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive" onClick={() => deleteResume(res.id)}>
                          <X className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">No resumes uploaded yet.</p>
              )}

              {/* Uploading progress */}
              {uploadingName && (
                <div className="p-3 rounded-lg border border-border bg-secondary/50 mb-4 text-left">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground truncate max-w-[80%]">{uploadingName}</span>
                    <span className="text-xs text-primary font-semibold">{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-1.5 overflow-hidden">
                    <div className="bg-primary h-1.5 transition-all duration-150" style={{ width: `${uploadProgress}%` }} />
                  </div>
                </div>
              )}

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".pdf"
                onChange={handleFileChange}
              />

              {/* Dropzone */}
              <div
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                  dragActive 
                    ? "border-primary bg-primary/5 scale-[1.02]" 
                    : "border-muted-foreground/20 hover:border-primary/50 hover:bg-secondary/30"
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <Upload className="w-8 h-8 text-muted-foreground animate-bounce" />
                  <p className="text-sm font-semibold text-foreground">Drag & Drop your resume</p>
                  <p className="text-xs text-muted-foreground">Supported format: PDF (Max 5MB)</p>
                </div>
              </div>
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
