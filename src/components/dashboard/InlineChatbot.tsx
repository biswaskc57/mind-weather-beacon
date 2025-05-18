
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const InlineChatbot: React.FC = () => {
  return (
    <Card className="max-w-3xl mx-auto mb-8 overflow-hidden border-mindsense-success border-2">
      <CardContent className="p-0">
        <iframe
          src="https://www.chatbase.co/chatbot-iframe/yanIrFJuHWd8CNmwUpDI4"
          width="100%"
          style={{ height: '500px' }}
          frameBorder="0"
          title="Calmos Bot"
        />
      </CardContent>
    </Card>
  );
};

export default InlineChatbot;
