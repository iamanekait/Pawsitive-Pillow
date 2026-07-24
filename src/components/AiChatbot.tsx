import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Bot, User } from 'lucide-react';

export const AiChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string }>>([
    {
      sender: 'bot',
      text: 'Hello! I am Pawsitive Assistant 🐾 How can I help you design your custom pet cutout pillow or choose a memorial gift today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg,
          history: messages.map((m) => ({
            role: m.sender === 'user' ? 'user' : 'model',
            text: m.text,
          })),
        }),
      });

      const data = await res.json();
      const reply = data.response || 'Thank you for reaching out! You can upload your photo in our Build My Pillow customizer studio or email sales@pawsitivepillow.com!';
      setMessages((prev) => [...prev, { sender: 'bot', text: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: 'We are experiencing a temporary network delay. Feel free to ask about our custom pet pillows, photo tips, or email sales@pawsitivepillow.com!',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#5C4033] hover:bg-[#3D2E2B] text-white p-3.5 sm:p-4 rounded-full plush-shadow-lg transition-all transform hover:scale-110 active:scale-95 flex items-center space-x-2 border-2 border-[#E5C158]"
          title="Chat with Pawsitive Assistant"
        >
          <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-[#E5C158]" />
          <span className="hidden sm:inline text-xs font-bold pr-1">Pawsitive AI</span>
          <span className="w-3 h-3 bg-[#87A96B] rounded-full animate-ping absolute top-0 right-0 border-2 border-white" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-[#FDFBF7] w-[calc(100vw-32px)] max-w-[380px] sm:w-[380px] h-[450px] sm:h-[480px] rounded-3xl border-2 border-[#E5D7C6] plush-shadow-lg flex flex-col justify-between overflow-hidden shadow-2xl">
          
          {/* Header */}
          <div className="bg-[#5C4033] text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-2xl bg-[#E5C158]/20 flex items-center justify-center text-[#E5C158]">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#FDFBF7]">Pawsitive AI Assistant</h4>
                <p className="text-[10px] text-[#E5C158]">Online • Handcrafted in Durgapur</p>
              </div>
            </div>

            <button onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-[#5C4033] text-[#E5C158] flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] p-3 rounded-2xl leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#5C4033] text-white rounded-br-none font-medium'
                      : 'bg-white text-[#3D2E2B] rounded-bl-none border border-[#E5D7C6] shadow-sm'
                  }`}
                >
                  {m.text}
                </div>

                {m.sender === 'user' && (
                  <div className="w-6 h-6 rounded-full bg-[#C86D51] text-white flex items-center justify-center shrink-0 mt-1">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-2 items-center text-gray-400 text-[11px] font-medium">
                <Bot className="w-4 h-4 text-[#5C4033]" />
                <span>Pawsitive AI is typing...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          <div className="px-3 py-1 bg-[#F5EFE6] border-t border-[#E5D7C6] flex items-center gap-1 overflow-x-auto text-[10px]">
            <button
              onClick={() => { setInput('How do I choose the best photo?'); }}
              className="bg-white px-2.5 py-1 rounded-full border border-[#E5D7C6] text-[#5C4033] whitespace-nowrap hover:bg-[#5C4033] hover:text-white transition-colors"
            >
              📷 Photo Advice
            </button>
            <button
              onClick={() => { setInput('Tell me about Forever in Our Hearts memorial items'); }}
              className="bg-white px-2.5 py-1 rounded-full border border-[#E5D7C6] text-[#C86D51] whitespace-nowrap hover:bg-[#C86D51] hover:text-white transition-colors"
            >
              ❤️ Memorial Info
            </button>
            <button
              onClick={() => { setInput('What are the shipping times from Durgapur?'); }}
              className="bg-white px-2.5 py-1 rounded-full border border-[#E5D7C6] text-[#5C4033] whitespace-nowrap hover:bg-[#5C4033] hover:text-white transition-colors"
            >
              🚚 Shipping Times
            </button>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-[#E5D7C6] flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Pawsitive Assistant..."
              className="flex-1 px-3 py-2 text-xs rounded-xl border border-[#E5D7C6] focus:outline-none focus:ring-1 focus:ring-[#5C4033]"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="bg-[#5C4033] hover:bg-[#3D2E2B] disabled:opacity-50 text-white p-2 rounded-xl transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </div>
  );
};
