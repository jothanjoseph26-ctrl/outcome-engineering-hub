'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const items = [
  {
    label: 'API Campaign Control',
    href: '/solutions/programmatic-advertising/api-control',
  },
  {
    label: 'Custom Automation Scripts',
    href: '/solutions/programmatic-advertising/automation-scripts',
  },
  {
    label: 'Predictive Bidding',
    href: '/solutions/programmatic-advertising/predictive-bidding',
  },
  {
    label: 'Dynamic Creative Optimization',
    href: '/solutions/programmatic-advertising/dynamic-creative',
  },
];

export const ProgrammaticSubnav = () => {
  const pathname = usePathname();

  return (
    <nav className="sticky top-16 z-40 border-y border-border/70 bg-card/90 backdrop-blur-xl">
      <div className="container-lg py-3">
        <div className="flex gap-2 overflow-x-auto">
          {items.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? 'border-gold/50 bg-gold/15 text-gold'
                    : 'border-border/60 bg-muted/30 text-muted-foreground hover:border-gold/35 hover:text-foreground'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
