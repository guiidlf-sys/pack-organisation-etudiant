// Jeu d'icônes maison (trait 1.6, 24x24, currentColor) — identité visuelle du pack.
const S = (d, extra = '') =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${d}${extra}</svg>`;

export const icons = {
  books: S(`<path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H9v16H5.5A1.5 1.5 0 0 1 4 18.5z"/><path d="M9 4h4.5A1.5 1.5 0 0 1 15 5.5v13a1.5 1.5 0 0 1-1.5 1.5H9z"/><path d="m16.4 6.3 2.6-.7 1.9 12.1-3.3.9"/>`),
  calendar: S(`<rect x="3.2" y="5" width="17.6" height="15.5" rx="2.4"/><path d="M3.2 9.8h17.6M8 3.4v3.2M16 3.4v3.2"/>`),
  pencil: S(`<path d="M15.6 4.6 19.4 8.4 8.6 19.2l-4.6.8.8-4.6z"/><path d="m13.4 6.8 3.8 3.8"/>`),
  target: S(`<circle cx="12" cy="12" r="8.2"/><circle cx="12" cy="12" r="4.4"/><circle cx="12" cy="12" r="1" fill="currentColor"/>`),
  user: S(`<circle cx="12" cy="8.2" r="3.8"/><path d="M4.8 20.2a7.4 7.4 0 0 1 14.4 0"/>`),
  grid: S(`<rect x="3.2" y="4.2" width="17.6" height="16" rx="2.2"/><path d="M3.2 9.4h17.6M9.4 9.4v10.8M15.2 9.4v10.8"/>`),
  week: S(`<rect x="3.2" y="5" width="17.6" height="15.5" rx="2.4"/><path d="M3.2 9.8h17.6M8 3.4v3.2M16 3.4v3.2"/><path d="M7 13.4h4M7 16.6h6"/>`),
  check: S(`<rect x="3.4" y="3.4" width="17.2" height="17.2" rx="4"/><path d="m7.8 12.2 2.9 2.9 5.5-6"/>`),
  bag: S(`<path d="M4 8.6h16l-1.1 10.2a2 2 0 0 1-2 1.8H7.1a2 2 0 0 1-2-1.8z"/><path d="M8.8 8.6V6.4a3.2 3.2 0 0 1 6.4 0v2.2"/>`),
  brain: S(`<path d="M12 5.2a3 3 0 0 0-5.6 1.1A2.9 2.9 0 0 0 4.6 9a2.9 2.9 0 0 0 1 2.2A3 3 0 0 0 6.9 16a3 3 0 0 0 5.1 2.1z"/><path d="M12 5.2a3 3 0 0 1 5.6 1.1A2.9 2.9 0 0 1 19.4 9a2.9 2.9 0 0 1-1 2.2 3 3 0 0 1-1.3 4.8 3 3 0 0 1-5.1 2.1z"/><path d="M12 5.2v13"/>`),
  note: S(`<path d="M6 3.6h8.4L19 8.2v12.2H6z"/><path d="M14 3.6v4.8h4.8M9 12.6h6M9 16h4"/>`),
  chart: S(`<path d="M4 19.6h16"/><rect x="5.6" y="12" width="3.4" height="6" rx="1"/><rect x="10.4" y="8" width="3.4" height="10" rx="1"/><rect x="15.2" y="4.6" width="3.4" height="13.4" rx="1"/>`),
  flame: S(`<path d="M12 3.2s5.4 4 5.4 8.6a5.4 5.4 0 0 1-10.8 0C6.6 9.4 8.4 7.6 9.4 6.6c0 2 .9 3 1.9 3 1.4 0 1.4-2.2.7-6.4z"/>`),
  cloud: S(`<path d="M7.4 18.4a4 4 0 0 1-.5-8 5.2 5.2 0 0 1 10 1.1 3.4 3.4 0 0 1-.4 6.9z"/>`),
  search: S(`<circle cx="10.8" cy="10.8" r="6.4"/><path d="m15.6 15.6 4.2 4.2"/>`),
  heart: S(`<path d="M12 20.4S3.8 15.6 3.8 9.9A4.6 4.6 0 0 1 12 7a4.6 4.6 0 0 1 8.2 2.9c0 5.7-8.2 10.5-8.2 10.5z" fill="currentColor" stroke="none"/>`),
  star: S(`<path d="m12 4 2.5 5.1 5.6.8-4 4 .9 5.6-5-2.7-5 2.7.9-5.6-4-4 5.6-.8z"/>`),
  rocket: S(`<path d="M12 3.2c3 2.6 4.5 5.9 4.5 9.5v3.1h-9v-3.1c0-3.6 1.5-6.9 4.5-9.5z"/><circle cx="12" cy="10" r="1.7"/><path d="m7.5 13.4-3 2.6v3.4l3-1.7M16.5 13.4l3 2.6v3.4l-3-1.7"/><path d="M10.4 19.6h3.2"/>`),
  trend: S(`<path d="M3.8 16.4 9.4 10.6l3.4 3.4L20.2 6.6"/><path d="M15.2 6.6h5v5"/>`),
  heartO: S(`<path d="M12 20.2S4 15.5 4 10a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.5-8 10.2-8 10.2z"/>`),
  calCheck: S(`<rect x="3.2" y="5" width="17.6" height="15.5" rx="2.4"/><path d="M3.2 9.8h17.6M8 3.4v3.2M16 3.4v3.2"/><path d="m8.6 14.8 2.3 2.3 4.5-4.6"/>`),
  more: S(`<rect x="3.4" y="3.4" width="17.2" height="17.2" rx="4.4"/><circle cx="8.2" cy="12" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="15.8" cy="12" r="1" fill="currentColor"/>`),
  alert: S(`<path d="M12 4.4 21 19.6H3z"/><path d="M12 10v4M12 16.9h.01"/>`),
  bulb: S(`<path d="M9.2 17.2a5.8 5.8 0 1 1 5.6 0v2.2H9.2z"/><path d="M10 21.4h4"/>`),
  pin: S(`<path d="M12 21.2s6.2-6 6.2-10.2a6.2 6.2 0 0 0-12.4 0C5.8 15.2 12 21.2 12 21.2z"/><circle cx="12" cy="10.8" r="2.3"/>`),
  key: S(`<circle cx="8.2" cy="12" r="4.2"/><path d="M12.4 12h7.4M17 12v3.2M14.8 12v2.4"/>`),
  help: S(`<circle cx="12" cy="12" r="8.4"/><path d="M9.8 9.6a2.3 2.3 0 0 1 4.4.8c0 1.6-2.2 1.9-2.2 3.4"/><path d="M12 17.2h.01"/>`),
  clock: S(`<circle cx="12" cy="12" r="8.4"/><path d="M12 7.4V12l3 1.8"/>`),
  party: S(`<path d="M4.4 20.2 8.8 8.6l6.4 6.4z"/><path d="M14.8 4.6v2M19.4 9.2h-2M18.4 5.6l-1.4 1.4"/>`),
  muscle: S(`<path d="M4.2 14.6c0-3 1.7-5 4.2-5 2 0 2.9 1.2 4.6 1.2 1.3 0 2-.7 3.1-.7 1.9 0 3.7 1.6 3.7 4.2s-2 4.9-5.2 4.9H8.1a3.9 3.9 0 0 1-3.9-4.6z"/><path d="M8.4 9.6 6.6 5.4"/>`),
};

export const icon = (name) => icons[name] || '';
