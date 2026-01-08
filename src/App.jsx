import PageLayout from "./components/layout/Layout.jsx";
import WeddingHome from "./pages/WeddingHome.jsx";

function App() {
  const weddingData = {
    groomName: "Dirotsaha",
    brideName: "Anya",
    weddingDate: "April 15, 2026"
  };

  return (
    <PageLayout>
      <WeddingHome data={weddingData} />
    </PageLayout>
  );
}

export default App;
