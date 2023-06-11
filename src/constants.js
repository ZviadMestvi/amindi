import sun from './assets/icons/sun.svg';
import partlyCloudy from './assets/icons/partly-cloudy.svg';
import overcast from './assets/icons/overcast.svg';
import mainlyClear from './assets/icons/mainly-clear.svg';
import fog from './assets/icons/fog.svg';
import rimeFog from './assets/icons/rime-fog.svg';
import lightDrizzle from './assets/icons/light-drizzle.svg';
import midDrizzle from './assets/icons/mid-drizzle.svg';
import heavyDrizzle from './assets/icons/heavy-drizzle.svg';
import lightFreezingDrizzle from './assets/icons/light-freezing-drizzle.svg';
import heavyFreezingDrizzle from './assets/icons/heavy-freezing-drizzle.svg';
import slightRain from './assets/icons/slight-rain.svg';
import midRain from './assets/icons/mid-rain.svg';
import heavyRain from './assets/icons/heavy-rain.svg';
import lightFreezingRain from './assets/icons/light-freezing-rain.svg';
import heavyFreezingRain from './assets/icons/heavy-freezing-rain.svg';
import slightSnow from './assets/icons/slight-snow.svg';
import midSnow from './assets/icons/mid-snow.svg';
import heavySnow from './assets/icons/heavy-snow.svg';
import snowGrains from './assets/icons/snow-grains.svg';
import slightRainShower from './assets/icons/slight-rain-shower.svg';
import midRainShower from './assets/icons/mid-rain-shower.svg';
import violentRainShower from './assets/icons/violent-rain-shower.svg';
import slightSnowShower from './assets/icons/slight-snow-shower.svg';
import heavySnowShower from './assets/icons/heavy-snow-shower.svg';
import thunder from './assets/icons/thunder.svg';
import slightHail from './assets/icons/slight-hail.svg';
import heavyHail from './assets/icons/heavy-hail.svg';

export const DAYS_SHORT = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
export const MONTHS_SHORT = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec',
];

export const WEATHER_OPTIONS = [
  { id: 0, name: 'hourly', detail: '48 hours' },
  { id: 1, name: 'daily', detail: '7 days' },
  { id: 2, name: 'weekly', detail: '2 weeks' },
  { id: 3, name: 'monthly', detail: '16 days (max)' },
];

export const WEATHER_CODES = [
  { id: 0, src: sun, alt: 'Sun' },
  { id: 1, src: mainlyClear, alt: 'Mainly clear' },
  { id: 2, src: partlyCloudy, alt: 'Partly cloudy' },
  { id: 3, src: overcast, alt: 'Overcast' },
  { id: 45, src: fog, alt: 'Fog' },
  { id: 48, src: rimeFog, alt: 'Rime fog' },
  { id: 51, src: lightDrizzle, alt: 'Light drizzle' },
  { id: 53, src: midDrizzle, alt: 'Moderate drizzle' },
  { id: 55, src: heavyDrizzle, alt: 'Heavy drizzle' },
  { id: 56, src: lightFreezingDrizzle, alt: 'Light freezing drizzle' },
  { id: 57, src: heavyFreezingDrizzle, alt: 'Heavy freezing drizzle' },
  { id: 61, src: slightRain, alt: 'Slight rain' },
  { id: 63, src: midRain, alt: 'Moderate rain' },
  { id: 65, src: heavyRain, alt: 'Heavy rain' },
  { id: 66, src: lightFreezingRain, alt: 'Light freezing rain' },
  { id: 67, src: heavyFreezingRain, alt: 'Heavy freezing rain' },
  { id: 71, src: slightSnow, alt: 'Slight snow' },
  { id: 73, src: midSnow, alt: 'Moderate snow' },
  { id: 75, src: heavySnow, alt: 'Heavy snow' },
  { id: 77, src: snowGrains, alt: 'Snow grains' },
  { id: 80, src: slightRainShower, alt: 'Slight rain shower' },
  { id: 81, src: midRainShower, alt: 'Moderate rain shower' },
  { id: 82, src: violentRainShower, alt: 'Violent rain shower' },
  { id: 85, src: slightSnowShower, alt: 'Slight snow shower' },
  { id: 86, src: heavySnowShower, alt: 'Heavy snow shower' },
  { id: 95, src: thunder, alt: 'Thunderstorm' },
  { id: 96, src: slightHail, alt: 'Slight hail' },
  { id: 99, src: heavyHail, alt: 'Heavy hail' },
];
