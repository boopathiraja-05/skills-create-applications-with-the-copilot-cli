#!/usr/bin/env node
// Node.js CLI Calculator (CLI harness only)
const { add, sub, mul, div, modulo, power, squareRoot } = require('./calculator-lib');

function printUsage() {
  console.log(
`Usage:
  node src/calculator.js <num1> <num2> <operator>
  or
  node src/calculator.js <num1> <num2> --add|--sub|--mul|--div|--mod|--pow
  or (unary):
  node src/calculator.js <num> <operator>    # e.g. node src/calculator.js 9 sqrt
  or
  node src/calculator.js <num> --sqrt

Examples:
  node src/calculator.js 5 + 3      # outputs 8
  node src/calculator.js 10 2 --div # outputs 5
  node src/calculator.js 10 3 --mod # outputs 1
  node src/calculator.js 2 3 --pow  # outputs 8
  node src/calculator.js 9 sqrt     # outputs 3
  node src/calculator.js 9 --sqrt   # outputs 3
`);
}

function isBinaryOperatorSymbol(tok) {
  return ["+", "-", "*", "/", "%", "^"].includes(tok);
}

function flagToSymbol(flag) {
  switch (flag) {
    case '--add': return '+';
    case '--sub': return '-';
    case '--mul': return '*';
    case '--div': return '/';
    case '--mod': return '%';
    case '--pow': return '^';
    case '--sqrt': return 'sqrt';
    default: return null;
  }
}

function runCLI(argv) {
  const args = argv.slice(2);
  if (args.length === 0) {
    console.error('Error: no arguments provided.');
    printUsage();
    process.exit(2);
  }

  // Handle unary sqrt form: `node src/calculator.js 9 sqrt` or `node src/calculator.js 9 --sqrt`
  if (args.length === 2) {
    const aStr = args[0];
    const opTokenRaw = args[1];
    const opToken = (opTokenRaw === 'sqrt') ? 'sqrt' : flagToSymbol(opTokenRaw) || opTokenRaw;
    if (opToken !== 'sqrt') {
      console.error('Error: expected unary operator `sqrt` when passing 2 arguments.');
      printUsage();
      process.exit(3);
    }
    const n = Number(aStr);
    if (!isFinite(n)) {
      console.error('Error: operand must be a valid number.');
      process.exit(4);
    }
    try {
      const res = squareRoot(n);
      console.log(res);
      process.exit(0);
    } catch (e) {
      console.error('Error: ' + e.message);
      process.exit(7);
    }
  }

  // Expect binary form with 3 args
  if (args.length !== 3) {
    console.error('Error: expected 2 (unary) or 3 (binary) arguments.');
    printUsage();
    process.exit(2);
  }

  let aStr, bStr, opToken;
  // Two supported binary forms:
  // 1) a op b    -> node calculator.js 5 + 3
  // 2) a b --op   -> node calculator.js 5 3 --add
  if (isBinaryOperatorSymbol(args[1])) {
    aStr = args[0];
    opToken = args[1];
    bStr = args[2];
  } else {
    // assume flag provided as third arg
    aStr = args[0];
    bStr = args[1];
    const mapped = flagToSymbol(args[2]);
    if (!mapped || mapped === 'sqrt') {
      console.error(`Error: unknown or invalid operator/flag '${args[2]}' for binary operation`);
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
      result = add(a, b);
      break;
    case '-':
      result = sub(a, b);
      break;
    case '*':
      result = mul(a, b);
      break;
    case '/':
      try {
        result = div(a, b);
      } catch (e) {
        console.error('Error: ' + e.message);
        process.exit(5);
      }
      break;
    case '%':
      try {
        result = modulo(a, b);
      } catch (e) {
        console.error('Error: ' + e.message);
        process.exit(5);
      }
      break;
    case '^':
      result = power(a, b);
      break;
    default:
      console.error(`Error: unsupported operator '${opToken}'`);
      printUsage();
      process.exit(6);
  }

  // Print result to stdout
  console.log(result);
}

if (require.main === module) {
  runCLI(process.argv);
}

module.exports = { runCLI };