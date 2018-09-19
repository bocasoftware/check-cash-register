//Array of objects with denominators.

var denominator = [
  { name: "ONE HUNDRED", val: 100 },
  { name: "TWENTY", val: 20 },
  { name: "TEN", val: 10 },
  { name: "FIVE", val: 5 },
  { name: "ONE", val: 1 },
  { name: "QUARTER", val: 0.25 },
  { name: "DIME", val: 0.1 },
  { name: "NICKEL", val: 0.05 },
  { name: "PENNY", val: 0.01 }
];




function checkCashRegister(price, cash, cid) {
    
    
    
    
    //define output. change. 
  var output = { status: null, change: [] };
    
  
  var change = cash - price;
    
    //CID  array into drawer object.
  var register = cid.reduce(function(accumulator, currentValue) {accumulator.total += currentValue[1]; accumulator[currentValue[0]] = currentValue[1]; return accumulator;}, { total: 0 } );
    
    
 
    
    
    //Validate if exact change closed, no change due.
  if (register.total === change) {
    output.status = "CLOSED";
    output.change = cid;
    return output;
  }
    
    
    //Validate if insufficient funds.
  if (register.total < change) {
    output.status = "INSUFFICIENT_FUNDS";
    return output;
  }
    
    
    
    //Loop through denomination array.
  var change_arr = denominator.reduce(function(accumulator, currentValue) {
    var value = 0;
      //While there is this type currency in the drawer.
      //And While the denomination is larger than the change remaining.
    while (register[currentValue.name] > 0 && change >= currentValue.val) {
      change = change - currentValue.val;
      register[currentValue.name] = register[currentValue.name] - currentValue.val;
      value = value + currentValue.val;
        
        
        //round change to the nearest 100th to prevent prescision errors.
      change = Math.round(change * 100) / 100;
    }
      //Add this denomination to the output if used.
    if (value > 0) {
       
      accumulator.push([currentValue.name, value]);
        
    }
      
      
    return accumulator; //Return change_arr.
  }, []);//intial value of empty array for reduce.
    

    // Validate If no elements in change_arr or leftover change, return
  // the string "Insufficient Funds"
  if (change_arr.length < 1 || change > 0) {
    output.status = "INSUFFICIENT_FUNDS";
    return output;
  }
    
    
  output.status = "OPEN";
  output.change = change_arr;
  return output;
    
    
    
}

//TEST
checkCashRegister(19.50, 20.00, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.10], ["QUARTER", 4.25], ["ONE", 90.00], ["FIVE", 55.00], ["TEN", 20.00], ["TWENTY", 60.00], ["ONE HUNDRED", 100.00]]);