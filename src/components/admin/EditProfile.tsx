import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { usePortfolio } from "@/contexts/PortfolioDataContext";
import FileOrLinkInput from "./FileOrLinkInput";
import { uploadDataUrlToGCS } from "@/lib/gcs-upload";
import { useToast } from "@/hooks/use-toast";
import { useUploadProgress } from "@/hooks/use-upload-progress";
import UploadProgressBar from "./UploadProgressBar";
import { Upload, User, Linkedin, Github, Youtube, Instagram, Twitter, GraduationCap, FileText } from "lucide-react";

const EditProfile = () => {
  const { data, updatePersonalInfo } = usePortfolio();
  const { toast } = useToast();
  const [formData, setFormData] = useState(data.personalInfo);
  const { uploadProgress, startUpload, updateProgress, setError, completeUpload, resetProgress } = useUploadProgress();

  useEffect(() => {
    setFormData(data.personalInfo);
  }, [data.personalInfo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updatePersonalInfo(formData);
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully!",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleProfilePictureAdd = async (value: string) => {
    resetProgress();
    
    try {
      let finalUrl = value;
      if (value.startsWith("data:")) {
        startUpload(1);
        updateProgress("Profile Image", 0, 1);
        finalUrl = await uploadDataUrlToGCS("profiles", value);
        updateProgress("Profile Image", 1, 1);
      }
      setFormData({ ...formData, profileImage: finalUrl });
      await updatePersonalInfo({ ...formData, profileImage: finalUrl });
      completeUpload();
      toast({ title: "Profile image added" });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setError(errorMessage);
      toast({
        title: "Upload Error",
        description: `Failed to upload profile image: ${errorMessage}`,
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <UploadProgressBar
        isVisible={uploadProgress.isUploading || !!uploadProgress.error}
        progress={uploadProgress.progress}
        currentFile={uploadProgress.currentFile}
        totalFiles={uploadProgress.totalFiles}
        completedFiles={uploadProgress.completedFiles}
        error={uploadProgress.error}
        onClose={resetProgress}
      />
      <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5" />
          Edit Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Profile Picture Upload */}
        <div className="space-y-2">
          <Label>Profile Picture</Label>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-primary/30 via-accent/20 to-primary/30 p-0.5 shadow-lg">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-background/95 to-muted/50 flex items-center justify-center text-xl font-bold text-primary">
                {!formData.profileImage ? (
                  formData.name.split(' ').map(n => n[0]).join('')
                ) : (
                  <img src={formData.profileImage} alt="Profile" className="w-full h-full rounded-full object-cover" />
                )}
              </div>
            </div>
            <div className="flex-1">
              <FileOrLinkInput
                label="image"
                placeholder="Image URL or choose a file"
                accept="image/*"
                onAdd={handleProfilePictureAdd}
                buttonText="Set"
              />
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitle">Professional Subtitle</Label>
              <Input
                id="subtitle"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
                placeholder="e.g., Software Engineer"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Professional Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write a brief description about yourself"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City, Country"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 234 567 8900"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
            />
          </div>

          <div className="space-y-4 pt-4 border-t">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              Social Media Links
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="linkedin" className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4 text-blue-600" />
                  LinkedIn
                </Label>
                <Input
                  id="linkedin"
                  name="linkedin"
                  value={formData.linkedin || ''}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="github" className="flex items-center gap-2">
                  <Github className="w-4 h-4" />
                  GitHub
                </Label>
                <Input
                  id="github"
                  name="github"
                  value={formData.github || ''}
                  onChange={handleChange}
                  placeholder="https://github.com/username"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="youtube" className="flex items-center gap-2">
                  <Youtube className="w-4 h-4 text-red-600" />
                  YouTube
                </Label>
                <Input
                  id="youtube"
                  name="youtube"
                  value={formData.youtube || ''}
                  onChange={handleChange}
                  placeholder="https://youtube.com/@username"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instagram" className="flex items-center gap-2">
                  <Instagram className="w-4 h-4 text-pink-600" />
                  Instagram
                </Label>
                <Input
                  id="instagram"
                  name="instagram"
                  value={formData.instagram || ''}
                  onChange={handleChange}
                  placeholder="https://instagram.com/username"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitter" className="flex items-center gap-2">
                  <Twitter className="w-4 h-4 text-blue-400" />
                  Twitter/X
                </Label>
                <Input
                  id="twitter"
                  name="twitter"
                  value={formData.twitter || ''}
                  onChange={handleChange}
                  placeholder="https://twitter.com/username"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="scholar" className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-blue-700" />
                  Google Scholar
                </Label>
                <Input
                  id="scholar"
                  name="scholar"
                  value={formData.scholar || ''}
                  onChange={handleChange}
                  placeholder="https://scholar.google.com/citations?user=..."
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Resume Link
            </h3>
            <div className="space-y-2">
              <Label htmlFor="resumeLink">Resume Download Link</Label>
              <Input
                id="resumeLink"
                name="resumeLink"
                value={formData.resumeLink || ''}
                onChange={handleChange}
                placeholder="https://drive.google.com/file/d/... or https://dropbox.com/..."
              />
              <p className="text-sm text-muted-foreground">
                Add a direct link to your resume (Google Drive, Dropbox, or any hosting service)
              </p>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Save Changes
          </Button>
        </form>
      </CardContent>
    </Card>
    </div>
  );
};

export default EditProfile;