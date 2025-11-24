import { Link } from "react-router-dom";
import { usePortfolio } from "@/contexts/PortfolioDataContext";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

const Blog = () => {
  const { data } = usePortfolio();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <div className="grid gap-8">
        {data.blogs.map((blog) => (
          <Link to={`/blog/${blog.id}`} key={blog.id}>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle>{blog.title}</CardTitle>
                <CardDescription>
                  By {blog.author} on {new Date(blog.createdAt).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className="prose dark:prose-invert"
                  dangerouslySetInnerHTML={{
                    __html: blog.content.substring(0, 200) + "...",
                  }}
                />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blog;
