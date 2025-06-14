'use client';
import React from 'react';
import { Lightbulb, Brain, Globe, Users } from 'lucide-react';

export default function AboutSection() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-blue-900 via-green-900 to-black text-white overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-400 via-blue-500 to-transparent blur-2xl animate-pulse" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
            About Our Vision
          </h2>
          <p className="text-lg text-gray-300">
            We are transforming education with the power of AI — making it accessible, personalized, and equitable for every learner, everywhere.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Mission Card */}
          <div className="bg-gray-900 bg-opacity-70 p-6 rounded-2xl border border-gray-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <Lightbulb className="w-10 h-10 text-yellow-400 mb-4" />
            <h4 className="text-xl font-semibold mb-2">Empowering Minds</h4>
            <p className="text-sm text-gray-400">
              Providing AI-driven tools to unlock potential and inspire curiosity through smart content delivery and adaptive pathways.
            </p>
          </div>

          {/* Technology Card */}
          <div className="bg-gray-900 bg-opacity-70 p-6 rounded-2xl border border-gray-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <Brain className="w-10 h-10 text-purple-400 mb-4" />
            <h4 className="text-xl font-semibold mb-2">Intelligent Learning</h4>
            <p className="text-sm text-gray-400">
              Using machine learning to analyze student progress and offer real-time personalized feedback that evolves with each learner.
            </p>
          </div>

          {/* Global Access Card */}
          <div className="bg-gray-900 bg-opacity-70 p-6 rounded-2xl border border-gray-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <Globe className="w-10 h-10 text-blue-400 mb-4" />
            <h4 className="text-xl font-semibold mb-2">Global Inclusion</h4>
            <p className="text-sm text-gray-400">
              Bridging educational gaps by delivering quality learning experiences to underserved and remote communities worldwide.
            </p>
          </div>

          {/* Community Card */}
          <div className="bg-gray-900 bg-opacity-70 p-6 rounded-2xl border border-gray-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <Users className="w-10 h-10 text-green-400 mb-4" />
            <h4 className="text-xl font-semibold mb-2">Educator Support</h4>
            <p className="text-sm text-gray-400">
              Equipping teachers and institutions with AI-powered insights to enhance instruction and track learner success.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
