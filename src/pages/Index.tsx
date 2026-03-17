import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <main>
        <HeroSection onStart={() => navigate("/diagnostico")} />
      </main>
    </>
  );
};

export default Index;
