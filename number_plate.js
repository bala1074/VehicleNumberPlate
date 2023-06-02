const PLATE = "KA01JW";
const EndsWith = [4, 5, 6];
const NumbersSum = [2]; // DOB = 08/07/1994, Life Path Number: 8+7+1+9+9+9+4 => 2 | Main Planet Number => 8
const ExcludeNumbersSum = [];
const ExcludeNums = [3, 7, 8, 9];
const StartRange = 0; //0
const EndRange = 9999; //9999

function digSum(num) {
  if (num % 10 == num) return num;
  return (num % 10) + digSum(parseInt(num / 10));
}

function singleDig(num) {
  if (num % 10 == num) return num;
  return singleDig(digSum(num));
}

function plateValue(str) {
  str = str.toLowerCase();
  const charMap = {
    aijqy: 1,
    bkr: 2,
    cgls: 3,
    dmt: 4,
    ehnx: 5,
    uvw: 6,
    oz: 7,
    fp: 8,
  };
  let sum = 0;
  for (let ch of str.split("")) {
    if (ch >= "a" && ch <= "z") {
      for (let key of Object.keys(charMap)) {
        if (key.includes(ch)) sum += charMap[key];
      }
    } else sum += parseInt(ch);
  }
  return sum;
}
//console.log(plateValue("AP9UL9902"));

function doit() {
  const BothNumberAndPlateValues = [];
  const OnlyNumberValues = [];
  for (let num1 = 0; num1 <= 9; num1++) {
    for (let num2 = 0; num2 <= 9; num2++) {
      for (let num3 = 0; num3 <= 9; num3++) {
        for (let ends of EndsWith) {
          let num = parseInt(num1 + "" + num2 + "" + num3 + "" + ends);
          if (
            ExcludeNums.includes(num1) ||
            ExcludeNums.includes(num2) ||
            ExcludeNums.includes(num3)
          )
            continue;

          if (StartRange <= num && num <= EndRange) {
            if (
              !ExcludeNumbersSum.includes(singleDig(num)) &&
              NumbersSum.includes(singleDig(num))
            ) {
              let PlateNum = PLATE + num;
              if (
                !ExcludeNumbersSum.includes(singleDig(num)) &&
                NumbersSum.includes(singleDig(plateValue(PlateNum)))
              )
                BothNumberAndPlateValues.push(PlateNum);
              else OnlyNumberValues.push(num);
            }
          } else {
            break;
          }
        }
      }
    }
  }

  console.log("OnlyNumberValues count is " + OnlyNumberValues.length);
  for (let both of OnlyNumberValues) console.log(both);

  console.log(
    "BothNumberAndPlateValues count is " + BothNumberAndPlateValues.length
  );
  for (let both of BothNumberAndPlateValues) console.log(both);
}

doit();
