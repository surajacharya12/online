import React, { useState } from "react";
import axios from "axios";
import { Loader2, Wand, ClipboardEdit, PlayCircle, ClipboardCheck, ClipboardCopy } from "lucide-react";

export default function GrammarlyClone() {
  const [text, setText] = useState("");
  const [correctedText, setCorrectedText] = useState("");
  const [loading, setLoading] = useState(false);

  const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  const countWords = (str) => str.trim().split(/\s+/).filter(Boolean).length;

  const handleChange = (e) => {
    const inputText = e.target.value;
    const words = countWords(inputText);
    if (words <= 2000) {
      setText(inputText);
    } else {
      const trimmed = inputText.split(/\s+/).slice(0, 2000).join(" ");
      setText(trimmed);
    }
  };

  const checkGrammar = async () => {
    setLoading(true);
    setCorrectedText("");

    try {
      const prompt = `Correct the grammar of the following text and return only the corrected version:\n\n"${text}"`;

      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          contents: [{ parts: [{ text: prompt }] }],
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const corrected = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
      setCorrectedText(corrected || "No correction available.");
    } catch (error) {
      console.error("Error checking grammar:", error);
      setCorrectedText("Error occurred while checking.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (correctedText) {
      navigator.clipboard.writeText(correctedText);
      alert("Corrected text copied!");
    }
  };

  return (
    <div>
      <div
        style={{
          maxWidth: "1200px",
          width: "90vw",
          marginLeft: "8vw",
        }}
        className="backdrop-blur-2xl bg-gradient-to-br from-white via-indigo-50 to-white shadow-2xl border border-white/30 rounded-3xl p-10 transition-all duration-300"
      >
        <h1 className="text-5xl font-bold text-indigo-800 mb-3 tracking-tight">📝 AI Grammar & Style Checker</h1>
        <p className="text-lg text-gray-700 mb-8">
          Get instant grammar, spelling, and tone improvements powered by Gemini AI.
        </p>

        {/* Textarea */}
        <div className="relative mb-4">
          <textarea
            id="text"
            value={text}
            onChange={handleChange}
            placeholder=" "
            className="peer w-full h-52 px-5 pt-6 pb-3 text-base rounded-xl bg-white border border-gray-300 focus:ring-4 focus:ring-indigo-300 focus:outline-none resize-none shadow-inner text-gray-800 transition-all duration-200"
          />
          <label
            htmlFor="text"
            className={`absolute left-5 top-2 text-gray-500 text-sm transition-all duration-200 ${
              text ? "opacity-0" : "opacity-100 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base"
            } peer-focus:top-2 peer-focus:text-sm`}
          >
            Your text (max 2000 words)
          </label>
        </div>

        <p className="text-right text-sm text-gray-600 mb-6">{countWords(text)} / 2000 words</p>

        {/* Button */}
        <div className="flex justify-center mb-10">
          <button
            onClick={checkGrammar}
            disabled={loading || !text.trim()}
            className="px-7 py-3 rounded-full bg-indigo-600 text-white font-semibold flex items-center gap-3 shadow-xl hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Wand className="h-4 w-4" />
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Check Grammar"}
          </button>
        </div>

        {/* Results */}
        {correctedText && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-lg overflow-auto max-h-80">
              <h4 className="font-semibold text-gray-700 mb-2">🔍 Original Text</h4>
              <p className="whitespace-pre-wrap text-gray-600 text-sm">{text}</p>
            </div>
            <div className="bg-green-50 border border-green-200 p-6 rounded-2xl shadow-lg overflow-auto max-h-80 relative">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-green-700">✅ Corrected Text</h4>
                <button
                  onClick={copyToClipboard}
                  aria-label="Copy corrected text"
                  className="text-green-700 hover:text-green-900 transition"
                  title="Copy corrected text"
                >
                  <ClipboardCopy className="w-5 h-5" />
                </button>
              </div>
              <p className="whitespace-pre-wrap text-green-800 text-sm">{correctedText}</p>
            </div>
          </div>
        )}

        {/* How it Works */}
        <div className="border-t pt-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">🚀 How it Works</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-gray-700">
            <div className="bg-white/90 p-5 rounded-xl shadow-md hover:shadow-lg transition flex items-start gap-3">
              <ClipboardEdit className="text-indigo-600 w-6 h-6 mt-1" />
              <p><strong>1.</strong> Copy & Paste or write your text</p>
            </div>
            <div className="bg-white/90 p-5 rounded-xl shadow-md hover:shadow-lg transition flex items-start gap-3">
              <PlayCircle className="text-indigo-600 w-6 h-6 mt-1" />
              <p><strong>2.</strong> Run AI Check</p>
            </div>
            <div className="bg-white/90 p-5 rounded-xl shadow-md hover:shadow-lg transition flex items-start gap-3">
              <ClipboardCheck className="text-indigo-600 w-6 h-6 mt-1" />
              <p><strong>3.</strong> Review & Copy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
