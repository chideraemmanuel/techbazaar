const formatDate = (
  date: Date,
  locales?: Intl.LocalesArgument,
  options?: Intl.DateTimeFormatOptions
) => {
  const formatter = new Intl.DateTimeFormat(locales, options);

  return formatter.format(date);
};

export default formatDate;
