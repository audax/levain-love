import * as React from 'react';
import ThemeRegistry from '@/components/Theme/ThemeRegistry/ThemeRegistry';
import { Metadata } from 'next'


export const metadata: Metadata = {
    title: {
        template: '%s | Levain Love',
        default: 'New Recipe | Levain Love',
    },
    applicationName: 'Levain Love',
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
