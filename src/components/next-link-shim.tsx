import NextLink from 'next/link';
import { useRouter, usePathname, useParams } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export function Link({ href, ...props }: LinkProps) {
  return <NextLink href={href} {...props} />;
}

export { useRouter, usePathname, useParams, useSearchParams };

export function Navigate({ href, ...props }: LinkProps) {
  return <NextLink href={href} {...props} />;
}

export default Link;