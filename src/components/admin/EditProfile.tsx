import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { usePortfolio, PersonalInfo } from "@/contexts/PortfolioDataContext";
import { useToast } from "@/hooks/use-toast";
import { User } from "lucide-react";

const EditProfile = () => {
  const { data, updatePersonalInfo } = usePortfolio();
  const { toast } = useToast();
  const [formData, setFormData] = useState<PersonalInfo>(data.personalInfo);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePersonalInfo(formData);
    toast({
      title: "Profile Updated",
      description: "Your personal information has been successfully updated.",
    });
  };

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="card-modern animate-scale-up">
      <CardHeader className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl">Edit Personal Information</CardTitle>
            <CardDescription>Update your personal details and contact information</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        <form onSubmit={handleSubmit} className="space-responsive">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-3 group">
              <Label htmlFor="name" className="text-sm font-semibold text-foreground/80">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Your full name"
                className="transition-all duration-300 focus:shadow-glow focus:scale-[1.02] hover:shadow-medium"
              />
            </div>
            <div className="space-y-3 group">
              <Label htmlFor="subtitle" className="text-sm font-semibold text-foreground/80">Professional Subtitle</Label>
              <Input
                id="subtitle"
                value={formData.subtitle}
                onChange={(e) => handleChange('subtitle', e.target.value)}
                placeholder="e.g., Aerospace Engineer"
                className="transition-all duration-300 focus:shadow-glow focus:scale-[1.02] hover:shadow-medium"
              />
            </div>
          </div>

          <div className="space-y-3 group">
            <Label htmlFor="description" className="text-sm font-semibold text-foreground/80">Professional Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Brief description of your expertise and passion"
              rows={4}
              className="transition-all duration-300 focus:shadow-glow focus:scale-[1.01] hover:shadow-medium resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-3 group">
              <Label htmlFor="location" className="text-sm font-semibold text-foreground/80">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                placeholder="City, State"
                className="transition-all duration-300 focus:shadow-glow focus:scale-[1.02] hover:shadow-medium"
              />
            </div>
            <div className="space-y-3 group">
              <Label htmlFor="phone" className="text-sm font-semibold text-foreground/80">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="+91 XXXXX XXXXX"
                className="transition-all duration-300 focus:shadow-glow focus:scale-[1.02] hover:shadow-medium"
              />
            </div>
            <div className="space-y-3 group sm:col-span-2 lg:col-span-1">
              <Label htmlFor="email" className="text-sm font-semibold text-foreground/80">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="your.email@domain.com"
                className="transition-all duration-300 focus:shadow-glow focus:scale-[1.02] hover:shadow-medium"
              />
            </div>
          </div>

          <div className="pt-4">
            <Button type="submit" size="lg" className="w-full sm:w-auto hover-lift transition-spring shadow-medium hover:shadow-strong">
              <User className="w-4 h-4 mr-2" />
              Update Profile
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default EditProfile;