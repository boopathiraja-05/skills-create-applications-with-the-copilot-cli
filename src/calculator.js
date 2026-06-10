#!/usr/bin/env node
// Node.js CLI Calculator
// Supported operations:
// - addition (+, --add)
// - subtraction (-, --sub)
// - multiplication (*, --mul)
// - division (/, --div)

function printUsage() {
  console.log("Usage:\n  node src/calculator.js <num1> <num2> <operator>\n  or\n  node src/calculator.js <num1> <num2> --add|--sub|--mul|--div\n\nExamples:\n  node src/calculator.js 5 + 3    # outputs 8\n  node src/calculator.js 10 2 --div # outputs 5");
}

function isOperatorSymbol(tok) {
  return ["+", "-", "*", "/"].includes(tok);
}

function flagToSymbol(flag) {
  switch (flag) {
    case '--add': return '+';
    case '--sub': return '-';
    case '--mul': return '*';
    case '--div': return '/';
    default: return null;
  }
}

const args = process.argv.slice(2);
if (args.length !== 3) {
  console.error('Error: expected exactly 3 arguments.');
  printUsage();
  process.exit(2);
}

let aStr, bStr, opToken;
// Two supported forms:
// 1) a op b    -> node calculator.js 5 + 3
// 2) a b --op   -> node calculator.js 5 3 --add
if (isOperatorSymbol(args[1])) {
  aStr = args[0];
  opToken = args[1];
  bStr = args[2];
} else {
  // assume flag provided as third arg
  aStr = args[0];
  bStr = args[1];
  const mapped = flagToSymbol(args[2]);
  if (!mapped) {
    console.error(`Error: unknown operator or flag '${args[2]}'`);
    printUsage();
    process.exit(3);
  }
  opToken = mapped;
}

const a = Number(aStr);
const b = Number(bStr);
if (!isFinite(a) || !isFinite(b)) {
  console.error('Error: both operands must be valid numbers.');
  process.exit(4);
}

let result;
switch (opToken) {
  case '+':
    result = a + b;
    break;
  case '-':
    result = a - b;
    break;
  case '*':
    result = a * b;
    break;
  case '/':
    if (b === 0) {
      console.error('Error: division by zero');
      process.exit(5);
    }
    result = a / b;
    break;
  default:
    console.error(`Error: unsupported operator '${opToken}'`);
    printUsage();
    process.exit(6);
}

// Print result to stdout
if (Number.isInteger(result)) console.log(result);
else console.log(result);

process.exit(0);
