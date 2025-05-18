
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Maximize, Minimize, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ChatbotWidget: React.FC = () => {
  const [isMinimized, setIsMinimized] = useState(true);
  const [isClosed, setIsClosed] = useState(false);

  if (isClosed) {
    return (
      <Button
        className="fixed bottom-4 right-4 rounded-full p-3 bg-mindsense-success text-white shadow-lg hover:bg-mindsense-success/90 z-50"
        onClick={() => setIsClosed(false)}
      >
        <span className="sr-only">Open chat</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
      </Button>
    );
  }

  return (
    <Card className={`fixed bottom-4 right-4 overflow-hidden shadow-lg transition-all duration-300 z-50 ${isMinimized ? 'w-64 h-12' : 'w-[380px] h-[600px]'}`}>
      <div className="bg-mindsense-success text-white p-2 flex justify-between items-center cursor-pointer" onClick={() => setIsMinimized(!isMinimized)}>
        <span className="text-sm font-medium">Calmos Bot</span>
        <div className="flex items-center gap-1">
          {isMinimized ? (
            <Maximize className="w-4 h-4" />
          ) : (
            <Minimize className="w-4 h-4" />
          )}
          <X 
            className="w-4 h-4 ml-1 cursor-pointer" 
            onClick={(e) => {
              e.stopPropagation();
              setIsClosed(true);
            }} 
          />
        </div>
      </div>
      {!isMinimized && (
        <CardContent className="p-0">
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/yanIrFJuHWd8CNmwUpDI4"
            width="100%"
            style={{ height: '562px' }}
            frameBorder="0"
            title="Calmos Bot"
          />
        </CardContent>
      )}
    </Card>
  );
};

export default ChatbotWidget;
