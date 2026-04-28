import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  ArrowRight,
  ArrowLeft,
  Target,
  Globe,
  Building2,
  DollarSign,
  MessageSquare,
  AlertCircle,
  Mail,
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { persistScannerSession } from '@/lib/scanner-client';

interface ScannerWizardProps {
  onScanStart: (scanId: string, publicToken: string) => void;
}

type Step = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};

const steps: Step[] = [
  { id: 'goal', title: 'Revenue Goal', description: 'What\'s your primary revenue objective?', icon: <Target className="w-6 h-6" /> },
  { id: 'website', title: 'Website', description: 'Enter your website URL', icon: <Globe className="w-6 h-6" /> },
  { id: 'business', title: 'Business Type', description: 'What type of business do you run?', icon: <Building2 className="w-6 h-6" /> },
  { id: 'budget', title: 'Marketing Budget', description: 'Monthly marketing spend', icon: <DollarSign className="w-6 h-6" /> },
  { id: 'channels', title: 'Lead Channels', description: 'How do you capture leads?', icon: <MessageSquare className="w-6 h-6" /> },
  { id: 'problem', title: 'Biggest Challenge', description: 'What\'s your main frustration?', icon: <AlertCircle className="w-6 h-6" /> },
  { id: 'contact', title: 'Contact Info', description: 'Where should we send results?', icon: <Mail className="w-6 h-6" /> },
];

const goalOptions = [
  { value: 'increase_sales', label: 'Increase Sales', description: 'Drive more revenue from existing traffic' },
  { value: 'reduce_cac', label: 'Reduce CAC', description: 'Lower customer acquisition costs' },
  { value: 'improve_conversion', label: 'Improve Conversion', description: 'Convert more visitors to customers' },
  { value: 'scale_advertising', label: 'Scale Advertising', description: 'Spend more while maintaining ROI' },
];

const businessTypes = [
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'saas', label: 'SaaS / Software' },
  { value: 'services', label: 'Professional Services' },
  { value: 'agency', label: 'Agency' },
  { value: 'retail', label: 'Retail / Physical Store' },
  { value: 'real_estate', label: 'Real Estate' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'education', label: 'Education' },
  { value: 'other', label: 'Other' },
];

const budgetRanges = [
  { value: '0-100000', label: 'Under N100K' },
  { value: '100000-500000', label: 'N100K - N500K' },
  { value: '500000-1000000', label: 'N500K - N1M' },
  { value: '1000000-5000000', label: 'N1M - N5M' },
  { value: '5000000+', label: 'Over N5M' },
];

const channelOptions = [
  { value: 'website_form', label: 'Website Forms' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'phone', label: 'Phone Calls' },
  { value: 'email', label: 'Email' },
  { value: 'social_dm', label: 'Social Media DMs' },
  { value: 'live_chat', label: 'Live Chat' },
  { value: 'none', label: 'No Clear System' },
];

const problemOptions = [
  { value: 'low_conversion', label: 'People visit but don\'t buy' },
  { value: 'high_cac', label: 'Spending too much on ads' },
  { value: 'no_tracking', label: 'Can\'t track what\'s working' },
  { value: 'lead_quality', label: 'Getting wrong leads' },
  { value: 'no_followup', label: 'Leads go cold' },
  { value: 'scaling', label: 'Can\'t scale profitably' },
];

export const isValidWebsiteInput = (value: string) => {
  const trimmed = value.trim();

  if (!trimmed || /\s/.test(trimmed)) {
    return false;
  }

  const candidate = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

  try {
    const parsed = new URL(candidate);
    return (
      ['http:', 'https:'].includes(parsed.protocol) &&
      parsed.hostname.includes('.') &&
      !parsed.hostname.startsWith('.') &&
      !parsed.hostname.endsWith('.')
    );
  } catch {
    return false;
  }
};

