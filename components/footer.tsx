"use client";

export function Footer() {
  return (
    <footer className="w-full border-t border-border py-6">
      <div className="mx-auto max-w-5xl px-4 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Vercel Daily. All rights reserved.
      </div>
    </footer>
  );
}
