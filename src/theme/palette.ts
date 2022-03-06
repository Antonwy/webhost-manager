import { alpha } from '@mui/material/styles';
import {
  PaletteOptions,
  SimplePaletteColorOptions,
} from '@mui/material/styles/createPalette';

const createGradient = (color1: string, color2: string) => {
  return `linear-gradient(to bottom, ${color1}, ${color2})`;
};

// SETUP COLORS
const PRIMARY: SimplePaletteColorOptions = {
  lighter: 'red',
  light: '#9A7CF3',
  main: '#7f5af0',
  dark: '#7352DA',
  darker: 'red',
};
const SECONDARY: SimplePaletteColorOptions = {
  lighter: 'green',
  light: '#30C587',
  main: '#2cb67d',
  dark: '#28A470',
  darker: 'green',
};
const INFO: SimplePaletteColorOptions = {
  lighter: '#D0F2FF',
  light: '#74CAFF',
  main: '#1890FF',
  dark: '#0C53B7',
  darker: '#04297A',
};
const SUCCESS: SimplePaletteColorOptions = {
  lighter: 'green',
  light: '#30C587',
  main: '#2cb67d',
  dark: '#28A470',
  darker: 'green',
};
const WARNING: SimplePaletteColorOptions = {
  lighter: '#FFF7CD',
  light: '#fff64f',
  main: '#FCAF58',
  dark: '#c79400',
  darker: '#7A4F01',
};
const ERROR: SimplePaletteColorOptions = {
  lighter: '#FFE7D9',
  light: '#ff616f',
  main: '#FF4252',
  dark: '#c4001d',
  darker: '#7A0C2E',
};

const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
  500_8: alpha('#919EAB', 0.08),
  500_12: alpha('#919EAB', 0.12),
  500_16: alpha('#919EAB', 0.16),
  500_24: alpha('#919EAB', 0.24),
  500_32: alpha('#919EAB', 0.32),
  500_48: alpha('#919EAB', 0.48),
  500_56: alpha('#919EAB', 0.56),
  500_80: alpha('#919EAB', 0.8),
};

const GRADIENTS = {
  primary: createGradient(PRIMARY.light!, PRIMARY.main),
  info: createGradient(INFO.light!, INFO.main),
  success: createGradient(SUCCESS.light!, SUCCESS.main),
  warning: createGradient(WARNING.light!, WARNING.main),
  error: createGradient(ERROR.light!, ERROR.main),
};

const CHART_COLORS = {
  violet: ['#826AF9', '#9E86FF', '#D0AEFF', '#F7D2FF'],
  blue: ['#2D99FF', '#83CFFF', '#A5F3FF', '#CCFAFF'],
  green: ['#2CD9C5', '#60F1C8', '#A4F7CC', '#C0F2DC'],
  yellow: ['#FFE700', '#FFEF5A', '#FFF7AE', '#FFF3D6'],
  red: ['#FF6C40', '#FF8F6D', '#FFBD98', '#FFF2D4'],
};

const COMMON = {
  common: { black: '#263238', white: '#fff' },
  primary: { ...PRIMARY, contrastText: '#fff' },
  secondary: { ...SECONDARY, contrastText: '#fff' },
  info: { ...INFO, contrastText: '#fff' },
  success: { ...SUCCESS, contrastText: GREY[800] },
  warning: { ...WARNING, contrastText: GREY[800] },
  error: { ...ERROR, contrastText: '#fff' },
  grey: GREY,
  gradients: GRADIENTS,
  chart: CHART_COLORS,
  divider: GREY[500_24],
  action: {
    hover: GREY[500_8],
    selected: GREY[500_16],
    disabled: GREY[500_80],
    disabledBackground: GREY[500_24],
    focus: GREY[500_24],
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

export type PaletteKey = keyof PaletteOptions;
const palette: {
  light: PaletteOptions;
  dark: PaletteOptions;
} = {
  light: {
    ...COMMON,
    mode: 'light',
    text: { primary: GREY[800], secondary: GREY[600], disabled: GREY[500] },
    background: { paper: '#fff', default: '#fff', neutral: GREY[200] },
    action: { active: GREY[600], ...COMMON },
  },
  dark: {
    ...COMMON,
    mode: 'dark',
    text: { primary: '#fff', secondary: GREY[500], disabled: GREY[600] },
    background: { paper: GREY[800], default: GREY[900], neutral: GREY[500_16] },
    action: { active: GREY[500], ...COMMON },
  },
};

export default palette;
