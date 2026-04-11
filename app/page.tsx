import { Suspense } from "react";
import { Hero } from "@/components/hero";
import { BreakingNewsBanner } from "@/components/breaking-news-banner";
import { FeaturedArticles } from "@/components/featured-articles";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Suspense>
        <BreakingNewsBanner />
      </Suspense>
      <Hero
        headline="Introducing the AI Gateway."
        description="You can just use AI. Any vendor, any model. The Vercel AI Gateway is now available for alpha testing.Built on the AI SDK 5 alpha, the Gateway lets you switch between ~100 AI models without needing to manage API keys, rate limits, or provider accounts. The Gateway handles authentication, usage tracking, and in the future, billing."
        imageSrc="https://i8qy5y6gxkdgdcv9.public.blob.vercel-storage.com/news/introducing-the-ai-gateway.png"
        imageAlt="Featured article"
        mainCta="/articles/introducing-the-ai-gateway"
      />
      <Suspense>
        <FeaturedArticles />
      </Suspense>
    </div>
  );
}
