<!-- lesson: introduction | Introduction to C | 10 -->

C is a general-purpose programming language created by **Dennis Ritchie** at Bell Labs in 1972. Operating systems (Linux, Windows kernels), databases, embedded devices and even other languages such as Python are written in C. Learning C teaches you how a computer really works: memory, data and instructions.

## Why learn C?

- **Fast and efficient** — C code compiles directly to machine code.
- **Close to the hardware** — you control memory yourself.
- **Foundation for other languages** — C++, Java, JavaScript and C# borrow its syntax.
- **Portable** — the same C code can be compiled for many platforms.

## Your first C program

```c
#include <stdio.h>

int main(void) {
    printf("Hello, Solveitly!\n");
    return 0;
}
```

Let's read it line by line:

| Line | Meaning |
|---|---|
| `#include <stdio.h>` | Includes the *standard input/output* library so we can use `printf`. |
| `int main(void)` | Every C program starts running from the `main` function. |
| `printf(...)` | Prints text to the screen. `\n` adds a new line. |
| `return 0;` | Tells the operating system the program finished successfully. |

## Compiling and running

C is a **compiled** language: a compiler turns your source code into an executable file. With the GCC compiler:

```bash
gcc hello.c -o hello   # compile
./hello                # run (on Windows: hello.exe)
```

The journey of a C program is: **source code (.c) → preprocessor → compiler → linker → executable**.

## Comments

```c
// A single-line comment

/*
   A multi-line comment
*/
```

Comments are ignored by the compiler — use them to explain *why* your code does something.

## Key takeaways

- Execution starts at `main()`.
- Statements end with a semicolon `;`.
- C is case-sensitive: `Main` and `main` are different.
- Use `#include` to bring in library functions like `printf`.

## Practice

Write a program that prints your name on the first line and your favourite programming language on the second line.

<!-- lesson: variables-and-data-types | Variables, Data Types & Operators | 15 -->

A **variable** is a named location in memory that stores a value. In C every variable has a **type** that decides how much memory it uses and what values it can hold.

## Basic data types

| Type | Example | Typical size | Format specifier |
|---|---|---|---|
| `int` | `42` | 4 bytes | `%d` |
| `float` | `3.14f` | 4 bytes | `%f` |
| `double` | `3.14159` | 8 bytes | `%lf` |
| `char` | `'A'` | 1 byte | `%c` |

```c
#include <stdio.h>

int main(void) {
    int age = 21;
    float price = 99.5f;
    double pi = 3.14159265;
    char grade = 'A';

    printf("Age: %d\n", age);
    printf("Price: %.2f\n", price);
    printf("Pi: %.5lf\n", pi);
    printf("Grade: %c\n", grade);
    printf("Size of int: %zu bytes\n", sizeof(int));
    return 0;
}
```

## Constants

Use `const` for values that should never change:

```c
const double GST_RATE = 0.18;
```

## Reading input with scanf

```c
int number;
printf("Enter a number: ");
scanf("%d", &number);          // & gives the address of the variable
printf("You entered %d\n", number);
```

## Operators

| Category | Operators |
|---|---|
| Arithmetic | `+  -  *  /  %` |
| Relational | `==  !=  >  <  >=  <=` |
| Logical | `&&  \|\|  !` |
| Assignment | `=  +=  -=  *=  /=` |
| Increment / decrement | `++  --` |

```c
int a = 17, b = 5;
printf("%d\n", a / b);   // 3  (integer division drops the decimal part)
printf("%d\n", a % b);   // 2  (remainder)
printf("%.2f\n", (float)a / b);  // 3.40 (type casting)
```

> **Watch out:** dividing two integers gives an integer. Cast one of them to `float` or `double` when you need decimals.

## Key takeaways

- Declare a variable as `type name = value;`.
- Use the right format specifier in `printf` and `scanf`.
- `%` gives the remainder and only works with integers.
- `sizeof` tells you how many bytes a type or variable uses.

## Practice

Write a program that reads the length and width of a rectangle and prints its area and perimeter.

<!-- lesson: control-flow | Conditions and Loops | 15 -->

Control flow statements let your program make **decisions** and **repeat** work.

## if, else if, else

```c
int marks = 72;

if (marks >= 90) {
    printf("Grade A\n");
} else if (marks >= 60) {
    printf("Grade B\n");
} else {
    printf("Grade C\n");
}
```

