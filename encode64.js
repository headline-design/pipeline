function encodeUint64(dec) {
  let binString = convertToBinary(dec)

  while (true) {
    if (binString.length < 64) {
      binString = "0" + binString
    }
    else {
      break
    }
  }

  //console.log(binString)
  let array = []

  for (let i = 0; i < 64; i += 8) {
    let piece = binString.slice(i, i + 8)
    //console.log(piece)
    //console.log(binString)
    array.push(parseInt(piece, 2))
  }

  return Uint8Array.from(array)

}

function convertToBinary (number) {
  let num = number;
  let binary = (num % 2).toString();
  for (; num > 1; ) {
      num = parseInt(num / 2);
      binary =  (num % 2) + (binary);
  }
  return binary
}

//console.log(encodeUint64(1234567))

window.encodeUint64 = encodeUint64

export default encodeUint64
