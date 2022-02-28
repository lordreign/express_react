exports.paginate = (query, { page, pageSize }) => {
  const offset = (page - 1) * pageSize;
  const limit = pageSize;

  return {
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    ...query,
    offset,
    limit,
  };
};
