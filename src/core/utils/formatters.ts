export const formatShortDate = (date: Date): string => {
  return date.toLocaleDateString("es-AR");
};

export const dateRangeLabel = (start?: Date, end?: Date): string => {
  if (!start && !end) return "";
  if (start && end) return `${formatShortDate(start)} - ${formatShortDate(end)}`;
  return formatShortDate((start ?? end) as Date);
};

export const normalizeCreatedAt = (input: unknown): string | null => {
  if (!input) return null;

  const date =
    input instanceof Date ? input : new Date(String(input));

  if (isNaN(date.getTime())) return null;

  return date.toISOString();
}