import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { usePortfolio, Blog } from "@/contexts/PortfolioDataContext";
import { Plus, Edit2, Trash2, GripVertical } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const EditBlog = () => {
  const { toast } = useToast();
  const { data, addBlog, updateBlog, removeBlog, updateBlogsOrder } = usePortfolio();

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);

  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    author: "",
  });

  const handleAddBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlog.title || !newBlog.content || !newBlog.author) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }
    await addBlog(newBlog);
    setNewBlog({ title: "", content: "", author: "" });
    setShowAddForm(false);
    toast({
      title: "Blog Post Added",
      description: "Your new blog post has been added successfully.",
    });
  };

  const handleUpdateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog) return;
    await updateBlog(editingBlog);
    setEditingBlog(null);
    toast({
      title: "Blog Post Updated",
      description: "Your blog post has been updated successfully.",
    });
  };

  const handleRemoveBlog = async (id: string) => {
    await removeBlog(id);
    toast({
      title: "Blog Post Removed",
      description: "Your blog post has been removed successfully.",
    });
  };

  const handleDragEnd = async (result: any) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(data.blogs);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    await updateBlogsOrder(items.map((item) => item.id));

    toast({
      title: "Blog Posts Reordered",
      description: "Your blog posts have been reordered successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Manage Blog</h2>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Blog Post
        </Button>
      </div>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Blog Post</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddBlog} className="space-y-4">
              <Input
                placeholder="Title"
                value={newBlog.title}
                onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                required
              />
              <Input
                placeholder="Author"
                value={newBlog.author}
                onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
                required
              />
              <ReactQuill
                value={newBlog.content}
                onChange={(content) => setNewBlog({ ...newBlog, content })}
              />
              <div className="flex gap-2">
                <Button type="submit">Add Post</Button>
                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="blog-list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
              {data.blogs.map((blog, index) => (
                <Draggable key={blog.id} draggableId={blog.id} index={index}>
                  {(provided, snapshot) => (
                    <Card
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`transition-all duration-200 ${
                        snapshot.isDragging ? "opacity-80 shadow-2xl scale-105" : ""
                      }`}
                    >
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div
                            {...provided.dragHandleProps}
                            className="flex items-center justify-center p-2 rounded-lg hover:bg-muted/50 cursor-grab active:cursor-grabbing transition-colors group mr-4"
                          >
                            <GripVertical className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold">{blog.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              By {blog.author} on {new Date(blog.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setEditingBlog(blog)}
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleRemoveBlog(blog.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {editingBlog && (
        <Card>
          <CardHeader>
            <CardTitle>Edit Blog Post</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateBlog} className="space-y-4">
              <Input
                placeholder="Title"
                value={editingBlog.title}
                onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
                required
              />
              <Input
                placeholder="Author"
                value={editingBlog.author}
                onChange={(e) => setEditingBlog({ ...editingBlog, author: e.target.value })}
                required
              />
              <ReactQuill
                value={editingBlog.content}
                onChange={(content) => setEditingBlog({ ...editingBlog, content })}
              />
              <div className="flex gap-2">
                <Button type="submit">Update Post</Button>
                <Button type="button" variant="outline" onClick={() => setEditingBlog(null)}>
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

export default EditBlog;
