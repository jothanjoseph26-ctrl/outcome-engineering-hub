import type { Metadata } from 'next';
import { ScannerClient } from './scanner-client';

export const metadata: Metadata = {
  title: 'Free SEO Scanner | Outcome Labs',
  description: 'Scan your website for SEO issues and get a comprehensive report on how to improve your search rankings.',
};

export default function ScannerPage() {
  return <ScannerClient />;
}