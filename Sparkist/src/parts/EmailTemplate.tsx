// src/components/EmailTemplate.tsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';

interface EmailTemplateProps {
  template: string;
  setTemplate: React.Dispatch<React.SetStateAction<string>>;
}

const EmailTemplate: React.FC<EmailTemplateProps> = ({ template, setTemplate }) => {
  const [editing, setEditing] = useState(false);
  const [tempTemplate, setTempTemplate] = useState(template);

  const handleCancel = () => {
    setTempTemplate(template); 
    setEditing(false);
  };

  const handleSave = () => {
    setTemplate(tempTemplate);
    setEditing(false);
  };

  return (
    <Card className="w-[800px] my-4">
      <CardHeader>
        <CardTitle>Email Template</CardTitle>
      </CardHeader>
      <CardContent>
        {editing ? (
          <textarea
            value={tempTemplate}
            onChange={e => setTempTemplate(e.target.value)}
            className="w-full h-48 p-2 border border-gray-300 rounded bg-white text-black"
          />
        ) : (
          <p className="whitespace-pre-wrap text-white text-left">{template}</p>
        )}
      </CardContent>
      <CardFooter className="flex justify-center space-x-4">
        {editing ? (
          <>
            <Button onClick={handleSave}>Save</Button>
            <Button variant="outline" onClick={handleCancel}>Cancel</Button>
          </>
        ) : (
          <Button onClick={() => setEditing(true)}>Edit</Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default EmailTemplate;
