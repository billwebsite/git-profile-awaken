import type { CharacterProfile, ThemeConfig } from '../../domain/types.js';
import { calculateRadarPoints, renderRadarGrid, createSvgWrapper } from './svgEngine.js';
import { escapeSvgText } from '../../infrastructure/sanitizer.js';

export const buildStatusWindow = (profile: CharacterProfile, theme: ThemeConfig): string => {
  const radarRadius = 80;
  const radarCenterX = 545;
  const radarCenterY = 265;
  const radarMaxValue = 100;
  const radarValues = profile.stats.map((s) => Math.max(10, s.progress));

  const statsList = profile.stats
    .map(
      (s, i) => `
    <g transform="translate(0, ${i * 42})">
      <rect x="40" y="0" width="310" height="34" rx="6" fill="${theme.bg}" stroke="${theme.border}" stroke-width="1" opacity="${i % 2 === 0 ? 0.7 : 0.3}"/>
      <text x="55" y="22" font-size="14" font-weight="800" fill="${theme.textMuted}">${escapeSvgText(s.code)}</text>
      <text x="100" y="22" font-size="16" font-weight="900" fill="${s.color}">${escapeSvgText(s.grade)}</text>
      <text x="140" y="21" font-size="13" font-weight="700" fill="${theme.text}">${escapeSvgText(s.name)}</text>
      <text x="335" y="22" font-size="15" font-weight="800" fill="${theme.text}" text-anchor="end">${s.value}</text>
    </g>
  `,
    )
    .join('');

  const radarElements = profile.stats
    .slice(0, 6)
    .map((stat, i) => {
      const angle = (i * 60 - 90) * (Math.PI / 180);
      const cx = radarCenterX + radarRadius * Math.cos(angle);
      const cy = radarCenterY + radarRadius * Math.sin(angle);
      const tx = radarCenterX + (radarRadius + 22) * Math.cos(angle);
      const ty = radarCenterY + (radarRadius + 22) * Math.sin(angle) + 5;
      return `
      <circle cx="${cx}" cy="${cy}" r="5" fill="${stat.color}"/>
      <text x="${tx}" y="${ty}" font-size="13" font-weight="800" fill="${theme.textMuted}" text-anchor="middle">${escapeSvgText(stat.code)}</text>
    `;
    })
    .join('');

  const content = `
    <rect x="20" y="20" width="680" height="100" rx="12" fill="${theme.panel}" stroke="${theme.border}" stroke-width="2"/>
    <text x="45" y="60" font-size="34" font-weight="900" fill="${theme.primary}" letter-spacing="2">LV. ${profile.level}</text>
    <text x="195" y="52" font-size="22" font-weight="800" fill="${theme.text}">${escapeSvgText(profile.username)}</text>
    <text x="195" y="80" font-size="16" font-weight="600" fill="${theme.textMuted}">Class: <tspan fill="${theme.accent}">${escapeSvgText(profile.jobClass.name)}</tspan></text>

    <text x="670" y="55" font-size="14" font-weight="800" fill="${theme.textMuted}" text-anchor="end" letter-spacing="1">OVERALL RANK</text>
    <text x="670" y="95" font-size="44" font-weight="900" fill="${theme.rankColors[profile.rank]}" text-anchor="end" class="glow">${escapeSvgText(profile.rank)}</text>

    <rect x="45" y="105" width="630" height="4" rx="2" fill="${theme.border}"/>
    <rect x="45" y="105" width="${630 * (profile.exp / profile.nextExp)}" height="4" rx="2" fill="${theme.accent}"/>

    <rect x="20" y="140" width="350" height="320" rx="12" fill="${theme.panel}" stroke="${theme.border}"/>
    <text x="195" y="170" font-size="16" font-weight="800" fill="${theme.primary}" letter-spacing="2" text-anchor="middle">CORE ATTRIBUTES</text>
    <rect x="60" y="185" width="270" height="2" fill="${theme.border}" opacity="0.6"/>
    <g transform="translate(0, 200)">
      ${statsList}
    </g>

    <rect x="390" y="140" width="310" height="320" rx="12" fill="${theme.panel}" stroke="${theme.border}"/>
    <g transform="translate(0, 0)">
      ${renderRadarGrid(radarCenterX, radarCenterY, radarRadius, theme)}
      <polygon points="${calculateRadarPoints(radarCenterX, radarCenterY, radarRadius, radarValues, radarMaxValue)}" fill="${theme.primary}" opacity="0.3" stroke="${theme.primary}" stroke-width="2"/>
      ${radarElements}
    </g>

    <rect x="405" y="390" width="280" height="50" rx="8" fill="${theme.bg}" stroke="${theme.border}"/>
    <text x="420" y="420" font-size="13" font-weight="800" fill="${theme.textMuted}">MANA (Activity)</text>
    <rect x="535" y="411" width="130" height="10" rx="5" fill="${theme.border}"/>
    <rect x="535" y="411" width="${130 * (profile.mana / 100)}" height="10" rx="5" fill="#00a8ff" class="glow"/>
  `;
  return createSvgWrapper(720, 480, theme, content);
};

