

const PaymentFail = () => {
    return (
        <div className="flex h-screen bg-gray-100">
            <div className="m-auto p-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-semibold text-red-500 mb-4">Payment Failed</h1>
                <p className="text-gray-600 mb-4">We are sorry, but your payment was not successful. Please try again later or contact our support for assistance.</p>
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300">
                    Go Back
                </button>
            </div>
        </div>
    );
};

export default PaymentFail;
