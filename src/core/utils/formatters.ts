export const formatShortDate = (date: Date): string => {
  return date.toLocaleDateString("es-AR");
};

export const dateRangeLabel = (start?: Date, end?: Date): string => {
  if (!start && !end) return "";
  if (start && end) return `${formatShortDate(start)} - ${formatShortDate(end)}`;
  return formatShortDate((start ?? end) as Date);
};
