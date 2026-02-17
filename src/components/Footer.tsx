import { ArrowRight, Linkedin, Twitter, Instagram, Youtube } from 'lucide-react';

const footerLinks = {
  services: [
    { label: 'Revenue Growth', href: '#' },
    { label: 'Market Dominance', href: '#' },
    { label: 'Electoral Victory', href: '#' },
    { label: 'SEO Engineering', href: '#' },
    { label: 'WhatsApp Systems', href: '#' },
    { label: 'Truereach Platform', href: '#' },
  ],
  company: [
    { label: 'About Us', href: '#' },
    { label: 'Case Studies', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: '#' },
    { label: 'Privacy Policy', href: '#' },
  ],
  resources: [
    { label: 'Free Revenue Audit', href: '#' },
    { label: 'ROI Calculator', href: '#' },
    { label: 'Growth Playbooks', href: '#' },
    { label: 'Client Portal', href: '#' },
    { label: 'System Status', href: '#' },
  ],
};

const socialLinks = [
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container-lg section-padding">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <a href="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold to-gold-glow flex items-center justify-center">
                <span className="text-background font-bold text-xl font-display">O</span>
              </div>
              <span className="font-display font-bold text-2xl tracking-tight">
                OUTCOME<span className="text-gold">LABS</span>
              </span>
            </a>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Engineering outcomes for businesses, brands, and campaigns across Nigeria and beyond. 
              Strategic Growth. Engineered.
            </p>
            
            {/* Newsletter */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-foreground mb-3">Stay Updated</h4>
              <form className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold text-sm"
                />
                <button 
                  type="submit"
                  className="p-2 rounded-lg bg-gold text-background hover:bg-gold-glow transition-colors"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>

            {/* Social links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-gold hover:bg-muted/80 transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-muted-foreground hover:text-gold transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-muted-foreground hover:text-gold transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Resources
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-muted-foreground hover:text-gold transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Outcome Labs Limited. Registered in Nigeria.
          </p>
          <p className="text-sm text-muted-foreground">
            Built with precision. Engineered for outcomes.
          </p>
        </div>
      </div>
    </footer>
  );
};
