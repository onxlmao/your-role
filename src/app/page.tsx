export default function Home() {
  return (
    <main className="bg-muted p-4 grid content-center min-h-screen lg:px-40 xl:px-60 2xl:px-80">
      <div className="bg-background p-4 rounded-md">
        <RadarQuiz />
      </div>
    </main>
  );
}

// Import as client component (this file stays server component)
import { RadarQuiz } from "@/components/radar";
