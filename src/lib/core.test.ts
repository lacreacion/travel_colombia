import { describe, expect, it } from 'vitest';
import { hashPassword, verifyPassword } from './passwords';
import { filterServicesByCategory, normalizeCatalogValue } from './serviceFilters';

const sampleServices = [
  { id: 1, category: 'hoteles', tag: 'Top 1 Hotel' },
  { id: 2, category: 'restaurantes', tag: 'Música en Vivo' },
  { id: 3, category: 'sitios_historicos', tag: 'Patrimonio' },
  { id: 4, category: 'geniales', tag: 'Bar Genial' },
];

describe('filterServicesByCategory', () => {
  it('matches category aliases regardless of case or accents', () => {
    expect(filterServicesByCategory(sampleServices, 'HOTEL').map(({ id }) => id)).toEqual([1]);
    expect(filterServicesByCategory(sampleServices, 'restaurante').map(({ id }) => id)).toEqual([2]);
    expect(filterServicesByCategory(sampleServices, 'SITIOS HISTÓRICOS').map(({ id }) => id)).toEqual([3]);
  });

  it('returns every item when no category is selected', () => {
    expect(filterServicesByCategory(sampleServices, '')).toEqual(sampleServices);
  });

  it('normalizes accented destination names', () => {
    expect(normalizeCatalogValue('Bogotá')).toBe('bogota');
  });
});

describe('password hashing', () => {
  it('stores a salted hash and verifies only the matching password', async () => {
    const storedHash = await hashPassword('Colombia2026!');

    expect(storedHash).toMatch(/^scrypt\$32768\$/);
    expect(storedHash).not.toContain('Colombia2026!');
    await expect(verifyPassword('Colombia2026!', storedHash)).resolves.toBe(true);
    await expect(verifyPassword('incorrecta', storedHash)).resolves.toBe(false);
  });

  it('supports legacy plaintext verification for one-time migration', async () => {
    await expect(verifyPassword('Legacy2026!', 'Legacy2026!')).resolves.toBe(true);
    await expect(verifyPassword('other', 'Legacy2026!')).resolves.toBe(false);
    await expect(verifyPassword('other', null)).resolves.toBe(false);
  });
});
