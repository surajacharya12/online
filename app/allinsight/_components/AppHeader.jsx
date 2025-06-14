import React, { useEffect } from 'react';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import { ArrowRight, MapPin, GraduationCap, BookOpenText, Presentation, Lightbulb, Brain, Globe, Users } from 'lucide-react';
import { SidebarTrigger } from '../../../components/ui/sidebar';
import Navbar from '../components/navbar';
import Link from 'next/link';

export function AppHeader({ hideSidebar = false }) {
  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between flex-wrap p-4 shadow-md bg-white w-full">
        <div className="flex items-center space-x-4 flex-1 min-w-0">
          {!hideSidebar && <SidebarTrigger />}
          <div className="flex-shrink-0 min-w-0">
            <Navbar />
          </div>
        </div>

        <SignedOut>
  <div className="flex items-center space-x-3 ml-6 flex-shrink-0">
    <SignInButton>
      <button className="px-3 py-1.5 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 font-semibold tracking-wide">
        Sign In
      </button>
    </SignInButton>
    <SignUpButton>
      <button className="px-3 py-1.5 text-sm rounded-lg bg-green-600 text-white hover:bg-green-700 transition shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 font-semibold tracking-wide">
        Sign Up
      </button>
    </SignUpButton>
  </div>
</SignedOut>


        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>

      {/* Hero Section: Only for Signed Out users */}
      <SignedOut>
        <DisableScrollOnMount>
          <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-blue-900 text-white min-h-screen flex flex-col items-center overflow-hidden p-10 sm:p-16 md:p-24 pt-28 -mt-2">            {/* Animated background circles */}
            <div className="absolute inset-0 pointer-events-none">
              <div
                className="absolute rounded-full bg-green-400 opacity-25 blur-3xl -top-24 -left-24 w-[28rem] h-[28rem] animate-[pulse_8s_ease-in-out_infinite]"
              />
              <div
                className="absolute rounded-full bg-blue-400 opacity-20 blur-2xl bottom-16 right-16 w-[18rem] h-[18rem] animate-[pulse_10s_ease-in-out_infinite]"
              />
              <div
                className="absolute rounded-full bg-yellow-400 opacity-15 blur-3xl bottom-40 -left-28 w-[22rem] h-[22rem] animate-[pulse_12s_ease-in-out_infinite]"
              />
            </div>

            <div className="container mx-auto px-6 relative z-20 max-w-7xl">
              <div className="flex flex-col md:flex-row items-start gap-y-12 md:gap-x-16">

                <div className="md:w-1/2 flex flex-col items-start space-y-8">
                  <div className="flex items-center bg-black bg-opacity-25 backdrop-blur-md rounded-full px-5 py-2 text-sm font-medium tracking-wide select-none shadow-md">
                    <span className="inline-block bg-green-500 rounded-full w-3 h-3 mr-3 animate-pulse" />
                    <span>Working towards SDG 4</span>
                  </div>

                  <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight tracking-wide max-w-lg -mt-3">
                    AI-Powered Education for an{' '}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                      Inclusive Tomorrow
                    </span>
                  </h1>

                  <p className="text-lg sm:text-xl text-gray-200 max-w-lg leading-relaxed tracking-wide">
                    Harnessing artificial intelligence to personalize learning,
                    improve access, and empower educators through data-driven
                    insights for lifelong, equitable education.
                  </p>
                    <h1>Login to explore our website fully.</h1>
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-6">
                    <Link
                      href="/allinsight/dashboard"
                      className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl font-semibold flex items-center justify-center transition-transform duration-300 transform hover:scale-105 shadow-lg"
                    >
                      Get Started
                      <ArrowRight className="ml-3 h-6 w-6" />
                    </Link>

                    <Link
                      href="/allinsight/learn_more"
                      className="border border-white hover:bg-white hover:text-green-900 text-white px-8 py-3 rounded-xl font-semibold transition-colors duration-300 shadow-sm"
                    >
                      Learn More
                    </Link>
                  </div>

                  <div className="flex items-center text-sm mt-10 text-gray-300 select-none space-x-2">
                    <MapPin className="h-5 w-5" />
                    <span>Currently supporting 200+ learning centers globally</span>
                  </div>
                </div>

                {/* Education Insight Panel */}
                <div className="md:w-1/2 flex justify-center w-full max-w-md">
                  <div className="relative w-full">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-3xl transform rotate-3 scale-105 opacity-30 blur-xl" />
                    <div className="relative bg-gray-900 bg-opacity-90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-gray-700">
                      <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl font-semibold tracking-wide">Education Insight Panel</h3>
                        <span className="bg-green-500 bg-opacity-25 text-green-400 text-xs px-3 py-1 rounded-full font-semibold select-none">
                          Live
                        </span>
                      </div>

                      <div className="space-y-6">
                        {/* AI-Powered Courses */}
                        <div className="flex items-center space-x-5 bg-gray-800 rounded-xl p-5 shadow-inner hover:shadow-green-500/40 transition-shadow duration-300">
                          <GraduationCap className="text-green-400 w-7 h-7" />
                          <div>
                            <p className="text-sm text-gray-400">AI-Powered Courses Active</p>
                            <p className="text-lg font-semibold text-green-300">1,250+</p>
                          </div>
                        </div>

                        {/* Learning Engagement */}
                        <div className="flex items-center space-x-5 bg-gray-800 rounded-xl p-5 shadow-inner hover:shadow-blue-500/40 transition-shadow duration-300">
                          <Presentation className="text-blue-400 w-7 h-7" />
                          <div>
                            <p className="text-sm text-gray-400">Learner Engagement Rate</p>
                            <p className="text-lg font-semibold text-blue-300">87%</p>
                          </div>
                        </div>

                        {/* Digital Libraries Access */}
                        <div className="flex items-center space-x-5 bg-gray-800 rounded-xl p-5 shadow-inner hover:shadow-yellow-400/40 transition-shadow duration-300">
                          <BookOpenText className="text-yellow-400 w-7 h-7" />
                          <div>
                            <p className="text-sm text-gray-400">Digital Library Access</p>
                            <p className="text-lg font-semibold text-yellow-300">35,000+ resources</p>
                          </div>
                        </div>

                        {/* Alert */}
                        <div className="mt-6 bg-gray-800 bg-opacity-60 rounded-xl p-4 border border-gray-700 shadow-inner">
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
                            <span className="text-xs text-yellow-400 font-semibold">
                              Update: New AI Literacy course launching this week
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End Education Insight Panel */}

              </div>
            </div>
          </section>
        </DisableScrollOnMount>
      </SignedOut>
    </>
  );
}

// Helper component to disable scroll on mount and enable scroll on unmount
function DisableScrollOnMount({ children }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return children;
}
