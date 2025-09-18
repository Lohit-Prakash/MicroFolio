import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { usePortfolio, Project } from "@/contexts/PortfolioDataContext";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, X, FolderOpen } from "lucide-react";

const EditProjects = () => {
  const { data, updateProjects, addProject, removeProject } = usePortfolio();
  const { toast } = useToast();
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTech, setNewTech] = useState("");

  const [newProject, setNewProject] = useState({
    title: "",
    period: "",
    institution: "",
    type: "Research Project",
    description: "",
    technologies: [] as string[],
    status: "Completed"
  });

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    addProject(newProject);
    setNewProject({
      title: "",
      period: "",
      institution: "",
      type: "Research Project",
      description: "",
      technologies: [],
      status: "Completed"
    });
    setShowAddForm(false);
    toast({
      title: "Project Added",
      description: "New project has been successfully added.",
    });
  };

  const handleUpdateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    
    const updatedProjects = data.projects.map(p => 
      p.id === editingProject.id ? editingProject : p
    );
    updateProjects(updatedProjects);
    setEditingProject(null);
    toast({
      title: "Project Updated",
      description: "Project has been successfully updated.",
    });
  };

  const handleRemoveProject = (id: string) => {
    removeProject(id);
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

  return (
    <div className="space-responsive animate-fade-up">
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
                  <div className="flex items-center gap-3 mb-2">
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
                  <CardTitle className="text-lg sm:text-xl leading-tight mb-1">{project.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {project.institution} • {project.period}
                  </CardDescription>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingProject(project)}
                    className="hover-scale transition-spring"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveProject(project.id)}
                    className="hover-scale transition-spring"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
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
        <Card className="card-modern animate-scale-up mt-8">
          <CardHeader className="space-y-4">
            <div className="flex items-center gap-3">
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
            <form onSubmit={handleUpdateProject} className="space-responsive">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button type="submit" className="hover-lift transition-spring shadow-medium hover:shadow-strong">
                  <FolderOpen className="w-4 h-4 mr-2" />
                  Update Project
                </Button>
                <Button type="button" variant="outline" onClick={() => setEditingProject(null)} className="hover-scale transition-spring">
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EditProjects;