export const buildQuestWidget = (profile: CharacterProfile, theme: ThemeConfig): string => {
  const content = `
    <rect x="20" y="20" width="560" height="110" rx="12" fill="${theme.panel}" stroke="${theme.border}" stroke-width="2"/>
    <circle cx="45" cy="45" r="6" fill="${theme.rankColors[profile.quest.rank]}" class="glow"/>
    <text x="65" y="50" font-size="16" font-weight="800" fill="${theme.primary}">SYSTEM LOG: ACTIVE QUEST</text>
    <text x="560" y="50" font-size="20" font-weight="900" fill="${theme.rankColors[profile.quest.rank]}" text-anchor="end">[${escapeSvgText(profile.quest.rank)} RANK]</text>
    <text x="45" y="80" font-size="14" font-weight="600" fill="${theme.textMuted}">Target: <tspan fill="${theme.text}">${escapeSvgText(profile.quest.target)}</tspan></text>
    <text x="45" y="105" font-size="16" font-weight="700" fill="${theme.accent}">"${escapeSvgText(profile.quest.title)}"</text>
  `;
  return createSvgWrapper(600, 150, theme, content);
};

export const buildSkillWidget = (profile: CharacterProfile, theme: ThemeConfig): string => {
  const skills = profile.topLanguages
    .map(
      (lang, i) => `
    <g transform="translate(${40 + (i % 2) * 270}, ${75 + Math.floor(i / 2) * 55})">
      <rect width="250" height="42" rx="8" fill="${theme.bg}" stroke="${theme.border}"/>
      <circle cx="20" cy="21" r="6" fill="${lang.color}"/>
      <text x="35" y="26" font-size="13" font-weight="700" fill="${theme.text}">${escapeSvgText(lang.name)} Mastery</text>
      <text x="235" y="26" font-size="12" font-weight="800" fill="${theme.textMuted}" text-anchor="end">Lv.${Math.floor(lang.percent)}</text>
    </g>
  `,
    )
    .join('');

  const content = `
    <rect x="20" y="20" width="560" height="190" rx="12" fill="${theme.panel}" stroke="${theme.border}" stroke-width="2"/>
    <text x="40" y="50" font-size="16" font-weight="800" fill="${theme.primary}" letter-spacing="1">PASSIVE SKILLS</text>
    <text x="560" y="50" font-size="14" font-weight="700" fill="${theme.textMuted}" text-anchor="end">Trait: ${escapeSvgText(profile.jobClass.trait)}</text>
    ${skills}
  `;
  return createSvgWrapper(600, 230, theme, content);
};

export const buildSingleStatWidget = (profile: CharacterProfile, theme: ThemeConfig, targetCode: string | null): string => {
  const stat = profile.stats.find((s) => s.code.toLowerCase() === targetCode?.toLowerCase()) || profile.stats[0]!;
  const content = `
    <rect x="20" y="20" width="260" height="140" rx="12" fill="${theme.panel}" stroke="${theme.border}" stroke-width="2"/>
    <text x="150" y="65" font-size="38" font-weight="900" fill="${stat.color}" text-anchor="middle" class="glow">${escapeSvgText(stat.grade)}</text>
    <text x="150" y="95" font-size="15" font-weight="800" fill="${theme.text}" text-anchor="middle">${escapeSvgText(stat.name)}[${escapeSvgText(stat.code)}]</text>
    <text x="150" y="120" font-size="20" font-weight="800" fill="${theme.primary}" text-anchor="middle">${stat.value}</text>
    <rect x="50" y="135" width="200" height="6" rx="3" fill="${theme.border}"/>
    <rect x="50" y="135" width="${200 * (stat.progress / 100)}" height="6" rx="3" fill="${stat.color}" class="glow"/>
  `;
  return createSvgWrapper(300, 180, theme, content);
};

