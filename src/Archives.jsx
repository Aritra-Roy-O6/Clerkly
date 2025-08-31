import React, { useState, useRef, useEffect } from 'react';

// A simple loading spinner component
const Spinner = () => (
  <div className="spinner-border spinner-border-sm" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
);

// --- Main Archives Page Component ---
function ArchivesPage() {
  const [messages, setMessages] = useState([
    { text: "Hello! I am your AI Legal Assistant. How can I help you research a case today?", sender: 'ai' }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);

  const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;

  useEffect(() => {
    // Scroll to the bottom of the chat container whenever new messages are added
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;
    if (!geminiApiKey) {
      alert("Gemini API key is not configured. Please check your .env file.");
      return;
    }

    const newMessages = [...messages, { text: userInput, sender: 'user' }];
    setMessages(newMessages);
    setUserInput('');
    setIsLoading(true);

    const systemPrompt = `
      You are an expert legal research assistant specializing in Indian law.
      Your name is "Clerkly Archives AI".
      When a user asks a legal query, you must provide a detailed, accurate, and structured response.
      Your response MUST include:
      1.  A clear summary of the legal principles involved.
      2.  Specific section numbers of relevant Indian Acts (e.g., "Section 420 of the Indian Penal Code, 1860").
      3.  Citations of at least one or two relevant landmark judgments from Indian courts (e.g., "Kesavananda Bharati vs. State of Kerala, AIR 1973 SC 1461").
      4.  Format your answer clearly with headings and bullet points for readability.
      Do not provide legal advice, only legal information and precedents.
    `;

    try {
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${geminiApiKey}`;
      
      const payload = {
        contents: [{
          parts: [{ text: userInput }]
        }],
        systemInstruction: {
          parts: [{ text: systemPrompt }]
        },
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const result = await response.json();
      const aiResponse = result.candidates[0]?.content?.parts[0]?.text || "Sorry, I couldn't process that request.";
      setMessages([...newMessages, { text: aiResponse, sender: 'ai' }]);

    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setMessages([...newMessages, { text: `Error: ${error.message}. Please check the console and your API key.`, sender: 'ai' }]);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="container-fluid d-flex flex-column" style={{ height: 'calc(100vh - 2rem)' }}>
      <h1 className="font-serif mb-4">Archives AI Research</h1>
      <div className="chat-container flex-grow-1" ref={chatContainerRef}>
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender}`}>
            <div className="message-bubble">
              <p className="m-0" style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</p>
            </div>
          </div>
        ))}
         {isLoading && (
            <div className="chat-message ai">
              <div className="message-bubble">
                <Spinner />
              </div>
            </div>
          )}
      </div>
      <div className="chat-input-area d-flex gap-3 mt-3">
        <input
          type="text"
          className="form-control"
          placeholder="Ask a legal question or describe your case..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          disabled={isLoading}
        />
        <button className="btn btn-clerkly" onClick={handleSendMessage} disabled={isLoading}>
          {isLoading ? <Spinner /> : 'Send'}
        </button>
      </div>
    </div>
  );
}

export default ArchivesPage;

