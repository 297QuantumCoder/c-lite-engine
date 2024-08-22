

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

1. **Clone the Repository**:
   To get a local copy of the project up and running, you can clone the repository using the following command:
   ```bash
   git clone https://github.com/297QuantumCoder/c-lite-engine.git
   ```

2. **Installation**:
   Navigate to the project directory and install the necessary dependencies:
   ```bash
   cd c-lite-engine
   npm install
   ```
   Ensure you have Node.js installed on your system.

3. **Running the Interpreter**:
   Start the interpreter by executing the following command:
   ```bash
   node final.js
   ```
   You will be prompted to enter C statements. Type `exit` to terminate the interpreter.

#### Contributions

Contributions are welcome! If you have any suggestions for improvements or new features, feel free to open an issue or submit a pull request. Here’s how you can contribute:

1. **Fork the Project**: Click on the "Fork" button on the top right corner of the repository page.
2. **Create a New Branch**: Create a branch for your feature or bug fix.
   ```bash
   git checkout -b feature/new-feature
   ```
3. **Make Your Changes**: Implement your feature or fix the bug.
4. **Commit Your Changes**: Commit your changes with a meaningful message.
   ```bash
   git commit -m 'Add some feature'
   ```
5. **Push to the Branch**: Push your changes to your forked repository.
   ```bash
   git push origin feature/new-feature
   ```
6. **Create a Pull Request**: Open a pull request against the main repository's `main` branch.

We appreciate your efforts in making this project better!

---
