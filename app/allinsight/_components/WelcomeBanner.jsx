import React from 'react';

export default function WelcomeBanner() {
    return (
        <div className="p-8 sm:p-12 bg-gradient-to-br from-blue-600 via-indigo-600 to-pink-500 rounded-2xl shadow-xl text-white">
            <div className="space-y-4 text-center">
                <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
                    Welcome to <span className="text-yellow-300">Allinsights</span>
                </h1>
                <p className="text-lg sm:text-xl font-medium">
                    Your Ultimate Online Learning Platform
                </p>
                <p className="text-sm sm:text-base text-white/90">
                    Learn, Create, and Explore your favorite courses with ease
                </p>
            </div>
        </div>
    );
}
