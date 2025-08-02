"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIChat = AIChat;
const react_1 = require("react");
const react_2 = require("@tremor/react");
const lucide_react_1 = require("lucide-react");
const api_1 = require("@/lib/api");
function AIChat() {
    const [messages, setMessages] = (0, react_1.useState)([
        {
            id: '1',
            role: 'assistant',
            content: 'Hi! I\'m your AI assistant for San Francisco permit data. You can ask me questions like "What are the most common permit types?" or "Show me trends in residential permits".',
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = (0, react_1.useState)('');
    const [loading, setLoading] = (0, react_1.useState)(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim() || loading)
            return;
        const userMessage = {
            id: Date.now().toString(),
            role: 'user',
            content: input.trim(),
            timestamp: new Date()
        };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);
        try {
            // Call the Worker AI endpoint
            const response = await api_1.permitAPI.askAI(userMessage.content);
            const aiResponse = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: response.answer || 'I apologize, but I couldn\'t process your question at this time.',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiResponse]);
        }
        catch (error) {
            console.error('AI Chat Error:', error);
            // Fallback to demo response if API is not available
            const errorMessage = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: `I understand you're asking about: "${userMessage.content}". Since this is a demo environment, I would normally analyze the actual permit dataset to give you specific insights about your question. In a deployed version, I would have access to the real SF permit data and could provide detailed analysis using Cloudflare Workers AI.`,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        }
        finally {
            setLoading(false);
        }
    };
    return (<react_2.Card className="p-6">
      <div className="flex items-center space-x-2 mb-6">
        <lucide_react_1.MessageSquare className="h-5 w-5 text-blue-600"/>
        <react_2.Title>AI Assistant</react_2.Title>
      </div>

      {/* Chat Messages */}
      <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
        {messages.map((message) => (<div key={message.id} className={`flex items-start space-x-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {message.role === 'assistant' && (<div className="p-2 bg-blue-100 rounded-full">
                <lucide_react_1.Bot className="h-4 w-4 text-blue-600"/>
              </div>)}
            
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.role === 'user'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-800'}`}>
              <p className="text-sm">{message.content}</p>
              <p className={`text-xs mt-1 ${message.role === 'user' ? 'text-blue-200' : 'text-gray-500'}`}>
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>

            {message.role === 'user' && (<div className="p-2 bg-gray-100 rounded-full">
                <lucide_react_1.User className="h-4 w-4 text-gray-600"/>
              </div>)}
          </div>))}

        {loading && (<div className="flex items-start space-x-3">
            <div className="p-2 bg-blue-100 rounded-full">
              <lucide_react_1.Bot className="h-4 w-4 text-blue-600"/>
            </div>
            <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>)}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <react_2.TextInput value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about SF permits..." className="flex-1" disabled={loading}/>
        <react_2.Button type="submit" disabled={!input.trim() || loading} className="px-4">
          <lucide_react_1.Send className="h-4 w-4"/>
        </react_2.Button>
      </form>

      <react_2.Callout title="AI Assistant Tips" className="mt-4">
        Try asking: "What are the most common permit types?", "Show trends by neighborhood", or "How long does permit approval take?"
      </react_2.Callout>
    </react_2.Card>);
}
