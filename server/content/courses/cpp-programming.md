<!-- lesson: from-c-to-cpp | From C to C++ | 10 -->

C++ was created by **Bjarne Stroustrup** as "C with classes". It keeps C's speed and adds object-oriented programming, generic programming (templates) and a huge standard library. Games, browsers, trading systems and game engines are commonly written in C++.

## Hello, C++

```cpp
#include <iostream>
#include <string>

int main() {
    std::string name;
    std::cout << "Enter your name: ";
    std::cin >> name;
    std::cout << "Hello, " << name << "!\n";
    return 0;
}
```

- `#include <iostream>` gives us `std::cout` (output) and `std::cin` (input).
- `<<` sends data to the output stream, `>>` reads from the input stream.
- `std::string` is a real string type — no more manual `char` arrays.

Compile with:

```bash
g++ -std=c++17 main.cpp -o main
./main
```

## Namespaces

Standard library names live in the `std` namespace. You can create your own to avoid name clashes:

```cpp
namespace math {
    int square(int x) { return x * x; }
}

int main() {
    std::cout << math::square(6) << '\n';   // 36
}
```

## References

A **reference** is another name for an existing variable — simpler than pointers for passing by reference:

```cpp
void addBonus(int &salary) {
    salary += 5000;
}

int main() {
    int pay = 30000;
    addBonus(pay);
    std::cout << pay << '\n';   // 35000
}
```

Use `const` references to pass large objects without copying:

```cpp
void print(const std::string &text) {
    std::cout << text << '\n';
}
```

## auto and range-based for

```cpp
#include <vector>

std::vector<int> scores = {90, 75, 88};
for (auto score : scores) {
    std::cout << score << ' ';
}
```

## Key takeaways

- C++ is (almost) a superset of C with many modern additions.
- Prefer `std::string`, `std::vector` and references over raw arrays and pointers.
- Use `const &` for read-only parameters of large types.

## Practice

Read three numbers with `std::cin` and print their sum and average using `std::cout`.

<!-- lesson: classes-and-objects | Classes and Objects | 15 -->

**Object-oriented programming (OOP)** models a program as objects that combine **data** (attributes) and **behaviour** (methods). A **class** is the blueprint; an **object** is an instance of it.

## Defining a class

```cpp
#include <iostream>
#include <string>

class BankAccount {
private:
    std::string owner;
    double balance = 0.0;

public:
    void setOwner(const std::string &name) { owner = name; }

    void deposit(double amount) {
        if (amount > 0) balance += amount;
    }

    bool withdraw(double amount) {
        if (amount <= 0 || amount > balance) return false;
        balance -= amount;
        return true;
    }

    double getBalance() const { return balance; }
};

int main() {
    BankAccount acc;
    acc.setOwner("Asha");
    acc.deposit(1000);
    acc.withdraw(250);
    std::cout << acc.getBalance() << '\n';   // 750
}
```

## Access specifiers

| Specifier | Who can access |
|---|---|
| `public` | everyone |
| `private` | only the class itself (default for `class`) |
| `protected` | the class and its derived classes |

## Encapsulation

Keeping `balance` **private** means nobody can set it to a negative value from outside. All changes go through methods that enforce the rules. This is **encapsulation** — one of the four pillars of OOP (with abstraction, inheritance and polymorphism).

## const member functions

`double getBalance() const` promises not to modify the object. Mark every method that only reads data as `const`.

## Separating declaration and definition

In bigger projects classes are split into a header and a source file:

```cpp
// Rectangle.h
class Rectangle {
public:
    Rectangle(double w, double h);
    double area() const;
private:
    double width, height;
};

// Rectangle.cpp
#include "Rectangle.h"
Rectangle::Rectangle(double w, double h) : width(w), height(h) {}
double Rectangle::area() const { return width * height; }
```

## Key takeaways

- A class bundles data and the functions that operate on it.
- Make data `private` and expose behaviour through `public` methods.
- Mark read-only methods `const`.

## Practice

Create a `Student` class with a name and three marks, and a method `average()` that returns the average mark.

<!-- lesson: constructors-and-raii | Constructors, Destructors & RAII | 15 -->

A **constructor** runs automatically when an object is created; a **destructor** runs when it is destroyed. Together they let C++ manage resources safely.

## Constructors

```cpp
#include <iostream>
#include <string>

class Book {
public:
    // default constructor
    Book() : title("Untitled"), pages(0) {}

    // parameterised constructor with a member initialiser list
    Book(std::string t, int p) : title(std::move(t)), pages(p) {}

    void show() const {
        std::cout << title << " (" << pages << " pages)\n";
    }

private:
    std::string title;
    int pages;
};

int main() {
    Book a;                         // Untitled (0 pages)
    Book b("Clean Code", 464);      // Clean Code (464 pages)
    a.show();
    b.show();
}
```

