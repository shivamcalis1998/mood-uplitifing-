import { useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import QuestMain from './components/QuestMain';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleRestart = () => {
    setIsLoading(true);
  };

  return (
    <>
      {isLoading ? (
        <LoadingScreen onComplete={handleLoadingComplete} />
      ) : (
        <QuestMain onRestart={handleRestart} />
      )}
    </>
  );
}

export default App;
