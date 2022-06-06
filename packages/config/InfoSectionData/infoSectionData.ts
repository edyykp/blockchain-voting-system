type InfoSectionDataType = {
  topline: string;
  heading: string;
  subtitle: string;
  theme: 'primary' | 'secondary';
  svgPath: string;
  id: string;
  href: string;
  buttonText: string;
};

export const data: InfoSectionDataType[] = [
  {
    topline: 'data and privacy protection',
    heading: 'Vote your favourite driver on the safest voting platform',
    subtitle:
      'We are proud of announcing that this platform is built using blockchain technology, becoming one of the safest voting systems against data breaches. We do not store any personal information on our databases. ',
    svgPath: '/safe.svg',
    theme: 'primary',
    id: 'about',
    href: 'https://academy.binance.com/en/articles/what-makes-a-blockchain-secure',
    buttonText: 'Find out more',
  },
  {
    topline: 'About Formula 1',
    heading: 'Chess, Padel, Golf and a bit of racing too',
    subtitle:
      'Formula 1 is a type of motorsport. Teams compete in a series of Grand Prix races, held in different countries around the world. Some of the most popular races are held in Monaco, Japan, Italy and Britain. The cars are very fast.',
    svgPath: '/car.svg',
    theme: 'secondary',
    id: 'data-protection',
    href: 'https://www.formula1.com/',
    buttonText: 'Find out more',
  },
];
