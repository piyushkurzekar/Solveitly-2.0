<!-- lesson: getting-started | Getting Started with Python | 10 -->

Python is a high-level, easy-to-read programming language created by **Guido van Rossum**. It is used for web development (Django, Flask), data science (pandas, NumPy), machine learning and AI, automation scripts and much more.

## Why Python?

- **Readable syntax** — code looks almost like English.
- **Batteries included** — a large standard library.
- **Huge ecosystem** — hundreds of thousands of packages on PyPI.
- **Interpreted** — run code instantly without a separate compile step.

## Installing Python

1. Download Python 3 from [python.org](https://www.python.org/downloads/).
2. On Windows, tick **"Add Python to PATH"** during installation.
3. Check the installation:

```bash
python --version
```

## Your first program

Create a file `hello.py`:

```python
print("Hello, Solveitly!")
name = input("What is your name? ")
print("Welcome,", name)
```

Run it:

```bash
python hello.py
```

## The interactive shell (REPL)

Type `python` in a terminal to open an interactive shell — great for quick experiments:

```python
>>> 2 + 3
5
>>> "solve" * 3
'solvesolvesolve'
```

## Indentation matters

Python uses **indentation** (usually 4 spaces) instead of curly braces to group code:

```python
age = 20
if age >= 18:
    print("You can vote")     # inside the if block
print("Done")                 # outside the if block
```

## Comments

```python
# This is a comment
"""
A triple-quoted string is often used
as a multi-line comment or docstring.
"""
```

## Key takeaways

- Run scripts with `python file.py`.
- `print()` shows output and `input()` reads text from the user.
- Indentation defines code blocks — be consistent.

## Practice

Write a script that asks for the user's name and birth year and prints how old they will be in 2030.

<!-- lesson: variables-and-types | Variables and Data Types | 15 -->

In Python you create a variable simply by assigning a value — no type declaration needed. Python figures out the type at run time (**dynamic typing**).

```python
course = "Python"        # str
lessons = 6              # int
rating = 4.8             # float
is_free = True           # bool
nothing = None           # NoneType

print(type(rating))      # <class 'float'>
```

## Numbers

```python
a, b = 17, 5
print(a + b)    # 22
print(a / b)    # 3.4   true division always returns a float
print(a // b)   # 3     floor division
print(a % b)    # 2     remainder
print(a ** 2)   # 289   power
```

## Strings

```python
name = "Solveitly"

print(len(name))          # 9
print(name.upper())       # SOLVEITLY
print(name[0])            # S   (indexing starts at 0)
print(name[-1])           # y   (negative index counts from the end)
print(name[0:5])          # Solve  (slicing)
print("it" in name)       # True
```

### f-strings — the best way to format text

```python
price = 499
discount = 0.2
print(f"Final price: ₹{price * (1 - discount):.2f}")   # Final price: ₹399.20
```

## Booleans and comparisons

```python
x = 10
print(x > 5 and x < 20)   # True
print(not x == 10)        # False
```

## Type conversion

`input()` always returns a string, so convert it when you need a number:

```python
age = int(input("Age: "))
height = float("5.9")
text = str(42)
print(int("12") + 8)      # 20
```

## Naming rules

- Use letters, digits and underscores; don't start with a digit.
- Names are case-sensitive (`total` ≠ `Total`).
- Follow the convention **snake_case**: `total_marks`, `user_name`.

## Key takeaways

- Variables are created by assignment; types are determined at run time.
- `/` always returns a float, `//` drops the decimal part.
- Use f-strings for readable string formatting.

## Practice

Ask the user for a temperature in Celsius and print it in Fahrenheit using `F = C × 9/5 + 32`, rounded to one decimal place.

<!-- lesson: control-flow | Conditions and Loops | 15 -->

## if / elif / else

```python
marks = int(input("Marks: "))

if marks >= 90:
    grade = "A"
elif marks >= 75:
    grade = "B"
elif marks >= 50:
    grade = "C"
else:
    grade = "Fail"

print(f"Grade: {grade}")
```

A short **conditional expression**:

```python
status = "adult" if age >= 18 else "minor"
```

## for loops

A `for` loop iterates over any sequence:

```python
for language in ["C", "Python", "Java"]:
    print(language)

for i in range(1, 6):        # 1 to 5
    print(i, i * i)

for index, ch in enumerate("abc"):
    print(index, ch)         # 0 a, 1 b, 2 c
```

`range(start, stop, step)` stops **before** `stop`: `range(0, 10, 2)` gives 0, 2, 4, 6, 8.

## while loops

```python
balance = 1000
years = 0
while balance < 2000:
    balance *= 1.08          # 8% interest per year
    years += 1
print(f"Doubles in {years} years")   # 10 years
```

## break, continue and else

```python
for n in range(2, 20):
    for d in range(2, int(n ** 0.5) + 1):
        if n % d == 0:
            break            # not prime, stop checking
    else:
        print(n, "is prime") # runs only if the inner loop did not break
```

## match (Python 3.10+)

```python
command = "start"
match command:
    case "start":
        print("Starting…")
    case "stop":
        print("Stopping…")
    case _:
        print("Unknown command")
```

## Key takeaways

- Indentation defines the body of `if`, `for` and `while`.
- `range()` is the easiest way to loop a fixed number of times.
- `break` exits a loop, `continue` skips to the next iteration.

## Practice

Build a number-guessing game: pick a secret number with `random.randint(1, 100)` and let the user guess until they get it, printing "higher" or "lower" hints.

<!-- lesson: functions | Functions | 15 -->

Functions group code into reusable, named blocks. Define them with `def`.

```python
def greet(name):
    """Return a greeting for the given name."""
    return f"Hello, {name}!"

message = greet("Asha")
print(message)
```

The text in triple quotes is a **docstring** — it documents what the function does (`help(greet)` shows it).

## Default and keyword arguments

```python
def price_with_tax(amount, rate=0.18):
    return round(amount * (1 + rate), 2)

print(price_with_tax(100))              # 118.0
print(price_with_tax(100, rate=0.05))   # 105.0
print(price_with_tax(rate=0.12, amount=50))
```

## Returning multiple values

```python
def stats(numbers):
    return min(numbers), max(numbers), sum(numbers) / len(numbers)

low, high, avg = stats([4, 8, 15, 16, 23, 42])
```

## *args and **kwargs

```python
def total(*numbers):              # any number of positional arguments
    return sum(numbers)

def profile(**details):           # any number of keyword arguments
    for key, value in details.items():
        print(f"{key}: {value}")

print(total(1, 2, 3, 4))          # 10
profile(name="Ravi", city="Pune")
```

## Scope

Variables created inside a function are **local**. Use parameters and return values to move data in and out instead of relying on global variables.

```python
count = 0
def increment():
    global count      # needed to modify a global — use rarely
    count += 1
```

## Lambda functions

Small anonymous functions, often used with `sorted`, `map` and `filter`:

```python
students = [("Asha", 82), ("Ravi", 91), ("Meera", 76)]
ranked = sorted(students, key=lambda s: s[1], reverse=True)
print(ranked[0])   # ('Ravi', 91)
```

## Type hints (optional but recommended)

```python
def area(width: float, height: float) -> float:
    return width * height
```

## Key takeaways

- `def` defines a function, `return` sends a value back.
- Default values make parameters optional.
- Keep functions small and focused on one job.

## Practice

Write `is_palindrome(text)` that ignores spaces and case, and `count_words(sentence)` that returns a dictionary of word counts.

<!-- lesson: data-structures | Lists, Tuples, Dictionaries & Sets | 20 -->

Python has four core built-in collection types:

| Type | Example | Ordered | Mutable | Duplicates |
|---|---|---|---|---|
| list | `[1, 2, 3]` | yes | yes | yes |
| tuple | `(1, 2, 3)` | yes | no | yes |
| dict | `{"a": 1}` | yes (insertion) | yes | keys unique |
| set | `{1, 2, 3}` | no | yes | no |

## Lists

```python
fruits = ["apple", "banana", "mango"]
fruits.append("grape")
fruits.insert(1, "kiwi")
fruits.remove("banana")
print(fruits)            # ['apple', 'kiwi', 'mango', 'grape']
print(fruits[-1])        # grape
print(len(fruits))       # 4
fruits.sort()
```

### List comprehensions

```python
squares = [n * n for n in range(1, 6)]           # [1, 4, 9, 16, 25]
evens = [n for n in range(20) if n % 2 == 0]
```

## Tuples

Tuples are immutable — good for fixed groups of values:

```python
point = (3, 4)
x, y = point             # unpacking
```

## Dictionaries

Key → value pairs with fast lookups:

```python
student = {"name": "Asha", "age": 21, "course": "Python"}

print(student["name"])            # Asha
print(student.get("email", "-"))  # - (default when key is missing)
student["age"] = 22               # update
student["email"] = "asha@example.com"

for key, value in student.items():
    print(key, "→", value)
```

Counting with a dictionary:

```python
text = "learn solve grow learn"
counts = {}
for word in text.split():
    counts[word] = counts.get(word, 0) + 1
print(counts)   # {'learn': 2, 'solve': 1, 'grow': 1}
```

## Sets

Sets store unique values and support math-style operations:

```python
a = {"python", "java", "c"}
b = {"java", "javascript"}

print(a | b)    # union
print(a & b)    # intersection → {'java'}
print(a - b)    # difference
print(set([1, 1, 2, 3, 3]))   # {1, 2, 3}  remove duplicates
```

## Choosing the right structure

- Ordered collection you will change → **list**
- Fixed record → **tuple**
- Look up values by a key → **dict**
- Unique items / membership tests → **set**

## Practice

Given a list of student names and marks, build a dictionary of name → mark, print the topper, and print the set of students who scored above 75.

<!-- lesson: files-and-exceptions | Files, Exceptions & Modules | 15 -->

## Reading and writing files

Always use `with` — it closes the file automatically, even if an error happens:

```python
# write
with open("notes.txt", "w", encoding="utf-8") as f:
    f.write("Learn. Solve. Grow.\n")
    f.write("Python is fun!\n")

# read the whole file
with open("notes.txt", encoding="utf-8") as f:
    content = f.read()

# read line by line
with open("notes.txt", encoding="utf-8") as f:
    for line in f:
        print(line.strip())
```

| Mode | Meaning |
|---|---|
| `"r"` | read (default) |
| `"w"` | write — overwrites the file |
| `"a"` | append to the end |
| `"x"` | create — fails if the file exists |

## Working with CSV and JSON

```python
import csv, json

with open("marks.csv", newline="", encoding="utf-8") as f:
    for row in csv.DictReader(f):
        print(row["name"], row["marks"])

data = {"course": "Python", "lessons": 6}
with open("data.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2)
```

## Handling errors with exceptions

```python
try:
    number = int(input("Enter a number: "))
    result = 100 / number
except ValueError:
    print("That was not a valid number.")
except ZeroDivisionError:
    print("Cannot divide by zero.")
else:
    print(f"Result: {result}")
finally:
    print("Done.")   # always runs
```

Raise your own errors when input is invalid:

```python
def withdraw(balance, amount):
    if amount > balance:
        raise ValueError("Insufficient balance")
    return balance - amount
```

## Modules and packages

A **module** is just a `.py` file. Import code from the standard library, third-party packages or your own files:

```python
import math
from datetime import date
from random import choice

print(math.sqrt(144))          # 12.0
print(date.today())
print(choice(["red", "blue"]))
```

Install third-party packages with **pip**, ideally inside a virtual environment:

```bash
python -m venv .venv
.venv\Scripts\activate          # Windows  (source .venv/bin/activate on macOS/Linux)
pip install requests
```

## Key takeaways

- Use `with open(...)` for safe file handling.
- Catch specific exceptions; use `finally` for clean-up.
- Organise code into modules and manage packages with pip and virtual environments.

## Practice

Write a script that reads `marks.csv` (columns: `name,marks`), skips rows with invalid marks using `try/except`, and writes a `summary.json` with the average, highest and lowest marks.
