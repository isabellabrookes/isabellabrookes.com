import { useContentfulLiveUpdates } from '@contentful/live-preview/react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';

import { CtfRichText } from '@src/components/features/contentful';
import { SeoFields } from '@src/components/features/seo';
import { Container } from '@src/components/shared/container';
import { Layout } from '@src/components/templates/layout';
import { client, previewClient } from '@src/lib/client';
import { revalidateDuration } from '@src/pages/utils/constants';
import { getServerSideTranslations } from '@src/pages/utils/get-serverside-translations';

const Page = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const page = useContentfulLiveUpdates(props.page);
  const mainNavigation = useContentfulLiveUpdates(props.mainNavigation);

  return (
    <Layout mainNavigation={mainNavigation}>
      {page.seoFields && <SeoFields {...page.seoFields} />}
      <Container>
        <CtfRichText json={page.content.json} links={page.links} />
      </Container>
      <Container>THIS IS ANOTHER CONTAINER</Container>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale, draftMode: preview }) => {
  try {
    const gqlClient = preview ? previewClient : client;

    const landingPageData = await gqlClient.pageLanding({ locale, preview });
    const page = landingPageData.pageLandingCollection?.items[0];

    const mainNaigationData = await gqlClient.mainNavigation({ locale, preview });
    const mainNavigation = mainNaigationData.mainNavigationCollection?.items[0];

    if (!page) {
      return {
        revalidate: revalidateDuration,
        notFound: true,
      };
    }

    return {
      revalidate: revalidateDuration,
      props: {
        previewActive: !!preview,
        ...(await getServerSideTranslations(locale)),
        page,
        mainNavigation,
      },
    };
  } catch {
    return {
      revalidate: revalidateDuration,
      notFound: true,
    };
  }
};

export default Page;
