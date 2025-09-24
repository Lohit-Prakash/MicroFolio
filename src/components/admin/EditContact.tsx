import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, MessageSquare, Send, Globe, Linkedin, Github, Youtube, Instagram, Twitter } from "lucide-react";

const EditContact = () => {
  const { toast } = useToast();
  
  const [contactInfo, setContactInfo] = useState({
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    website: "https://johndoe.dev",
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
    youtube: "https://youtube.com/@johndoe",
    instagram: "https://instagram.com/johndoe",
    twitter: "https://twitter.com/johndoe"
  });

  const [contactForm, setContactForm] = useState({
    enableContactForm: true,
    emailNotifications: true,
    autoReply: true,
    autoReplyMessage: "Thank you for your message! I'll get back to you within 24 hours."
  });

  const [messages, setMessages] = useState([
    {
      id: "1",
      name: "Alice Johnson",
      email: "alice@example.com",
      subject: "Job Opportunity",
      message: "Hi, I'd like to discuss a potential collaboration opportunity.",
      date: "2024-01-15",
      status: "unread"
    },
    {
      id: "2", 
      name: "Bob Smith",
      email: "bob@example.com",
      subject: "Question about your project",
      message: "I saw your portfolio and had some questions about the tech stack you used.",
      date: "2024-01-14",
      status: "read"
    }
  ]);

  const handleContactInfoUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Contact Info Updated",
      description: "Your contact information has been updated successfully.",
    });
  };

  const handleContactFormUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Contact Form Settings Updated",
      description: "Your contact form settings have been updated successfully.",
    });
  };

  const markAsRead = (id: string) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, status: "read" } : msg
    ));
  };

  const deleteMessage = (id: string) => {
    setMessages(messages.filter(msg => msg.id !== id));
    toast({
      title: "Message Deleted",
      description: "The message has been deleted successfully.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Mail className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold">Contact Management</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleContactInfoUpdate} className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Email"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Phone"
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Location"
                    value={contactInfo.location}
                    onChange={(e) => setContactInfo({...contactInfo, location: e.target.value})}
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Website"
                    value={contactInfo.website}
                    onChange={(e) => setContactInfo({...contactInfo, website: e.target.value})}
                  />
                </div>
              </div>
              
              <Button type="submit" className="w-full">
                Update Contact Info
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Social Media Links */}
        <Card>
          <CardHeader>
            <CardTitle>Social Media Links</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleContactInfoUpdate} className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="LinkedIn URL"
                    value={contactInfo.linkedin}
                    onChange={(e) => setContactInfo({...contactInfo, linkedin: e.target.value})}
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Github className="w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="GitHub URL"
                    value={contactInfo.github}
                    onChange={(e) => setContactInfo({...contactInfo, github: e.target.value})}
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Youtube className="w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="YouTube URL"
                    value={contactInfo.youtube}
                    onChange={(e) => setContactInfo({...contactInfo, youtube: e.target.value})}
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Instagram className="w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Instagram URL"
                    value={contactInfo.instagram}
                    onChange={(e) => setContactInfo({...contactInfo, instagram: e.target.value})}
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Twitter className="w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Twitter URL"
                    value={contactInfo.twitter}
                    onChange={(e) => setContactInfo({...contactInfo, twitter: e.target.value})}
                  />
                </div>
              </div>
              
              <Button type="submit" className="w-full">
                Update Social Links
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Contact Form Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Contact Form Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleContactFormUpdate} className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Enable Contact Form</label>
              <input
                type="checkbox"
                checked={contactForm.enableContactForm}
                onChange={(e) => setContactForm({...contactForm, enableContactForm: e.target.checked})}
                className="rounded"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Email Notifications</label>
              <input
                type="checkbox"
                checked={contactForm.emailNotifications}
                onChange={(e) => setContactForm({...contactForm, emailNotifications: e.target.checked})}
                className="rounded"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Auto Reply</label>
              <input
                type="checkbox"
                checked={contactForm.autoReply}
                onChange={(e) => setContactForm({...contactForm, autoReply: e.target.checked})}
                className="rounded"
              />
            </div>
            
            {contactForm.autoReply && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Auto Reply Message</label>
                <Textarea
                  placeholder="Enter your auto reply message"
                  value={contactForm.autoReplyMessage}
                  onChange={(e) => setContactForm({...contactForm, autoReplyMessage: e.target.value})}
                />
              </div>
            )}
            
            <Button type="submit" className="w-full">
              Update Contact Form Settings
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Messages */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="w-5 h-5" />
            Recent Messages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {messages.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No messages yet</p>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`border rounded-lg p-4 ${
                    message.status === 'unread' ? 'border-primary bg-primary/5' : 'border-border'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{message.name}</h4>
                      <p className="text-sm text-muted-foreground">{message.email}</p>
                    </div>
                    <div className="flex gap-2">
                      {message.status === 'unread' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => markAsRead(message.id)}
                        >
                          Mark as Read
                        </Button>
                      )}
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteMessage(message.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                  
                  <h5 className="font-medium mb-2">{message.subject}</h5>
                  <p className="text-sm text-muted-foreground mb-2">{message.message}</p>
                  <p className="text-xs text-muted-foreground">{message.date}</p>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditContact;