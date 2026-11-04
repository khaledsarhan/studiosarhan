import legal from '../data/legal.json';

export { legal };
export const isBusiness = legal.mode === 'business';
/**
 * The Impressum and Privacy pages are only published once the essentials are filled in:
 * personal mode needs name and town, business mode needs name and full address.
 */
export const legalReady = Boolean(
  legal.name.trim() && (isBusiness ? legal.address.trim() : (legal.town || legal.address).trim()),
);
/** Where the owner is: the full address for a business, otherwise the town. */
export const legalLocation = isBusiness ? legal.address : legal.town || legal.address;
