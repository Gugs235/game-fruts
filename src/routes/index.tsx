import { createFileRoute } from "@tanstack/react-router";
import { FruitRebellion } from "@/components/game/FruitRebellion";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <FruitRebellion />;
}
