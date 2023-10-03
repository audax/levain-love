import * as React from 'react';
import ThemeRegistry from '@/components/Theme/ThemeRegistry/ThemeRegistry';
import { Metadata } from 'next'


export const metadata: Metadata= {
  title: 'Levain Love',
  description: 'Love your levain, bake good bread',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