Prefer the **member initialiser list** (`: title(t), pages(p)`) — it initialises members directly instead of assigning them later.

## Destructors

```cpp
class Logger {
public:
    Logger()  { std::cout << "Logger started\n"; }
    ~Logger() { std::cout << "Logger stopped\n"; }
};

int main() {
    {
        Logger log;     // "Logger started"
    }                   // leaving the scope → "Logger stopped"
}
```

## RAII — Resource Acquisition Is Initialization

RAII is the most important idea in C++: **acquire a resource in the constructor, release it in the destructor**. Because destructors run automatically when an object goes out of scope (even when an exception is thrown), resources can never leak.

```cpp
#include <fstream>

void saveReport() {
    std::ofstream file("report.txt");   // opens the file
    file << "Sales: 1200\n";
}   // file is closed automatically here
```

`std::ofstream`, `std::vector`, `std::string`, `std::unique_ptr` and `std::lock_guard` all use RAII.

## Copying objects

C++ generates a **copy constructor** and **copy assignment operator** for you. If your class owns a raw resource (like memory from `new`), you must write them yourself — or better, use RAII types so the defaults are correct. This is known as the **Rule of Zero**: if you only use RAII members, you don't need to write copy/move operations or a destructor.

## Key takeaways

- Constructors initialise objects; destructors clean up.
- Use member initialiser lists.
- RAII ties resource lifetime to object lifetime — the C++ way to avoid leaks.

## Practice

Write a `Timer` class that records the start time in its constructor (`std::chrono::steady_clock::now()`) and prints the elapsed milliseconds in its destructor.

<!-- lesson: inheritance-and-polymorphism | Inheritance and Polymorphism | 20 -->

**Inheritance** lets a class reuse and extend another class. **Polymorphism** lets you treat different derived objects through a common base interface, with the correct behaviour chosen at run time.

## Inheritance

```cpp
#include <iostream>
#include <string>

class Employee {
public:
    Employee(std::string n, double s) : name(std::move(n)), salary(s) {}
    void introduce() const { std::cout << "I am " << name << '\n'; }
protected:
    std::string name;
    double salary;
};

class Manager : public Employee {
public:
    Manager(std::string n, double s, int team)
        : Employee(std::move(n), s), teamSize(team) {}
    void showTeam() const { std::cout << name << " manages " << teamSize << " people\n"; }
private:
    int teamSize;
};
```

`Manager` **is an** `Employee`: it inherits `introduce()` and adds `showTeam()`.

## Virtual functions and polymorphism

```cpp
#include <iostream>
#include <memory>
#include <vector>

class Shape {
public:
    virtual double area() const = 0;   // pure virtual → Shape is abstract
    virtual ~Shape() = default;        // always make base destructors virtual
};

class Circle : public Shape {
public:
    explicit Circle(double r) : radius(r) {}
    double area() const override { return 3.14159 * radius * radius; }
private:
    double radius;
};

class Square : public Shape {
public:
    explicit Square(double s) : side(s) {}
    double area() const override { return side * side; }
private:
    double side;
};

int main() {
    std::vector<std::unique_ptr<Shape>> shapes;
    shapes.push_back(std::make_unique<Circle>(2.0));
    shapes.push_back(std::make_unique<Square>(3.0));

    for (const auto &s : shapes) {
        std::cout << s->area() << '\n';   // 12.5664, then 9
    }
}
```

- `virtual` enables **dynamic dispatch** — the right `area()` is called for each object.
- `= 0` makes a function **pure virtual**; a class with one is **abstract** and cannot be instantiated.
- `override` asks the compiler to check that you really override a base method.
- A **virtual destructor** in the base class ensures derived objects are destroyed correctly.

## When to use inheritance

Use it for genuine "is-a" relationships (a `Circle` *is a* `Shape`). For "has-a" relationships (a `Car` *has an* `Engine`) prefer **composition** — store the other object as a member.

## Key takeaways

- `class Derived : public Base` inherits public and protected members.
- Mark overridable methods `virtual` and implementations `override`.
- Use base-class pointers/references to write code that works for every derived type.

## Practice

Create an abstract class `Animal` with a pure virtual `speak()` method and derived classes `Dog` and `Cat`. Store them in a `std::vector<std::unique_ptr<Animal>>` and call `speak()` on each.

<!-- lesson: templates-and-stl | Templates and the STL | 20 -->

**Templates** let you write code once and use it with many types. The **Standard Template Library (STL)** is built on templates and gives you ready-made containers, iterators and algorithms.

## Function templates

