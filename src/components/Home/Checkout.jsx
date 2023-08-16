import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Checkout = () => {
    const [course, setCourse] = useState(null);
    const { id } = useParams();
    const { register, handleSubmit, setValue } = useForm();

    console.log(id);

    useEffect(() => {
        fetch(`http://localhost:5000/course/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch course data');
                }
                return response.json();
            })
            .then(data => {
                setCourse(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [id]);


    useEffect(() => {
        const currentDate = new Date().toLocaleDateString();
        setValue('date', currentDate); // Automatically populate the current date
    }, [setValue]);






    const onSubmit = (data) => {
        console.log(data);
        data.courseId = id;
        fetch('http://localhost:5000/orders', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(result => {
          window.location.replace(result.url)
          console.log(result);
        })
    
    
        // Logic for handling the form submission
      };
    




    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white rounded-lg shadow-md p-8 max-w-md">
                {course ? (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h2 className="text-2xl font-semibold mb-3">Checkout for Course: {course.title}</h2>
                        <p className="mb-2">Course Fee: ${course.price}</p>
                        <p className="mb-4">Instructor: {course.instructor}</p>
                        <div className="mb-4">
                            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                                Mobile Number
                            </label>
                            <input
                                type="text"
                                id="mobile"
                                name="mobile"
                                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Enter your mobile number"
                                {...register('mobile', { required: true })}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                                Date
                            </label>
                            <input
                                type="text"
                                id="date"
                                name="date"
                                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                readOnly
                                {...register('date')}
                            />
                        </div>
                        <div className="flex justify-between">
                            <button
                                type="submit"
                                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                            >
                                Pay Now
                            </button>
                        </div>
                    </form>
                ) : (
                    <p>Loading course information...</p>
                )}
            </div>
        </div>
    );
};

export default Checkout;
