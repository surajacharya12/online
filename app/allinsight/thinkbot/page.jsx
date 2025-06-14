'use client';

import { useState, useEffect, useRef } from 'react';
import { BotMessageSquare, Sparkles } from 'lucide-react';
import clsx from 'clsx';

const SkeletonMessage = () => (
  <div className="flex items-start gap-2 justify-start animate-pulse">
    <div className="mt-1 flex items-center justify-center rounded-full bg-green-100 w-10 h-10 shadow-inner">
      <BotMessageSquare className="h-6 w-6 text-green-600" />
    </div>
    <div className="max-w-[75%] bg-white px-4 py-3 rounded-xl shadow-md space-y-2">
      <div className="h-3 bg-gray-300 rounded w-3/4" />
      <div className="h-3 bg-gray-300 rounded w-5/6" />
      <div className="h-3 bg-gray-300 rounded w-2/3" />
    </div>
  </div>
);

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-001:generateContent?key=${API_KEY}`;

const ThinkBotPage = () => {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! Ask me anything to get started.' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const fetchAIResponse = async (prompt, onChunk) => {
    const res = await fetch(GEMINI_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Gemini API error: ${res.status} - ${errText}`);
    }

    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    for (let i = 0; i <= text.length; i += 5) {
      await new Promise((r) => setTimeout(r, 15));
      onChunk(text.slice(0, i));
    }

    onChunk(text);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages((msgs) => [...msgs, { from: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);
    setError(null);

    let aiResponse = '';

    try {
      await fetchAIResponse(userMsg, (chunk) => {
        aiResponse = chunk;
        setMessages((msgs) => {
          if (msgs[msgs.length - 1]?.from === 'bot' && msgs[msgs.length - 1]?.partial) {
            const newMsgs = msgs.slice(0, -1);
            return [...newMsgs, { from: 'bot', text: aiResponse, partial: true }];
          } else {
            return [...msgs, { from: 'bot', text: aiResponse, partial: true }];
          }
        });
      });

      setMessages((msgs) => {
        const newMsgs = msgs.slice(0, -1);
        return [...newMsgs, { from: 'bot', text: aiResponse }];
      });
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!loading) handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 px-4 py-8">
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col h-[85vh]">
        <header className="flex items-center space-x-3 mb-4">
          <BotMessageSquare className="h-10 w-10 text-green-500" />
          <h1 className="text-3xl font-bold text-green-600">ThinkBot</h1>
        </header>

        <p className="mb-4 text-gray-600 text-sm italic">
          Engage with ThinkBot – your smart AI for questions, ideas & knowledge.
        </p>

        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 border rounded-md bg-gray-50"
          aria-live="polite"
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={clsx('flex items-start gap-2', {
                'justify-end': msg.from === 'user',
                'justify-start': msg.from === 'bot',
              })}
            >
              {msg.from === 'bot' && (
                <div className="mt-1 flex items-center justify-center rounded-full bg-green-100 w-10 h-10 shadow-inner">
                  <BotMessageSquare className="h-6 w-6 text-green-600" />
                </div>
              )}
              <div
                className={clsx(
                  'max-w-[75%] px-4 py-2 rounded-xl text-sm shadow-md whitespace-pre-wrap',
                  {
                    'bg-green-600 text-black rounded-br-none': msg.from === 'user',
                    'bg-white text-gray-900 rounded-bl-none': msg.from === 'bot',
                  }
                )}
              >
                {msg.text}
                {msg.partial && <span className="animate-pulse text-black">|</span>}
              </div>
            </div>
          ))}

          {loading && !messages.some((m) => m.partial) && <SkeletonMessage />}
        </div>

        {error && (
          <div className="text-red-600 mt-2 text-center font-semibold" role="alert">
            {error}
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!loading) handleSend();
          }}
          className="mt-4 flex gap-2"
        >
          <textarea
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask your question here..."
            disabled={loading}
            className="flex-1 resize-none border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-400 text-sm text-black"
            aria-label="Question input"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-5 py-2 font-semibold text-sm transition-all duration-200 disabled:opacity-50 flex items-center gap-2"
            aria-label="Send question"
          >
            <Sparkles className="h-4 w-4" />
            {loading ? 'Thinking...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ThinkBotPage;
