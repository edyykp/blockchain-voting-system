import * as properties from './siteProperties.json';

type SiteProperties = {
  [key: string]: string;
};

export const useSiteProperties = () => {
  const siteProperties: SiteProperties = properties;

  return (key: string, args?: string[]) => {
    const isKeyFound = key in siteProperties;
    if (!isKeyFound) {
      return undefined;
    }

    if (!args) {
      return siteProperties[key];
    }

    let string = siteProperties[key];

    for (let arg of args) {
      string = string.replace('%s', arg);
    }

    return string;
  };
};
