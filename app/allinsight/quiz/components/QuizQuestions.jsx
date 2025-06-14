// /app/Allinsight/quiz/components/QuizQuestions.jsx
import React from 'react';
import { CheckIcon, CrossIcon } from './Icons';

export default function QuizQuestions({ quizData, answers, submitted, score, onSelect, onSubmit }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="max-w-5xl w-full space-y-12 bg-white/70 backdrop-blur-lg border border-purple-200 rounded-3xl p-10 shadow-2xl"
      aria-label="Quiz questions"
    >
      {quizData.map((q, i) => {
        const selected = answers[i];
        const correct = q.answer;

        return (
          <fieldset
            key={i}
            className="rounded-2xl border border-purple-300 p-8 shadow-md hover:shadow-lg transition-shadow"
          >
            <legend className="text-2xl font-semibold mb-8 text-purple-800">
              {i + 1}. {q.question}
            </legend>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {q.options.map((opt, j) => {
                const isSelected = selected === opt;
                const isCorrect = correct === opt;
                const userWrong = submitted && isSelected && !isCorrect;

                let baseClasses =
                  'relative flex items-center gap-5 p-5 rounded-2xl cursor-pointer border transition-shadow duration-300 ease-in-out select-none';

                if (!submitted) {
                  baseClasses += isSelected
                    ? ' bg-purple-100 border-purple-500 shadow-lg'
                    : ' bg-white border-purple-200 hover:bg-purple-50';
                } else {
                  if (isCorrect) {
                    baseClasses +=
                      ' bg-green-100 border-green-400 text-green-900 shadow-lg';
                  } else if (userWrong) {
                    baseClasses +=
                      ' bg-red-100 border-red-400 text-red-900 line-through opacity-70';
                  } else {
                    baseClasses += ' bg-white border-purple-200 opacity-60';
                  }
                }

                return (
                  <label key={j} className={baseClasses}>
                    <input
                      type="radio"
                      name={`question-${i}`}
                      value={opt}
                      checked={isSelected}
                      disabled={submitted}
                      onChange={() => onSelect(i, opt)}
                      className="absolute opacity-0 w-0 h-0"
                    />
                    <span
                      aria-hidden="true"
                      className="flex items-center justify-center w-7 h-7 rounded-full border-2 shrink-0 transition-colors duration-300"
                    >
                      {submitted ? (
                        isCorrect ? (
                          <CheckIcon />
                        ) : userWrong ? (
                          <CrossIcon />
                        ) : null
                      ) : (
                        <span
                          className={`block w-3 h-3 rounded-full transition-colors duration-300 ${
                            isSelected ? 'bg-purple-600' : 'bg-transparent'
                          }`}
                        />
                      )}
                    </span>
                    <span className="select-none text-lg">{opt}</span>
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
          className={`w-full py-5 mt-8 text-2xl font-extrabold rounded-3xl shadow-lg text-white transition-transform duration-300
            ${
              Object.keys(answers).length === quizData.length
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 active:scale-95 cursor-pointer'
                : 'bg-purple-300 cursor-not-allowed'
            }`}
          aria-disabled={Object.keys(answers).length !== quizData.length}
        >
          Submit Quiz
        </button>
      ) : (
        <div className="mt-12 text-center text-4xl font-extrabold text-purple-700 drop-shadow-lg">
          You scored {score} out of {quizData.length}
        </div>
      )}
    </form>
  );
}
