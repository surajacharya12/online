import React from 'react';
import {
  BookOpen,
  Settings,
  Zap,
  Rocket,
  Cpu,
  Image,
  CheckCircle,
} from 'lucide-react';

export default function LearnMorePage() {
  return (
    <div className="p-10 max-w-5xl mx-auto font-sans space-y-12 text-gray-900">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-indigo-600 drop-shadow-lg">
        Learn More About Our Platform
      </h1>

      <section className="mb-12 rounded-lg bg-gradient-to-r from-indigo-50 to-indigo-100 p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <h2 className="flex items-center text-3xl font-semibold mb-5 text-indigo-700">
          <BookOpen className="mr-3 w-8 h-8 text-indigo-500" />
          Welcome to Our AIInsights Platform
        </h2>
        <p className="text-lg leading-relaxed text-indigo-900">
          Our platform is designed to provide an engaging and interactive learning experience. We offer a wide range of courses to help you achieve your educational goals.
        </p>
      </section>

      <section className="mb-12 rounded-lg bg-gradient-to-r from-green-50 to-green-100 p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <h2 className="flex items-center text-3xl font-semibold mb-5 text-green-700">
          <Settings className="mr-3 w-8 h-8 text-green-500" />
          Key Features
        </h2>
        <ul className="list-disc pl-8 space-y-3 text-lg text-green-900">
          <li>Comprehensive course catalog</li>
          <li>Interactive learning materials</li>
          <li>Progress tracking</li>
          <li>Expert instructors</li>
          <li>Flexible learning schedule</li>
          <li className="flex items-center">
            <Image className="mr-2 w-6 h-6 text-green-600" /> AI Image Generation capabilities
          </li>
          <li className="flex items-center">
            <Cpu className="mr-2 w-6 h-6 text-green-600" /> Writing assistance with Grammarly-like features
          </li>
        </ul>
      </section>

      <section className="mb-12 rounded-lg bg-gradient-to-r from-yellow-50 to-yellow-100 p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <h2 className="flex items-center text-3xl font-semibold mb-5 text-yellow-700">
          <Zap className="mr-3 w-8 h-8 text-yellow-500" />
          How It Works
        </h2>
        <div className="space-y-4 text-lg text-yellow-900">
          <p>1. Browse our course catalog and find the perfect course for you</p>
          <p>2. Enroll in courses that match your interests and goals</p>
          <p>3. Access your learning materials anytime, anywhere</p>
          <p>4. Track your progress</p>
        </div>
      </section>

      <section className="mb-12 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <h2 className="flex items-center text-3xl font-semibold mb-5 text-blue-700">
          <Rocket className="mr-3 w-8 h-8 text-blue-500" />
          Get Started Today
        </h2>
        <p className="text-lg leading-relaxed text-blue-900">
          Join our community of learners and start your educational journey. Explore our courses, enroll in your favorites, and begin learning at your own pace.
        </p>
      </section>
    </div>
  );
}
