
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSuggestions } from '@/hooks/use-suggestions';
import { Brain, Calendar, Lightbulb, ArrowRight } from 'lucide-react';

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
    <Card className="suggestion-section">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Personalized Suggestions</CardTitle>
            <CardDescription>Tailored recommendations based on your health profile and environment</CardDescription>
          </div>
          <div className="rounded-full bg-primary/10 p-2">
            <Brain className="h-5 w-5 text-primary" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-100 hover:shadow-sm transition-shadow">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-full flex-shrink-0 ${suggestion.iconBg}`}>
                    <Lightbulb className={`h-4 w-4 ${suggestion.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="font-medium">{suggestion.title}</h3>
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
                      <Button variant="ghost" size="sm" className="text-xs p-0 h-auto">
                        Learn more <ArrowRight className="h-3 w-3 ml-1" />
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
