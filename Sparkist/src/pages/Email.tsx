// src/EmailPage.tsx
import React, { useState } from 'react';
import EmailManager from '../parts/EmailManager.tsx';
import EmailTemplate from '../parts/EmailTemplate.tsx';
import EmailSender from '../parts/EmailSender.tsx';
import { useTheme } from '@/components/theme-provider';


const EmailPage: React.FC = () => {
  const [template, setTemplate] = useState('Hello, \nwe are excited about what you have done in the past week. \nPlease share with us your insight! \nAn award awaits the top contributors. \nThank you for your help. \nYour lovely Marketing Team');
  
  const { setTheme } = useTheme();
  setTheme("dark");

  return (
    <div className="flex flex-col items-center">
          <EmailManager />
          <EmailTemplate template={template} setTemplate={setTemplate} />
          <EmailSender template={template} />
    </div>
  );
};

export default EmailPage;
