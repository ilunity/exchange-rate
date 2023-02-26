import dateFormat from 'dateformat';

export const formatDay = (date: Date): string => {
  return dateFormat(date, '    mmmm dS: yyyy    ');
};