export const buildContributionWidget = (profile: CharacterProfile, theme: ThemeConfig): string => {
  const c = profile.contributions;
  const barCount = c.weeklyBreakdown.length;
  const peakWeekValue = Math.max(...c.weeklyBreakdown, 1);

  const panelX = 20;
  const panelY = 20;
  const panelW = 580;
  const innerLeft = 40;
  const innerRight = 580;
  const innerWidth = innerRight - innerLeft;

  const headerY = 52;
  const dividerY = 64;

  const statStartY = 84;
  const statRowHeight = 28;
  const statEntries = [
    { label: 'Total Contributions', value: c.totalContributions.toLocaleString() },
    { label: 'Daily Average', value: `${c.dailyAverage}/day` },
    { label: 'Current Streak', value: `${c.currentStreak} days` },
    { label: 'Longest Streak', value: `${c.longestStreak} days` },
    { label: 'Best Week', value: `${c.bestWeekCount} contributions` },
  ];

  const statsListSvg = statEntries
    .map((entry, i) => {
      const rowY = statStartY + i * statRowHeight;
      const bgOpacity = i % 2 === 0 ? 0.4 : 0;
      return `
    <g>
      ${bgOpacity > 0 ? `<rect x="${innerLeft}" y="${rowY - 14}" width="${innerWidth}" height="${statRowHeight}" rx="4" fill="${theme.bg}" opacity="${bgOpacity}"/>` : ''}
      <text x="${innerLeft + 10}" y="${rowY + 1}" font-size="13" font-weight="600" fill="${theme.textMuted}">${entry.label}</text>
      <text x="${innerRight - 10}" y="${rowY + 1}" font-size="14" font-weight="800" fill="${theme.text}" text-anchor="end">${entry.value}</text>
    </g>`;
    })
    .join('');

  const chartLabelY = statStartY + statEntries.length * statRowHeight + 14;
  const chartAreaX = innerLeft;
  const chartAreaY = chartLabelY + 14;
  const chartAreaWidth = innerWidth;
  const chartAreaHeight = 70;
  const barGap = 4;
  const totalBarSpace = chartAreaWidth - barGap * (barCount - 1);
  const barWidth = Math.max(4, Math.floor(totalBarSpace / barCount));
  const totalBarsWidth = barCount * barWidth + (barCount - 1) * barGap;
  const barsOffsetX = chartAreaX + Math.floor((chartAreaWidth - totalBarsWidth) / 2);

  const bars = c.weeklyBreakdown
    .map((weekTotal, i) => {
      const barHeight = Math.max(3, (weekTotal / peakWeekValue) * chartAreaHeight);
      const barX = barsOffsetX + i * (barWidth + barGap);
      const barY = chartAreaY + chartAreaHeight - barHeight;
      const intensity = weekTotal / peakWeekValue;
      const barOpacity = 0.25 + intensity * 0.75;
      return `<rect x="${barX}" y="${barY}" width="${barWidth}" height="${barHeight}" rx="2" fill="${theme.primary}" opacity="${barOpacity.toFixed(2)}"/>`;
    })
    .join('');

  const progressY = chartAreaY + chartAreaHeight + 22;
  const progressBarY = progressY + 12;

  const badgeW = 72;
  const badgeH = 30;
  const badgeX = innerRight - badgeW;
  const badgeY = panelY + 10;
  const badgeCenterX = badgeX + badgeW / 2;
  const badgeCenterY = badgeY + badgeH / 2;

  const widgetHeight = progressBarY + 10 + panelY + 8;

  const content = `
    <rect x="${panelX}" y="${panelY}" width="${panelW}" height="${widgetHeight - panelY * 2}" rx="12" fill="${theme.panel}" stroke="${theme.border}" stroke-width="2"/>

    <text x="${innerLeft}" y="${headerY}" font-size="16" font-weight="800" fill="${theme.primary}" letter-spacing="2">CONTRIBUTION ANALYSIS</text>

    <rect x="${badgeX}" y="${badgeY}" width="${badgeW}" height="${badgeH}" rx="6" fill="${theme.bg}" stroke="${c.gradeColor}" stroke-width="1.5"/>
    <text x="${badgeCenterX - 3}" y="${badgeCenterY + 6}" font-size="18" font-weight="900" fill="${c.gradeColor}" text-anchor="end" class="glow">${escapeSvgText(c.grade)}</text>
    <text x="${badgeCenterX + 3}" y="${badgeCenterY + 4}" font-size="10" font-weight="700" fill="${theme.textMuted}" text-anchor="start">RANK</text>

    <line x1="${innerLeft}" y1="${dividerY}" x2="${innerRight}" y2="${dividerY}" stroke="${theme.border}" stroke-width="1" opacity="0.4"/>

    ${statsListSvg}

    <text x="${innerLeft}" y="${chartLabelY}" font-size="11" font-weight="700" fill="${theme.textMuted}" letter-spacing="1">WEEKLY ACTIVITY</text>
    <text x="${innerRight}" y="${chartLabelY}" font-size="10" font-weight="600" fill="${theme.textMuted}" text-anchor="end" opacity="0.6">last ${barCount} weeks</text>
    <rect x="${chartAreaX - 4}" y="${chartAreaY - 4}" width="${chartAreaWidth + 8}" height="${chartAreaHeight + 8}" rx="6" fill="${theme.bg}" opacity="0.35"/>
    <line x1="${chartAreaX}" y1="${chartAreaY + chartAreaHeight}" x2="${chartAreaX + chartAreaWidth}" y2="${chartAreaY + chartAreaHeight}" stroke="${theme.border}" stroke-width="1" opacity="0.3"/>
    ${bars}

    <text x="${innerLeft}" y="${progressY}" font-size="10" font-weight="700" fill="${theme.textMuted}">GRADE PROGRESS</text>
    <text x="${innerRight}" y="${progressY}" font-size="10" font-weight="800" fill="${c.gradeColor}" text-anchor="end">${c.gradeProgress.toFixed(0)}%</text>
    <rect x="${innerLeft}" y="${progressBarY}" width="${innerWidth}" height="8" rx="4" fill="${theme.border}"/>
    <rect x="${innerLeft}" y="${progressBarY}" width="${innerWidth * (c.gradeProgress / 100)}" height="8" rx="4" fill="${c.gradeColor}" class="glow"/>
  `;
  return createSvgWrapper(620, widgetHeight, theme, content);
};