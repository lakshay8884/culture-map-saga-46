
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, X, Send, MessageCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { culturalSites, culturalInsights } from '@/data/culturalData';
import { festivals } from '@/data/festivalData';

// Define message types
interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Initial welcome message when the chat is first opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        content: "Hello! I'm Astitva AI Assistant. How can I help you learn about Indian culture, festivals, or heritage sites today?",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Generate response based on user input
      const response = await generateResponse(input.trim());
      
      // Add bot response
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Sorry, I couldn't process your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Simple response generation function based on the application's data
  const generateResponse = async (query: string): Promise<string> => {
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const lowerQuery = query.toLowerCase();
    
    // Check for festival related queries
    if (lowerQuery.includes('festival') || lowerQuery.includes('celebration')) {
      const randomFestival = festivals[Math.floor(Math.random() * festivals.length)];
      return `${randomFestival.name} is a significant festival in India. It's celebrated in ${randomFestival.state === 'all' ? 'all states of India' : randomFestival.state} during ${randomFestival.date.toLocaleString('default', { month: 'long' })}. ${randomFestival.description}`;
    }
    
    // Check for monument or heritage site related queries
    if (lowerQuery.includes('monument') || lowerQuery.includes('heritage') || lowerQuery.includes('site') || lowerQuery.includes('place')) {
      const monuments = culturalSites.filter(site => site.category === 'monument' || site.category === 'heritage');
      const randomMonument = monuments[Math.floor(Math.random() * monuments.length)];
      return `${randomMonument.name} is located in ${randomMonument.location}. ${randomMonument.description}`;
    }
    
    // Check for art form related queries
    if (lowerQuery.includes('art') || lowerQuery.includes('dance') || lowerQuery.includes('music')) {
      const artForms = culturalSites.filter(site => site.category === 'art');
      if (artForms.length > 0) {
        const randomArtForm = artForms[Math.floor(Math.random() * artForms.length)];
        return `${randomArtForm.name} is a traditional art form. ${randomArtForm.description}`;
      }
      return "India has a rich tradition of various art forms including classical dances like Bharatanatyam, Kathak, Kathakali, and Odissi. Each dance form has its unique style, costume, and music.";
    }
    
    // Check for region specific queries
    if (lowerQuery.includes('north') || lowerQuery.includes('south') || lowerQuery.includes('east') || lowerQuery.includes('west') || lowerQuery.includes('central')) {
      let region = "";
      if (lowerQuery.includes('north')) region = "north";
      else if (lowerQuery.includes('south')) region = "south";
      else if (lowerQuery.includes('east')) region = "east";
      else if (lowerQuery.includes('west')) region = "west";
      else if (lowerQuery.includes('central')) region = "central";
      
      const regionSites = culturalSites.filter(site => site.regionId === region);
      if (regionSites.length > 0) {
        const randomSite = regionSites[Math.floor(Math.random() * regionSites.length)];
        return `In ${region}ern India, ${randomSite.name} is a notable cultural site. ${randomSite.shortDescription}`;
      }
      return `${region.charAt(0).toUpperCase() + region.slice(1)}ern India has a distinct cultural identity with its own traditions, cuisines, and festivals.`;
    }
    
    // Check for cultural insights
    if (lowerQuery.includes('fact') || lowerQuery.includes('insight') || lowerQuery.includes('interesting')) {
      const randomInsight = culturalInsights[Math.floor(Math.random() * culturalInsights.length)];
      return `Here's an interesting cultural insight: ${randomInsight.title}. ${randomInsight.content}`;
    }
    
    // Default responses for general queries
    const generalResponses = [
      "India is known for its rich cultural heritage that spans thousands of years. Its diverse traditions, languages, and art forms make it one of the most culturally rich countries in the world.",
      "Indian festivals are celebrated with great enthusiasm and vary by region, religion, and season. They typically involve decorations, special foods, music, and gatherings.",
      "India's architectural heritage includes ancient temples, mosques, forts, and palaces that showcase different styles and influences throughout history.",
      "The cuisine of India varies widely by region and is known for its extensive use of herbs, spices, and vegetables.",
      "Indian classical music has two major traditions: Hindustani (North Indian) and Carnatic (South Indian), both having ancient origins and complex systems of ragas and talas."
    ];
    
    return generalResponses[Math.floor(Math.random() * generalResponses.length)];
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat toggle button */}
      {!isOpen && (
        <Button 
          onClick={toggleChat} 
          className="rounded-full w-14 h-14 shadow-lg bg-deepBlue dark:bg-gold hover:bg-deepBlue/90 dark:hover:bg-gold/90"
          aria-label="Open chat"
        >
          <MessageCircle size={24} />
        </Button>
      )}
      
      {/* Chat window */}
      {isOpen && (
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl flex flex-col w-80 sm:w-96 h-[32rem] max-h-[80vh] border border-gray-200 dark:border-gray-800">
          {/* Chat header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center space-x-2">
              <Bot className="h-6 w-6 text-terracotta dark:text-gold" />
              <h3 className="font-serif font-medium text-lg">Astitva Assistant</h3>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleChat} 
              className="rounded-full h-8 w-8"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Messages area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(message => (
              <div 
                key={message.id} 
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user' 
                      ? 'bg-deepBlue text-white dark:bg-gold dark:text-gray-900' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                  }`}
                >
                  <p>{message.content}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Message input */}
          <form onSubmit={handleSendMessage} className="border-t border-gray-200 dark:border-gray-800 p-4">
            <div className="flex space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Indian culture..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button 
                type="submit" 
                size="icon" 
                disabled={isLoading || !input.trim()}
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
