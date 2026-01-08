
import HeroSection from "../components/section/HeroSection.jsx";
import BackgroundMusic from "../components/BackgroundMusic.jsx";
import PraySection from "../components/section/PraySection.jsx";
import PrefaceSection from "../components/section/PrefaceSection.jsx";
import ProfileSection from "../components/section/ProfileSection.jsx";
import BackgroundSong from "../assets/Music/BackgroundMusic.mp3";
import CountdownSection from "../components/section/CountdownSection.jsx";
import LocationSection from "../components/section/LocationSection.jsx";


export default function WeddingHome({ data }) {
  return (
    <>
      <BackgroundMusic audioSrc={BackgroundSong} />
      <HeroSection
        groomName={data.groomName}
        brideName={data.brideName}
        weddingDate={data.weddingDate}
      />
      <PraySection />
      <PrefaceSection />
      <ProfileSection />
      <CountdownSection weddingDate={data.weddingDate} />
      <LocationSection weddingDate={data.weddingDate} />
      {/* <CountdownSection weddingDate={data.weddingDate} /> */} 
    </>
  );
}
