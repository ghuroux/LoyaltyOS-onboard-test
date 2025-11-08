import { AnimatePresence } from 'framer-motion';
import { Header } from './components/layout/Header';
import { ProgressBar } from './components/layout/ProgressBar';
import { Footer } from './components/layout/Footer';
import { useOnboardingStore } from './store/onboardingStore';

// Screen imports
import { Screen0Discovery } from './components/screens/Screen0Discovery';
import { Screen1Dashboard } from './components/screens/Screen1Dashboard';
import { Screen2PlatformBasics } from './components/screens/Screen2PlatformBasics';
import { Screen3Integrations } from './components/screens/Screen3Integrations';
import { Screen4Organization } from './components/screens/Screen4Organization';
import { Screen5Value } from './components/screens/Screen5Value';
import { Screen6Redemption } from './components/screens/Screen6Redemption';
import { Screen7Segmentation } from './components/screens/Screen7Segmentation';
import { Screen8Automations } from './components/screens/Screen8Automations';
import { Screen9Safeguards } from './components/screens/Screen9Safeguards';
import { Screen10Campaigns } from './components/screens/Screen10Campaigns';
import { Screen11Queues } from './components/screens/Screen11Queues';
import { Screen12Analytics } from './components/screens/Screen12Analytics';
import { Screen13Data } from './components/screens/Screen13Data';
import { Screen14FlowBuilder } from './components/screens/Screen14FlowBuilder';
import { Screen15Deployment } from './components/screens/Screen15Deployment';

// Spec screen imports
import { Spec4Organization } from './components/screens/Spec4Organization';

const screens = [
  Screen0Discovery,      // 0 - Industry & Template Selection
  Screen1Dashboard,      // 1 - Configuration Dashboard
  Screen2PlatformBasics, // 2 - Platform Basics
  Screen3Integrations,   // 3 - External Integrations
  Screen4Organization,   // 4 - Organization & Customer Structure
  Screen5Value,          // 5 - Points & Currency
  Screen6Redemption,     // 6 - Redemption & Rewards
  Screen7Segmentation,   // 7 - Segmentation
  Screen8Automations,    // 8 - Automations
  Screen9Safeguards,     // 9 - Safeguards
  Screen10Campaigns,     // 10 - Campaigns
  Screen11Queues,        // 11 - Queue Intelligence
  Screen12Analytics,     // 12 - Analytics & KPIs (moved from 13)
  Screen13Data,          // 13 - Data & Integrations (moved from 12)
  Screen14FlowBuilder,   // 14 - Flow Builder
  Screen15Deployment,    // 15 - Deployment
];

// Map of which screens have spec pages (screen number -> spec component)
const specScreens: { [key: number]: React.ComponentType<{ onNavigate: (screenId: number) => void }> } = {
  4: Spec4Organization,
};

// Check if current screen has a spec page
const hasSpecPage = (screenNumber: number): boolean => {
  return screenNumber in specScreens;
};

function App() {
  const { currentScreen, nextScreen, previousScreen, setCurrentScreen } = useOnboardingStore();

  // Determine if we're viewing a spec page (screen numbers 100+)
  const isSpecPage = currentScreen >= 100;
  const actualScreen = isSpecPage ? currentScreen - 100 : currentScreen;

  // Get the appropriate component
  const CurrentScreenComponent = isSpecPage
    ? specScreens[actualScreen]
    : screens[currentScreen];

  // Handler for viewing spec
  const handleViewSpec = () => {
    if (hasSpecPage(currentScreen)) {
      setCurrentScreen(100 + currentScreen);
    }
  };

  return (
    <div className="min-h-screen app-background flex items-center justify-center p-6">
      <div className="w-full max-w-[1600px] bg-white rounded-xl shadow-xl border border-gray-200 flex flex-col" style={{ minHeight: '900px' }}>
        {/* Hide header/progress/footer when viewing spec pages */}
        {!isSpecPage && (
          <>
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
          </>
        )}

        <div className="flex-1 overflow-y-auto bg-gray-50">
          <AnimatePresence mode="wait">
            <CurrentScreenComponent key={currentScreen} onNavigate={setCurrentScreen} />
          </AnimatePresence>
        </div>

        {/* Show footer only for regular screens */}
        {!isSpecPage && (
          <Footer
            currentScreen={currentScreen}
            totalScreens={screens.length}
            onNext={nextScreen}
            onPrevious={previousScreen}
            onSaveDraft={() => console.log('Save draft')}
            onValidate={() => console.log('Validate')}
            onViewSpec={handleViewSpec}
            hasSpec={hasSpecPage(currentScreen)}
            canProceed={true}
            validationErrors={0}
          />
        )}
      </div>
    </div>
  );
}

export default App;
