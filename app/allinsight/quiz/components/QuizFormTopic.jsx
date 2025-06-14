// /app/Allinsight/quiz/components/QuizFormTopic.jsx
import React from 'react';

export default function QuizFormTopic({ topic, setTopic, onNext }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (topic.trim()) onNext();
      }}
      className="max-w-lg w-full flex flex-col gap-6 backdrop-blur-md bg-white/30 border border-white/40 rounded-3xl p-10 shadow-xl"
      aria-label="Enter topic"
    >
      <input
        type="text"
        placeholder="Enter a topic (e.g., JavaScript, History)"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        required
        className="px-6 py-4 rounded-2xl border border-purple-300 bg-white/60 shadow-md focus:outline-none focus:ring-4 focus:ring-purple-400 text-xl placeholder-purple-500 transition"
        autoFocus
      />
      <button
        type="submit"
        className="py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xl font-semibold shadow-lg hover:from-purple-700 hover:to-indigo-700 active:scale-95 transition-transform"
      >
        Next: Choose number of questions
      </button>
    </form>
  );
}
