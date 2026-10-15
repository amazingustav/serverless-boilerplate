export const paginate = <T>(items: T[], page: number, pageSize: number) => {
  const start = page * pageSize;
  const end = start + pageSize + 1;

  return {
    items: items.slice(start, end),
    totalPages: items.length / pageSize,
    hasNext: end < items.length,
  };
};
