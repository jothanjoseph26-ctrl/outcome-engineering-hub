export const SCORING_RULE_VERSION = '1.0.0';

export interface ScanAnswers {
  goal: string;
  businessType: string;
  budget: string;
  channels: string[];
  problem: string;
}

export interface EvidenceData {
  finalUrl: string;
  httpStatus: number;
  redirectInfo: string | null;
  title: string;
  metaDescription: string;
  hasAnalytics: boolean;
  analyticsType: string[];
  hasForms: boolean;
  formsCount: number;
  hasCTAs: boolean;
  ctasCount: number;
  hasWhatsApp: boolean;
  hasSSL: boolean;
  hasViewport: boolean;
  hasStructuredData: boolean;
  loadTimeMs: number;
  imagesCount: number;
  imagesWithAltCount: number;
}

export interface FetchError {
  type: 'network' | 'timeout' | 'dns' | 'ssl' | 'http' | 'parse' | 'unknown';
  message: string;
  statusCode?: number;
  url?: string;
}

export function normalizeUrl(url: string): string {
  let urlString = url.trim();
  if (!urlString.startsWith('http://') && !urlString.startsWith('https://')) {
    urlString = 'https://' + urlString;
  }
  return urlString;
}

export function validateUrl(urlString: string): { valid: boolean; error?: string } {
  try {
    const url = new URL(urlString);
    if (!url.hostname || url.hostname === '.' || url.hostname.includes('..')) {
      return { valid: false, error: 'Invalid website hostname' };
    }
    return { valid: true };
  } catch {
    return { valid: false, error: 'Invalid website URL format' };
  }
}

export function detectAnalyticsType(html: string): string[] {
  const types: string[] = [];
  const lowerHtml = html.toLowerCase();

  if (lowerHtml.includes('google-analytics.com') || 
      lowerHtml.includes('gtag') ||
      lowerHtml.includes('ga.js') ||
      lowerHtml.includes('analytics.js') ||
      lowerHtml.includes('_ga')) {
    types.push('google-analytics');
  }

  if (lowerHtml.includes('googletagmanager.com') || lowerHtml.includes('gtm.js')) {
    types.push('google-tag-manager');
  }

  if (lowerHtml.includes('connect.facebook.net') ||
      lowerHtml.includes('fbq(') ||
      lowerHtml.includes('facebook.com/tr') ||
      lowerHtml.includes('fbevents.js')) {
    types.push('meta-pixel');
  }

  if (lowerHtml.includes('hotjar') || lowerHtml.includes('hj.')) {
    types.push('hotjar');
  }

  if (lowerHtml.includes('mixpanel') || lowerHtml.includes('mp.') || lowerHtml.includes('mxpnl')) {
    types.push('mixpanel');
  }

  if (lowerHtml.includes('segment.io') || lowerHtml.includes('segment.com') || lowerHtml.includes('analytics.js')) {
    types.push('segment');
  }

  return types;
}

export function parseHtmlEvidence(html: string, baseUrl: string): Partial<EvidenceData> {
  const lowerHtml = html.toLowerCase();

  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : '';

  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
  const metaDescription = descMatch ? descMatch[1].trim() : '';

  const formMatches = html.match(/<form/gi);
  const formsCount = formMatches ? formMatches.length : 0;

  const ctaKeywords = ['buy', 'shop', 'get started', 'sign up', 'subscribe', 'book', 'contact', 'order', 'add to cart', 'learn more', 'download', 'register'];
  const ctasCount = ctaKeywords.reduce((count, keyword) => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
    const matches = html.match(regex);
    return count + (matches ? matches.length : 0);
  }, 0);

  const hasWhatsApp = lowerHtml.includes('wa.me') ||
                      lowerHtml.includes('whatsapp.com') ||
                      lowerHtml.includes('api.whatsapp') ||
                      lowerHtml.includes('wa://');

  const hasSSL = baseUrl.startsWith('https://');

  const hasViewport = lowerHtml.includes('viewport');

  const hasStructuredData = lowerHtml.includes('application/ld+json') ||
                             lowerHtml.includes('itemtype=') ||
                             lowerHtml.includes('schema.org');

  const imgMatches = html.match(/<img/gi);
  const imagesCount = imgMatches ? imgMatches.length : 0;
  const imgWithAltMatches = html.match(/<img[^>]*alt=["'][^"']+["']/gi);
  const imagesWithAltCount = imgWithAltMatches ? imgWithAltMatches.length : 0;

  const analyticsTypes = detectAnalyticsType(html);

  return {
    title,
    metaDescription,
    formsCount,
    hasForms: formsCount > 0,
    ctasCount,
    hasCTAs: ctasCount > 0,
    hasWhatsApp,
    hasSSL,
    hasViewport,
    hasStructuredData,
    imagesCount,
    imagesWithAltCount,
    hasAnalytics: analyticsTypes.length > 0,
    analyticsType: analyticsTypes,
  };
}

