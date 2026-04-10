
import HeroSection from "../components/section/HeroSection.jsx";
import PraySection from "../components/section/PraySection.jsx";
import PrefaceSection from "../components/section/PrefaceSection.jsx";
import ProfileSection from "../components/section/ProfileSection.jsx";
import CountdownSection from "../components/section/CountdownSection.jsx";
import LocationSection from "../components/section/LocationSection.jsx";
import GallerySection from "../components/section/GallerySection.jsx";
import VideoSection from "../components/section/VideoSection.jsx";
import GiftsSection from "../components/section/GiftsSection.jsx";
import FormSection from "../components/section/FormSection.jsx";


export default function WeddingHome({ data }) {
  return (
    <>
      <HeroSection
        groomName={data.groomName}
        brideName={data.brideName}
        weddingDate={data.weddingDate}
      />
      {/* <PraySection /> */}
      <PrefaceSection />
      <ProfileSection />
      <LocationSection weddingDate={data.weddingDate} />
      <CountdownSection weddingDate={data.weddingDate} />
      <GallerySection />
      <VideoSection />
      <GiftsSection />
      <FormSection />
    </>
  );
}
