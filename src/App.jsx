import { Suspense, lazy, useState } from "react";
import SplashScreen from "./components/SplashScreen.jsx";

const PageLayout = lazy(() => import("./components/layout/Layout.jsx"));
const WeddingHome = lazy(() => import("./pages/WeddingHome.jsx"));


function App() {
  const [showContent, setShowContent] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const weddingData = {
    groomName: "Dirotsaha",
    brideName: "Pradnya",
    weddingDate: "April 24, 2026"
  };

  const handleOpenInvitation = () => {
    setFadeOut(true);
    setTimeout(() => setShowContent(true), 500);
  };

  if (!showContent) {
    return (
      <div className={`transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
        <SplashScreen 
          onReady={handleOpenInvitation}
          groomName={weddingData.groomName}
          brideName={weddingData.brideName}
          weddingDate={weddingData.weddingDate}
        />
      </div>
    );
  }

  return (
    <div className={`transition-opacity duration-700 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
      <Suspense fallback={<div className="text-center text-gray-400 py-20">Loading...</div>}>
        <PageLayout>
          <WeddingHome data={weddingData} />
        </PageLayout>
      </Suspense>
    </div>
  );
}

export default App;
