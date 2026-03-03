'use client';

import { useEffect, useRef, type AnchorHTMLAttributes } from 'react';
import Link from 'next/link';
import 'glightbox/dist/css/glightbox.min.css';

const GlightBox = ({
  children,
  href,
  ...other
}: { href: string } & AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const ref = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    let instance: { destroy?: () => void } | null = null;

    if (typeof window !== 'undefined') {
      import('glightbox').then(({ default: GLightbox }) => {
        instance = GLightbox({
          selector: '.glightbox',
          openEffect: 'fade',
          closeEffect: 'fade',
        });
      });
    }

    return () => instance?.destroy?.();
  }, []);

  return (
    <Link ref={ref} href={href} {...other} className={`glightbox ${other.className ?? ''}`}>
      {children}
    </Link>
  );
};

export default GlightBox;
