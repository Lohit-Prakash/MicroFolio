import { usePortfolio } from "@/contexts/PortfolioDataContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const themes = [
  { id: "default", name: "Default" },
  { id: "dark-glow", name: "Dark Glow" },
  { id: "light-professional", name: "Light Professional" },
  { id: "neon-cyberpunk", name: "Neon Cyberpunk" },
  { id: "retro-classic", name: "Retro Classic" },
  { id: "minimalist-clean", name: "Minimalist Clean" },
  { id: "nature-inspired", name: "Nature Inspired" },
  { id: "retro-wave", name: "Retro Wave" },
  { id: "cyberpunk", name: "Cyberpunk" },
  { id: "minimalist-dark", name: "Minimalist Dark" },
  { id: "futuristic-holographic", name: "Futuristic Holographic" },
  { id: "elegant-light", name: "Elegant Light" },
  { id: "brutalist", name: "Brutalist" },
  { id: "sleek-modern", name: "Sleek Modern" },
  { id: "glassmorphism", name: "Glassmorphism" },
  { id: "neobrutalism", name: "Neobrutalism" },
  { id: "minimalist-light", name: "Minimalist Light" },
  { id: "playful-creative", name: "Playful & Creative" },
  { id: "corporate-clean", name: "Corporate Clean" },
];

const EditTheme = () => {
  const { data, updateTheme } = usePortfolio();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select a Theme</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {themes.map((theme) => (
          <Button
            key={theme.id}
            variant={data.personalInfo.theme === theme.id ? "default" : "outline"}
            onClick={() => updateTheme(theme.id)}
          >
            {theme.name}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};

export default EditTheme;
