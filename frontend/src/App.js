import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './App.css';

function App() {
  // Generate a unique chatId once when the component mounts
  const [chatId] = useState(() => `${Date.now()}-${Math.floor(Math.random() * 10000)}`);

  // Initialize the conversation with the assistant's opening message
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "Hello, classmates! Are you still worried about choosing a major? No need to hang out on the forums anymore. Here you can find all the professional information you want, as well as the most suitable personalized suggestions for you! Tell me what major you want to know?"
    }
  ]);

  const [inputValue, setInputValue] = useState('');

  // Function to handle sending the message and receiving the response
  const handleSend = async () => {
    if (inputValue.trim() === '') return;

    const userQuestion = inputValue.trim();
    // Append user's message to the conversation
    const userMessage = { role: 'user', content: userQuestion };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Append waiting message from assistant
    setMessages(prev => [
      ...prev,
      {
        role: 'assistant',
        content: 'Please wait a moment. I am searching for related articles and looking for the information you need.'
      }
    ]);

    try {
      // Send POST request with user's question and chatId
      const response = await fetch('http://localhost:3000/api/question/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userQuestion, chatId: chatId })
      });
      
      // Parse the JSON response from the API
      const result = await response.json();
      
      // Update the waiting message with the actual response data
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = {
          role: 'assistant',
          content: result.success ? result.data : 'Error: No response from server'
        };
        return newMessages;
      });
    } catch (error) {
      console.error('Error sending question:', error);
      // Update the waiting message with the error message
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = {
          role: 'assistant',
          content: 'Error: Failed to send question'
        };
        return newMessages;
      });
    }
  };

  // Render chat messages using react-markdown for better text formatting
  const renderMessages = () =>
    messages.map((msg, index) => (
      <div key={index} className={`chat-message ${msg.role === 'user' ? 'user-message' : 'assistant-message'}`}>
        <strong>{msg.role === 'user' ? 'You' : 'MICS Helper'}:</strong>
        <ReactMarkdown>{msg.content}</ReactMarkdown>
      </div>
    ));

  return (
    <div className="chat-container">
      {/* Header displaying the project name */}
      <header className="chat-header">
        <h1>Major Information Consulting System (MICS)</h1>
      </header>

      {/* Chat messages display */}
      <main className="chat-body">
        {renderMessages()}
      </main>

      {/* Input field and send button */}
      <footer className="chat-footer">
        <input
          type="text"
          placeholder="Type your message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSend();
            }
          }}
        />
        <button onClick={handleSend}>Send</button>
      </footer>
    </div>
  );
}

export default App;
