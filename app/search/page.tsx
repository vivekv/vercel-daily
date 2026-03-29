import { Suspense } from "react";
import { SearchContent } from "@/components/search-content";

export default function SearchPage() {
  return (
    <Suspense>
      <SearchContent />
    </Suspense>
  );
}
