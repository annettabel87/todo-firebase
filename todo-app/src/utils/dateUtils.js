import dayjs from "dayjs";

export  const checkDeadline = (date) => {
    const checkedDeadline = dayjs().isAfter(dayjs(date));
    return checkedDeadline;
  }

  export  const getNowDate = () => {    
    const format = 'YYYY-MM-DD';
    const nowDay = dayjs().format(format);
    return nowDay;
}