import Link from 'next/link';

import { Container } from '@src/components/shared/container';
import { MainNavigation } from '@src/lib/__generated/sdk';

export const Header = ({ mainNavigation }: { mainNavigation: MainNavigation }) => {
  return (
    <header className="py-5">
      <nav>
        <Container className="flex items-center gap-4">
          {mainNavigation?.subNavCollection?.items?.map(item => (
            <Link key={item?.label} href={item?.link || ''} title={item?.label || ''}>
              {item?.label}
            </Link>
          ))}
        </Container>
      </nav>
    </header>
  );
};
