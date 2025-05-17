
import React from 'react';

interface SectionTitleProps {
  title: string;
  description?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, description }) => {
  return (
    <div className="text-center mb-8 max-w-3xl mx-auto w-full">
      <h2 className="text-2xl font-semibold leading-none tracking-tight mb-2">
        {title}
      </h2>
      {description && (
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
