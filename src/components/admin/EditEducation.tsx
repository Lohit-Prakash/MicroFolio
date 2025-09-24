import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { GraduationCap, Plus, Edit2, Trash2, X } from "lucide-react";

interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
  gpa?: string;
  relevant_courses?: string[];
}

const EditEducation = () => {
  const { toast } = useToast();
  
  // Mock data - replace with actual data source
  const [educations, setEducations] = useState<Education[]>([
    {
      id: "1",
      degree: "Master of Science in Computer Science",
      institution: "Stanford University", 
      location: "Stanford, CA",
      period: "2020 - 2022",
      description: "Specialized in Machine Learning and Artificial Intelligence with focus on deep learning applications.",
      achievements: ["Graduated Magna Cum Laude", "Research Assistant in AI Lab", "Published 2 papers"],
      gpa: "3.9/4.0",
      relevant_courses: ["Deep Learning", "Computer Vision", "Natural Language Processing"]
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingEducation, setEditingEducation] = useState<Education | null>(null);
  
  const [newEducation, setNewEducation] = useState({
    degree: "",
    institution: "",
    location: "",
    period: "",
    description: "",
    gpa: "",
    achievements: [] as string[],
    relevant_courses: [] as string[]
  });

  const [newAchievement, setNewAchievement] = useState("");
  const [newCourse, setNewCourse] = useState("");

  const handleAddEducation = (e: React.FormEvent) => {
    e.preventDefault();
    
    const education: Education = {
      id: Date.now().toString(),
      ...newEducation
    };
    
    setEducations([...educations, education]);
    setNewEducation({
      degree: "",
      institution: "",
      location: "",
      period: "",
      description: "",
      gpa: "",
      achievements: [],
      relevant_courses: []
    });
    setShowAddForm(false);
    
    toast({
      title: "Education Added",
      description: "Education entry has been added successfully.",
    });
  };

  const handleUpdateEducation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEducation) return;

    setEducations(educations.map(edu => 
      edu.id === editingEducation.id ? editingEducation : edu
    ));
    setEditingEducation(null);
    
    toast({
      title: "Education Updated",
      description: "Education entry has been updated successfully.",
    });
  };

  const handleRemoveEducation = (id: string) => {
    setEducations(educations.filter(edu => edu.id !== id));
    toast({
      title: "Education Removed",
      description: "Education entry has been removed successfully.",
    });
  };

  const addAchievement = (isEditing: boolean = false) => {
    if (newAchievement.trim()) {
      if (isEditing && editingEducation) {
        setEditingEducation({
          ...editingEducation,
          achievements: [...editingEducation.achievements, newAchievement]
        });
      } else {
        setNewEducation({
          ...newEducation,
          achievements: [...newEducation.achievements, newAchievement]
        });
      }
      setNewAchievement("");
    }
  };

  const removeAchievement = (index: number, isEditing: boolean = false) => {
    if (isEditing && editingEducation) {
      setEditingEducation({
        ...editingEducation,
        achievements: editingEducation.achievements.filter((_, i) => i !== index)
      });
    } else {
      setNewEducation({
        ...newEducation,
        achievements: newEducation.achievements.filter((_, i) => i !== index)
      });
    }
  };

  const addCourse = (isEditing: boolean = false) => {
    if (newCourse.trim()) {
      if (isEditing && editingEducation) {
        setEditingEducation({
          ...editingEducation,
          relevant_courses: [...(editingEducation.relevant_courses || []), newCourse]
        });
      } else {
        setNewEducation({
          ...newEducation,
          relevant_courses: [...newEducation.relevant_courses, newCourse]
        });
      }
      setNewCourse("");
    }
  };

  const removeCourse = (index: number, isEditing: boolean = false) => {
    if (isEditing && editingEducation) {
      setEditingEducation({
        ...editingEducation,
        relevant_courses: (editingEducation.relevant_courses || []).filter((_, i) => i !== index)
      });
    } else {
      setNewEducation({
        ...newEducation,
        relevant_courses: newEducation.relevant_courses.filter((_, i) => i !== index)
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <GraduationCap className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Manage Education</h2>
        </div>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Education
        </Button>
      </div>

      {/* Add New Education Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Education</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddEducation} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Degree"
                  value={newEducation.degree}
                  onChange={(e) => setNewEducation({...newEducation, degree: e.target.value})}
                  required
                />
                <Input
                  placeholder="Institution"
                  value={newEducation.institution}
                  onChange={(e) => setNewEducation({...newEducation, institution: e.target.value})}
                  required
                />
                <Input
                  placeholder="Location"
                  value={newEducation.location}
                  onChange={(e) => setNewEducation({...newEducation, location: e.target.value})}
                  required
                />
                <Input
                  placeholder="Period (e.g., 2020 - 2022)"
                  value={newEducation.period}
                  onChange={(e) => setNewEducation({...newEducation, period: e.target.value})}
                  required
                />
                <Input
                  placeholder="GPA (optional)"
                  value={newEducation.gpa}
                  onChange={(e) => setNewEducation({...newEducation, gpa: e.target.value})}
                />
              </div>
              
              <Textarea
                placeholder="Description"
                value={newEducation.description}
                onChange={(e) => setNewEducation({...newEducation, description: e.target.value})}
                required
              />

              {/* Achievements */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Achievements</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add achievement"
                    value={newAchievement}
                    onChange={(e) => setNewAchievement(e.target.value)}
                  />
                  <Button type="button" onClick={() => addAchievement(false)}>
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {newEducation.achievements.map((achievement, index) => (
                    <Badge key={index} variant="secondary" className="gap-1">
                      {achievement}
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => removeAchievement(index, false)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Relevant Courses */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Relevant Courses</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add course"
                    value={newCourse}
                    onChange={(e) => setNewCourse(e.target.value)}
                  />
                  <Button type="button" onClick={() => addCourse(false)}>
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {newEducation.relevant_courses.map((course, index) => (
                    <Badge key={index} variant="outline" className="gap-1">
                      {course}
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => removeCourse(index, false)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit">Add Education</Button>
                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Education List */}
      <div className="space-y-4">
        {educations.map((education) => (
          <Card key={education.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{education.degree}</h3>
                  <p className="text-primary font-medium">{education.institution}</p>
                  <p className="text-muted-foreground">{education.location} • {education.period}</p>
                  {education.gpa && (
                    <p className="text-sm text-muted-foreground mt-1">GPA: {education.gpa}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingEducation(education)}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveEducation(education.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-4">{education.description}</p>
              
              {education.achievements.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Achievements</h4>
                  <div className="flex flex-wrap gap-2">
                    {education.achievements.map((achievement, index) => (
                      <Badge key={index} variant="secondary">
                        {achievement}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {education.relevant_courses && education.relevant_courses.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Relevant Courses</h4>
                  <div className="flex flex-wrap gap-2">
                    {education.relevant_courses.map((course, index) => (
                      <Badge key={index} variant="outline">
                        {course}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Education Modal/Form */}
      {editingEducation && (
        <Card className="border-primary">
          <CardHeader>
            <CardTitle>Edit Education</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateEducation} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Degree"
                  value={editingEducation.degree}
                  onChange={(e) => setEditingEducation({...editingEducation, degree: e.target.value})}
                  required
                />
                <Input
                  placeholder="Institution"
                  value={editingEducation.institution}
                  onChange={(e) => setEditingEducation({...editingEducation, institution: e.target.value})}
                  required
                />
                <Input
                  placeholder="Location"
                  value={editingEducation.location}
                  onChange={(e) => setEditingEducation({...editingEducation, location: e.target.value})}
                  required
                />
                <Input
                  placeholder="Period"
                  value={editingEducation.period}
                  onChange={(e) => setEditingEducation({...editingEducation, period: e.target.value})}
                  required
                />
                <Input
                  placeholder="GPA (optional)"
                  value={editingEducation.gpa || ""}
                  onChange={(e) => setEditingEducation({...editingEducation, gpa: e.target.value})}
                />
              </div>
              
              <Textarea
                placeholder="Description"
                value={editingEducation.description}
                onChange={(e) => setEditingEducation({...editingEducation, description: e.target.value})}
                required
              />

              {/* Edit Achievements */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Achievements</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add achievement"
                    value={newAchievement}
                    onChange={(e) => setNewAchievement(e.target.value)}
                  />
                  <Button type="button" onClick={() => addAchievement(true)}>
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {editingEducation.achievements.map((achievement, index) => (
                    <Badge key={index} variant="secondary" className="gap-1">
                      {achievement}
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => removeAchievement(index, true)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Edit Courses */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Relevant Courses</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add course"
                    value={newCourse}
                    onChange={(e) => setNewCourse(e.target.value)}
                  />
                  <Button type="button" onClick={() => addCourse(true)}>
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(editingEducation.relevant_courses || []).map((course, index) => (
                    <Badge key={index} variant="outline" className="gap-1">
                      {course}
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => removeCourse(index, true)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit">Update Education</Button>
                <Button type="button" variant="outline" onClick={() => setEditingEducation(null)}>
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

export default EditEducation;