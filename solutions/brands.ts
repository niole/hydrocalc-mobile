/**
 * some nutrients are liquid, others are powder
 * for the powder ones you need to know the water/powder ratio
 * ratio is always for 1 gallon
 */

const generalHydroponicsFloraSeries = [
  {
    name: 'General Hydroponics Flora Series: FloraBloom',
    ec: 19.99,
    npk: { n: 0, p: 5, k: 4 },
    tspsGallon: 768,
  },
  {
    name: 'General Hydroponics Flora Series: FloraMicro',
    ec: 19.99,
    npk: { n: 5, p: 0, k: 1 },
    tspsGallon: 768,
  },
  {
    name: 'General Hydroponics Flora Series: FloraGro',
    ec: 19.99,
    npk: { n: 2, p: 1, k: 6 },
    tspsGallon: 768,
  },
];

const generalHydroponicsMaxiSeries = [
  {
    name: 'General Hydroponics Maxi Series: MaxiGro',
    ec: 1,
    npk: { n: 2, p: 1, k: 3 },
    tspsGallon: 0.54,
  },
];

export const brands = [
  ...generalHydroponicsFloraSeries,
  ...generalHydroponicsMaxiSeries,
];
