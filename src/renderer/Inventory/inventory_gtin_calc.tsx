
const parseGS1 = (data: any) => {
  data = data.trim().split(' ');
  let gs_dt = {
    '01' : ['GTIN', 14],
    '10' : ['Batch/Lot Number', null],
    '11' : ['Production Date', 6],  
    '15' : ['Best Before', 6],  
    '17' : ['Expiration Date', 6],
    '21' : ['Serial Number', null]
  };
  // console.log(data);
  let ret_dt = {};
  for (let i = 0; i < data.length; i++) {
    let tmp = data[i];
    while (tmp.length > 2) {
      let AI = tmp.substring(0,2);
      let type = [null, null];
      if (gs_dt[AI]) {
        type = gs_dt[AI];
        if (type[1]) {
          ret_dt[type[0]] = tmp.substring(2, 2+type[1]);
          tmp = tmp.substring(2+type[1]);
        } else {
          ret_dt[type[0]] = tmp.substring(2);
          tmp = "";
        }
        
      } else {
        break;
      }
      
    }
  }
  return ret_dt;
}


// let tmp = parseGS1("01003658622019042134H149H1Y583S04 1724113010LJ2521019-A ");
// console.log(tmp)


export {
  parseGS1
}