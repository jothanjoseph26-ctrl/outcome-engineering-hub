import { Footer } from "@/components/Footer";
import { Header } from '@/components/Header';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="py-20 bg-gradient-to-b from-background to-muted/30">
          <div className="container-lg">
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground text-lg">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container-lg">
            <div className="prose prose-invert max-w-none">
              <div className="space-y-8 text-muted-foreground">
                <div>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">1. Introduction</h2>
                  <p>
                    Outcome Labs Limited ("we," "our," or "us") is committed to protecting your privacy. 
                    This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                    when you visit our website and use our services.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">2. Information We Collect</h2>
                  <h3 className="text-xl font-medium text-foreground mb-2">Personal Information</h3>
                  <p className="mb-4">
                    We may collect personal information that you voluntarily provide to us when you:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Contact us through our website or email</li>
                    <li>Request information about our services</li>
                    <li>Subscribe to our newsletter</li>
                    <li>Engage our services for your business</li>
                  </ul>
                  <p>
                    This information may include your name, email address, phone number, company name, 
                    and any other information you choose to provide.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">3. How We Use Your Information</h2>
                  <p className="mb-4">We use the information we collect to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide, maintain, and improve our services</li>
                    <li>Respond to your inquiries and fulfill your requests</li>
                    <li>Send you technical notices, updates, and support messages</li>
                    <li>Communicate with you about products, services, and events</li>
                    <li>Monitor and analyze trends, usage, and activities</li>
                    <li>Detect, investigate, and prevent fraudulent transactions</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">4. Information Sharing</h2>
                  <p>
                    We do not sell, trade, or otherwise transfer your personal information to outside parties 
                    except in the following circumstances:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-4">
                    <li>With service providers who assist us in operating our website and conducting our business</li>
                    <li>When required by law or in response to valid requests by public authorities</li>
                    <li>To protect our rights, property, or safety, or that of our users or others</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">5. Data Security</h2>
                  <p>
                    We implement appropriate technical and organizational security measures to protect your 
                    personal information. However, no method of transmission over the Internet or electronic 
                    storage is 100% secure, and we cannot guarantee absolute security.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">6. Your Rights</h2>
                  <p className="mb-4">You have the right to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Access the personal information we hold about you</li>
                    <li>Request correction of inaccurate personal information</li>
                    <li>Request deletion of your personal information</li>
                    <li>Object to processing of your personal information</li>
                    <li>Request restriction of processing your personal information</li>
                    <li>Request transfer of your personal information</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">7. Third-Party Links</h2>
                  <p>
                    Our website may contain links to third-party websites. We are not responsible for the 
                    privacy practices or the content of those websites. We encourage you to review the 
                    privacy policies of any third-party sites you visit.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">8. Children's Privacy</h2>
                  <p>
                    Our services are not intended for individuals under the age of 18. We do not knowingly 
                    collect personal information from children. If you become aware that a child has provided 
                    us with personal information, please contact us.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">9. Changes to This Policy</h2>
                  <p>
                    We may update this Privacy Policy from time to time. We will notify you of any changes 
                    by posting the new Privacy Policy on this page and updating the "Last updated" date. 
                    You are advised to review this Privacy Policy periodically for any changes.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">10. Contact Us</h2>
                  <p>
                    If you have any questions about this Privacy Policy, please contact us at:
                  </p>
                  <p className="mt-4">
                    <strong>Outcome Labs Limited</strong><br />
                    Email: info@outcomelabs.online
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
