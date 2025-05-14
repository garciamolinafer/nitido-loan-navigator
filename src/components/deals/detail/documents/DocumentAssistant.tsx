import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Stars,
  BookOpen,
  GitBranch,
  X,
  MessageSquare,
  Plus
} from 'lucide-react';
import { DocumentMetadata } from '@/types/documents';
import { ScrollArea } from '@/components/ui/scroll-area';
import { NitidinaAvatar } from "@/components/ui/nitidina-avatar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type AssistantType = 'nitidina' | 'paralegal' | 'extractor';

interface DocumentAssistantProps {
  document: DocumentMetadata;
  onClose: () => void;
}

export const DocumentAssistant = ({ document, onClose }: DocumentAssistantProps) => {
  const [selectedAssistant, setSelectedAssistant] = useState<AssistantType | null>(null);
  const [selectedDocuments, setSelectedDocuments] = useState<DocumentMetadata[]>([document]);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'ai', text: string }>>([]);
  const [userInput, setUserInput] = useState('');

  const assistants = [
    {
      id: 'nitidina',
      name: 'Nitidina',
      icon: <NitidinaAvatar size="sm" />,
      description: 'General assistance and platform help',
      isAvailable: () => true,
      greeting: (doc: DocumentMetadata) => `Hi! I'm Nitidina. I can help you with questions about this document and the platform. Here's a brief summary of the document:\n\n${doc.name}\n\nWhat would you like to know?`
    },
    {
      id: 'paralegal',
      name: 'Nitido Paralegal AI',
      icon: <Avatar className="h-8 w-8">
              <AvatarImage src="/lovable-uploads/paralegal_image.png" alt="Paralegal AI" />
              <AvatarFallback>PA</AvatarFallback>
            </Avatar>,
      description: 'Legal document analysis and assistance',
      isAvailable: () => true,
      greeting: () => `Hello! I'm your legal AI assistant. I specialize in legal matters and can help you analyze this document from a legal perspective. What would you like to know?`
    },
    {
      id: 'extractor',
      name: 'Contracts AI Extractor',
      icon: <div className="flex gap-1">
              <BookOpen className="h-5 w-5" />
              <GitBranch className="h-5 w-5" />
            </div>,
      description: 'Extract and analyze contract clauses',
      isAvailable: (doc: DocumentMetadata) => doc.category === 'loan_agreement',
      greeting: () => `I'll help you extract and analyze clauses from transaction agreements. Select the documents you'd like to analyze:`
    }
  ];

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;

    // Add user message
    setChatMessages(prev => [...prev, { sender: 'user', text: message }]);

    // Simulate AI response based on the selected assistant
    const assistant = assistants.find(a => a.id === selectedAssistant);
    if (assistant) {
      let response = '';
      if (assistant.id === 'nitidina') {
        response = `I understand you're asking about ${message}. Let me help you with that based on the document and platform information.`;
      } else if (assistant.id === 'paralegal') {
        if (message.toLowerCase().includes('legal') || message.toLowerCase().includes('agreement')) {
          response = `From a legal perspective, I can help analyze that aspect of the document.`;
        } else {
          response = `I apologize, but that question doesn't seem to be related to legal matters. Please ask Nitidina for general assistance or the Contracts AI Extractor for contract analysis.`;
        }
      } else if (assistant.id === 'extractor') {
        if (document.category === 'loan_agreement') {
          response = `I'll analyze the selected documents for relevant clauses and prepare a detailed memo.`;
        } else {
          response = `I can only analyze transaction agreements. Please select a loan agreement or related document.`;
        }
      }
      
      setTimeout(() => {
        setChatMessages(prev => [...prev, { sender: 'ai', text: response }]);
      }, 1000);
    }

    setUserInput('');
  };

  const renderAssistantSelection = () => (
    <div className="space-y-4 p-4">
      <p className="text-sm text-muted-foreground">
        Select an AI assistant to help you with this document:
      </p>
      <div className="grid gap-3">
        {assistants.map((assistant) => (
          <Button
            key={assistant.id}
            variant="outline"
            className={`flex items-center justify-start gap-3 h-auto p-4 ${
              !assistant.isAvailable(document) && 'opacity-50 cursor-not-allowed'
            }`}
            onClick={() => setSelectedAssistant(assistant.id as AssistantType)}
            disabled={!assistant.isAvailable(document)}
          >
            {assistant.icon}
            <div className="text-left">
              <div className="font-medium">{assistant.name}</div>
              <div className="text-sm text-muted-foreground">
                {assistant.description}
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );

  const renderAssistantChat = () => {
    const assistant = assistants.find(a => a.id === selectedAssistant);
    if (!assistant) return null;

    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-2 p-4 border-b">
          {assistant.icon}
          <h3 className="font-medium">{assistant.name}</h3>
        </div>
        
        {selectedAssistant === 'extractor' ? (
          <div className="p-4 space-y-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Selected Documents</h4>
              <div className="space-y-2">
                {selectedDocuments.map((doc) => (
                  <div 
                    key={doc.id}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
                  >
                    <span className="text-sm">{doc.name}</span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setSelectedDocuments(docs => 
                        docs.filter(d => d.id !== doc.id)
                      )}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => {/* TODO: Implement document selection */}}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Document
                </Button>
              </div>
            </div>
            <Button 
              className="w-full"
              onClick={() => handleSendMessage('Please analyze these documents')}
            >
              Extract and Analyze Clauses
            </Button>
          </div>
        ) : (
          <div className="flex flex-col flex-1 min-h-0">
            <ScrollArea className="flex-1">
              <div className="space-y-4 p-4">
                {/* Initial greeting */}
                {chatMessages.length === 0 && (
                  <div className="text-sm text-muted-foreground whitespace-pre-line bg-muted rounded-lg p-3">
                    {assistant.greeting(document)}
                  </div>
                )}
                
                {/* Chat messages */}
                {chatMessages.map((msg, idx) => (
                  <div 
                    key={idx}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-lg p-3 ${
                        msg.sender === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            {/* Chat input */}
            <div className="flex gap-2 p-4 border-t">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(userInput)}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <Button 
                onClick={() => handleSendMessage(userInput)}
                disabled={!userInput.trim()}
              >
                <MessageSquare className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="fixed inset-y-[10%] right-[420px] w-[400px] shadow-lg border bg-background z-50">
      <CardHeader className="py-3 border-b">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Stars className="h-5 w-5" />
            <CardTitle className="text-lg">AI Assistant</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[calc(80vh-6rem)]">
          {selectedAssistant ? renderAssistantChat() : renderAssistantSelection()}
        </div>
      </CardContent>
    </Card>
  );
}; 