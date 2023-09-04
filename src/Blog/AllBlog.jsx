import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AllBlog = () => {
    const [blogs, setBlogs] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        // Fetch the JSON data
        fetch('../../public/blog.json')
            .then(response => response.json())
            .then(data => setBlogs(data.blogs))
            .catch(error => console.error('Error fetching blogs:', error));
    }, []);

    const uniqueCategories = ['All', ...new Set(blogs.map(blog => blog.category))];

    const filteredBlogs = selectedCategory === 'All'
        ? blogs
        : blogs.filter(blog => blog.category === selectedCategory);

    return (
        <div className='bg-gray-100'>

            <div className="min-h-screen w-4/5 mx-auto">
                <div className="flex flex-col md:flex-row p-6 container mx-auto gap-10">
                    <div className="w-full md:w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        {filteredBlogs.map((blog, index) => (
                            <Link to={`/blog/${blog.id}`} key={index}>
                                <div
                              
                                className="bg-white rounded-lg shadow-md p-4 transform transition duration-300 hover:shadow-lg"
                            >
                                <div className="relative h-40 mb-4 overflow-hidden rounded-md hover:scale-105">
                                    <img
                                        src={blog.blog_image}
                                        alt={blog.blog_title}
                                        className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-110"
                                    />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold mb-1">{blog.blog_title}</h2>
                                    <p className="text-gray-600 mb-2">{blog.blog_details}</p>
                                    <div className="flex justify-between items-center text-gray-400 text-sm">
                                        <p>{blog.blog_date}</p>
                                        <p className="font-semibold">{blog.blog_author}</p>
                                    </div>
                                </div>
                                </div>
                                
                            </Link>
                        ))}
                    </div>


                    <div className="w-full md:w-1/4">
                        <div className="bg-gray-100 rounded-lg p-4 border-b-4 border-b-white">
                            <h2 className="text-xl font-semibold mb-4">Categories</h2>
                            <ul className="space-y-2">
                                {uniqueCategories.map(category => (
                                    <li
                                        key={category}
                                        className={`cursor-pointer text-gray-700 hover:bg-gray-400 hover:text-white bg-gray-300 p-2 rounded-md ${selectedCategory === category ? 'font-semibold bg-gray-400 text-white' : ''}`}
                                        onClick={() => setSelectedCategory(category)}
                                    >
                                        {category}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="mt-8 bg-gray-100 rounded-lg p-4 border-b-4 border-b-white w-full">
                            <h2 className="text-xl font-semibold mb-4">Related Articles</h2>
                            <ul className="space-y-4">
                                {filteredBlogs
                                    .slice(0, 3)
                                    .map((blog, index) => (
                                        <li
                                            key={index}
                                            className="flex space-x-4 items-center bg-white rounded-lg p-2 transform transition duration-300 hover:shadow-md hover:scale-105"
                                        >
                                            <img
                                                src={blog.blog_image}
                                                alt={blog.blog_title}
                                                className="w-16 h-16 object-cover rounded-md transition-transform duration-300 transform hover:scale-110"
                                            />
                                            <div>
                                                <p className="text-sm text-gray-600">By {blog.blog_author}</p>
                                                <p className="text-gray-900 hover:underline text-md">{blog.blog_title}</p>
                                            </div>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </div>




                </div>
            </div>

        </div>
    );
};

export default AllBlog;
