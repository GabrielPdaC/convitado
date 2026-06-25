import InvitationCard from "@/components/InvitationCard";
import FallingPetals from "@/components/FallingPetals";

export default function HomePage() {
  return (
    <main
      className="relative min-h-screen"
      style={{
        background: "linear-gradient(170deg, #fff6f9 0%, #fdeaf1 45%, #fff4f8 100%)",
      }}
    >
      <FallingPetals count={10} />
      <InvitationCard />
    </main>
  );
}
