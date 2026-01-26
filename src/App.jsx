import { Suspense, lazy } from "react";

const PageLayout = lazy(() => import("./components/layout/Layout.jsx"));
const WeddingHome = lazy(() => import("./pages/WeddingHome.jsx"));


function App() {
  const weddingData = {
    groomName: "Dirotsaha",
    brideName: "Anya",
    weddingDate: "April 24, 2026"
  };

  return (
    <Suspense fallback={<div className="text-center text-gray-400 py-20">Loading...</div>}>
      <PageLayout>
        <WeddingHome data={weddingData} />
      </PageLayout>
    </Suspense>
  );
}

export default App;
