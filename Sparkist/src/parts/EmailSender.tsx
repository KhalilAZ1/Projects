// src/components/EmailSender.tsx
import React, { useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Button } from '@/components/ui/button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const frequencies = [
  { label: 'One time', value: 'one_time' },
  { label: 'Every 3 days', value: 'every_3_days' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Bi-weekly', value: 'bi_weekly' },
  { label: 'Monthly', value: 'monthly' },
  { label: 'Bi-monthly', value: 'bi_monthly' },
  { label: 'Every trimester', value: 'every_trimester' },
];

const EmailSender: React.FC<{ template: string }> = ({ template }) => {
  const [frequency, setFrequency] = useState(frequencies[0].value);

  const handleFrequencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFrequency(event.target.value);
  };

  const sendEmails = async () => {
    try {
      const emailCollection = collection(db, 'emails');
      const emailSnapshot = await getDocs(emailCollection);
      const emailList = emailSnapshot.docs.map(doc => doc.data().address);

      // Simulate sending emails
      emailList.forEach(email => {
        console.log(`Sending email to: ${email}`);
        console.log(`Email content: ${template}`);
        console.log(`Frequency: ${frequency}`);
      });

      toast.success('Emails sent!');
    } catch (error) {
      console.error('Error sending emails:', error);
      toast.error('Failed to send emails. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center mb-4">
        <label htmlFor="frequency" className="mr-2">Frequency:</label>
        <select
          id="frequency"
          value={frequency}
          onChange={handleFrequencyChange}
          className="border rounded p-2 mr-2"
          style={{ color: 'black' }}
        >
          {frequencies.map(f => (
            <option key={f.value} value={f.value} style={{ color: 'black' }}>{f.label}</option>
          ))}
        </select>
        <Button onClick={sendEmails}>Send Email</Button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EmailSender;
