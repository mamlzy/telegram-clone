import type { PaginationRes } from '../types/index.js';

export const prismaWhereContains = <T>(field: keyof T, value?: string) => {
  return value
    ? {
        [field]: {
          contains: value,
        },
      }
    : {};
};

export const prismaWhereEquals = <T>(
  field: keyof T,
  value?: string | number
) => {
  return value
    ? {
        [field]: {
          equals: value,
        },
      }
    : {};
};

export const prismaCreatePagination = ({
  page,
  limit,
  totalCount,
}: {
  page: number;
  limit: number;
  totalCount: number;
}): PaginationRes => {
  const pageCount = Math.ceil(totalCount / limit);

  const isFirstPage = page === 1;
  const isLastPage = page === pageCount;
  const currentPage = page;
  const previousPage = page > 1 ? page - 1 : null;
  const nextPage = page < pageCount ? page + 1 : null;

  return {
    isFirstPage,
    isLastPage,
    currentPage,
    previousPage,
    nextPage,
    totalCount,
    pageCount,
  };
};
