'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { edgePillars } from '@/data/edgeInfrastructurePages';

export const EdgeInfraSubnav = () => {
  const pathname = usePathname();

  return (
    <nav className="sticky top-16 z-40 border-y border-border/70 bg-card/90 backdrop-blur-xl">
      <div className="container-lg py-3">
        <div className="flex gap-2 overflow-x-auto">
          <Link
            href="/solutions/edge-seo-infrastructure"
            className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              pathname === '/solutions/edge-seo-infrastructure'
                ? 'border-gold/50 bg-gold/15 text-gold'
                : 'border-border/60 bg-muted/30 text-muted-foreground hover:border-gold/35 hover:text-foreground'
            }`}
          >
            Overview
          </Link>
          {edgePillars.map((item) => {
            const href = `/solutions/edge-seo-infrastructure/${item.slug}`;
            const active = pathname === href;
            return (
              <Link
                key={item.slug}
                href={href}
                className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? 'border-gold/50 bg-gold/15 text-gold'
                    : 'border-border/60 bg-muted/30 text-muted-foreground hover:border-gold/35 hover:text-foreground'
                }`}
              >
                {item.navLabel}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
