import { Hero } from "@/components/hero";
import { BreakingNewsBanner } from "@/components/breaking-news-banner";
import { FeaturedArticles } from "@/components/featured-articles";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <BreakingNewsBanner />
      <Hero
        headline="News and Insights for Modern web developers."
        description="Changelogs, engineering deep dives, customer stories and community updates - all in one place."
        imageSrc="/next.svg"
        imageAlt="Featured article"
      />
      <FeaturedArticles />
    </div>
  );
}
