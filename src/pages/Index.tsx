import HeroSection from "@/components/HeroSection";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  return (
    <>
      <main>
        <HeroSection onStart={() => navigate("/diagnostico")} />
      </main>
    </>
  );
};

export default Index;
