import InvitationCard from "@/components/InvitationCard";
import FallingPetals from "@/components/FallingPetals";
import FloatingParticles from "@/components/FloatingParticles";
import { ButterflyLayer } from "@/components/Butterfly";

export default function HomePage() {
  return (
    <main
      className="relative min-h-screen"
      style={{
        background: "linear-gradient(160deg, #fdf8f2 0%, #f9e4ec 35%, #fdf8f2 65%, #f5e6d3 100%)",
      }}
    >
      <FallingPetals count={14} />
      <FloatingParticles count={18} />
      {<ButterflyLayer />}
      <InvitationCard />
    </main>
  );
}
