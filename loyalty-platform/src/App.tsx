import { AnimatePresence } from 'framer-motion';
import { Header } from './components/layout/Header';
import { ProgressBar } from './components/layout/ProgressBar';
import { Footer } from './components/layout/Footer';
import { useOnboardingStore } from './store/onboardingStore';

// Screen imports
import { Screen0Discovery } from './components/screens/Screen0Discovery';
import { Screen1Organization } from './components/screens/Screen1Organization';
import { Screen2Integrations } from './components/screens/Screen2Integrations';
import { Screen3Value } from './components/screens/Screen3Value';
import { Screen4Redemption } from './components/screens/Screen4Redemption';
import { Screen5Segmentation } from './components/screens/Screen5Segmentation';
import { Screen6Automations } from './components/screens/Screen6Automations';
import { Screen7SafeguardsAutomation } from './components/screens/Screen7SafeguardsAutomation';
import { Screen8Campaigns } from './components/screens/Screen8Campaigns';
import { Screen9Queues } from './components/screens/Screen9Queues';
import { Screen10Data } from './components/screens/Screen10Data';
import { Screen11Analytics } from './components/screens/Screen11Analytics';
import { Screen12FlowBuilder } from './components/screens/Screen12FlowBuilder';
import { Screen13Deployment } from './components/screens/Screen13Deployment';

const screens = [
  Screen0Discovery,
  Screen2Integrations,
  Screen1Organization,
  Screen3Value,
  Screen4Redemption,
  Screen5Segmentation,
  Screen6Automations,
  Screen7SafeguardsAutomation,
  Screen8Campaigns,
  Screen9Queues,
  Screen10Data,
  Screen11Analytics,
  Screen12FlowBuilder,
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
