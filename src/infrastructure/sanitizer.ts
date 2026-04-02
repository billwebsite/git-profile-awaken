const SVG_ESCAPE_MAP: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

export const escapeSvgText = (raw: string): string =>
  raw.replace(/[&<>"']/g, (char) => SVG_ESCAPE_MAP[char] ?? char);

const GITHUB_USERNAME_PATTERN = /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/;

export const isValidGithubUsername = (input: string): boolean =>
  GITHUB_USERNAME_PATTERN.test(input);
