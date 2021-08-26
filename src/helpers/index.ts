import formatDistance from "date-fns/formatDistance";

export const formatFromNow = (date: Date | number) =>
  formatDistance(new Date(), date);
