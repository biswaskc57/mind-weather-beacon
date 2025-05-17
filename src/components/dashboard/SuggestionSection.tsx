
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSuggestions } from '@/hooks/use-suggestions';
import { Brain, Calendar, Lightbulb, ArrowRight, ExternalLink } from 'lucide-react';

interface SuggestionProps {
  environmentalData: any;
  stressData: any;
}

const SuggestionSection: React.FC<SuggestionProps> = ({ 
  environmentalData, 
  stressData 
}) => {
  const { suggestions, isLoading } = useSuggestions({
    environmentalData,
    stressData
  });

  return (
    <Card className="suggestion-section bg-white border-green-100">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-green-800">Personalized Suggestions</CardTitle>
            <CardDescription>Based on your stress patterns and environmental factors</CardDescription>
          </div>
          <div className="rounded-full bg-green-100 p-2">
            <Brain className="h-5 w-5 text-green-600" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="bg-green-50 rounded-lg p-4 border border-green-100 hover:shadow-sm transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-white border border-green-200 flex-shrink-0">
                    <Lightbulb className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="font-medium text-green-800">{suggestion.title}</h3>
                      <Badge variant={suggestion.priority === 'high' ? 'destructive' : suggestion.priority === 'medium' ? 'secondary' : 'outline'}>
                        {suggestion.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{suggestion.description}</p>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{suggestion.timeframe}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="text-xs p-0 h-auto text-green-700 hover:text-green-900">
                        Learn more <ExternalLink className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SuggestionSection;
