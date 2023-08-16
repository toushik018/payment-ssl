import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [courseData, setCourseData] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/courses')
            .then(response => response.json())
            .then(data => setCourseData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {courseData ? (
                    courseData.map(course => (
                        <div
                            key={course._id}
                            className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between"
                        >
                            <div>
                                <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
                                <img src={course.image} alt={course.title} className="mb-2 rounded-lg w-full" />
                                <p className="text-gray-700 mb-2">{course.description}</p>
                                {course.instructor && (
                                    <p className="text-gray-600 mb-2">Instructor: {course.instructor}</p>
                                )}
                            </div>
                            <div className="mt-4">
                                <div className="flex justify-between items-center">
                                    <div className="text-lg font-medium text-blue-700">${course.price}</div>
                                    <Link to={`/checkout/${course._id}`} className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                                        Enroll Now
                                    </Link>
                                </div>
                                <ul className="mt-2 text-gray-600">
                                    {course.duration && (
                                        <li className="mb-1">
                                            <span>{course.duration}</span>
                                        </li>
                                    )}
                                    {course.projects && (
                                        <li className="mb-1">
                                            <span>Hands-on projects</span>
                                        </li>
                                    )}
                                    {course.certificate && (
                                        <li>
                                            <span>Certificate upon completion</span>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Loading course information...</p>
                )}
            </div>
        </div>
    );
};

export default Home;
