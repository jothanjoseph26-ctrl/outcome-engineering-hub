import { useState, useRef, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react';
import { MegaMenu } from './MegaMenu';
import { OnboardingModal } from './OnboardingModal';

const navItems = [
  { label: 'Systems', hasDropdown: true },
  { label: 'Results', hasDropdown: true },
  { label: 'Process', hasDropdown: false },
  { label: 'Pricing', hasDropdown: false },
  { label: 'Resources', hasDropdown: true },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleDropdownMouseEnter = useCallback((item: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setActiveDropdown(item);
  }, []);

  const handleDropdownMouseLeave = useCallback(() => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      dropdownTimeoutRef.current = null;
    }, 200); // 200ms delay
  }, []);

  // Handle escape key to close dropdown
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setActiveDropdown(null);
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
        dropdownTimeoutRef.current = null;
      }
    }
  }, []);

  // Add keyboard event listener
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, [handleKeyDown]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Live metrics ticker */}
      <div className="bg-surface-elevated border-b border-border/50 py-2 hidden lg:block">
        <div className="container-lg">
          <div className="flex items-center justify-center gap-8 text-sm font-mono text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse-glow" />
              <span className="text-foreground">₦47.3M</span> generated this month
            </span>
            <span className="hidden md:block">•</span>
            <span className="hidden md:flex items-center gap-2">
              <span className="text-gold">↑ 284%</span> avg ROI
            </span>
            <span className="hidden md:block">•</span>
            <span className="hidden md:flex items-center gap-2">
              <span className="text-teal">1,847</span> campaigns optimized today
            </span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="container-lg">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold to-gold-glow flex items-center justify-center">
                <span className="text-background font-bold text-lg font-display">O</span>
              </div>
              <span className="font-display font-bold text-xl tracking-tight">
                OUTCOME<span className="text-gold">LABS</span>
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted focus:outline-none focus:ring-2 focus:ring-gold/50"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && item.hasDropdown) {
                      e.preventDefault();
                      setActiveDropdown(activeDropdown === item.label ? null : item.label);
                    }
                  }}
                  onMouseEnter={() => item.hasDropdown && handleDropdownMouseEnter(item.label)}
                  onMouseLeave={handleDropdownMouseLeave}
                >
                  {item.label}
                  {item.hasDropdown && (
                    <ChevronDown className="w-4 h-4 transition-transform" 
                      style={{ transform: activeDropdown === item.label ? 'rotate(180deg)' : 'rotate(0)' }} 
                    />
                  )}
                </button>
              ))}
            </div>

            {/* CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              <Button variant="ghost" size="sm">
                Client Login
              </Button>
              <Button variant="heroOutline" size="sm">
                Book Call
              </Button>
              <Button 
                variant="hero" 
                size="sm" 
                className="gap-2"
                onClick={() => setOnboardingOpen(true)}
              >
                Start Your Project <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mega Menu */}
        {activeDropdown && (
          <div
            onMouseEnter={() => handleDropdownMouseEnter(activeDropdown)}
            onMouseLeave={handleDropdownMouseLeave}
          >
            <MegaMenu activeSection={activeDropdown} />
          </div>
        )}
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-background border-b border-border animate-fade-in">
          <div className="container-lg py-4 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={`#${item.label.toLowerCase()}`}
                className="block px-4 py-3 text-foreground hover:bg-muted rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 space-y-2">
              <Button variant="heroOutline" className="w-full">
                Book Call
              </Button>
              <Button 
                variant="hero" 
                className="w-full gap-2"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setOnboardingOpen(true);
                }}
              >
                Start Your Project <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Onboarding Modal */}
      <OnboardingModal open={onboardingOpen} onOpenChange={setOnboardingOpen} />
    </header>
  );
};
