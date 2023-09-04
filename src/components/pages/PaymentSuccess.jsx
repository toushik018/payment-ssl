import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Invoice from "./Invoice/Invoice";

const PaymentSuccess = () => {
    const { tranId } = useParams();
    console.log(tranId);
    const [orders, setOrders] = useState([]);

    console.log(orders);

    useEffect(() => {
        fetch('http://localhost:5000/orders')
            .then(response => response.json())
            .then(data => setOrders(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);


    const specificOrder = orders.find(order => order.transactionId === tranId); 

    console.log(specificOrder?.order);


    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="mb-8 w-3/5">
                <div className="relative flex items-center h-10">
                    <div className="absolute inset-0 flex-grow h-2 bg-gray-300">
                        <div className="h-2 bg-green-500 rounded-lg" style={{ width: '100%' }}></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-between">
                        <div className="absolute left-0 ml-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 bg-green-500 h-6 w-6 rounded-full border-4 border-white mt-6"></div>
                                <p className="ml-2 text-gray-600 font-semibold text-xl mt-6">Order Confirmation</p>
                            </div>
                        </div>
                        <div className="absolute right-0 mr-6">
                            <div className="flex items-center">
                                <p className="mr-2 text-gray-600 font-semibold text-xl mt-6">Payment</p>
                                <div className="flex-shrink-0 bg-green-500 h-6 w-6 rounded-full border-4 border-white mt-6"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md w-3/5 h-auto mt-10" style={{ border: "2px solid #12C29F" }}>

                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Payment Successful! with transaction id <span className="bg-gray-200 p-2">{tranId}</span> </h2>
                {specificOrder ? (
                    <div>
                        <p className="text-gray-600">
                            Thank you for choosing our services. You are now enrolled in the course:{' '}
                            <span className="font-semibold text-xl">
                                {specificOrder.course.title}
                            </span>{' '}
                            <br />
                            <span className="text-md font-semibold">
                                Instructor: {specificOrder.course.instructor}
                            </span>
                        </p>
                        <p>Mobile: {specificOrder.order.mobile} </p>
                        <p>Date: {specificOrder.order.date} </p>

                        {/* PDFViewer displays the InvoicePDF component */}
                     
                            <Invoice
                                studentName={specificOrder.studentName}
                                courseName={specificOrder.course.title}
                                instructor={specificOrder.course.instructor}
                                price={specificOrder.course.coursePrice}
                                mobile={specificOrder.order.mobile}
                                date={specificOrder.order.date}
                                
                            />
                        
                    </div>
                ) : (
                    <p className="text-gray-600">Loading Course information for this transaction.....</p>
                )}



                <Link to="/" className="mt-10">
                    <button
                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 mt-8"
                    >
                        Go to Your Courses
                    </button>
                </Link>
            </div>
        </div >
    );
};

export default PaymentSuccess;
