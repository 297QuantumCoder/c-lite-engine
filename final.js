import chalk from 'chalk';
import fs from 'fs';
import readline from 'readline';

var data = [];
var exprStmt = [];

function tokenize(code) {
    const keywords = ['int', 'string', 'printf', 'scanf', 'return'];
    const tokens = [];
    let pos = 0;

    while (pos < code.length) {
        let char = code[pos];

        if (char === ' ' || char === '\n') {
            pos++;
            continue;
        }

        if (char === '"') {
            let value = '';
            pos++; // Move past the opening quote
            while (pos < code.length && code[pos] !== '"') {
                value += code[pos];
                pos++;
            }
            if (pos < code.length && code[pos] === '"') {  // Ensure we close the quote
                pos++; // Skip past the closing quote
                tokens.push({ type: 'string', value });
            } else {
                throw new Error("Unclosed string literal detected in code.");
            }
            continue;
        }

        if (char === ';') {
            tokens.push({ type: 'semicolon', value: ';' });
            pos++;
            continue;
        }

        if (char === '(') {
            tokens.push({ type: 'lparen', value: '(' });
            pos++;
            continue;
        }

        if (char === ')') {
            tokens.push({ type: 'rparen', value: ')' });
            pos++;
            continue;
        }

        if (char === ',') {
            tokens.push({ type: 'comma', value: ',' });
            pos++;
            continue;
        }

        if (char === '{') {
            tokens.push({ type: 'lbrace', value: '{' });
            pos++;
            continue;
        }

        if (char === '}') {
            tokens.push({ type: 'rbrace', value: '}' });
            pos++;
            continue;
        }

        let value = '';
        while (/[a-zA-Z_]/.test(char)) {
            value += char;
            pos++;
            char = code[pos];
        }

        if (value) {
            if (keywords.includes(value)) {
                tokens.push({ type: 'keyword', value });
            } else {
                tokens.push({ type: 'identifier', value });
            }
            continue;
        }

        value = '';
        while (/[0-9]/.test(char)) {
            value += char;
            pos++;
            char = code[pos];
        }

        if (value) {
            tokens.push({ type: 'number', value });
            continue;
        }

        if (/[=+\-*/]/.test(char)) {
            tokens.push({ type: 'operator', value: char });
            pos++;
            continue;
        }

        throw new Error(`Unexpected character "${char}" at position ${pos}`);
    }

    return tokens;
}

class Interpreter {
    constructor(line) {
        this.line = line;
        //console.log(`Interpreting Line ${lineCount} ..`);
    }

