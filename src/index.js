module.exports = function check(str, bracketsConfig) {
    const strArr = str.split('');
    const { opening, closing, similar } = bracketsConfig.reduce(
      (acc, next) => {
        const [open, close] = next;
        if (open === close) {
          acc.similar.push(open);
          return acc;
        }
  
        acc.opening.push(open);
        acc.closing.push(close);
  
        return acc;
      },
      {
        opening: [],
        closing: [],
        similar: [],
      },
    );
  
    const charsStack = [];
    const similarStats = similar.reduce((acc, next) => {
      acc[next] = 0;
      return acc;
    }, {});
  
    for (let i = 0; i < strArr.length; i++) {
      if (similar.includes(strArr[i])) {
        similarStats[strArr[i]] += 1;
        continue;
      }
  
      if (opening.includes(strArr[i])) {
        charsStack.push(strArr[i]);
        continue;
      }
  
      if (closing.indexOf(strArr[i]) > -1) {
        const index = closing.indexOf(strArr[i]);
        const openChar = opening[index];
  
        if (charsStack.pop() !== openChar) {
          return false;
        }
      } else {
        return false;
      }
    }
  
    return (
      Object.values(similarStats).every(val => val % 2 === 0) &&
      charsStack.length % 2 === 0
    );
  };
