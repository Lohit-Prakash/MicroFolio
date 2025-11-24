import { useParams } from "react-router-dom";
import { usePortfolio } from "@/contexts/PortfolioDataContext";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = usePortfolio();
  const blog = data.blogs.find((b) => b.id === id);

  if (!blog) {
    return <div>Blog post not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>{blog.title}</CardTitle>
          <CardDescription>
            By {blog.author} on {new Date(blog.createdAt).toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className="prose dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogPost;