## switch

`switch` is a clean way to compare one value against many constants:

```c
int day = 3;

switch (day) {
    case 1: printf("Monday\n"); break;
    case 2: printf("Tuesday\n"); break;
    case 3: printf("Wednesday\n"); break;
    default: printf("Another day\n");
}
```

Don't forget `break` — without it, execution "falls through" to the next case.

## Loops

### for loop — when you know how many times

```c
for (int i = 1; i <= 5; i++) {
    printf("%d ", i);       // 1 2 3 4 5
}
```

### while loop — repeat while a condition is true

```c
int n = 1234, sum = 0;
while (n > 0) {
    sum += n % 10;   // add the last digit
    n /= 10;         // remove the last digit
}
printf("Sum of digits: %d\n", sum);   // 10
```

### do...while — runs at least once

```c
int choice;
do {
    printf("Enter 0 to exit: ");
    scanf("%d", &choice);
} while (choice != 0);
```

## break and continue

```c
for (int i = 1; i <= 10; i++) {
    if (i == 5) continue;  // skip 5
    if (i == 8) break;     // stop the loop at 8
    printf("%d ", i);      // 1 2 3 4 6 7
}
```

## Example: multiplication table

```c
int n = 7;
for (int i = 1; i <= 10; i++) {
    printf("%d x %d = %d\n", n, i, n * i);
}
```

## Key takeaways

- Use `if / else` for decisions and `switch` for many fixed choices.
- Use `for` for counted loops, `while` for condition-based loops.
- `break` exits a loop, `continue` skips to the next iteration.

## Practice

1. Print all even numbers from 1 to 50.
2. Check whether a number entered by the user is prime.

<!-- lesson: functions | Functions | 15 -->

A **function** is a reusable block of code that performs one task. Functions make programs shorter, easier to read and easier to test.

## Defining and calling a function

```c
#include <stdio.h>

// function declaration (prototype)
int add(int a, int b);

int main(void) {
    int result = add(5, 7);
    printf("Sum = %d\n", result);   // Sum = 12
    return 0;
}

// function definition
int add(int a, int b) {
    return a + b;
}
```

A function has:

- a **return type** (`int`) — use `void` if it returns nothing,
- a **name** (`add`),
- **parameters** (`int a, int b`),
- a **body** with a `return` statement.

## void functions

```c
void greet(const char name[]) {
    printf("Welcome, %s!\n", name);
}
```

## Pass by value

C passes **copies** of arguments. Changing a parameter does not change the original variable:

```c
void tryToChange(int x) {
    x = 100;
}

int main(void) {
    int value = 5;
    tryToChange(value);
    printf("%d\n", value);   // still 5
    return 0;
}
```

To modify the caller's variable you pass its **address** using pointers — you will learn this in the pointers lesson.

## Recursion

A function can call itself. Every recursive function needs a **base case** to stop:

```c
long factorial(int n) {
    if (n <= 1) return 1;          // base case
    return n * factorial(n - 1);   // recursive case
}

// factorial(5) = 5 * 4 * 3 * 2 * 1 = 120
```

## Scope

- **Local variables** exist only inside the function where they are declared.
- **Global variables** are declared outside all functions and visible everywhere — use them sparingly.
- `static` local variables keep their value between calls:

```c
void counter(void) {
    static int count = 0;
    count++;
    printf("Called %d times\n", count);
}
```

## Key takeaways

- Declare a prototype before `main` or define the function above it.
- Arguments are passed by value (copies).
- Recursive functions must have a base case.

## Practice

Write functions `isEven(int n)` and `power(int base, int exp)` and test them from `main`.

<!-- lesson: arrays-and-strings | Arrays and Strings | 15 -->

An **array** stores many values of the same type in contiguous memory. A **string** in C is simply an array of characters ending with the special null character `'\0'`.

## Declaring arrays

```c
int marks[5] = {78, 92, 65, 88, 71};

printf("%d\n", marks[0]);   // first element: 78
printf("%d\n", marks[4]);   // last element: 71
```

Indexes start at **0**, so an array of size 5 has indexes `0` to `4`. Accessing `marks[5]` is a bug — C does **not** check array bounds.

## Looping over an array

