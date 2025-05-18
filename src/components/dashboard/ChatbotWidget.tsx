
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const ChatbotWidget: React.FC = () => {
  return (
    <Card className="mb-4 md:mb-6 overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Environmental Health Assistant</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <iframe
          src="https://www.chatbase.co/chatbot-iframe/yanIrFJuHWd8CNmwUpDI4"
          width="100%"
          style={{ height: '700px', minHeight: '700px' }}
          frameBorder="0"
          title="Environmental Health Assistant"
        />
      </CardContent>
    </Card>
  );
};

export default ChatbotWidget;
