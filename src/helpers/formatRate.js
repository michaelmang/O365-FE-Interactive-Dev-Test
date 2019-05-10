const formatRate = (rate='') => strToNum(rate).toFixed(3);

const strToNum = (str) => +str;

export default formatRate;
