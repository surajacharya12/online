'use client';

import React, { useState } from 'react';

export default function QuizPage() {
  const [topic, setTopic] = useState('');
  const [step, setStep] = useState(1); // Step 1 = topic input, Step 2 = number input, Step 3 = quiz
  const [numQuestions, setNumQuestions] = useState(5);
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleTopicSubmit = (e) => {
    e.preventDefault();
    if (topic.trim()) {
      setStep(2);
    }
  };

  const handleNumQuestionsSubmit = (e) => {
    e.preventDefault();
    if (numQuestions >= 1 && numQuestions <= 20) {
      generateQuiz();
    }
  };

  const generateQuiz = async () => {
    setLoading(true);
    setQuizData([]);
    setAnswers({});
    setScore(null);
    setSubmitted(false);

    try {
      const res = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, numQuestions }),
      });

      const data = await res.json();
      const cleaned = data.quiz.trim();
      const parsed = JSON.parse(cleaned);
      setQuizData(parsed);
      setStep(3);
    } catch (err) {
      console.error('Error generating quiz:', err);
      setQuizData([]);
      setStep(1);
    } finally {
      setLoading(false);
    }
  };

  const handleOptionSelect = (qIndex, option) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qIndex]: option }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let correct = 0;
    quizData.forEach((q, i) => {
      if (answers[i] === q.answer) correct++;
    });
    setScore(correct);
    setSubmitted(true);
  };

  const QuizIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8 text-indigo-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 10h.01M12 10h.01M16 10h.01M21 16v-2a2 2 0 00-2-2h-3l-3-3-3 3H5a2 2 0 00-2 2v2"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 16v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    </svg>
  );

  const CheckIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );

  const CrossIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center justify-start p-6 mt-5">
      <header className="mb-12 flex items-center gap-3">
        <QuizIcon />
        <h1 className="text-5xl font-extrabold tracking-tight">Interactive Quiz</h1>
      </header>

      {/* Step 1: Topic input */}
      {step === 1 && (
        <form
          onSubmit={handleTopicSubmit}
          className="max-w-lg w-full flex flex-col gap-6"
          aria-label="Enter topic"
        >
          <input
            type="text"
            placeholder="Enter a topic (e.g., JavaScript, History)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
            className="px-6 py-4 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-4 focus:ring-indigo-500 transition text-lg"
            autoFocus
          />
          <button
            type="submit"
            className="py-4 rounded-xl bg-indigo-600 text-white text-lg font-semibold shadow-lg hover:bg-indigo-700 active:scale-95 transition-transform"
          >
            Next: Choose number of questions
          </button>
        </form>
      )}

      {/* Step 2: Number of questions input */}
      {step === 2 && (
        <form
          onSubmit={handleNumQuestionsSubmit}
          className="max-w-xs w-full flex flex-col gap-6"
          aria-label="Choose number of questions"
        >
          <label htmlFor="numQuestions" className="text-lg font-medium">
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
            className="px-6 py-4 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-4 focus:ring-indigo-500 transition text-lg text-center"
            autoFocus
          />
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex-grow py-4 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={numQuestions < 1 || numQuestions > 20}
              className={`flex-grow py-4 rounded-xl font-semibold text-white transition
                ${
                  numQuestions >= 1 && numQuestions <= 20
                    ? 'bg-indigo-600 hover:bg-indigo-700 active:scale-95'
                    : 'bg-indigo-300 cursor-not-allowed'
                }`}
            >
              Generate Quiz
            </button>
          </div>
        </form>
      )}

      {/* Step 3: Show quiz */}
      {step === 3 && (
        <form
          onSubmit={handleSubmit}
          className="max-w-4xl w-full space-y-10"
          aria-label="Quiz questions"
        >
          {quizData.map((q, i) => {
            const selected = answers[i];
            const correct = q.answer;

            return (
              <fieldset
                key={i}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200"
              >
                <legend className="text-xl font-semibold mb-6">
                  {i + 1}. {q.question}
                </legend>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {q.options.map((opt, j) => {
                    const isSelected = selected === opt;
                    const isCorrect = correct === opt;
                    const userWrong = submitted && isSelected && !isCorrect;

                    let baseClasses =
                      'relative flex items-center gap-4 p-4 rounded-xl cursor-pointer border transition-shadow focus-within:ring-2 focus-within:ring-indigo-500';

                    if (!submitted) {
                      baseClasses += isSelected
                        ? ' bg-indigo-100 border-indigo-500 shadow'
                        : ' bg-white border-gray-300 hover:bg-indigo-50';
                    } else {
                      if (isCorrect) {
                        baseClasses +=
                          ' bg-green-100 border-green-500 text-green-900 shadow-md';
                      } else if (userWrong) {
                        baseClasses +=
                          ' bg-red-100 border-red-500 text-red-900 line-through shadow-md';
                      } else {
                        baseClasses +=
                          ' bg-gray-100 border-gray-200 text-gray-500 cursor-default';
                      }
                    }

                    return (
                      <label
                        key={j}
                        htmlFor={`q${i}_opt${j}`}
                        className={baseClasses}
                        tabIndex={0}
                      >
                        <input
                          type="radio"
                          id={`q${i}_opt${j}`}
                          name={`question-${i}`}
                          value={opt}
                          checked={isSelected}
                          onChange={() => handleOptionSelect(i, opt)}
                          disabled={submitted}
                          className="sr-only"
                        />
                        <span
                          aria-hidden="true"
                          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center
                          ${
                            !submitted
                              ? isSelected
                                ? 'border-indigo-600 bg-indigo-600'
                                : 'border-gray-400 bg-transparent'
                              : isCorrect
                              ? 'border-green-600 bg-green-600 text-white'
                              : userWrong
                              ? 'border-red-600 bg-red-600 text-white'
                              : 'border-gray-400 bg-transparent'
                          }`}
                        >
                          {submitted ? (
                            isCorrect ? (
                              <CheckIcon />
                            ) : userWrong ? (
                              <CrossIcon />
                            ) : null
                          ) : null}
                        </span>
                        <span className="select-none">{opt}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            );
          })}

          {!submitted ? (
            <button
              type="submit"
              disabled={Object.keys(answers).length !== quizData.length}
              className={`w-full py-4 mt-4 text-xl font-semibold rounded-xl shadow-lg text-white transition transform
                ${
                  Object.keys(answers).length === quizData.length
                    ? 'bg-indigo-600 hover:bg-indigo-700 active:scale-95 cursor-pointer'
                    : 'bg-indigo-300 cursor-not-allowed'
                }`}
              aria-disabled={Object.keys(answers).length !== quizData.length}
            >
              Submit Quiz
            </button>
          ) : (
            <div className="mt-8 text-center text-3xl font-extrabold text-indigo-700">
              You scored {score} out of {quizData.length}
            </div>
          )}
        </form>
      )}

      {loading && (
        <div className="fixed inset-0 bg-white bg-opacity-70 flex items-center justify-center z-50">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-indigo-600 h-20 w-20"></div>
          <style jsx>{`
            .loader {
              border-top-color: #4f46e5;
              animation: spin 1s linear infinite;
            }
            @keyframes spin {
              0% { transform: rotate(0deg);}
              100% { transform: rotate(360deg);}
            }
          `}</style>
        </div>
      )}
    </div>
  );
}
