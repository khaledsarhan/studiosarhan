import legal from '../data/legal.json';

export { legal };
/** The Impressum and Privacy pages are only published once the essentials are filled in. */
export const legalReady = Boolean(legal.name.trim() && legal.address.trim());
