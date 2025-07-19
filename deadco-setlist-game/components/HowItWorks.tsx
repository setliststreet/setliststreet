import React from 'react';

type HowItWorksStep = {
  title: string;
  text: string;
};

const steps: HowItWorksStep[] = [
  { title: 'Step 1', text: 'Choose a band and show.' },
  { title: 'Step 2', text: 'Pick your songs and game mode.' },
  { title: 'Step 3', text: 'Tune in live and see who wins!' },
];

export default function HowItWorks() {
  return (
    <div>
      <h2>How It Works</h2>
      <div>
        {steps.map((step, index) => (
          <div key={index}>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 