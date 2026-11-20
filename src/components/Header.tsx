"use client";

import { usePathname } from "next/navigation";
import { Suspense } from "react";
import Nav from "@/components/site/Nav";

export default function Header() {
  const pathname = usePathname();

  // Pages that already have a full-bleed dark hero canvas starting at top-0
  const isHeroPage =
    pathname === "/" ||
    pathname.startsWith("/destinations") ||
    pathname.startsWith("/route");

  return (
    <>
      <Suspense fallback={null}>
        <Nav />
      </Suspense>
      {/* Spacer for non-hero content pages so the floating pill doesn't overlap top headings */}
      {!isHeroPage && (
        <div className="h-24 sm:h-28 w-full shrink-0" aria-hidden="true" />
      )}
    </>
  );
}
