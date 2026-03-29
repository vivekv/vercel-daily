import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const articles: Record<
  string,
  {
    slug: string;
    headline: string;
    category: string;
    publishDate: string;
    author: string;
    imageSrc: string;
    imageAlt: string;
    body: string;
  }
> = {
  "introducing-nextjs-16": {
    slug: "introducing-nextjs-16",
    headline: "Introducing Next.js 16: A New Era of Web Development",
    category: "Product",
    publishDate: "2026-03-27",
    author: "Vercel Team",
    imageSrc: "/next.svg",
    imageAlt: "Next.js 16 announcement",
    body: `Next.js 16 marks a pivotal moment in the evolution of the React framework. With this release, we've introduced groundbreaking features that redefine how developers build for the web.

## Highlights

The new rendering pipeline delivers up to 3x faster page loads by intelligently streaming components as they become ready. Combined with our revamped build system, development iteration times have been cut in half.

### Improved Server Components

Server Components are now the default for all new pages, with an even more seamless integration between server and client boundaries. The compiler automatically optimizes component trees, reducing JavaScript sent to the browser by an average of 40%.

### Edge-First Architecture

Every route in Next.js 16 is edge-ready out of the box. Our new Edge Runtime v3 supports the full Node.js API surface while maintaining sub-millisecond cold start times. This means your applications run closer to your users without sacrificing functionality.

### Built-in Analytics

We've integrated Vercel Analytics directly into the framework. Track Core Web Vitals, custom events, and user flows without any additional setup. The analytics dashboard provides actionable insights to help you optimize performance continuously.

## Migration Guide

Upgrading from Next.js 15 is straightforward. Most applications will only need to update their dependency version. For applications using deprecated APIs, our codemod tool handles the migration automatically.

We're incredibly excited about what Next.js 16 enables. Start building today and experience the future of web development.`,
  },
  "reducing-cold-starts-edge-functions": {
    slug: "reducing-cold-starts-edge-functions",
    headline: "How We Reduced Cold Starts by 90% with Edge Functions",
    category: "Engineering",
    publishDate: "2026-03-25",
    author: "Sarah Chen",
    imageSrc: "/next.svg",
    imageAlt: "Edge Functions deep dive",
    body: `Cold starts have long been the Achilles' heel of serverless computing. In this deep dive, we share how our engineering team achieved a 90% reduction in cold start times for Edge Functions.

## The Challenge

When a serverless function hasn't been invoked recently, the runtime needs to initialize a new execution environment. This "cold start" can add hundreds of milliseconds to response times — an eternity for latency-sensitive applications.

### Our Approach

We took a multi-pronged approach to tackle cold starts:

**1. Snapshot-based Initialization**
Instead of booting a fresh runtime for each cold start, we pre-compute runtime snapshots that capture the initialized state of the V8 isolate. This alone cut cold start times by 60%.

**2. Predictive Warming**
Using historical traffic patterns, we predict which functions are likely to be invoked and pre-warm them before requests arrive. Our ML model achieves 85% accuracy in predicting the next function to be called.

**3. Shared Module Cache**
Functions that share common dependencies now benefit from a global module cache at the edge. Popular packages like React and Next.js are pre-loaded across all regions.

## Results

The combined effect of these optimizations brought our p99 cold start latency from 800ms down to 80ms. For most applications, cold starts are now indistinguishable from warm invocations.

These improvements are available today for all Vercel customers. No configuration changes are needed — your Edge Functions are automatically faster.`,
  },
  "design-system-that-scales": {
    slug: "design-system-that-scales",
    headline: "Building a Design System That Scales: Lessons from Vercel",
    category: "Design",
    publishDate: "2026-03-23",
    author: "Alex Rivera",
    imageSrc: "/next.svg",
    imageAlt: "Design system article",
    body: `A design system is more than a component library. It's a shared language that enables teams to build consistent, accessible, and beautiful interfaces at scale. Here's what we learned building ours.

## Starting Small

We began with just five components: Button, Input, Card, Dialog, and Toast. Rather than trying to anticipate every need, we focused on getting the foundations right — spacing scales, color tokens, typography, and interaction patterns.

### Token Architecture

Our token system uses three layers: primitive tokens (raw values), semantic tokens (contextual meaning), and component tokens (specific overrides). This architecture lets us support theming while maintaining consistency.

### Accessibility First

Every component is built with accessibility as a core requirement, not an afterthought. We test against WCAG 2.1 AA standards and use automated testing to catch regressions. Screen reader testing is part of every component's QA process.

## Scaling the System

As the system grew to over 60 components, we introduced several practices to maintain quality. A dedicated design systems team reviews all contributions. Each component has comprehensive documentation, usage guidelines, and interactive examples.

### Adoption Metrics

We track adoption through automated tooling that scans our codebase. Currently, 94% of our UI is built with design system components, up from 45% when we started two years ago.

The investment in a design system has paid dividends in development velocity, design consistency, and accessibility compliance across all our products.`,
  },
  "global-edge-network-expansion": {
    slug: "global-edge-network-expansion",
    headline: "Vercel Expands Global Edge Network to 30 New Regions",
    category: "Infrastructure",
    publishDate: "2026-03-21",
    author: "Vercel Infrastructure Team",
    imageSrc: "/next.svg",
    imageAlt: "Global edge network expansion",
    body: `Today we're announcing the expansion of Vercel's Edge Network to 30 new regions, bringing our total to over 100 points of presence worldwide. This expansion ensures that your applications are served from the closest possible location to your users.

## New Regions

The expansion covers underserved areas across South America, Africa, and Southeast Asia. Key new locations include São Paulo, Lagos, Nairobi, Jakarta, and Ho Chi Minh City.

### Performance Impact

For users in these regions, we're seeing latency improvements of 40-60%. A user in Lagos who previously had 200ms round-trip times to the nearest edge node now experiences sub-50ms latency.

### Automatic Routing

No configuration is needed to take advantage of the new regions. Our Anycast routing automatically directs traffic to the nearest healthy edge node. If a region experiences issues, traffic seamlessly fails over to the next closest location.

## What This Means for You

Every Vercel deployment automatically benefits from the expanded network. Static assets, Edge Functions, and ISR pages are all served from the nearest edge location. This translates directly to better Core Web Vitals scores and improved user experience for your global audience.

We're committed to continuing this expansion throughout 2026, with plans to reach 150 regions by year-end.`,
  },
  "react-server-components-production": {
    slug: "react-server-components-production",
    headline: "React Server Components in Production: A Case Study",
    category: "Engineering",
    publishDate: "2026-03-19",
    author: "Michael Park",
    imageSrc: "/next.svg",
    imageAlt: "React Server Components case study",
    body: `After running React Server Components in production for over a year, we're sharing our findings on performance, developer experience, and the architectural patterns that emerged.

## The Migration

We migrated our dashboard application — a complex, data-heavy interface with over 200 routes — from a traditional client-side React architecture to Server Components. The migration took three months with a team of four engineers.

### Performance Gains

The results exceeded our expectations. Initial page load times dropped by 55%, and the total JavaScript bundle size decreased by 62%. Time to Interactive improved by 45% across all pages.

### Data Fetching Patterns

Server Components fundamentally changed how we think about data fetching. Instead of managing loading states and caching on the client, data is fetched directly in components on the server. This eliminated an entire category of bugs related to stale data and race conditions.

## Lessons Learned

**Component Boundaries Matter**: Choosing where to draw the line between Server and Client Components is the most important architectural decision. We found that keeping Client Components as leaf nodes in the component tree produces the best results.

**Streaming is Essential**: Without streaming, Server Components could actually be slower than client-side rendering for complex pages. Streaming with Suspense boundaries ensures users see meaningful content quickly while slower data sources load.

**Testing Needs New Tools**: Traditional testing approaches don't fully cover Server Components. We developed custom testing utilities that simulate the server rendering environment.

Server Components represent a genuine paradigm shift. The benefits are real and substantial, but the migration requires thoughtful planning and execution.`,
  },
  "community-spotlight-open-source": {
    slug: "community-spotlight-open-source",
    headline: "Community Spotlight: Open Source Projects Powered by Vercel",
    category: "Community",
    publishDate: "2026-03-17",
    author: "Vercel Community Team",
    imageSrc: "/next.svg",
    imageAlt: "Community spotlight",
    body: `The Vercel community continues to produce incredible open source projects. This month, we're highlighting six projects that showcase the creativity and technical excellence of our developer community.

## Featured Projects

### Nextra 4.0
The popular documentation framework received a major update with full MDX 3 support, built-in search powered by FlexSearch, and a completely redesigned default theme. Nextra powers documentation for hundreds of open source projects.

### Plate Editor
A rich-text editor framework built on top of Slate.js with a plugin architecture that makes it easy to add features like mentions, tables, and media embeds. The Plate team has built an impressive ecosystem of over 50 plugins.

### Cal.com
The open source scheduling platform continues to grow, now handling over 10 million bookings per month. Their architecture showcases how Next.js can power complex, real-time applications at scale.

### Taxonomy
A reference implementation showing how to build a modern SaaS application with Next.js App Router, featuring authentication, billing, dashboard, and more. It's become one of the most popular starting points for new projects.

## Get Involved

Open source thrives on community participation. Whether you're fixing bugs, writing documentation, or building new features, every contribution matters. Check out our community forum to connect with other developers and find projects that need help.

We'll continue spotlighting outstanding projects every month. Submit your project for consideration through our community portal.`,
  },
};

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const article = articles[slug];

  if (!article) {
    return NextResponse.json({ error: "Article not found" }, { status: 404 });
  }

  return NextResponse.json(article);
}
