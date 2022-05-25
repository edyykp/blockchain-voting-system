import * as properties from './siteProperties.json';

type SiteProperties = {
  [key: string]: string;
};

export const useSiteProperties = () => {
  const siteProperties: SiteProperties = properties;

  return (key: string) =>
    key in siteProperties ? siteProperties[key] : undefined;
};
