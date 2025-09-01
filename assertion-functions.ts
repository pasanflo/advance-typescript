const var1: number | string = ((): number | string => 1)();
let var2: number;
if (typeof var1 === 'number') {
  var2 = var1;
} else {
  var2 = 0;
}
var2;