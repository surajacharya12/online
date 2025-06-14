// /app/Allinsight/quiz/components/QuizFormNumQuestions.jsx
import React from 'react';

export default function QuizFormNumQuestions({ numQuestions, setNumQuestions, onBack, onGenerate }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (numQuestions >= 1 && numQuestions <= 20) onGenerate();
      }}
      className="max-w-xs w-full flex flex-col gap-6 backdrop-blur-md bg-white/30 border border-white/40 rounded-3xl p-10 shadow-xl"
      aria-label="Choose number of questions"
    >
      <label htmlFor="numQuestions" className="text-xl font-semibold text-purple-700">
        How many questions do you want? (1–20)
      </label>
      <input
        id="numQuestions"
        type="number"
        min={1}
        max={20}
        value={numQuestions}
        onChange={(e) => setNumQuestions(Number(e.target.value))}
        required
        className="px-6 py-4 rounded-2xl border border-purple-300 bg-white/60 shadow-md text-center text-xl placeholder-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-400 transition"
        autoFocus
      />
      <div className="flex gap-6">
        <button
          type="button"
          onClick={onBack}
          className="flex-grow py-4 rounded-2xl border border-purple-500 text-purple-700 font-semibold hover:bg-purple-100 transition"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={numQuestions < 1 || numQuestions > 20}
          className={`flex-grow py-4 rounded-2xl font-semibold text-white transition
            ${
              numQuestions >= 1 && numQuestions <= 20
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 active:scale-95 cursor-pointer'
                : 'bg-purple-300 cursor-not-allowed'
            }`}
        >
          Generate Quiz
        </button>
      </div>
    </form>
  );
}
