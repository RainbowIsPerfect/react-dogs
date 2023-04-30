import ContentLoader from 'react-content-loader';

export const CardSkeleton = () => (
  <ContentLoader
    speed={0.5}
    viewBox="0 0 300 357"
    height={357}
    backgroundColor="var(--color-elements-bg)"
    foregroundColor="var(--color-secondary-bg)"
  >
    <rect x="78" y="327" rx="0" ry="0" width="1" height="0" />
    <rect x="5" y="0" rx="0" ry="0" width="358" height="230" />
    <rect x="16" y="275" rx="0" ry="0" width="63" height="30" />
    <rect x="15" y="242" rx="0" ry="0" width="280" height="24" />
    <rect x="15" y="313" rx="0" ry="0" width="158" height="36" />
  </ContentLoader>
);
