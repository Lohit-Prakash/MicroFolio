import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { usePortfolio, Experience } from "@/contexts/PortfolioDataContext";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, X } from "lucide-react";

const EditExperience = () => {
  const { data, updateExperience, addExperience, removeExperience } = usePortfolio();
  const { toast } = useToast();
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAchievement, setNewAchievement] = useState("");

  const [newExperience, setNewExperience] = useState({
    title: "",
    company: "",
    period: "",
    location: "",
    description: "",
    achievements: [] as string[]
  });

  const handleAddExperience = (e: React.FormEvent) => {
    e.preventDefault();
    addExperience(newExperience);
    setNewExperience({
      title: "",
      company: "",
      period: "",
      location: "",
      description: "",
      achievements: []
    });
    setShowAddForm(false);
    toast({
      title: "Experience Added",
      description: "New experience has been successfully added.",
    });
  };

  const handleUpdateExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExperience) return;
    
    const updatedExperience = data.experience.map(exp => 
      exp.id === editingExperience.id ? editingExperience : exp
    );
    updateExperience(updatedExperience);
    setEditingExperience(null);
    toast({
      title: "Experience Updated",
      description: "Experience has been successfully updated.",
    });
  };

  const handleRemoveExperience = (id: string) => {
    removeExperience(id);
    toast({
      title: "Experience Removed",
      description: "Experience has been successfully removed.",
    });
  };

  const addAchievement = (isEditing: boolean) => {
    if (!newAchievement.trim()) return;
    
    if (isEditing && editingExperience) {
      setEditingExperience({
        ...editingExperience,
        achievements: [...editingExperience.achievements, newAchievement.trim()]
      });
    } else {
      setNewExperience({
        ...newExperience,
        achievements: [...newExperience.achievements, newAchievement.trim()]
      });
    }
    setNewAchievement("");
  };

  const removeAchievement = (index: number, isEditing: boolean) => {
    if (isEditing && editingExperience) {
      setEditingExperience({
        ...editingExperience,
        achievements: editingExperience.achievements.filter((_, i) => i !== index)
      });
    } else {
      setNewExperience({
        ...newExperience,
        achievements: newExperience.achievements.filter((_, i) => i !== index)
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Experience</h2>
        <Button onClick={() => setShowAddForm(true)} disabled={showAddForm}>
          <Plus className="w-4 h-4 mr-2" />
          Add New Experience
        </Button>
      </div>

      {/* Add New Experience Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Experience</CardTitle>
            <CardDescription>Create a new work experience entry</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddExperience} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input
                    id="title"
                    value={newExperience.title}
                    onChange={(e) => setNewExperience({...newExperience, title: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={newExperience.company}
                    onChange={(e) => setNewExperience({...newExperience, company: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="period">Time Period</Label>
                  <Input
                    id="period"
                    value={newExperience.period}
                    onChange={(e) => setNewExperience({...newExperience, period: e.target.value})}
                    placeholder="e.g., Jan 2024 - Present"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={newExperience.location}
                    onChange={(e) => setNewExperience({...newExperience, location: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newExperience.description}
                  onChange={(e) => setNewExperience({...newExperience, description: e.target.value})}
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Key Achievements</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newAchievement}
                    onChange={(e) => setNewAchievement(e.target.value)}
                    placeholder="Add achievement"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAchievement(false))}
                  />
                  <Button type="button" onClick={() => addAchievement(false)}>Add</Button>
                </div>
                <div className="space-y-2">
                  {newExperience.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                      <span className="text-sm">{achievement}</span>
                      <X className="w-4 h-4 cursor-pointer" onClick={() => removeAchievement(index, false)} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit">Add Experience</Button>
                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Existing Experience */}
      <div className="grid gap-4">
        {data.experience.map((experience) => (
          <Card key={experience.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{experience.title}</CardTitle>
                  <CardDescription>{experience.company} • {experience.location} • {experience.period}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingExperience(experience)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveExperience(experience.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">{experience.description}</p>
              <div className="space-y-1">
                {experience.achievements.map((achievement, idx) => (
                  <div key={idx} className="text-sm">• {achievement}</div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Experience Dialog */}
      {editingExperience && (
        <Card>
          <CardHeader>
            <CardTitle>Edit Experience</CardTitle>
            <CardDescription>Update experience information</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateExperience} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-title">Job Title</Label>
                  <Input
                    id="edit-title"
                    value={editingExperience.title}
                    onChange={(e) => setEditingExperience({...editingExperience, title: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-company">Company</Label>
                  <Input
                    id="edit-company"
                    value={editingExperience.company}
                    onChange={(e) => setEditingExperience({...editingExperience, company: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editingExperience.description}
                  onChange={(e) => setEditingExperience({...editingExperience, description: e.target.value})}
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Key Achievements</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={newAchievement}
                    onChange={(e) => setNewAchievement(e.target.value)}
                    placeholder="Add achievement"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAchievement(true))}
                  />
                  <Button type="button" onClick={() => addAchievement(true)}>Add</Button>
                </div>
                <div className="space-y-2">
                  {editingExperience.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                      <span className="text-sm">{achievement}</span>
                      <X className="w-4 h-4 cursor-pointer" onClick={() => removeAchievement(index, true)} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit">Update Experience</Button>
                <Button type="button" variant="outline" onClick={() => setEditingExperience(null)}>
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

export default EditExperience;
