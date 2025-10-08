import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { usePortfolio } from "@/contexts/PortfolioDataContext";
import { Plus, X, Save } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const EditAbout = () => {
  const { data, updateAboutSection } = usePortfolio();
  const { toast } = useToast();
  const [aboutSection, setAboutSection] = useState(data.aboutSection);
  const [newResearchArea, setNewResearchArea] = useState("");
  const [newSkill, setNewSkill] = useState("");

  useEffect(() => {
    setAboutSection(data.aboutSection);
  }, [data.aboutSection]);

  const handleSave = () => {
    updateAboutSection(aboutSection);
    toast({
      title: "About Section Updated",
      description: "Your about section has been successfully updated.",
    });
  };

  const addResearchArea = () => {
    if (newResearchArea.trim()) {
      setAboutSection({
        ...aboutSection,
        researchAreas: [...aboutSection.researchAreas, newResearchArea.trim()]
      });
      setNewResearchArea("");
    }
  };

  const removeResearchArea = (index: number) => {
    setAboutSection({
      ...aboutSection,
      researchAreas: aboutSection.researchAreas.filter((_, i) => i !== index)
    });
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setAboutSection({
        ...aboutSection,
        keySkills: [...aboutSection.keySkills, newSkill.trim()]
      });
      setNewSkill("");
    }
  };

  const removeSkill = (index: number) => {
    setAboutSection({
      ...aboutSection,
      keySkills: aboutSection.keySkills.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Edit About Section</h2>
          <p className="text-muted-foreground mt-1">Manage your about content and focus areas</p>
        </div>
        <Button onClick={handleSave} size="lg" className="gap-2">
          <Save className="w-4 h-4" />
          Save Changes
        </Button>
      </div>

      <Card className="card-elevated">
        <CardHeader>
          <CardTitle>About Cards</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="vision">Vision</Label>
            <Textarea
              id="vision"
              value={aboutSection.vision}
              onChange={(e) => setAboutSection({ ...aboutSection, vision: e.target.value })}
              placeholder="Your vision statement"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="educationDesc">Education Description</Label>
            <Textarea
              id="educationDesc"
              value={aboutSection.educationDesc}
              onChange={(e) => setAboutSection({ ...aboutSection, educationDesc: e.target.value })}
              placeholder="Your education description"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="innovation">Innovation</Label>
            <Textarea
              id="innovation"
              value={aboutSection.innovation}
              onChange={(e) => setAboutSection({ ...aboutSection, innovation: e.target.value })}
              placeholder="Your innovation focus"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="card-elevated">
        <CardHeader>
          <CardTitle>Research Areas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newResearchArea}
              onChange={(e) => setNewResearchArea(e.target.value)}
              placeholder="Add new research area"
              onKeyPress={(e) => e.key === 'Enter' && addResearchArea()}
            />
            <Button onClick={addResearchArea} size="icon">
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {aboutSection.researchAreas.map((area, index) => (
              <Badge key={index} variant="secondary" className="text-sm py-2 px-3">
                {area}
                <button
                  onClick={() => removeResearchArea(index)}
                  className="ml-2 hover:text-destructive"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="card-elevated">
        <CardHeader>
          <CardTitle>Key Skills</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add new skill"
              onKeyPress={(e) => e.key === 'Enter' && addSkill()}
            />
            <Button onClick={addSkill} size="icon">
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {aboutSection.keySkills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-sm py-2 px-3">
                {skill}
                <button
                  onClick={() => removeSkill(index)}
                  className="ml-2 hover:text-destructive"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditAbout;
