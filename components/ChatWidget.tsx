import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Bonjour ! Je suis l\'assistant virtuel de la clinique vétérinaire Jonckers-Thoumsin. Comment puis-je vous aider aujourd\'hui ?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickResponses = [
    { text: 'Prendre rendez-vous', response: 'Pour prendre rendez-vous, vous pouvez nous appeler au 068 65 74 68 ou utiliser notre système de réservation en ligne via Tipaw.' },
    { text: 'Horaires d\'ouverture', response: 'Nous sommes ouverts du lundi au vendredi de 8h à 12h et de 13h à 19h, et le samedi de 9h à 12h. Fermé le dimanche.' },
    { text: 'Urgences', response: 'En cas d\'urgence, contactez-nous immédiatement au 068 65 74 68. Un service de garde est assuré en dehors des heures d\'ouverture.' },
    { text: 'Nos services', response: 'Nous proposons des consultations générales, chirurgie, imagerie médicale, hospitalisation et soins spécialisés pour chiens, chats et NAC.' }
  ];

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('rdv') || message.includes('rendez-vous') || message.includes('consultation')) {
      return 'Pour prendre rendez-vous, vous pouvez nous appeler au 068 65 74 68 ou utiliser notre système de réservation en ligne via Tipaw. Quel type de consultation souhaitez-vous ?';
    }
    
    if (message.includes('horaire') || message.includes('ouvert') || message.includes('heure')) {
      return 'Nos horaires d\'ouverture :\n• Lundi au vendredi : 8h-12h et 13h-19h\n• Samedi : 9h-12h\n• Dimanche : Fermé\n\nLes consultations se font sur rendez-vous.';
    }
    
    if (message.includes('urgence') || message.includes('urgent')) {
      return 'En cas d\'urgence, contactez-nous immédiatement au 068 65 74 68. Un vétérinaire de garde est disponible 24h/24 pour les urgences vitales.';
    }
    
    if (message.includes('prix') || message.includes('tarif') || message.includes('coût')) {
      return 'Les tarifs varient selon le type de consultation et les soins nécessaires. Pour un devis personnalisé, n\'hésitez pas à nous contacter au 068 65 74 68.';
    }
    
    if (message.includes('vaccin') || message.includes('vaccination')) {
      return 'Nous recommandons une vaccination annuelle pour chiens et chats. Le protocole vaccinal est adapté selon l\'âge et le mode de vie de votre animal.';
    }
    
    if (message.includes('stérilisation') || message.includes('castration')) {
      return 'Nous pratiquons les stérilisations et castrations dans notre bloc opératoire équipé. L\'intervention se fait sous anesthésie générale avec monitoring complet.';
    }
    
    return 'Je vous remercie pour votre question. Pour une réponse personnalisée, je vous invite à contacter directement la clinique au 068 65 74 68 ou à prendre rendez-vous via Tipaw.';
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(text),
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickResponse = (response: { text: string; response: string }) => {
    sendMessage(response.text);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 bg-primary hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 ${
          isOpen ? 'scale-0' : 'scale-100'
        }`}
      >
        <MessageCircle size={24} />
      </button>

      {/* Chat Widget */}
      <div className={`fixed bottom-6 right-6 z-50 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 transition-all duration-300 ${
        isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
      }`}>
        {/* Header */}
        <div className="bg-primary text-white p-4 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Bot size={18} />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Assistant Virtuel</h3>
              <p className="text-xs text-blue-100">En ligne</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/80 hover:text-white transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="h-64 overflow-y-auto p-4 space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start gap-2 max-w-[80%] ${
                message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                  message.sender === 'user' 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {message.sender === 'user' ? <User size={12} /> : <Bot size={12} />}
                </div>
                <div className={`px-3 py-2 rounded-lg text-sm ${
                  message.sender === 'user'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <p className="whitespace-pre-line">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString('fr-FR', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                  <Bot size={12} className="text-gray-600" />
                </div>
                <div className="bg-gray-100 px-3 py-2 rounded-lg">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Responses */}
        {messages.length === 1 && (
          <div className="px-4 pb-2">
            <p className="text-xs text-gray-500 mb-2">Questions fréquentes :</p>
            <div className="flex flex-wrap gap-1">
              {quickResponses.map((response, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickResponse(response)}
                  className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-full transition"
                >
                  {response.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputValue)}
              placeholder="Tapez votre message..."
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
            />
            <button
              onClick={() => sendMessage(inputValue)}
              disabled={!inputValue.trim()}
              className="bg-primary hover:bg-blue-700 disabled:bg-gray-300 text-white p-2 rounded-lg transition"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatWidget;