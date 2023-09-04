import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const BlogDetails = () => {
    const {id} = useParams();
    const [blog, setBlog] = useState(null);
    const [blogs, setBlogs] = useState([]);

 

    const relatedArticles = blogs
    .filter(article => article.id !== blogs.id && article.category === blog?.category)
    .slice(0, 3);

    useEffect(() => {
        // Fetch the blogs data
        fetch('../../public/blog.json')
            .then(response => response.json())
            .then(data => setBlogs(data.blogs))
            .catch(error => console.error('Error fetching blogs:', error));
        
        // Fetch the blog data based on the ID
        const selectedBlog = blogs.find(blog => blog.id === parseInt(id));
        if (selectedBlog) {
            setBlog(selectedBlog);
        } else {
            console.error('Blog not found');
        }
    }, [id, blogs]);

    console.log(blog);

    return (
        <div className="bg-gray-100">
        <div className="container mx-auto p-6">
          <div className="py-4">
            <p className="text-gray-500">
              <span className="text-blue-500 cursor-pointer hover:underline">Blog</span> &gt;&gt; Blog Details
            </p>
            <h1 className="text-3xl font-bold mt-2 mb-4">{blog?.blog_title}</h1>
          </div>
  
          <div className="flex space-x-8">
            <div className="flex-shrink-0 w-2/3">
              <img src={blog?.blog_image} alt={blog?.blog_title} className="rounded-lg mb-4 w-full h-96 object-cover" />
              <p className="text-gray-600 mb-2">{blog?.blog_date} | By {blog?.blog_author}</p>
              <div className="text-gray-800">{blog?.blog_details}</div>
            </div>
            <div className="w-1/3">
            <h2 className="text-xl font-semibold mb-4">Related Articles</h2>
            <ul className="space-y-4">
              {relatedArticles?.map(article => (
                <li
                  key={article.id}
                  className="flex space-x-4 items-center bg-white rounded-lg p-2 transform transition duration-300 hover:shadow-md hover:scale-105"
                >
                  <img
                    src={article.blog_image}
                    alt={article.blog_title}
                    className="w-16 h-16 object-cover rounded-md transition-transform duration-300 transform hover:scale-110"
                  />
                  <div>
                    <p className="text-sm text-gray-600">By {article.blog_author}</p>
                    <p className="text-gray-900 hover:underline text-md">{article.blog_title}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
           
          </div>
        </div>
      </div>
    );
};

export default BlogDetails;