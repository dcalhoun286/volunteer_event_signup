import { useState } from 'react';

export const TestErrorPage = () => {
  const [error, setError] = useState<boolean>(false);

  if (error) {
    throw new Error('Test error triggered by user');
  }

  return <button onClick={() => setError(true)}>Trigger Error</button>;
};
