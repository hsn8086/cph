# Competitive Programming Helper (CPH) - HSN Edition

This project is a customized fork of [agrawal-d/cph](https://github.com/agrawal-d/cph/), designed to improve usability for competitive programming in Visual Studio Code.

## Key Changes in HSN Edition

- **Compiler Command Supports Space Separation**  
  Compiler commands and flags can now be separated by spaces, making it easier to customize build commands for different languages.

- **Default Problem and `.cph` File Location**  
  When importing problems, the source file and `.cph` metadata file are now created in the same directory as the currently focused file, rather than the workspace root. This helps keep your workspace organized.

- **Relative Paths Used Throughout**  
  All generated and referenced paths are now relative, improving portability and compatibility across different environments.

## Quick Start

1. Install this extension in VS Code.
2. Install the [Competitive Companion](https://github.com/jmerle/competitive-companion#readme) browser extension.
3. On a problem page, click the green plus (+) button in your browser to send the problem to VS Code.
4. The problem file and `.cph` file will appear in the same directory as your focused file, with testcases preloaded.
5. Press <kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>B</kbd> to run and judge your solution.

(Optional)  
- Install [cph-submit](https://github.com/agrawal-d/cph-submit) for direct Codeforces submission.
- For Kattis, follow instructions on the [Kattis help page](https://open.kattis.com/help/submit).

## Features

- Automatic compilation with error display.
- Intelligent judge supporting signals, timeouts, and runtime errors.
- Seamless integration with Competitive Companion.
- Auto-submit support for Codeforces and Kattis.
- Local testing for custom problems.
- Supports multiple programming languages.
- Problem files and metadata are stored in the current directory for better organization.

## Supported Languages

- C++
- C
- C#
- Rust
- Go
- Haskell
- Python
- Ruby
- Java
- JavaScript (Node.js)

## Contributing

- File bug reports or feature requests.
- Help develop the extension (see [developer guide](docs/dev-guide.md)).
- Spread the word!

Before submitting a Pull Request, please open an issue to discuss your approach.

## License

This project is licensed under the GNU GPL v3 or later. See [LICENSE](https://www.gnu.org/licenses/).

---

**Original repository:** [agrawal-d/cph](https://github.com/agrawal-d/cph/)
