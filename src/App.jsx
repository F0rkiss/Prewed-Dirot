import { Suspense, lazy, useRef, useState } from "react";
import SplashScreen from "./components/SplashScreen.jsx";
import BackgroundMusic from "./components/BackgroundMusic.jsx";

const PageLayout = lazy(() => import("./components/layout/Layout.jsx"));
const WeddingHome = lazy(() => import("./pages/WeddingHome.jsx"));


function App() {
  const [showContent, setShowContent] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const musicRef = useRef(null);

  const weddingData = { 
    groomName: "Dirotsaha",
    brideName: "Pradnya",
    weddingDate: "April 24, 2026"
  };

  const handleOpenInvitation = () => {
    if (musicRef.current?.play) {
      musicRef.current.play();
    }
    setFadeOut(true);
    setTimeout(() => setShowContent(true), 500);
  };

  return (
    <div className="relative">
      {!showContent ? (
        <div className={`transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
          <SplashScreen 
            onReady={handleOpenInvitation}
            weddingDate={weddingData.weddingDate}
            brideName={weddingData.brideName}
            groomName={weddingData.groomName}
          />
        </div>
      ) : null}

      {showContent ? (
        <div className={`transition-opacity duration-700 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
          <Suspense fallback={<div className="text-center text-gray-400 py-20">Memuat...</div>}>
            <PageLayout>
              <WeddingHome data={weddingData} />
            </PageLayout>
          </Suspense>
        </div>
      ) : null}

      <BackgroundMusic ref={musicRef} showButton={showContent} />
    </div>
  );
}

export default App;