```cpp
template <typename T>
T maxOf(T a, T b) {
    return (a > b) ? a : b;
}

int main() {
    std::cout << maxOf(3, 9) << '\n';          // 9
    std::cout << maxOf(2.5, 1.5) << '\n';      // 2.5
    std::cout << maxOf<std::string>("apple", "mango") << '\n';   // mango
}
```

## Class templates

```cpp
template <typename T>
class Box {
public:
    explicit Box(T v) : value(v) {}
    T get() const { return value; }
private:
    T value;
};

Box<int> a(42);
Box<std::string> b("hello");
```

## STL containers

| Container | Use it for |
|---|---|
| `std::vector` | dynamic array — the default choice |
| `std::array` | fixed-size array |
| `std::list` | frequent inserts/removals in the middle |
| `std::map` | sorted key → value pairs |
| `std::unordered_map` | fast key → value lookup (hash table) |
| `std::set` | unique sorted values |
| `std::queue`, `std::stack` | FIFO / LIFO |

```cpp
#include <iostream>
#include <map>
#include <string>
#include <vector>

int main() {
    std::vector<int> nums = {5, 2, 9, 1};
    nums.push_back(7);

    std::map<std::string, int> stock;
    stock["apples"] = 50;
    stock["mangoes"] = 20;

    for (const auto &[item, qty] : stock) {   // structured bindings (C++17)
        std::cout << item << ": " << qty << '\n';
    }
}
```

## STL algorithms

```cpp
#include <algorithm>
#include <numeric>
#include <vector>

std::vector<int> v = {5, 2, 9, 1, 7};

std::sort(v.begin(), v.end());                               // 1 2 5 7 9
auto it = std::find(v.begin(), v.end(), 7);                  // iterator to 7
int total = std::accumulate(v.begin(), v.end(), 0);          // 24
int evens = std::count_if(v.begin(), v.end(),
                          [](int x) { return x % 2 == 0; }); // 1
```

The last line uses a **lambda** — a small inline function: `[](int x) { return x % 2 == 0; }`.

## Key takeaways

- Templates generate type-specific code at compile time.
- Reach for `std::vector` and `std::unordered_map` first.
- Prefer STL algorithms over hand-written loops — they are tested and expressive.

## Practice

Read words until the user types `end`, store them in a `std::vector<std::string>`, sort them and count how often each word appears using a `std::map`.

<!-- lesson: modern-cpp | Smart Pointers & Modern C++ | 15 -->

"Modern C++" (C++11 and later) makes code safer and shorter. The biggest change: you should almost never write `new` and `delete` yourself.

## Smart pointers

Smart pointers are RAII wrappers around heap memory, from `<memory>`:

| Type | Ownership |
|---|---|
| `std::unique_ptr<T>` | single owner; memory freed when it goes out of scope |
| `std::shared_ptr<T>` | shared ownership with reference counting |
| `std::weak_ptr<T>` | non-owning observer of a `shared_ptr` (breaks cycles) |

```cpp
#include <iostream>
#include <memory>

struct Player {
    std::string name;
    explicit Player(std::string n) : name(std::move(n)) { std::cout << "Created " << name << '\n'; }
    ~Player() { std::cout << "Destroyed " << name << '\n'; }
};

int main() {
    auto p1 = std::make_unique<Player>("Ravi");
    // auto copy = p1;              // error: unique_ptr cannot be copied
    auto p2 = std::move(p1);        // ownership moves to p2

    auto s1 = std::make_shared<Player>("Meera");
    {
        auto s2 = s1;                               // two owners
        std::cout << s1.use_count() << '\n';        // 2
    }
    std::cout << s1.use_count() << '\n';            // 1
}   // all players destroyed automatically
```

## Move semantics

`std::move` lets an object hand over its resources instead of copying them — huge savings for large strings and vectors:

```cpp
std::vector<int> big(1'000'000, 1);
std::vector<int> other = std::move(big);   // no element is copied
```

## Lambdas

```cpp
int threshold = 50;
auto isHigh = [threshold](int score) { return score > threshold; };
std::cout << isHigh(72) << '\n';   // 1 (true)
```

The `[threshold]` part is the **capture list** — which outside variables the lambda can use.

## Other handy features

```cpp
auto x = 3.5;                                  // type deduction
constexpr int MAX_USERS = 100;                 // compile-time constant
std::optional<int> findAge(const std::string &name);   // value that may be missing (C++17)
enum class Color { Red, Green, Blue };         // scoped, type-safe enum
```

## Key takeaways

- Use `std::make_unique` / `std::make_shared` instead of `new`.
- `unique_ptr` should be your default; use `shared_ptr` only for real shared ownership.
- Move semantics and lambdas make modern C++ both fast and expressive.

## Practice

Refactor the `Shape` example from the polymorphism lesson so a function `std::unique_ptr<Shape> makeShape(char type, double size)` creates shapes, and print the total area of a list of shapes.
