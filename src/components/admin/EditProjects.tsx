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
import { Plus, Trash2, X } from "lucide-react";

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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Projects</h2>
        <Button onClick={() => setShowAddForm(true)} disabled={showAddForm}>
          <Plus className="w-4 h-4 mr-2" />
          Add New Project
        </Button>
      </div>

      {/* Add New Project Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Project</CardTitle>
            <CardDescription>Create a new project entry</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddProject} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title</Label>
                  <Input
                    id="title"
                    value={newProject.title}
                    onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="period">Time Period</Label>
                  <Input
                    id="period"
                    value={newProject.period}
                    onChange={(e) => setNewProject({...newProject, period: e.target.value})}
                    placeholder="e.g., Jan 2024 - Present"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="institution">Institution</Label>
                  <Input
                    id="institution"
                    value={newProject.institution}
                    onChange={(e) => setNewProject({...newProject, institution: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Project Type</Label>
                  <Select value={newProject.type} onValueChange={(value) => setNewProject({...newProject, type: value})}>
                    <SelectTrigger>
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

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newProject.description}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Technologies</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newTech}
                    onChange={(e) => setNewTech(e.target.value)}
                    placeholder="Add technology"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology(false))}
                  />
                  <Button type="button" onClick={() => addTechnology(false)}>Add</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {newProject.technologies.map((tech, index) => (
                    <Badge key={index} variant="outline" className="flex items-center gap-1">
                      {tech}
                      <X className="w-3 h-3 cursor-pointer" onClick={() => removeTechnology(index, false)} />
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={newProject.status} onValueChange={(value) => setNewProject({...newProject, status: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Ongoing">Ongoing</SelectItem>
                    <SelectItem value="Patented">Patented</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Button type="submit">Add Project</Button>
                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Existing Projects */}
      <div className="grid gap-4">
        {data.projects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <CardDescription>{project.institution} • {project.period}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingProject(project)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveProject(project.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
              <div className="flex flex-wrap gap-1">
                {project.technologies.map((tech, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Project Dialog */}
      {editingProject && (
        <Card>
          <CardHeader>
            <CardTitle>Edit Project</CardTitle>
            <CardDescription>Update project information</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateProject} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-title">Project Title</Label>
                  <Input
                    id="edit-title"
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({...editingProject, title: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-period">Time Period</Label>
                  <Input
                    id="edit-period"
                    value={editingProject.period}
                    onChange={(e) => setEditingProject({...editingProject, period: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editingProject.description}
                  onChange={(e) => setEditingProject({...editingProject, description: e.target.value})}
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Technologies</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newTech}
                    onChange={(e) => setNewTech(e.target.value)}
                    placeholder="Add technology"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology(true))}
                  />
                  <Button type="button" onClick={() => addTechnology(true)}>Add</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {editingProject.technologies.map((tech, index) => (
                    <Badge key={index} variant="outline" className="flex items-center gap-1">
                      {tech}
                      <X className="w-3 h-3 cursor-pointer" onClick={() => removeTechnology(index, true)} />
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit">Update Project</Button>
                <Button type="button" variant="outline" onClick={() => setEditingProject(null)}>
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
