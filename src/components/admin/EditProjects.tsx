import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { usePortfolio, Project } from "@/contexts/PortfolioDataContext";
import { useToast } from "@/hooks/use-toast";
import FileOrLinkInput from "./FileOrLinkInput";
import { normalizeMediaUrlsToGCS } from "@/lib/gcs-upload";
import { useUploadProgress } from "@/hooks/use-upload-progress";
import UploadProgressBar from "./UploadProgressBar";
import { Plus, Trash2, X, FolderOpen } from "lucide-react";

const EditProjects = () => {
  const { data, updateProject, addProject, removeProject } = usePortfolio();
  const { toast } = useToast();
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTech, setNewTech] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const { uploadProgress, startUpload, updateProgress, setError, completeUpload, resetProgress } = useUploadProgress();

  const [newProject, setNewProject] = useState({
    title: "",
    period: "",
    institution: "",
    type: "Research Project",
    description: "",
    technologies: [] as string[],
    status: "Completed",
    images: [] as string[],
    pdfs: [] as string[],
    githubLink: "",
    liveLink: ""
  });
  const [newImage, setNewImage] = useState("");
  const [newPdf, setNewPdf] = useState("");

  useEffect(() => {
    if (editingProject) {
      const updatedProject = data.projects.find(p => p.id === editingProject.id);
      if (updatedProject) {
        setEditingProject(updatedProject);
      }
    }
  }, [data.projects, editingProject]);

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    resetProgress();
    
    try {
      const totalFiles = newProject.images.length + newProject.pdfs.length;
      if (totalFiles > 0) {
        startUpload(totalFiles);
      }
      
      const images = await normalizeMediaUrlsToGCS(
        "projects/images", 
        newProject.images,
        (currentFile, completed, total) => updateProgress(currentFile, completed, total)
      );
      const pdfs = await normalizeMediaUrlsToGCS(
        "projects/pdfs", 
        newProject.pdfs,
        (currentFile, completed, total) => updateProgress(currentFile, completed, total)
      );
      
      const projectWithUrls = {
        ...newProject,
        images,
        pdfs
      };
      
      await addProject(projectWithUrls);
      setNewProject({
        title: "",
        period: "",
        institution: "",
        type: "Research Project",
        description: "",
        technologies: [],
        status: "Completed",
        images: [],
        pdfs: [],
        githubLink: "",
        liveLink: ""
      });
      setShowAddForm(false);
      
      completeUpload();
      
      toast({
        title: "Project Added",
        description: "New project has been successfully added.",
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setError(errorMessage);
      toast({
        title: "Upload Error",
        description: `Failed to upload files: ${errorMessage}`,
        variant: "destructive",
      });
    }
  };

  const handleUpdateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject || isUpdating) return;
    
    setIsUpdating(true);
    resetProgress();
    
    try {
      console.log("🔵 Starting project update:", editingProject);
      
      const totalFiles = (editingProject.images?.length || 0) + (editingProject.pdfs?.length || 0);
      if (totalFiles > 0) {
        startUpload(totalFiles);
      }
      
      const images = await normalizeMediaUrlsToGCS(
        "projects/images", 
        editingProject.images || [],
        (currentFile, completed, total) => updateProgress(currentFile, completed, total)
      );
      
      const pdfs = await normalizeMediaUrlsToGCS(
        "projects/pdfs", 
        editingProject.pdfs || [],
        (currentFile, completed, total) => updateProgress(currentFile, completed, total)
      );
      
      const updatedProject = {
        ...editingProject,
        images,
        pdfs
      };
      
      console.log("✅ Updated project object:", updatedProject);
      console.log("📤 Calling updateProject context function");
      
      // Use the context function to update - it handles Firestore writes
      await updateProject(updatedProject);
      
      console.log("✨ Context update successful");
      
      setIsUpdating(false);
      setEditingProject(null);
      completeUpload();
      
      toast({
        title: "Project Updated",
        description: "Project has been successfully updated.",
      });
    } catch (error) {
      console.error("Error updating project:", error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setError(errorMessage);
      setIsUpdating(false);
      toast({
        title: "Upload Error",
        description: `Failed to upload files: ${errorMessage}`,
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemoveProject = async (id: string) => {
    await removeProject(id);
    toast({
      title: "Project Removed",
      description: "Project has been successfully removed.",
    });
  };

  const addTechnology = (isEditing: boolean) => {
    if (!newTech.trim()) return;
    
    if (isEditing && editingProject) {
      setEditingProject({
        ...editingProject,
        technologies: [...editingProject.technologies, newTech.trim()]
      });
    } else {
      setNewProject({
        ...newProject,
        technologies: [...newProject.technologies, newTech.trim()]
      });
    }
    setNewTech("");
  };

  const removeTechnology = (index: number, isEditing: boolean) => {
    if (isEditing && editingProject) {
      setEditingProject({
        ...editingProject,
        technologies: editingProject.technologies.filter((_, i) => i !== index)
      });
    } else {
      setNewProject({
        ...newProject,
        technologies: newProject.technologies.filter((_, i) => i !== index)
      });
    }
  };

  const addImage = (isEditing: boolean) => {
    if (!newImage.trim()) return;
    
    if (isEditing && editingProject) {
      setEditingProject({
        ...editingProject,
        images: [...(editingProject.images || []), newImage.trim()]
      });
    } else {
      setNewProject({
        ...newProject,
        images: [...newProject.images, newImage.trim()]
      });
    }
    setNewImage("");
  };

  const removeImage = (index: number, isEditing: boolean) => {
    if (isEditing && editingProject) {
      setEditingProject({
        ...editingProject,
        images: (editingProject.images || []).filter((_, i) => i !== index)
      });
    } else {
      setNewProject({
        ...newProject,
        images: newProject.images.filter((_, i) => i !== index)
      });
    }
  };

  const addPdf = (isEditing: boolean) => {
    if (!newPdf.trim()) return;
    
    if (isEditing && editingProject) {
      setEditingProject({
        ...editingProject,
        pdfs: [...(editingProject.pdfs || []), newPdf.trim()]
      });
    } else {
      setNewProject({
        ...newProject,
        pdfs: [...newProject.pdfs, newPdf.trim()]
      });
    }
    setNewPdf("");
  };

  const removePdf = (index: number, isEditing: boolean) => {
    if (isEditing && editingProject) {
      setEditingProject({
        ...editingProject,
        pdfs: (editingProject.pdfs || []).filter((_, i) => i !== index)
      });
    } else {
      setNewProject({
        ...newProject,
        pdfs: newProject.pdfs.filter((_, i) => i !== index)
      });
    }
  };

  return (
    <div className="space-responsive animate-fade-up">
      <UploadProgressBar
        isVisible={uploadProgress.isUploading || !!uploadProgress.error}
        progress={uploadProgress.progress}
        currentFile={uploadProgress.currentFile}
        totalFiles={uploadProgress.totalFiles}
        completedFiles={uploadProgress.completedFiles}
        error={uploadProgress.error}
        onClose={resetProgress}
      />
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <FolderOpen className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Manage Projects</h2>
            <p className="text-sm text-muted-foreground">Create and edit your project portfolio</p>
          </div>
        </div>
        <Button 
          onClick={() => setShowAddForm(true)} 
          disabled={showAddForm}
          className="hover-lift transition-spring shadow-medium hover:shadow-strong"
          size="lg"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Project
        </Button>
      </div>

      {/* Add New Project Form */}
      {showAddForm && (
        <Card className="card-modern animate-scale-up mb-8">
          <CardHeader className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10">
                <Plus className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-xl">Add New Project</CardTitle>
                <CardDescription>Create a new project entry for your portfolio</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddProject} className="space-responsive">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="title" className="text-sm font-semibold text-foreground/80">Project Title</Label>
                  <Input
                    id="title"
                    value={newProject.title}
                    onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                    required
                    className="transition-all duration-300 focus:shadow-glow hover:shadow-medium"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="period" className="text-sm font-semibold text-foreground/80">Time Period</Label>
                  <Input
                    id="period"
                    value={newProject.period}
                    onChange={(e) => setNewProject({...newProject, period: e.target.value})}
                    placeholder="e.g., Jan 2024 - Present"
                    required
                    className="transition-all duration-300 focus:shadow-glow hover:shadow-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="institution" className="text-sm font-semibold text-foreground/80">Institution</Label>
                  <Input
                    id="institution"
                    value={newProject.institution}
                    onChange={(e) => setNewProject({...newProject, institution: e.target.value})}
                    required
                    className="transition-all duration-300 focus:shadow-glow hover:shadow-medium"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="type" className="text-sm font-semibold text-foreground/80">Project Type</Label>
                  <Select value={newProject.type} onValueChange={(value) => setNewProject({...newProject, type: value})}>
                    <SelectTrigger className="transition-all duration-300 focus:shadow-glow hover:shadow-medium">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Research Project">Research Project</SelectItem>
                      <SelectItem value="Major Project">Major Project</SelectItem>
                      <SelectItem value="Internship Project">Internship Project</SelectItem>
                      <SelectItem value="Personal Project">Personal Project</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="description" className="text-sm font-semibold text-foreground/80">Description</Label>
                <Textarea
                  id="description"
                  value={newProject.description}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  rows={4}
                  required
                  className="transition-all duration-300 focus:shadow-glow hover:shadow-medium resize-none"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-semibold text-foreground/80">Technologies</Label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    value={newTech}
                    onChange={(e) => setNewTech(e.target.value)}
                    placeholder="Add technology"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology(false))}
                    className="flex-1 transition-all duration-300 focus:shadow-glow hover:shadow-medium"
                  />
                  <Button type="button" onClick={() => addTechnology(false)} variant="outline" className="hover-scale transition-spring">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {newProject.technologies.map((tech, index) => (
                    <Badge key={index} variant="outline" className="flex items-center gap-2 px-3 py-1 hover-scale transition-spring cursor-pointer group">
                      {tech}
                      <X className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" onClick={() => removeTechnology(index, false)} />
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="status" className="text-sm font-semibold text-foreground/80">Status</Label>
                <Select value={newProject.status} onValueChange={(value) => setNewProject({...newProject, status: value})}>
                  <SelectTrigger className="transition-all duration-300 focus:shadow-glow hover:shadow-medium">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Ongoing">Ongoing</SelectItem>
                    <SelectItem value="Patented">Patented</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-semibold text-foreground/80">Project Images</Label>
                <FileOrLinkInput
                  label="image"
                  placeholder="Add image URL or choose a file"
                  accept="image/*"
                  onAdd={(value) => {
                    setNewProject({
                      ...newProject,
                      images: [...newProject.images, value]
                    });
                  }}
                />
                <div className="flex flex-wrap gap-2 mt-3">
                  {newProject.images.map((img, index) => (
                    <Badge key={index} variant="outline" className="flex items-center gap-2 px-3 py-1 hover-scale transition-spring cursor-pointer group max-w-[200px]">
                      <span className="truncate">{img}</span>
                      <X className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity flex-shrink-0" onClick={() => removeImage(index, false)} />
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-semibold text-foreground/80">Project PDFs</Label>
                <FileOrLinkInput
                  label="PDF"
                  placeholder="Add PDF URL or choose a file"
                  accept="application/pdf"
                  onAdd={(value) => {
                    setNewProject({
                      ...newProject,
                      pdfs: [...newProject.pdfs, value]
                    });
                  }}
                />
                <div className="flex flex-wrap gap-2 mt-3">
                  {newProject.pdfs.map((pdf, index) => (
                    <Badge key={index} variant="outline" className="flex items-center gap-2 px-3 py-1 hover-scale transition-spring cursor-pointer group max-w-[200px]">
                      <span className="truncate">{pdf}</span>
                      <X className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity flex-shrink-0" onClick={() => removePdf(index, false)} />
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="githubLink" className="text-sm font-semibold text-foreground/80">GitHub Link</Label>
                  <Input
                    id="githubLink"
                    value={newProject.githubLink}
                    onChange={(e) => setNewProject({...newProject, githubLink: e.target.value})}
                    placeholder="https://github.com/..."
                    className="transition-all duration-300 focus:shadow-glow hover:shadow-medium"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="liveLink" className="text-sm font-semibold text-foreground/80">Live Demo Link</Label>
                  <Input
                    id="liveLink"
                    value={newProject.liveLink}
                    onChange={(e) => setNewProject({...newProject, liveLink: e.target.value})}
                    placeholder="https://..."
                    className="transition-all duration-300 focus:shadow-glow hover:shadow-medium"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button type="submit" className="hover-lift transition-spring shadow-medium hover:shadow-strong">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Project
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)} className="hover-scale transition-spring">
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Existing Projects */}
      <div className="grid gap-6">
        {data.projects.map((project, index) => (
          <Card key={project.id} className="card-modern hover-lift animate-slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <div className="p-1.5 rounded-lg bg-primary/10">
                      <FolderOpen className="w-4 h-4 text-primary" />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {project.type}
                    </Badge>
                    <Badge variant={project.status === 'Completed' ? 'default' : project.status === 'Ongoing' ? 'secondary' : 'destructive'} className="text-xs">
                      {project.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg sm:text-xl leading-tight mb-1 break-words">{project.title}</CardTitle>
                  <CardDescription className="text-sm break-words">
                    {project.institution} • {project.period}
                  </CardDescription>
                </div>
                <div className="flex gap-2 flex-shrink-0 w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingProject(project)}
                    className="hover-scale transition-spring w-full sm:w-auto"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveProject(project.id)}
                    className="hover-scale transition-spring w-full sm:w-auto"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed break-words">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs hover-scale transition-spring cursor-default">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Project Form */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm animate-in fade-in px-2">
          <Card className="shadow-2xl rounded-2xl w-full max-w-lg mx-auto animate-in slide-in-from-top-8 card-modern animate-scale-up mt-8 overflow-y-auto max-h-screen p-2 sm:p-6">
            <CardHeader className="space-y-4">
              <div className="flex items-center gap-3 flex-wrap">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <FolderOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">Edit Project</CardTitle>
                  <CardDescription>Update project information</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateProject} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <Label htmlFor="edit-title" className="text-sm font-semibold text-foreground/80">Project Title</Label>
                  <Input
                    id="edit-title"
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({...editingProject, title: e.target.value})}
                    required
                    className="transition-all duration-300 focus:shadow-glow hover:shadow-medium"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="edit-period" className="text-sm font-semibold text-foreground/80">Time Period</Label>
                  <Input
                    id="edit-period"
                    value={editingProject.period}
                    onChange={(e) => setEditingProject({...editingProject, period: e.target.value})}
                    required
                    className="transition-all duration-300 focus:shadow-glow hover:shadow-medium"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="edit-description" className="text-sm font-semibold text-foreground/80">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editingProject.description}
                  onChange={(e) => setEditingProject({...editingProject, description: e.target.value})}
                  rows={4}
                  required
                  className="transition-all duration-300 focus:shadow-glow hover:shadow-medium resize-none"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-semibold text-foreground/80">Technologies</Label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    value={newTech}
                    onChange={(e) => setNewTech(e.target.value)}
                    placeholder="Add technology"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology(true))}
                    className="flex-1 transition-all duration-300 focus:shadow-glow hover:shadow-medium"
                  />
                  <Button type="button" onClick={() => addTechnology(true)} variant="outline" className="hover-scale transition-spring">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {editingProject.technologies.map((tech, index) => (
                    <Badge key={index} variant="outline" className="flex items-center gap-2 px-3 py-1 hover-scale transition-spring cursor-pointer group">
                      {tech}
                      <X className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" onClick={() => removeTechnology(index, true)} />
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-semibold text-foreground/80">Project Images</Label>
                <FileOrLinkInput
                  label="image"
                  placeholder="Add image URL or choose a file"
                  accept="image/*"
                  onAdd={(value) => {
                    if (!editingProject) return;
                    setEditingProject({
                      ...editingProject,
                      images: [...(editingProject.images || []), value]
                    });
                  }}
                />
                <div className="flex flex-wrap gap-2 mt-3">
                  {(editingProject.images || []).map((img, index) => (
                    <Badge key={index} variant="outline" className="flex items-center gap-2 px-3 py-1 hover-scale transition-spring cursor-pointer group max-w-[200px]">
                      <span className="truncate">{img}</span>
                      <X className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity flex-shrink-0" onClick={() => removeImage(index, true)} />
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-semibold text-foreground/80">Project PDFs</Label>
                <FileOrLinkInput
                  label="PDF"
                  placeholder="Add PDF URL or choose a file"
                  accept="application/pdf"
                  onAdd={(value) => {
                    if (!editingProject) return;
                    setEditingProject({
                      ...editingProject,
                      pdfs: [...(editingProject.pdfs || []), value]
                    });
                  }}
                />
                <div className="flex flex-wrap gap-2 mt-3">
                  {(editingProject.pdfs || []).map((pdf, index) => (
                    <Badge key={index} variant="outline" className="flex items-center gap-2 px-3 py-1 hover-scale transition-spring cursor-pointer group max-w-[200px]">
                      <span className="truncate">{pdf}</span>
                      <X className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity flex-shrink-0" onClick={() => removePdf(index, true)} />
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="edit-githubLink" className="text-sm font-semibold text-foreground/80">GitHub Link</Label>
                  <Input
                    id="edit-githubLink"
                    value={editingProject.githubLink || ''}
                    onChange={(e) => setEditingProject({...editingProject, githubLink: e.target.value})}
                    placeholder="https://github.com/..."
                    className="transition-all duration-300 focus:shadow-glow hover:shadow-medium"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="edit-liveLink" className="text-sm font-semibold text-foreground/80">Live Demo Link</Label>
                  <Input
                    id="edit-liveLink"
                    value={editingProject.liveLink || ''}
                    onChange={(e) => setEditingProject({...editingProject, liveLink: e.target.value})}
                    placeholder="https://..."
                    className="transition-all duration-300 focus:shadow-glow hover:shadow-medium"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button 
                  type="submit" 
                  disabled={isUpdating}
                  className="hover-lift transition-spring shadow-medium hover:shadow-strong"
                >
                  <FolderOpen className="w-4 h-4 mr-2" />
                  {isUpdating ? "Updating..." : "Update Project"}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  disabled={isUpdating}
                  onClick={() => setEditingProject(null)} 
                  className="hover-scale transition-spring"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        </div>
      )}
    </div>
  );
};

export default EditProjects;
