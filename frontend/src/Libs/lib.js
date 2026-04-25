import moment from "moment";

export const timeFormatter = (time) => {
  return moment(time).format("DD MMM YYYY");
};