export const isValidEmailInput = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export const ScannerWizard = ({ onScanStart }: ScannerWizardProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const [answers, setAnswers] = useState({
    goal: '',
    website: '',
    businessType: '',
    budget: '',
    channels: [] as string[],
    problem: '',
    contactName: '',
    contactEmail: '',
  });

  const progress = ((currentStep + 1) / steps.length) * 100;

  const updateAnswer = (key: string, value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const toggleChannel = (channel: string) => {
    setAnswers((prev) => ({
      ...prev,
      channels: prev.channels.includes(channel)
        ? prev.channels.filter((c) => c !== channel)
        : [...prev.channels, channel],
    }));
  };

  const canProceed = () => {
    switch (steps[currentStep].id) {
      case 'goal':
        return !!answers.goal;
      case 'website':
        return isValidWebsiteInput(answers.website);
      case 'business':
        return !!answers.businessType;
      case 'budget':
        return !!answers.budget;
      case 'channels':
        return answers.channels.length > 0;
      case 'problem':
        return !!answers.problem;
      case 'contact':
        return isValidEmailInput(answers.contactEmail);
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Check Supabase configuration
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
        throw new Error('Scanner service is temporarily unavailable. Please try again later.');
      }

      let website = answers.website.trim();
      if (!website.startsWith('http://') && !website.startsWith('https://')) {
        website = `https://${website}`;
      }

      if (!isValidWebsiteInput(website)) {
        throw new Error('Enter a valid website URL.');
      }

      if (!isValidEmailInput(answers.contactEmail)) {
        throw new Error('Enter a valid email address.');
      }

      // Client-generated id so we can skip .select() after insert. PostgREST's INSERT…RETURNING
      // must pass SELECT RLS; rows have no public_token until start-scan runs, so returning id
      // would fail under "Allow scan retrieval by token" even when the insert is valid.
      const scanId = crypto.randomUUID();

      const { error } = await supabase.from('scans').insert({
        id: scanId,
        website,
        answers: {
          goal: answers.goal,
          businessType: answers.businessType,
          budget: answers.budget,
          channels: answers.channels,
          problem: answers.problem,
        },
        contact_name: answers.contactName,
        contact_email: answers.contactEmail,
        status: 'pending',
        progress: 0,
      });

      if (error) {
        // Convert Supabase error object to proper Error instance
        const message = error.message || error.details || error.hint || JSON.stringify(error);
        throw new Error(`Database error: ${message}`);
      }

      const { data: scanStartData, error: scanError } = await supabase.functions.invoke('start-scan', {
        body: { scanId },
      });

      if (scanError) {
        const message = scanError.message || scanError.details || JSON.stringify(scanError);
        throw new Error(`Scan start failed: ${message}`);
      }

      const publicToken = scanStartData?.publicToken;

      if (typeof publicToken !== 'string' || publicToken.length === 0) {
        throw new Error('Scan started without a public token.');
      }

      persistScannerSession({ scanId, publicToken });
      onScanStart(scanId, publicToken);
    } catch (error) {
      // Ensure we always have a proper Error instance with a message
      const normalizedError = error instanceof Error
        ? error
        : new Error(
            typeof error === 'string'
              ? error
              : `Unknown error occurred: ${JSON.stringify(error)}`
          );

      console.error('Error creating scan:', normalizedError.message, normalizedError);
      toast({
        title: 'Error',
        description: normalizedError.message || 'Failed to start scan. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    const step = steps[currentStep];

    switch (step.id) {
      case 'goal':
        return (
          <div className="grid gap-4 sm:grid-cols-2">
            {goalOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => updateAnswer('goal', option.value)}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  answers.goal === option.value ? 'border-gold bg-gold/10' : 'border-border hover:border-gold/50'
                }`}
              >
                <p className="font-semibold text-foreground">{option.label}</p>
                <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
              </button>
            ))}
          </div>
        );

      case 'website':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="website" className="text-foreground">Website URL</Label>
              <Input
                id="website"
                type="text"
                placeholder="example.com"
                value={answers.website}
                onChange={(e) => updateAnswer('website', e.target.value)}
                className="mt-2 bg-surface-glass border-border text-foreground placeholder:text-muted-foreground"
              />
              <p className="text-sm text-muted-foreground mt-2">
                We&apos;ll scan your website to detect tracking, forms, and conversion elements.
              </p>
            </div>
          </div>
        );

      case 'business':
        return (
          <div className="grid gap-3 sm:grid-cols-3">
            {businessTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => updateAnswer('businessType', type.value)}
                className={`p-3 rounded-xl border-2 text-center transition-all ${
                  answers.businessType === type.value ? 'border-gold bg-gold/10' : 'border-border hover:border-gold/50'
                }`}
              >
                <p className="font-medium text-foreground">{type.label}</p>
              </button>
            ))}
          </div>
        );

      case 'budget':
        return (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {budgetRanges.map((range) => (
              <button
                key={range.value}
                onClick={() => updateAnswer('budget', range.value)}
                className={`p-4 rounded-xl border-2 text-center transition-all ${
                  answers.budget === range.value ? 'border-gold bg-gold/10' : 'border-border hover:border-gold/50'
                }`}
              >
                <p className="font-semibold text-foreground">{range.label}</p>
              </button>
            ))}
          </div>
        );

      case 'channels':
        return (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {channelOptions.map((channel) => (
              <button
                key={channel.value}
                onClick={() => toggleChannel(channel.value)}
                className={`p-3 rounded-xl border-2 text-center transition-all ${
                  answers.channels.includes(channel.value)
                    ? 'border-gold bg-gold/10'
                    : 'border-border hover:border-gold/50'
                }`}
              >
                <p className="font-medium text-foreground">{channel.label}</p>
              </button>
            ))}
            <p className="sm:col-span-2 lg:col-span-3 text-sm text-muted-foreground">
              Select all that apply
            </p>
          </div>
        );

      case 'problem':
        return (
          <div className="grid gap-3 sm:grid-cols-2">
            {problemOptions.map((problem) => (
              <button
                key={problem.value}
                onClick={() => updateAnswer('problem', problem.value)}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  answers.problem === problem.value ? 'border-gold bg-gold/10' : 'border-border hover:border-gold/50'
                }`}
              >
                <p className="font-medium text-foreground">{problem.label}</p>
              </button>
            ))}
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-4 max-w-md">
            <div>
              <Label htmlFor="name" className="text-foreground">Your Name (Optional)</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={answers.contactName}
                onChange={(e) => updateAnswer('contactName', e.target.value)}
                className="mt-2 bg-surface-glass border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-foreground">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@company.com"
                value={answers.contactEmail}
                onChange={(e) => updateAnswer('contactEmail', e.target.value)}
                className="mt-2 bg-surface-glass border-border text-foreground placeholder:text-muted-foreground"
              />
              <p className="text-sm text-muted-foreground mt-2">
                We&apos;ll send your full diagnostic report here.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Free Revenue Diagnostic
        </h1>
        <p className="text-lg text-muted-foreground">
          Discover where your business is leaking revenue in under 3 minutes
        </p>
      </div>

      <div className="mb-8">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Step {currentStep + 1} of {steps.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="flex justify-center gap-2 mb-8 overflow-x-auto pb-2">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
              index === currentStep
                ? 'bg-gold text-background'
                : index < currentStep
                  ? 'bg-gold/20 text-gold'
                  : 'bg-muted text-muted-foreground'
            }`}
          >
            {step.icon}
          </div>
        ))}
      </div>

      <Card className="glass-card p-6 md:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-foreground mb-2">
                {steps[currentStep].title}
              </h2>
              <p className="text-muted-foreground">
                {steps[currentStep].description}
              </p>
            </div>

            {renderStepContent()}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between mt-8 pt-6 border-t border-border">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>

          {currentStep === steps.length - 1 ? (
            <Button
              variant="gold"
              onClick={handleSubmit}
              disabled={!canProceed() || isSubmitting}
              className="gap-2"
            >
              {isSubmitting ? 'Starting Scan...' : 'Start Free Scan'}
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              variant="gold"
              onClick={handleNext}
              disabled={!canProceed()}
              className="gap-2"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};
