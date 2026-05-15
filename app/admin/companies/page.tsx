"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  Building2,
  Search,
  Plus,
  Edit,
  Trash2,
  Globe,
  Mail,
  MapPin,
  User,
  ExternalLink
} from "lucide-react";
import { mockCompanies } from "@/lib/mock-data";
import type { Company } from "@/lib/types";

export default function AdminCompanies() {
  const [companies, setCompanies] = useState<Company[]>(mockCompanies);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    website: "",
    hrContact: "",
    hrEmail: "",
    industry: "",
    location: "",
    description: "",
  });

  const filteredCompanies = companies.filter(
    (company) =>
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const resetForm = () => {
    setFormData({
      name: "",
      website: "",
      hrContact: "",
      hrEmail: "",
      industry: "",
      location: "",
      description: "",
    });
  };

  const handleAdd = () => {
    const newCompany: Company = {
      id: Date.now().toString(),
      ...formData,
    };
    setCompanies([...companies, newCompany]);
    setIsAddDialogOpen(false);
    resetForm();
  };

  const handleEdit = (company: Company) => {
    setEditingCompany(company);
    setFormData({
      name: company.name,
      website: company.website,
      hrContact: company.hrContact,
      hrEmail: company.hrEmail,
      industry: company.industry,
      location: company.location,
      description: company.description,
    });
  };

  const handleUpdate = () => {
    if (editingCompany) {
      setCompanies(
        companies.map((c) =>
          c.id === editingCompany.id ? { ...c, ...formData } : c
        )
      );
      setEditingCompany(null);
      resetForm();
    }
  };

  const handleDelete = (id: string) => {
    setCompanies(companies.filter((c) => c.id !== id));
  };

  const CompanyForm = ({ onSubmit }: { onSubmit: () => void }) => (
    <div className="space-y-4 py-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Company Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="TechCorp Solutions"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            placeholder="https://company.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="hrContact">HR Contact Name</Label>
          <Input
            id="hrContact"
            value={formData.hrContact}
            onChange={(e) => setFormData({ ...formData, hrContact: e.target.value })}
            placeholder="John Doe"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="hrEmail">HR Email</Label>
          <Input
            id="hrEmail"
            type="email"
            value={formData.hrEmail}
            onChange={(e) => setFormData({ ...formData, hrEmail: e.target.value })}
            placeholder="hr@company.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="industry">Industry</Label>
          <Input
            id="industry"
            value={formData.industry}
            onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
            placeholder="Information Technology"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder="Bangalore, India"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Brief description about the company..."
          rows={3}
        />
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={() => {
          setEditingCompany(null);
          setIsAddDialogOpen(false);
          resetForm();
        }}>
          Cancel
        </Button>
        <Button onClick={onSubmit}>
          {editingCompany ? "Update Company" : "Add Company"}
        </Button>
      </DialogFooter>
    </div>
  );

  return (
    <div className="p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Company Management</h1>
          <p className="text-muted-foreground mt-1">Manage recruiting companies</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Company
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Company</DialogTitle>
              <DialogDescription>
                Enter the company details to add them to the system.
              </DialogDescription>
            </DialogHeader>
            <CompanyForm onSubmit={handleAdd} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by company name or industry..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Companies Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCompanies.map((company) => (
          <Card key={company.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{company.name}</CardTitle>
                    <Badge variant="secondary" className="mt-1">{company.industry}</Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {company.description}
              </p>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{company.location}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="w-4 h-4" />
                  <span>{company.hrContact}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>{company.hrEmail}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-border">
                {company.website && (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-primary hover:underline"
                  >
                    <Globe className="w-4 h-4" />
                    Website
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                <div className="flex-1" />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEdit(company)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive"
                  onClick={() => handleDelete(company.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCompanies.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
          <p className="text-muted-foreground">No companies found</p>
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={!!editingCompany} onOpenChange={() => {
        setEditingCompany(null);
        resetForm();
      }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Company</DialogTitle>
            <DialogDescription>
              Update the company details.
            </DialogDescription>
          </DialogHeader>
          <CompanyForm onSubmit={handleUpdate} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
