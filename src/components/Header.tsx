import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, Menu, Search, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';

import { MegaMenu, HEADER_NAV_ORDER, MEGA_MENU_SECTIONS, type HeaderSectionId } from './MegaMenu';
import { OnboardingModal } from './OnboardingModal';

const MOBILE_DEFAULT_OPEN: HeaderSectionId[] = ['Solutions'];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<HeaderSectionId | null>(null);
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearDropdownTimer = useCallback(() => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
  }, []);

  const openDropdown = useCallback(
    (section: HeaderSectionId) => {
      clearDropdownTimer();
      setActiveDropdown(section);
    },
    [clearDropdownTimer],
  );

  const closeDropdown = useCallback(() => {
    clearDropdownTimer();
    setActiveDropdown(null);
  }, [clearDropdownTimer]);

  const closeDropdownDelayed = useCallback(() => {
    clearDropdownTimer();
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      dropdownTimeoutRef.current = null;
    }, 160);
  }, [clearDropdownTimer]);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
        closeDropdown();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      clearDropdownTimer();
    };
  }, [clearDropdownTimer, closeDropdown]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    setActiveDropdown(null);

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [mobileMenuOpen]);

  const openStrategyCall = () => {
    setMobileMenuOpen(false);
    setOnboardingOpen(true);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        className={cn(
          'relative border-b border-border/50 bg-background/70 backdrop-blur-2xl transition-all duration-300',
          isScrolled && 'bg-background/82 shadow-[0_10px_40px_-24px_rgba(0,0,0,0.75)]',
        )}
        onMouseLeave={closeDropdownDelayed}
      >
        <div className="container-lg">
          <div
            className={cn(
              'grid grid-cols-[1fr_auto] items-center gap-3 transition-all duration-300 lg:grid-cols-[auto_1fr_auto]',
              isScrolled ? 'h-16' : 'h-20',
            )}
          >
            <Link
              to="/"
              className="group flex min-w-0 items-center gap-3"
              onMouseEnter={closeDropdown}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gold/30 bg-gradient-to-br from-gold/95 to-gold-glow/85 text-background shadow-[0_0_24px_-10px_hsl(var(--gold))]">
                <span className="font-display text-sm font-bold tracking-tight">OL</span>
              </div>

              <div className="min-w-0">
                <div className="font-display text-sm font-semibold tracking-[0.14em] text-foreground sm:text-base">
                  OUTCOME LAB
                </div>
                <div className="hidden text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground/90 lg:block xl:text-[11px]">
                  Engineering Revenue. Distribution. Infrastructure.
                </div>
              </div>
            </Link>

            <div className="hidden lg:flex lg:justify-center">
              <div
                className="relative flex items-center gap-1 rounded-xl border border-border/40 bg-card/35 p-1"
                onMouseLeave={closeDropdownDelayed}
              >
                {HEADER_NAV_ORDER.map((label) => {
                  const isOpen = activeDropdown === label;

                  return (
                    <button
                      key={label}
                      type="button"
                      className={cn(
                        'flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40',
                        isOpen
                          ? 'bg-muted text-foreground'
                          : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground',
                      )}
                      aria-expanded={isOpen}
                      aria-haspopup="menu"
                      onMouseEnter={() => openDropdown(label)}
                      onFocus={() => openDropdown(label)}
                      onClick={() => setActiveDropdown((prev) => (prev === label ? null : label))}
                    >
                      {label}
                      <ChevronDown
                        className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')}
                      />
                    </button>
                  );
                })}

              </div>
            </div>

            <div className="hidden items-center justify-end gap-2 lg:flex">
              <Button variant="glass" size="icon" asChild>
                <Link to="/scanner" aria-label="Run Free Audit">
                  <Search className="h-4 w-4" />
                </Link>
              </Button>

              <Button variant="heroOutline" size="sm" asChild>
                <Link to="/portal">Client Login</Link>
              </Button>

              <Button
                variant="gold"
                size="sm"
                className="gap-2 shadow-[0_0_32px_-16px_hsl(var(--gold))] hover:shadow-[0_0_38px_-14px_hsl(var(--gold))]"
                onClick={openStrategyCall}
              >
                Book Strategy Call
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center justify-end gap-2 lg:hidden">
              <Button variant="glass" size="icon" asChild>
                <Link to="/scanner" aria-label="Run Free Audit">
                  <Search className="h-4 w-4" />
                </Link>
              </Button>

              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border/50 bg-card/50 text-foreground transition-colors hover:bg-muted"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileMenuOpen}
                onClick={() => setMobileMenuOpen((prev) => !prev)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {activeDropdown ? (
          <div
            onMouseEnter={() => openDropdown(activeDropdown)}
            onMouseLeave={closeDropdownDelayed}
          >
            <MegaMenu activeSection={activeDropdown} />
          </div>
        ) : null}
      </nav>

      {mobileMenuOpen ? (
        <div
          className={cn(
            'fixed inset-x-0 bottom-0 z-40 lg:hidden',
            isScrolled ? 'top-16' : 'top-20',
          )}
        >
          <div className="flex h-full flex-col border-t border-border/50 bg-background/95 backdrop-blur-2xl">
            <div className="flex-1 overflow-y-auto px-4 pb-6 pt-4">
              <div className="rounded-2xl border border-border/50 bg-card/45 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Command Center Navigation
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Navigate by intent: solutions architecture, platform operations, research assets, and enterprise pathways.
                </p>
              </div>

              <Accordion
                type="multiple"
                defaultValue={MOBILE_DEFAULT_OPEN}
                className="mt-4 rounded-2xl border border-border/50 bg-card/35 px-4"
              >
                {HEADER_NAV_ORDER.map((sectionId) => {
                  const section = MEGA_MENU_SECTIONS[sectionId];

                  return (
                    <AccordionItem
                      key={sectionId}
                      value={sectionId}
                      className="border-border/40"
                    >
                      <AccordionTrigger className="py-4 text-left text-base font-semibold text-foreground hover:no-underline">
                        <div className="flex min-w-0 flex-col items-start">
                          <span>{sectionId}</span>
                          <span className="text-xs font-normal uppercase tracking-[0.16em] text-muted-foreground">
                            {section.eyebrow}
                          </span>
                        </div>
                      </AccordionTrigger>

                      <AccordionContent className="pb-4">
                        <div className="space-y-3">
                          {section.columns.map((column) => (
                            <div key={column.title} className="rounded-xl border border-border/40 bg-background/35 p-3">
                              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                                {column.title}
                              </div>
                              <div className="mt-2 space-y-1.5">
                                {column.items.map((item) => {
                                  const entryContent = (
                                    <>
                                      <div className="flex items-center justify-between gap-2">
                                        <span className="text-sm font-medium text-foreground">
                                          {item.label}
                                        </span>
                                        {item.badge ? (
                                          <span className="rounded-full border border-gold/30 bg-gold/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-gold">
                                            {item.badge}
                                          </span>
                                        ) : null}
                                      </div>
                                      {item.description ? (
                                        <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                                          {item.description}
                                        </span>
                                      ) : null}
                                    </>
                                  );

                                  if (item.to) {
                                    return (
                                      <Link
                                        key={item.label}
                                        to={item.to}
                                        className="block rounded-lg px-2.5 py-2 transition-colors hover:bg-muted/50"
                                        onClick={() => setMobileMenuOpen(false)}
                                      >
                                        {entryContent}
                                      </Link>
                                    );
                                  }

                                  return (
                                    <a
                                      key={item.label}
                                      href={item.href ?? '#'}
                                      className="block rounded-lg px-2.5 py-2 transition-colors hover:bg-muted/50"
                                      onClick={() => setMobileMenuOpen(false)}
                                    >
                                      {entryContent}
                                    </a>
                                  );
                                })}
                              </div>
                            </div>
                          ))}

                          {section.footerLink ? (
                            section.footerLink.to ? (
                              <Link
                                to={section.footerLink.to}
                                className="inline-flex items-center gap-2 px-2 py-1 text-sm font-semibold text-gold"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {section.footerLink.label}
                                <ArrowRight className="h-4 w-4" />
                              </Link>
                            ) : (
                              <a
                                href={section.footerLink.href ?? '#'}
                                className="inline-flex items-center gap-2 px-2 py-1 text-sm font-semibold text-gold"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {section.footerLink.label}
                                <ArrowRight className="h-4 w-4" />
                              </a>
                            )
                          ) : null}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </div>

            <div className="border-t border-border/50 bg-background/95 p-4">
              <Button
                variant="gold"
                className="h-11 w-full justify-center gap-2 shadow-[0_0_32px_-16px_hsl(var(--gold))]"
                onClick={openStrategyCall}
              >
                Book Strategy Call
                <ArrowRight className="h-4 w-4" />
              </Button>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <Button variant="heroOutline" asChild>
                  <Link to="/portal" onClick={() => setMobileMenuOpen(false)}>
                    Client Login
                  </Link>
                </Button>
                <Button variant="glass" asChild>
                  <Link to="/scanner" onClick={() => setMobileMenuOpen(false)}>
                    Run Free Audit
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <OnboardingModal open={onboardingOpen} onOpenChange={setOnboardingOpen} />
    </header>
  );
};
