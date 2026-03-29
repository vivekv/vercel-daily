import Image from "next/image";

interface HeroProps {
  headline: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

export function Hero({ headline, description, imageSrc, imageAlt }: HeroProps) {
  return (
    <section className="w-full border-b border-border bg-background">
      <div className="grid w-full gap-8 px-16 py-16 md:grid-cols-2 md:items-center md:gap-12">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {headline}
          </h1>
          <p className="text-lg text-muted-foreground">
            {description}
          </p>
        </div>
        <div className="relative aspect-video overflow-hidden rounded-lg">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