```c
int marks[] = {78, 92, 65, 88, 71};
int n = sizeof(marks) / sizeof(marks[0]);   // number of elements
int total = 0, highest = marks[0];

for (int i = 0; i < n; i++) {
    total += marks[i];
    if (marks[i] > highest) highest = marks[i];
}

printf("Average: %.2f\n", (float)total / n);
printf("Highest: %d\n", highest);
```

## 2D arrays

```c
int matrix[2][3] = {
    {1, 2, 3},
    {4, 5, 6}
};

for (int r = 0; r < 2; r++) {
    for (int c = 0; c < 3; c++) {
        printf("%d ", matrix[r][c]);
    }
    printf("\n");
}
```

## Strings

```c
#include <stdio.h>
#include <string.h>

int main(void) {
    char name[20] = "Solveitly";
    char copy[20];

    printf("Length: %zu\n", strlen(name));   // 9
    strcpy(copy, name);                       // copy a string
    strcat(copy, " Rocks");                  // append
    printf("%s\n", copy);                     // Solveitly Rocks

    if (strcmp(name, "Solveitly") == 0) {
        printf("Strings are equal\n");
    }
    return 0;
}
```

| Function | Purpose |
|---|---|
| `strlen(s)` | length (without `'\0'`) |
| `strcpy(dst, src)` | copy |
| `strcat(dst, src)` | append |
| `strcmp(a, b)` | compare — returns 0 if equal |

## Reading a line of text safely

```c
char city[50];
printf("Enter your city: ");
fgets(city, sizeof(city), stdin);   // safer than gets()/scanf("%s")
```

## Key takeaways

- Array indexes run from `0` to `size - 1`.
- Strings end with `'\0'`; always leave room for it.
- Use `<string.h>` functions instead of comparing strings with `==`.

## Practice

1. Reverse an array of 10 integers in place.
2. Count the vowels in a string entered by the user.

<!-- lesson: pointers-and-memory | Pointers and Memory Management | 20 -->

A **pointer** is a variable that stores a **memory address**. Pointers are what make C powerful: they let functions modify variables, work efficiently with arrays and allocate memory at run time.

## Address-of and dereference

```c
int x = 10;
int *p = &x;        // p stores the address of x

printf("%d\n", x);    // 10
printf("%p\n", (void *)p);   // address, e.g. 0x7ffd...
printf("%d\n", *p);   // 10  (value at that address)

*p = 25;            // change x through the pointer
printf("%d\n", x);    // 25
```

- `&x` → "address of x"
- `*p` → "value at the address stored in p"

## Pass by reference with pointers

```c
void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main(void) {
    int m = 3, n = 8;
    swap(&m, &n);
    printf("m=%d n=%d\n", m, n);   // m=8 n=3
    return 0;
}
```

## Pointers and arrays

An array name acts like a pointer to its first element:

```c
int arr[] = {10, 20, 30};
int *ptr = arr;

printf("%d\n", *(ptr + 1));   // 20  — pointer arithmetic
printf("%d\n", ptr[2]);       // 30
```

## Dynamic memory allocation

Sometimes you only know how much memory you need while the program runs. Use the heap via `<stdlib.h>`:

```c
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n;
    printf("How many numbers? ");
    scanf("%d", &n);

    int *nums = malloc(n * sizeof(int));
    if (nums == NULL) {
        printf("Out of memory\n");
        return 1;
    }

    for (int i = 0; i < n; i++) nums[i] = i * i;
    for (int i = 0; i < n; i++) printf("%d ", nums[i]);

    free(nums);      // always release heap memory
    nums = NULL;     // avoid a dangling pointer
    return 0;
}
```

| Function | Purpose |
|---|---|
| `malloc(bytes)` | allocate uninitialised memory |
| `calloc(n, size)` | allocate and set to zero |
| `realloc(ptr, bytes)` | resize a block |
| `free(ptr)` | release memory |

## Common pointer bugs

- **Null pointer dereference** — using a pointer that is `NULL`.
- **Memory leak** — forgetting to `free` memory.
- **Dangling pointer** — using memory after it was freed.
- **Uninitialised pointer** — always initialise pointers (`int *p = NULL;`).

## Key takeaways

- `&` gives an address, `*` follows it.
- Pass pointers to let a function change the caller's data.
- Every `malloc` needs a matching `free`.

## Practice

Write a function `int *createArray(int n)` that allocates an array, fills it with 1..n and returns it. Print the array in `main` and free the memory.
