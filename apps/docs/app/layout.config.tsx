
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import {socials} from "@prexo/utils/constants"
import Logo from '@/components/custom/logo';
/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <Logo/>
    ),
    transparentMode: 'always',
  },
  // see https://fumadocs.dev/docs/ui/navigation/links
  githubUrl: socials.github,
  
};
