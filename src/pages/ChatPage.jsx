import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Icon from '../components/AppIcon';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const ChatPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { helper, booking } = location.state || {};
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      senderId: helper?.id,
      senderName: helper?.name,
      message: `Hi! I've confirmed your booking for ${booking?.serviceType}. I'll be there on time!`,
      timestamp: new Date(Date.now() - 300000).toISOString(),
      type: 'text'
    },
    {
      id: 2,
      senderId: user?.id,
      senderName: user?.name,
      message: 'Great! Looking forward to it. Do you need any special instructions?',
      timestamp: new Date(Date.now() - 240000).toISOString(),
      type: 'text'
    },
    {
      id: 3,
      senderId: helper?.id,
      senderName: helper?.name,
      message: 'I have all the details from your booking. I will bring my own supplies. See you soon!',
      timestamp: new Date(Date.now() - 180000).toISOString(),
      type: 'text'
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (!helper || !booking) {
      navigate('/');
      return;
    }
  }, [isAuthenticated, helper, booking, navigate]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const message = {
      id: Date.now(),
      senderId: user?.id,
      senderName: user?.name,
      message: newMessage.trim(),
      timestamp: new Date().toISOString(),
      type: 'text'
    };
    
    setMessages(prev => [...prev, message]);
    setNewMessage('');
    
    // Simulate helper response
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        const helperResponse = {
          id: Date.now() + 1,
          senderId: helper?.id,
          senderName: helper?.name,
          message: 'Got it! Thanks for the message. I will keep you updated.',
          timestamp: new Date().toISOString(),
          type: 'text'
        };
        setMessages(prev => [...prev, helperResponse]);
        setIsTyping(false);
      }, 2000);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (!helper || !booking) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center">
        <div className="text-center">
          <Icon name="AlertTriangle" size={48} className="mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-xl font-semibold text-foreground mb-2">Chat not available</h2>
          <Button onClick={() => navigate('/')}>Go Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="text-muted-foreground hover:text-foreground"
              >
                <Icon name="ChevronLeft" size={20} />
              </button>
              <img
                src={helper.avatar}
                alt={helper.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h1 className="font-semibold text-foreground">{helper.name}</h1>
                <p className="text-sm text-muted-foreground">
                  {booking.serviceType} • {formatTime(booking.estimatedArrival)}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                iconName="Phone"
                onClick={() => alert(`Calling ${helper.name}...`)}
              />
              <Button
                variant="outline"
                size="sm"
                iconName="Video"
                onClick={() => alert('Video call not available in demo')}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="py-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.senderId === user?.id ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  message.senderId === user?.id
                    ? 'bg-primary text-white rounded-br-sm'
                    : 'bg-card border border-border text-foreground rounded-bl-sm'
                }`}
              >
                <p className="text-sm">{message.message}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.senderId === user?.id
                      ? 'text-white/70'
                      : 'text-muted-foreground'
                  }`}
                >
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-card border border-border text-foreground px-4 py-2 rounded-2xl rounded-bl-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-end space-x-3">
            <div className="flex-1">
              <Input
                type="textarea"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                rows={1}
                className="resize-none"
              />
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              iconName="Send"
              className="h-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;