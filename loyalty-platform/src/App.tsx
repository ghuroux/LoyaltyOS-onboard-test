import { AnimatePresence } from 'framer-motion';
import { Header } from './components/layout/Header';
import { ProgressBar } from './components/layout/ProgressBar';
import { Footer } from './components/layout/Footer';
import { useOnboardingStore } from './store/onboardingStore';

// Screen imports
import { Screen0Discovery } from './components/screens/Screen0Discovery';
import { Screen0Dashboard } from './components/screens/Screen0Dashboard';
import { Screen2PlatformBasics } from './components/screens/Screen2PlatformBasics';
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
  Screen0Discovery,      // 0 - Industry & Template Selection
  Screen0Dashboard,      // 1 - Configuration Dashboard
  Screen2PlatformBasics, // 2 - Platform Basics
  Screen2Integrations,   // 3 - External Integrations
  Screen1Organization,   // 4 - Organization & Customer Structure
  Screen3Value,          // 5 - Points & Currency
  Screen4Redemption,     // 6 - Redemption & Rewards
  Screen5Segmentation,   // 7 - Segmentation
  Screen6Automations,    // 8 - Automations
  Screen7SafeguardsAutomation, // 9 - Safeguards
  Screen8Campaigns,      // 10 - Campaigns
  Screen9Queues,         // 11 - Queues
  Screen10Data,          // 12 - Data
  Screen11Analytics,     // 13 - Analytics
  Screen12FlowBuilder,   // 14 - Flow Builder
  Screen13Deployment,    // 15 - Deployment
];

function App() {
  const { currentScreen, nextScreen, previousScreen, setCurrentScreen } = useOnboardingStore();
  const CurrentScreenComponent = screens[currentScreen];

  return (
    <div className="min-h-screen gradient-purple flex items-center justify-center p-5">
      <div className="w-full max-w-[1600px] bg-gray-50 rounded-2xl shadow-large flex flex-col" style={{ minHeight: '900px' }}>
        <Header
          clientName="Acme Coffee Chain"
          clientId="ACC-2025"
          environment="dev"
          saveStatus="saved"
          userName="John Smith"
          userEmail="john@partner.com"
          currentScreen={currentScreen}
          onNavigateToDashboard={() => setCurrentScreen(1)}
        />
        <ProgressBar currentScreen={currentScreen} onNavigate={setCurrentScreen} />

        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <CurrentScreenComponent key={currentScreen} onNavigate={setCurrentScreen} />
          </AnimatePresence>
        </div>

        <Footer
          currentScreen={currentScreen}
          totalScreens={screens.length}
          onNext={nextScreen}
          onPrevious={previousScreen}
          onSaveDraft={() => console.log('Save draft')}
          onValidate={() => console.log('Validate')}
          canProceed={true}
          validationErrors={0}
        />
      </div>
    </div>
  );
}

export default App;
