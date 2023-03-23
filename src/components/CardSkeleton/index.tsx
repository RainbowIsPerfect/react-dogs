import ContentLoader from 'react-content-loader';

export const CardSkeleton = () => (
  <ContentLoader
    speed={0.5}
    viewBox="0 0 380 500"
    backgroundColor="var(--color-elements-bg)"
    foregroundColor="var(--color-secondary-bg)"
  >
    <rect x="78" y="327" rx="0" ry="0" width="1" height="0" />
    <rect x="0" y="1" rx="0" ry="0" width="380" height="310" />
    <rect x="12" y="450" rx="2" ry="2" width="355" height="40" />
    <rect x="12" y="400" rx="2" ry="2" width="300" height="30" />
    <rect x="12" y="370" rx="2" ry="2" width="60" height="20" />
    <rect x="12" y="330" rx="2" ry="2" width="70" height="30" />
  </ContentLoader>
);
