import type { ThemeConfig, RankGrade } from '../../domain/types.js';

const DEFAULT_RANK_COLORS: Record<RankGrade, string> = {
  E: '#8B949E',
  D: '#C9D1D9',
  C: '#3FB950',
  B: '#58A6FF',
  A: '#BD93F9',
  S: '#FFD700',
  SS: '#FF4500',
  SSS: '#FF003C',
  EX: '#00F0FF',
};

const buildTheme = (
  bg: string,
  panel: string,
  text: string,
  textMuted: string,
  primary: string,
  secondary: string,
  accent: string,
  border: string,
  rankOverrides: Partial<Record<RankGrade, string>> = {},
): ThemeConfig => ({
  bg,
  panel,
  text,
  textMuted,
  primary,
  secondary,
  accent,
  border,
  rankColors: { ...DEFAULT_RANK_COLORS, ...rankOverrides },
});

export const THEMES: Record<string, ThemeConfig> = {
  solo_leveling: buildTheme('#050a15', '#0a1224', '#e0e6ed', '#4b618f', '#007acc', '#004785', '#00f0ff', '#112240', { EX: '#00f0ff', SSS: '#b700ff' }),
  cyberpunk: buildTheme('#0b0f19', '#151b2b', '#ffffff', '#6e7a9e', '#00f0ff', '#ff003c', '#fcee0a', '#252e46'),
  dracula: buildTheme('#282a36', '#383a59', '#f8f8f2', '#6272a4', '#bd93f9', '#ff79c6', '#50fa7b', '#44475a'),
  tokyonight: buildTheme('#1a1b26', '#24283b', '#c0caf5', '#565f89', '#7aa2f7', '#bb9af7', '#9ece6a', '#414868'),
  monokai: buildTheme('#2d2a2e', '#403e41', '#fcfcfa', '#939293', '#ffd866', '#ff6188', '#a9dc76', '#5b595c'),
  gruvbox: buildTheme('#282828', '#3c3836', '#ebdbb2', '#a89984', '#fe8019', '#fb4934', '#b8bb26', '#504945'),
  nord: buildTheme('#2e3440', '#3b4252', '#eceff4', '#d8dee9', '#88c0d0', '#5e81ac', '#a3be8c', '#4c566a'),
  synthwave: buildTheme('#262335', '#34294f', '#f0f0f0', '#8a889d', '#ff7edb', '#fe4a90', '#f97e72', '#493e6f'),
  matrix: buildTheme('#000000', '#001100', '#00ff00', '#008800', '#00ff00', '#004400', '#ffffff', '#003300', { E: '#004400', D: '#006600', C: '#008800', B: '#00aa00', A: '#00cc00', S: '#00ee00', SS: '#00ff00', SSS: '#ccff00', EX: '#ffffff' }),
  hollow_knight: buildTheme('#1a1c23', '#242730', '#d8d9da', '#747781', '#9ab3c5', '#51657c', '#ffffff', '#313642'),
  genshin_anemo: buildTheme('#1c2e36', '#263b45', '#f0f5f5', '#87a8a6', '#69e1c3', '#399f8c', '#ffe699', '#3a545e'),
  genshin_geo: buildTheme('#2b251f', '#3d342b', '#f5ebd9', '#a3937d', '#fec75a', '#b58636', '#ffffff', '#5c4e40'),
  genshin_electro: buildTheme('#211930', '#322647', '#efeaf5', '#8c7d9c', '#c780ff', '#854eb2', '#ffcc32', '#4b3a69'),
  elden_ring: buildTheme('#14120f', '#211d18', '#dfd3c3', '#857b6f', '#cda662', '#8c6b36', '#ffffff', '#3b342b'),
  nier: buildTheme('#d1cdc7', '#e3e0db', '#4a4846', '#87847f', '#5e5c58', '#383735', '#8f2e2e', '#b8b4ad'),
  bloodborne: buildTheme('#100b0b', '#1c1515', '#d4c4c4', '#756363', '#a83232', '#6b1c1c', '#e6e6e6', '#332626'),
  valorant: buildTheme('#0f1923', '#1b2733', '#ece8e1', '#76808c', '#ff4655', '#bd3944', '#0f1923', '#2b3947'),
  hextech: buildTheme('#091428', '#0a1e3f', '#f0e6d2', '#8b9bb4', '#c89b3c', '#005a82', '#0ac8b9', '#1e3656'),
  retrowave: buildTheme('#190724', '#2d1140', '#ffe6ff', '#a472ba', '#f9a826', '#ff2a6d', '#05d9e8', '#4d206b'),
  abyssal: buildTheme('#030b14', '#071626', '#c2d1e0', '#42678c', '#00b4d8', '#0077b6', '#90e0ef', '#132b45'),
  infernal: buildTheme('#120404', '#210b0b', '#ffcccc', '#994c4c', '#ff3333', '#b30000', '#ff9933', '#3d1414'),
};

export const AVAILABLE_THEME_NAMES = Object.keys(THEMES);

export const resolveTheme = (themeName: string | null): ThemeConfig =>
  THEMES[themeName || 'solo_leveling'] || THEMES['solo_leveling']!;
