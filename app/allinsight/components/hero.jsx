'use client';
import React from 'react'
import Link from 'next/link'
import { ArrowRight, MapPin, GraduationCap, BookOpenText, Presentation } from 'lucide-react'

export default function HeroSection() {
  return (
    <div className="relative bg-gradient-to-br from-green-900 via-green-800 to-blue-900 text-white min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute opacity-20 w-96 h-96 rounded-full bg-green-400 -top-20 -left-20 animate-pulse"
          style={{ animationDuration: '8s' }}
        />
        <div
          className="absolute opacity-20 w-64 h-64 rounded-full bg-blue-400 bottom-10 right-10 animate-pulse"
          style={{ animationDuration: '10s' }}
        />
        <div
          className="absolute opacity-10 w-80 h-80 rounded-full bg-yellow-400 bottom-40 -left-20 animate-pulse"
          style={{ animationDuration: '12s' }}
        />
      </div>

      <div className="container mx-auto px-6 z-10 -mt-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 flex flex-col items-start space-y-6">
            <div className="flex items-center bg-black bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
              <span className="inline-block bg-green-500 rounded-full w-2 h-2 mr-2" />
              <span>Working towards SDG 4</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              AI-Powered Education for an{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                Inclusive Tomorrow
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-100 max-w-lg">
              Harnessing artificial intelligence to personalize learning, improve access, and empower educators through data-driven insights for lifelong, equitable education.
            </p>

            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mt-4">
              <Link
                href="/allinsight/dashboard"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center transition-all duration-200 transform hover:scale-105"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>

              <Link
                href="/allinsight/learn_more"
                className="border border-white hover:bg-white hover:text-green-900 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                Learn More
              </Link>
            </div>

            <div className="flex items-center text-sm mt-8 text-gray-300">
              <MapPin className="h-4 w-4 mr-1" />
              <span>Currently supporting 200+ learning centers globally</span>
            </div>
          </div>

          {/* Education Insight Panel */}
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl transform rotate-3 scale-105 opacity-20 blur-lg" />
              <div className="relative bg-gray-900 bg-opacity-80 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-gray-800">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold">Education Insight Panel</h3>
                  <span className="bg-green-500 bg-opacity-20 text-green-400 text-xs px-2 py-1 rounded-full">
                    Live
                  </span>
                </div>

                <div className="space-y-4">
                  {/* AI-Powered Courses */}
                  <div className="flex items-center space-x-4 bg-gray-800 rounded-lg p-4">
                    <GraduationCap className="text-green-400 w-6 h-6" />
                    <div>
                      <p className="text-sm text-gray-400">AI-Powered Courses Active</p>
                      <p className="text-sm font-semibold text-green-300">1,250+</p>
                    </div>
                  </div>

                  {/* Learning Engagement */}
                  <div className="flex items-center space-x-4 bg-gray-800 rounded-lg p-4">
                    <Presentation className="text-blue-400 w-6 h-6" />
                    <div>
                      <p className="text-sm text-gray-400">Learner Engagement Rate</p>
                      <p className="text-sm font-semibold text-blue-300">87%</p>
                    </div>
                  </div>

                  {/* Digital Libraries Access */}
                  <div className="flex items-center space-x-4 bg-gray-800 rounded-lg p-4">
                    <BookOpenText className="text-yellow-400 w-6 h-6" />
                    <div>
                      <p className="text-sm text-gray-400">Digital Library Access</p>
                      <p className="text-sm font-semibold text-yellow-300">35,000+ resources</p>
                    </div>
                  </div>

                  {/* Alert */}
                  <div className="mt-4 bg-gray-800 bg-opacity-50 rounded-lg p-3 border border-gray-700">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse" />
                      <span className="text-xs text-yellow-400">
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
    </div>
  )
}
