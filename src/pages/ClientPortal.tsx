import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Lock, User, ArrowRight, Shield } from 'lucide-react';

const ClientPortal = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 mb-4">
                <Lock className="w-8 h-8 text-gold" />
              </div>
              <h1 className="text-3xl font-display font-bold mb-2">
                Client Portal
              </h1>
              <p className="text-muted-foreground">
                Access your campaign dashboards and reports
              </p>
            </div>

            <div className="glass-card rounded-2xl p-8">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="email"
                      placeholder="you@company.com"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-gold/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-gold/50"
                    />
                  </div>
                </div>

                <Button variant="hero" className="w-full gap-2">
                  Access Portal
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </form>

              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Don't have portal access?
                </p>
                <Button variant="heroOutline" className="w-full" asChild>
                  <a href="mailto:hello@outcomelabs.ng?subject=Portal Access Request">
                    Request Access
                  </a>
                </Button>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Shield className="w-4 h-4 text-gold" />
              <span>Secure encrypted connection</span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ClientPortal;