export async function fetchWebsite(urlString: string): Promise<{ html: string; evidence: EvidenceData } | { error: FetchError }> {
  const normalizedUrl = normalizeUrl(urlString);
  const urlValidation = validateUrl(normalizedUrl);
  if (!urlValidation.valid) {
    return { error: { type: 'dns', message: urlValidation.error || 'Invalid URL', url: urlString } };
  }

  const startTime = Date.now();

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    const response = await fetch(normalizedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; OutcomeLabsBot/1.0)',
      },
      redirect: 'follow',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const html = await response.text();
    const loadTimeMs = Date.now() - startTime;

    if (!response.ok && response.status >= 400) {
      const evidence: EvidenceData = {
        finalUrl: response.url,
        httpStatus: response.status,
        redirectInfo: response.url !== normalizedUrl ? `${normalizedUrl} -> ${response.url}` : null,
        title: '',
        metaDescription: '',
        hasAnalytics: false,
        analyticsType: [],
        hasForms: false,
        formsCount: 0,
        hasCTAs: false,
        ctasCount: 0,
        hasWhatsApp: false,
        hasSSL: normalizedUrl.startsWith('https://'),
        hasViewport: false,
        hasStructuredData: false,
        loadTimeMs,
        imagesCount: 0,
        imagesWithAltCount: 0,
      };
      return { html: '', evidence };
    }

    const parsedEvidence = parseHtmlEvidence(html, normalizedUrl);

    const evidence: EvidenceData = {
      finalUrl: response.url,
      httpStatus: response.status,
      redirectInfo: response.url !== normalizedUrl ? `${normalizedUrl} -> ${response.url}` : null,
      title: parsedEvidence.title || '',
      metaDescription: parsedEvidence.metaDescription || '',
      hasAnalytics: parsedEvidence.hasAnalytics || false,
      analyticsType: parsedEvidence.analyticsType || [],
      hasForms: parsedEvidence.hasForms || false,
      formsCount: parsedEvidence.formsCount || 0,
      hasCTAs: parsedEvidence.hasCTAs || false,
      ctasCount: parsedEvidence.ctasCount || 0,
      hasWhatsApp: parsedEvidence.hasWhatsApp || false,
      hasSSL: parsedEvidence.hasSSL || false,
      hasViewport: parsedEvidence.hasViewport || false,
      hasStructuredData: parsedEvidence.hasStructuredData || false,
      loadTimeMs,
      imagesCount: parsedEvidence.imagesCount || 0,
      imagesWithAltCount: parsedEvidence.imagesWithAltCount || 0,
    };

    return { html, evidence };

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    let errorType: FetchError['type'] = 'unknown';
    if (error instanceof DOMException && error.name === 'AbortError') {
      errorType = 'timeout';
    } else if (errorMessage.includes('ENOTFOUND') || errorMessage.includes('DNS')) {
      errorType = 'dns';
    } else if (errorMessage.includes('ECONNREFUSED')) {
      errorType = 'network';
    } else if (errorMessage.includes('SSL') || errorMessage.includes('certificate')) {
      errorType = 'ssl';
    }

    return { error: { type: errorType, message: errorMessage, url: urlString } };
  }
}

export function classifyFetchResult(
  result: { html: string; evidence: EvidenceData } | { error: FetchError }
): { failed: boolean; evidence: EvidenceData } {
  if ('error' in result) {
    const errorEvidence: EvidenceData = {
      finalUrl: result.error.url || '',
      httpStatus: 0,
      redirectInfo: `Error: ${result.error.type} - ${result.error.message}`,
      title: '',
      metaDescription: '',
      hasAnalytics: false,
      analyticsType: [],
      hasForms: false,
      formsCount: 0,
      hasCTAs: false,
      ctasCount: 0,
      hasWhatsApp: false,
      hasSSL: false,
      hasViewport: false,
      hasStructuredData: false,
      loadTimeMs: 0,
      imagesCount: 0,
      imagesWithAltCount: 0,
    };
    return { failed: true, evidence: errorEvidence };
  }

  return { failed: result.evidence.httpStatus >= 400, evidence: result.evidence };
}