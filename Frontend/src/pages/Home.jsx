import React from 'react';

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <header className="bg-blue-600 w-full py-4 shadow-md">
                <h1 className="text-white text-3xl text-center">Welcome to SupplySync</h1>
            </header>
            <main className="flex flex-col items-center mt-10">
                <h2 className="text-2xl font-semibold mb-4">Your one-stop solution for supply chain management</h2>
                <p className="text-gray-700 text-center max-w-md mb-8">
                    Manage your supply chain efficiently and effectively with our comprehensive tools and features.
                </p>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-700 transition duration-300">
                    Get Started
                </button>
            </main>
            <footer className="bg-gray-800 w-full py-4 mt-auto">
                <p className="text-gray-400 text-center">&copy; 2023 SupplySync. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;