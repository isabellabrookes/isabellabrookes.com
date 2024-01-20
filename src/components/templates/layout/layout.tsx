import { ReactNode } from 'react';

import { Footer } from '../footer';
import { Header } from '../header';

interface LayoutPropsInterface {
  children: ReactNode;
  mainNavigation: any;
}

export const Layout = ({ mainNavigation, children }: LayoutPropsInterface) => {
  return (
    <>
      <Header mainNavigation={mainNavigation} />
      {children}
      {/* <Footer /> */}
    </>
  );
};
