const BIRTH_YEAR = 2005;
const BIRTH_MONTH = 8; // August (1-12)
const BIRTH_DAY = 16;

/** Daniel's age on the given date. */
export function getAge(today: Date = new Date()): number {
  const month = today.getMonth() + 1;
  const hadBirthdayThisYear = month > BIRTH_MONTH || (month === BIRTH_MONTH && today.getDate() >= BIRTH_DAY);
  return today.getFullYear() - BIRTH_YEAR - (hadBirthdayThisYear ? 0 : 1);
}
