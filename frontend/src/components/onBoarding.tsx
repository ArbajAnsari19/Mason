import { useState, useEffect } from 'react';
import Joyride, { Step, STATUS } from 'react-joyride';
import { useAuth } from '@/context/AuthContext';
import { firstLoginUpdate } from '@/api/api';

const steps: Step[] = [
  {
    target: 'body',
    content: 'Welcome to Smart Notes! Let\'s help you get started.',
    placement: 'center',
    disableBeacon: true,
  },
  {
    target: '.firstNote',
    content: 'Click here to create your first note. Our AI will help summarize and tag it!',
    placement: 'bottom',
  },
  {
    target: '.search-bar',
    content: 'Quickly find your notes using the search bar.',
    placement: 'bottom',
  }
];

export const OnboardingTour = () => {
  const [run, setRun] = useState(false);
  const { user, setUser } = useAuth();

  useEffect(() => {
    if (user?.isFirstLogin) {
      setRun(true);
    }
  }, [user]);

  const handleJoyrideCallback = async (data: any) => {
    const { status } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setRun(false);
      if (user) {
        try {
          // Call the API to update the first login status
          await firstLoginUpdate(user.id, false);
          // Update the user state in the frontend so that the tour doesn't show again
          setUser({ ...user, isFirstLogin: false });
        } catch (error) {
          console.error('Failed to update first login status:', error);
        }
      }
    }
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      showProgress
      showSkipButton
      styles={{
        options: {
          primaryColor: '#4F46E5',
          textColor: '#111827',
        },
      }}
      callback={handleJoyrideCallback}
    />
  );
};