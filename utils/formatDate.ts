import moment from "moment";

// Tipado para TypeScript
const formatDate = (date: Date | string): string => {
  return moment(date).format("DD/MM/YYYY");
};

export default formatDate;

