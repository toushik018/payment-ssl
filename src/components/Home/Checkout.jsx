import { useEffect, useState } from 'react';
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
        setValue('date', currentDate);
    }, [setValue]);



    const onSubmit = (data) => {
        console.log(data);
        data.courseId = id;
        fetch('http://localhost:5000/order', {
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
        <div className='mt-20 container'>


            <div className='w-3/5 mx-auto mb-8'>
                <div className='relative flex items-center'>
                    <div className='flex-grow h-2 bg-gray-300'>
                        <div className='h-2 bg-green-500 rounded-lg' style={{ width: '60%' }}></div>
                    </div>
                    <div className='absolute top-4 left-6 transform -translate-x-1/2'>
                        <div className='flex items-center'>
                            <div className='flex-shrink-0 bg-green-500 h-6 w-6 rounded-full border-4 border-white'></div>
                            <p className='ml-2 text-gray-600 font-semibold'>Order Confirmation</p>
                        </div>
                    </div>
                    <div className='absolute top-4 -right-2 transform translate-x-1/2'>
                        <div className='flex items-center'>
                            <p className='mr-2 text-gray-600 font-semibold'>Payment</p>
                            <div className='flex-shrink-0 bg-gray-300 h-6 w-6 rounded-full border-4 border-white'></div>
                        </div>
                    </div>
                </div>
            </div>






            <div className="flex flex-col md:flex-row justify-center items-start gap-4 h-screen mt-20">
                {/* Left side - Course info */}
                <div className="bg-white p-8 rounded-lg border-2 border-gray-200 w-full md:w-2/3 lg:w-1/2 xl:w-1/3 mb-4 md:mb-0">
                    {course ? (
                        <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-center">
                            <img
                                src={course?.courseThumbnail}
                                alt={course?.title}
                                className="mb-4 w-28 md:w-40 rounded-md"
                            />
                            <div>
                                <h2 className="text-xl md:text-2xl font-bold mb-2 text-gray-700">
                                    {course?.title}
                                </h2>
                                <p className="text-gray-600 font-bold">${course?.coursePrice}</p>
                            </div>
                        </div>
                    ) : (
                        <p>Loading course information...</p>
                    )}
                </div>

                {/* Right side - Payment info */}
                <div className="bg-white p-8 rounded-lg border-2 border-gray-200 w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
                    <h2 className="text-xl md:text-2xl font-semibold mb-4">Payment Summary</h2>

                    <div className="flex justify-between text-gray-700 mb-4">
                        <p className="text-lg md:text-xl font-semibold">Course Price:</p>
                        <p className="text-lg md:text-xl font-bold">${course?.coursePrice}</p>
                    </div>

                    <hr className="border-1 border-gray-400 mb-4" />

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label htmlFor="mobile" className="block text-gray-700 font-medium mb-2">
                                Mobile Number
                            </label>
                            <input
                                required
                                type="text"
                                id="mobile"
                                name="mobile"
                                {...register("mobile")}
                                className="border rounded-md px-3 py-2 w-full bg-gray-100 focus:outline-none focus:ring focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="date" className="block text-gray-700 font-medium mb-2">
                                Date
                            </label>
                            <input
                                type="text"
                                id="date"
                                name="date"
                                readOnly
                                {...register("date")}
                                className="border rounded-md px-3 py-2 w-full bg-gray-100 focus:outline-none focus:ring focus:border-blue-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 w-full"
                        >
                            Pay Now
                        </button>
                    </form>
                </div>
            </div>

        </div>


    );
};

export default Checkout;
