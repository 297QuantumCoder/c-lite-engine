
### C-Lite Engine

#### Overview
This project is a simple interpreter for a subset of the C programming language, implemented entirely in JavaScript. The interpreter allows users to input C code interactively, processing statements and expressions, and simulating basic C language operations like variable declaration, arithmetic operations, input/output functions (`scanf` and `printf`), and more.

#### Features
- **Interactive Command-Line Interface**: The interpreter reads lines of code from the user continuously, allowing them to input C statements and expressions until they choose to exit.
- **Tokenization**: The code first goes through a tokenizer that identifies keywords, identifiers, operators, and other tokens in the input.
- **Expression Parsing and Evaluation**: It supports parsing and evaluation of arithmetic expressions, including proper handling of operator precedence and associativity.
- **Variable Declaration and Assignment**: The interpreter can handle integer and string variable declarations (`int`, `string`) and assignments, storing these in memory for subsequent operations.
- **Input/Output Simulation**: It simulates C's `scanf` and `printf` functions, allowing users to input and output data during the execution of their code.
- **Basic Error Handling**: The interpreter includes basic error handling for unclosed string literals, undeclared variables, and unsupported operations.

#### How It Works
1. **Tokenization**: The input C code is first broken down into tokens by the `tokenize` function. This includes recognizing keywords (`int`, `string`, etc.), identifiers (variable names), operators (`+`, `-`, etc.), and punctuation (`;`, `(`, `)`, etc.).
2. **Interpretation**: The `Interpreter` class processes each line of code by interpreting tokens. It identifies the type of statement (e.g., variable declaration, expression, I/O operations) and executes it accordingly.
   - **Expression Parsing**: The interpreter parses and evaluates arithmetic expressions using infix-to-postfix conversion and then evaluates the postfix expression.
   - **Variable Management**: Variables are stored in a global `data` array, where they can be referenced and modified during the execution of subsequent lines.
   - **I/O Operations**: The `parsePrintData` and `parseScanData` functions simulate the behavior of `printf` and `scanf` respectively, handling both integers and strings.
3. **Execution Loop**: The interpreter runs in an infinite loop, prompting the user for input until the user types `exit`. Each input line is processed immediately, and the result (if any) is printed to the console.

#### Example Usage
```c
int a = 5;
int b = 10;
int c = a + b;
printf("Sum is: %d", c);
scanf("%d", &a);
printf("New value of a is: %d", a);
```

This code will declare three integers, calculate their sum, print the result, read a new value for `a` from the user, and then print the updated value of `a`.

#### Getting Started
1. **Installation**: Clone the repository and navigate to the project directory. Ensure you have Node.js installed on your system.
2. **Running the Interpreter**: Use the following command to start the interpreter:
   ```bash
   node final.js
   ```
   You will be prompted to enter C statements. Type `exit` to terminate the interpreter.

#### Dependencies
- **chalk**: For colored console output.
- **readline**: For reading user input in an interactive command-line interface.
- **fs**: For potential file handling (not used in the basic interpreter).

#### Future Enhancements
- Expand the supported C syntax (e.g., adding loops, conditionals).
- Implement more sophisticated error handling and debugging features.
- Add support for additional data types and complex expressions.

---

