export interface EvidenceStat {
  value: string;
  label: string;
  source: string;
  url: string | null;
}

export const evidenceStats: EvidenceStat[] = [
  {
    value: '6 Outcomes',
    label:
      'Unconditional cash transfers improve family asset holdings, consumption, food security, psychological well-being, and female empowerment — with large spillover effects on nonrecipient households',
    source: 'Haushofer & Shapiro, Quarterly Journal of Economics (2016)',
    url: 'https://academic.oup.com/qje/article/131/4/1973/2468874',
  },
  {
    value: '$11T',
    label: 'Estimated value of unpaid care labor performed globally each year',
    source: 'World Economic Forum, The Future of the Care Economy',
    url: 'https://www.weforum.org/publications/the-future-of-the-care-economy/',
  },
  {
    value: '~3:1',
    label: 'Estimated return on investment in the care economy sector',
    source: 'World Economic Forum, The Future of the Care Economy',
    url: 'https://www.weforum.org/publications/the-future-of-the-care-economy/',
  },
  {
    value: '70%',
    label: 'of health outcomes influenced by social determinants',
    source: 'WHO Commission on Social Determinants of Health',
    url: null,
  },
  {
    value: '<5%',
    label: 'of global health funding reaches local actors directly',
    source: 'Oxfam America, Funding the Localization Agenda',
    url: 'https://www.oxfamamerica.org/explore/research-publications/funding-the-localization-agenda/',
  },
];
