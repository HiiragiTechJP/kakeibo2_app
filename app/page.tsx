import { AddToHomeHint } from "@/components/add-to-home-hint";
import { AppGate } from "@/components/app-gate";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-zinc-100 px-4 py-8 font-sans dark:bg-zinc-950">
      <AddToHomeHint />
      <AppGate />
    </div>
  );
}
