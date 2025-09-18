import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { usePortfolio, Experience } from "@/contexts/PortfolioDataContext";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, X, Briefcase } from "lucide-react";

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
    <div className="space-responsive animate-fade-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Briefcase className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Manage Experience</h2>
            <p className="text-sm text-muted-foreground">Add and edit your professional experience</p>
          </div>
        </div>
        <Button 
          onClick={() => setShowAddForm(true)} 
          disabled={showAddForm}
          className="hover-lift transition-spring shadow-medium hover:shadow-strong"
          size="lg"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Experience
        </Button>
      </div>

      {/* Add New Experience Form */}
      {showAddForm && (
        <Card className="card-modern animate-scale-up mb-8">
          <CardHeader className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10">
                <Plus className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-xl">Add New Experience</CardTitle>
                <CardDescription>Create a new work experience entry</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddExperience} className="space-responsive">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="title" className="text-sm font-semibold text-foreground/80">Job Title</Label>
                  <Input
                    id="title"
                    value={newExperience.title}
                    onChange={(e) => setNewExperience({...newExperience, title: e.target.value})}
                    required
                    className="transition-all duration-300 focus:shadow-glow hover:shadow-medium"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="company" className="text-sm font-semibold text-foreground/80">Company</Label>
                  <Input
                    id="company"
                    value={newExperience.company}
                    onChange={(e) => setNewExperience({...newExperience, company: e.target.value})}
                    required
                    className="transition-all duration-300 focus:shadow-glow hover:shadow-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="period" className="text-sm font-semibold text-foreground/80">Time Period</Label>
                  <Input
                    id="period"
                    value={newExperience.period}
                    onChange={(e) => setNewExperience({...newExperience, period: e.target.value})}
                    placeholder="e.g., Jan 2024 - Present"
                    required
                    className="transition-all duration-300 focus:shadow-glow hover:shadow-medium"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="location" className="text-sm font-semibold text-foreground/80">Location</Label>
                  <Input
                    id="location"
                    value={newExperience.location}
                    onChange={(e) => setNewExperience({...newExperience, location: e.target.value})}
                    required
                    className="transition-all duration-300 focus:shadow-glow hover:shadow-medium"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="description" className="text-sm font-semibold text-foreground/80">Description</Label>
                <Textarea
                  id="description"
                  value={newExperience.description}
                  onChange={(e) => setNewExperience({...newExperience, description: e.target.value})}
                  rows={4}
                  required
                  className="transition-all duration-300 focus:shadow-glow hover:shadow-medium resize-none"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-semibold text-foreground/80">Key Achievements</Label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    value={newAchievement}
                    onChange={(e) => setNewAchievement(e.target.value)}
                    placeholder="Add achievement"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAchievement(false))}
                    className="flex-1 transition-all duration-300 focus:shadow-glow hover:shadow-medium"
                  />
                  <Button type="button" onClick={() => addAchievement(false)} variant="outline" className="hover-scale transition-spring">
                    Add
                  </Button>
                </div>
                <div className="space-y-2 mt-3">
                  {newExperience.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover-lift transition-spring group">
                      <span className="text-sm flex-1 pr-2">{achievement}</span>
                      <X className="w-4 h-4 cursor-pointer opacity-60 group-hover:opacity-100 transition-opacity hover-scale" onClick={() => removeAchievement(index, false)} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button type="submit" className="hover-lift transition-spring shadow-medium hover:shadow-strong">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Experience
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)} className="hover-scale transition-spring">
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Existing Experience */}
      <div className="grid gap-6">
        {data.experience.map((experience, index) => (
          <Card key={experience.id} className="card-modern hover-lift animate-slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-1.5 rounded-lg bg-primary/10">
                      <Briefcase className="w-4 h-4 text-primary" />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      Professional
                    </Badge>
                  </div>
                  <CardTitle className="text-lg sm:text-xl leading-tight mb-1">{experience.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {experience.company} • {experience.location} • {experience.period}
                  </CardDescription>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingExperience(experience)}
                    className="hover-scale transition-spring"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveExperience(experience.id)}
                    className="hover-scale transition-spring"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">{experience.description}</p>
              {experience.achievements.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-foreground/80">Key Achievements:</h4>
                  <div className="space-y-1">
                    {experience.achievements.map((achievement, idx) => (
                      <div key={idx} className="text-sm flex items-start gap-2">
                        <span className="text-primary font-bold mt-0.5">•</span>
                        <span className="flex-1">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Experience Form */}
      {editingExperience && (
        <Card className="card-modern animate-scale-up mt-8">
          <CardHeader className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Briefcase className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-xl">Edit Experience</CardTitle>
                <CardDescription>Update experience information</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateExperience} className="space-responsive">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="edit-title" className="text-sm font-semibold text-foreground/80">Job Title</Label>
                  <Input
                    id="edit-title"
                    value={editingExperience.title}
                    onChange={(e) => setEditingExperience({...editingExperience, title: e.target.value})}
                    required
                    className="transition-all duration-300 focus:shadow-glow hover:shadow-medium"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="edit-company" className="text-sm font-semibold text-foreground/80">Company</Label>
                  <Input
                    id="edit-company"
                    value={editingExperience.company}
                    onChange={(e) => setEditingExperience({...editingExperience, company: e.target.value})}
                    required
                    className="transition-all duration-300 focus:shadow-glow hover:shadow-medium"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="edit-description" className="text-sm font-semibold text-foreground/80">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editingExperience.description}
                  onChange={(e) => setEditingExperience({...editingExperience, description: e.target.value})}
                  rows={4}
                  required
                  className="transition-all duration-300 focus:shadow-glow hover:shadow-medium resize-none"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-semibold text-foreground/80">Key Achievements</Label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    value={newAchievement}
                    onChange={(e) => setNewAchievement(e.target.value)}
                    placeholder="Add achievement"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAchievement(true))}
                    className="flex-1 transition-all duration-300 focus:shadow-glow hover:shadow-medium"
                  />
                  <Button type="button" onClick={() => addAchievement(true)} variant="outline" className="hover-scale transition-spring">
                    Add
                  </Button>
                </div>
                <div className="space-y-2 mt-3">
                  {editingExperience.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover-lift transition-spring group">
                      <span className="text-sm flex-1 pr-2">{achievement}</span>
                      <X className="w-4 h-4 cursor-pointer opacity-60 group-hover:opacity-100 transition-opacity hover-scale" onClick={() => removeAchievement(index, true)} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button type="submit" className="hover-lift transition-spring shadow-medium hover:shadow-strong">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Update Experience
                </Button>
                <Button type="button" variant="outline" onClick={() => setEditingExperience(null)} className="hover-scale transition-spring">
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