    async interpret() {
        const tokens = tokenize(this.line);
        //console.log(tokens);
    
        var pos = 0;
        while (pos < tokens.length) {
            if (tokens[pos].type === 'identifier') {
                console.log(chalk.blue('Parsing expression..' + chalk.bgGreen(`check`)));
                await parseExpression();
            } else if (tokens[pos].value === 'int') {
                console.log(chalk.blue('Parsing integer declaration..' + chalk.bgGreen(`check`)));
                parseIntegerDecl();
            } else if (tokens[pos].value === 'string') {
                consolw.log(chalk.blue('Parsing string declaration..' + chalk.bgGreen(`check`)));
                parseStringDecl();
            } else if (tokens[pos].value === 'printf') {
                console.log(chalk.blue('Parsing print data..' + chalk.bgGreen(`check`)));
                parsePrintData();
            } else if (tokens[pos].value === 'scanf') {
                console.log(chalk.blue('Parsing scan data..' + chalk.bgGreen(`check`)));
                await parseScanData();
            } else if (tokens[pos].value === 'return') {
                console.log(chalk.blue('Parsing return statement..' + chalk.bgGreen(`check`)));
                parseReturn();
            }
            // Advance position after processing a statement
            if (tokens[pos] && tokens[pos].type === 'semicolon') {
                pos++;
            }

            //console.log(data);
        }

        async function parseExpression() {
            let varName = tokens[pos++].value;
            if (tokens[pos].value === '=') {
                pos++; // skip '='
                let exprValue = evaluateExpression();
                let variable = data.find(d => d.name === varName);
                if (variable) {
                    variable.value = exprValue;
                } else {
                    console.error(`Variable ${varName} not declared`);
                }
            }
        }

        function evaluateExpression() {
            let expr = [];
            while (tokens[pos].type !== 'semicolon') {
                if (tokens[pos].type === 'identifier') {
                    let variable = data.find(d => d.name === tokens[pos].value);
                    if (variable) {
                        expr.push(variable.value);
                    } else {
                        console.error(`Variable ${tokens[pos].value} not declared`);
                    }
                } else {
                    expr.push(tokens[pos].value);
                }
                pos++;
            }
            pos++; // skip ';'
            return evaluatePostfix(infixToPostfix(expr));
        }

        function infixToPostfix(infix) {
            const precedence = {
                '+': 1,
                '-': 1,
                '*': 2,
                '/': 2
            };
            const output = [];
            const operators = [];

            infix.forEach(token => {
                if (!isNaN(token)) {
                    output.push(token);
                } else if (token in precedence) {
                    while (operators.length && precedence[operators[operators.length - 1]] >= precedence[token]) {
                        output.push(operators.pop());
                    }
                    operators.push(token);
                }
            });

            while (operators.length) {
                output.push(operators.pop());
            }

            return output;
        }

        function evaluatePostfix(postfix) {
            const stack = [];

            postfix.forEach(token => {
                if (!isNaN(token)) {
                    stack.push(Number(token));
                } else {
                    const b = stack.pop();
                    const a = stack.pop();
                    switch (token) {
                        case '+':
                            stack.push(a + b);
                            break;
                        case '-':
                            stack.push(a - b);
                            break;
                        case '*':
                            stack.push(a * b);
                            break;
                        case '/':
                            stack.push(a / b);
                            break;
                    }
                }
            });

            return stack[0];
        }

        function parseIntegerDecl() {
            var intVar = {};
            intVar.type = tokens[pos++].type;
            intVar.name = tokens[pos++].value;
            if (tokens[pos].value === '=') {
                pos++; // skip '='
                intVar.value = evaluateExpression();
            } else {
                intVar.value = 0;
            }
            data.push(intVar);
        }

        function parseStringDecl() {
            var stringVar = {};
            stringVar.type = tokens[pos++].type;
            stringVar.name = tokens[pos++].value;
            if (tokens[pos].value === '=') {
                pos++; // skip '='
                stringVar.value = parseString();
            } else if (tokens[pos].value === ';') {
                pos++; // skip ';'
                stringVar.value = '';
            } else {
                pos++; // skip ','
                stringVar.value = parseString();
            }
            data.push(stringVar);
        }

        function parseString() {
            var str = '';
            while (tokens[++pos].type !== 'semicolon') {
                if (tokens[pos].type === 'identifier') {
                    let variable = data.find(d => d.name === tokens[pos].value);
                    if (variable) {
                        str += variable.value;
                    } else {
                        console.error(`Variable ${tokens[pos].value} not declared`);
                    }
                } else if (tokens[pos].type === 'string') {
                    str += tokens[pos].value;
                } else if (tokens[pos].type === 'operator' && tokens[pos].value === '+') {
                    continue;
                } else {
                    console.error(`Operation: ${tokens[pos].value} not defined for strings`);
                }
            }
            return str;
        }

        function parsePrintData() {
            var printData = { value: '' };
            pos++; // skip '('
            while (tokens[++pos].type !== 'rparen') {
                if (tokens[pos].type === 'string') {
                    printData.value += tokens[pos].value;
                } else if (tokens[pos].type === 'identifier') {
                    let variable = data.find(d => d.name === tokens[pos].value);
                    if (variable) {
                        printData.value += variable.value;
                    } else {
                        console.error(`Variable ${tokens[pos].value} not declared`);
                    }
                } else if (tokens[pos].type === 'operator' && tokens[pos].value === '+') {
                    continue;
                } else {
                    console.error(`Operation: ${tokens[pos].value} not defined for printf`);
                }
            }
            pos++; // skip ')'
            pos++; // skip ';'
            console.log(printData.value);
        }

        // Modify the parseScanData to correctly process and store inputs
        async function parseScanData() {
            var scanData = {};
            pos++; // skip '('
            while (tokens[++pos].type !== 'rparen') {
                const t = tokens[pos];
                if (t.type === 'string') {
                    if (t.value === '%d') {
                        scanData.type = 'int';
                        pos++; // skip ','
                        if (tokens[++pos].type === 'identifier') {
                            scanData.name = tokens[pos].value;
                            scanData.value = await takeIntegerInput();
                        } else {
                            console.error(`${tokens[pos].value} not defined for scanf`);
                        }
                    } else if (t.value === '%s') {
                        scanData.type = 'string';
                        pos++; // skip ','
                        if (tokens[++pos].type === 'identifier') {
                            scanData.name = tokens[pos].value;
                            scanData.value = await takeStringInput();
                        } else {
                            console.error(`${tokens[pos].value} not defined for scanf`);
                        }
                    }
                } else {
                    console.error(`Operation: ${tokens[pos].value} not defined for scanf`);
                }
            }
            pos++; // skip ')'
            pos++; // skip ';'
            let variable = data.find(d => d.name === scanData.name);
            if (variable) {
                variable.value = scanData.value;
            } else {
                data.push(scanData);
            }
        }
        
        function takeIntegerInput() {
            return new Promise((resolve) => {
                const rl = readline.createInterface({
                    input: process.stdin,
                    output: process.stdout
                });
                rl.question('Enter an integer: ', (input) => {
                    const parsedValue = parseInt(input, 10);
                    if (isNaN(parsedValue)) {
                        console.log("Invalid input for %d. Please enter a valid integer.");
                        rl.close();
                        resolve(null);
                    } else {
                        rl.close();
                        resolve(parsedValue);
                    }
                });
            });
        }
        
        function takeStringInput() {
            return new Promise((resolve) => {
                const rl = readline.createInterface({
                    input: process.stdin,
                    output: process.stdout
                });
                rl.question('Enter a string: ', (input) => {
                    rl.close();
                    resolve(input);
                });
            });
        }
    }
}

// readline from user as input using import
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// call readline to get input from user infinitely until the user types exit. Don't use prompt but add interactive mode
var lineCount = 1;

rl.setPrompt(`> `);
rl.prompt();
rl.on('line', async (line) => {
    if (line === 'exit') {
        console.log("Thank you for using our INTERPRETER :)");
        rl.close();
    } else {
        const interpreter = new Interpreter(line);
        await interpreter.interpret();
        rl.prompt();
        lineCount++;
    }
});