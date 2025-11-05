import { AnimatePresence } from 'framer-motion';
import { Header } from './components/layout/Header';
import { ProgressBar } from './components/layout/ProgressBar';
import { Footer } from './components/layout/Footer';
import { useOnboardingStore } from './store/onboardingStore';

// Screen imports
import { Screen0Discovery } from './components/screens/Screen0Discovery';
import { Screen1Organization } from './components/screens/Screen1Organization';
import { Screen2Value } from './components/screens/Screen2Value';
import { Screen3Segmentation } from './components/screens/Screen3Segmentation';
import { Screen5Redemption } from './components/screens/Screen5Redemption';
import { Screen6Campaigns } from './components/screens/Screen6Campaigns';
import { Screen7Queues } from './components/screens/Screen7Queues';
import { Screen8Data } from './components/screens/Screen8Data';
import { Screen9Integrations } from './components/screens/Screen9Integrations';
import { Screen10Analytics } from './components/screens/Screen10Analytics';
import { Screen11FlowBuilder } from './components/screens/Screen11FlowBuilder';
import { Screen12SafeguardsAutomation } from './components/screens/Screen12SafeguardsAutomation';
import { Screen13Deployment } from './components/screens/Screen13Deployment';

const screens = [
  Screen0Discovery,
  Screen1Organization,
  Screen2Value,
  Screen5Redemption,
  Screen3Segmentation,
  Screen6Campaigns,
  Screen7Queues,
  Screen8Data,
  Screen9Integrations,
  Screen10Analytics,
  Screen11FlowBuilder,
  Screen12SafeguardsAutomation,
  Screen13Deployment,
];

function App() {
  const { currentScreen, nextScreen, previousScreen } = useOnboardingStore();
  const CurrentScreenComponent = screens[currentScreen];

  return (
    <div className="min-h-screen gradient-purple flex items-center justify-center p-5">
      <div className="w-full max-w-[1600px] bg-gray-50 rounded-2xl shadow-large flex flex-col" style={{ minHeight: '900px' }}>
        <Header />
        <ProgressBar currentScreen={currentScreen} />

        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <CurrentScreenComponent key={currentScreen} />
          </AnimatePresence>
        </div>

        <Footer
          currentScreen={currentScreen}
          totalScreens={screens.length}
          onNext={nextScreen}
          onPrevious={previousScreen}
        />
      </div>
    </div>
  );
}

export default App;
