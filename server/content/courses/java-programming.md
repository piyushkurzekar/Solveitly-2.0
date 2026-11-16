<!-- lesson: introduction | Introduction to Java | 10 -->

Java is an object-oriented, strongly typed language created at Sun Microsystems (now Oracle). Its motto is **"Write once, run anywhere"**: Java code runs on any device that has a Java Virtual Machine. It powers enterprise back ends, Android apps, banking systems and big-data tools like Hadoop and Kafka.

## JDK, JRE and JVM

| Term | What it is |
|---|---|
| **JVM** (Java Virtual Machine) | Runs compiled Java bytecode on a specific platform. |
| **JRE** (Java Runtime Environment) | JVM + core libraries needed to *run* Java programs. |
| **JDK** (Java Development Kit) | JRE + compiler (`javac`) and tools needed to *develop* Java programs. |

Flow: `Hello.java` → **javac** → `Hello.class` (bytecode) → **JVM** → runs on Windows, Linux or macOS.

## Your first Java program

```java
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, Solveitly!");
    }
}
```

- Every Java program lives inside a **class**; the file name must match the public class (`Hello.java`).
- `public static void main(String[] args)` is the entry point.
- `System.out.println` prints a line of text.

Compile and run:

```bash
javac Hello.java
java Hello
```

Since Java 11 you can also run a single file directly: `java Hello.java`.

## Reading input

```java
import java.util.Scanner;

public class Greet {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Your name: ");
        String name = sc.nextLine();
        System.out.println("Welcome, " + name + "!");
        sc.close();
    }
}
```

## Key takeaways

- Java compiles to bytecode that the JVM runs on any platform.
- Install a JDK (e.g. Temurin or Oracle JDK 21 LTS) to write Java.
- Execution starts at `main`, which must be inside a class.

## Practice

Write a program that reads two integers with `Scanner` and prints their sum, difference and product.

<!-- lesson: variables-and-operators | Variables, Types & Operators | 15 -->

Java is **statically typed**: every variable has a declared type that is checked at compile time.

## Primitive types

| Type | Size | Example |
|---|---|---|
| `byte` | 1 byte | `byte b = 100;` |
| `short` | 2 bytes | `short s = 2000;` |
| `int` | 4 bytes | `int count = 42;` |
| `long` | 8 bytes | `long views = 9_000_000_000L;` |
| `float` | 4 bytes | `float rate = 4.5f;` |
| `double` | 8 bytes | `double pi = 3.14159;` |
| `char` | 2 bytes | `char grade = 'A';` |
| `boolean` | 1 bit* | `boolean active = true;` |

## Reference types

Everything else — `String`, arrays and objects of classes — is a **reference type**:

```java
String course = "Java";
int[] marks = {78, 92, 65};
```

`var` (Java 10+) lets the compiler infer the type of local variables:

```java
var total = 0;            // int
var names = new java.util.ArrayList<String>();
```

## Constants

```java
final double GST = 0.18;   // cannot be reassigned
```

## Operators

```java
int a = 17, b = 5;
System.out.println(a / b);        // 3   integer division
System.out.println(a % b);        // 2
System.out.println((double) a / b); // 3.4  casting
System.out.println(a > b && b > 0); // true

a += 3;   // 20
a++;      // 21
```

## Strings

```java
String name = "Solveitly";
System.out.println(name.length());        // 9
System.out.println(name.toUpperCase());   // SOLVEITLY
System.out.println(name.charAt(0));       // S
System.out.println(name.contains("it"));  // true
System.out.println(name.equals("Solveitly")); // true
```

> Always compare strings with `.equals()`, not `==`. The `==` operator compares references, not text.

Formatting:

```java
double price = 499.0;
System.out.printf("Price: %.2f%n", price);
String msg = String.format("%s has %d lessons", "Java", 6);
```

## Key takeaways

- Choose the smallest suitable type; `int` and `double` are the usual defaults.
- Use `final` for constants.
- Compare strings with `equals()`.

## Practice

Read a student's marks in 5 subjects, then print the total, percentage (with 2 decimals) and whether they passed (percentage ≥ 40).

<!-- lesson: control-flow-and-methods | Control Flow and Methods | 15 -->

## if / else and switch

```java
int marks = 82;
if (marks >= 90) {
    System.out.println("A");
} else if (marks >= 75) {
    System.out.println("B");
} else {
    System.out.println("C");
}
```

Modern switch expressions (Java 14+) are concise and safe — no fall-through:

```java
int day = 6;
String type = switch (day) {
    case 1, 2, 3, 4, 5 -> "Weekday";
    case 6, 7 -> "Weekend";
    default -> "Invalid";
};
```

## Loops

```java
for (int i = 1; i <= 5; i++) {
    System.out.print(i + " ");
}

int[] scores = {70, 85, 90};
for (int s : scores) {          // enhanced for-each loop
    System.out.println(s);
}

int n = 10;
while (n > 0) {
    n -= 3;
}

do {
    System.out.println("Runs at least once");
} while (false);
```

## Methods

A **method** is a function that belongs to a class.

```java
public class MathUtils {

    static int square(int x) {
        return x * x;
    }

    static boolean isPrime(int n) {
        if (n < 2) return false;
        for (int i = 2; i * i <= n; i++) {
            if (n % i == 0) return false;
        }
        return true;
    }

    // method overloading: same name, different parameters
    static double area(double radius) {
        return Math.PI * radius * radius;
    }

    static double area(double width, double height) {
        return width * height;
    }

    public static void main(String[] args) {
        System.out.println(square(7));        // 49
        System.out.println(isPrime(29));      // true
        System.out.println(area(2));          // 12.566...
        System.out.println(area(3, 4));       // 12.0
    }
}
```

## Pass by value

Java always passes **copies**: for primitives the value is copied; for objects the *reference* is copied, so a method can change the object's contents but cannot make the caller's variable point to a different object.

## Key takeaways

- Use switch expressions with `->` for clean multi-way branching.
- The enhanced `for` loop is the easiest way to iterate over arrays and collections.
- Overloading lets one method name handle different parameter lists.

## Practice

Write a method `int reverse(int n)` that reverses the digits of a number and use it to check whether a number is a palindrome.

<!-- lesson: classes-and-objects | Classes and Objects | 20 -->

A **class** is a blueprint; an **object** is an instance created from it with `new`.

```java
public class Student {
    // fields (state)
    private String name;
    private int rollNo;
    private double[] marks;

    // constructor
    public Student(String name, int rollNo, double[] marks) {
        this.name = name;
        this.rollNo = rollNo;
        this.marks = marks;
    }

    // methods (behaviour)
    public double average() {
        double sum = 0;
        for (double m : marks) sum += m;
        return marks.length == 0 ? 0 : sum / marks.length;
    }

    // getter
    public String getName() {
        return name;
    }

    @Override
    public String toString() {
        return "Student{" + name + ", roll=" + rollNo + "}";
    }
}
```

```java
public class Main {
    public static void main(String[] args) {
        Student s = new Student("Asha", 7, new double[]{82, 91, 76});
        System.out.println(s);                  // Student{Asha, roll=7}
        System.out.printf("%.2f%n", s.average()); // 83.00
    }
}
```

## Encapsulation

- Make fields **`private`** so they can only be changed through methods.
- Provide **getters/setters** only where needed, and validate input in setters.

```java
public void setRollNo(int rollNo) {
    if (rollNo <= 0) throw new IllegalArgumentException("Roll number must be positive");
    this.rollNo = rollNo;
}
```

## The `this` keyword

`this` refers to the current object — used to distinguish fields from parameters with the same name.

## static members

`static` fields and methods belong to the **class**, not to individual objects:

```java
public class Counter {
    private static int created = 0;
    public Counter() { created++; }
    public static int getCreated() { return created; }
}
```

## Records (Java 16+)

For simple data carriers, a `record` generates the constructor, getters, `equals`, `hashCode` and `toString` for you:

```java
public record Course(String title, int lessons) {}

Course c = new Course("Java", 6);
System.out.println(c.title());   // Java
```

## Key takeaways

- Use constructors to put objects into a valid state.
- Keep fields private; expose behaviour through methods.
- `static` members are shared by all objects of a class.

## Practice

Create a `BankAccount` class with `deposit`, `withdraw` (rejecting overdrafts) and `getBalance`, and a static counter of how many accounts were opened.

<!-- lesson: inheritance-and-interfaces | Inheritance, Interfaces & Polymorphism | 20 -->

## Inheritance with `extends`

```java
public class Employee {
    protected String name;
    protected double salary;

    public Employee(String name, double salary) {
        this.name = name;
        this.salary = salary;
    }

    public double annualPay() {
        return salary * 12;
    }
}

public class Manager extends Employee {
    private double bonus;

    public Manager(String name, double salary, double bonus) {
        super(name, salary);      // call the parent constructor
        this.bonus = bonus;
    }

    @Override
    public double annualPay() {
        return super.annualPay() + bonus;
    }
}
```

Java supports **single inheritance** of classes: a class can `extend` only one class.

## Abstract classes

An abstract class cannot be instantiated and can declare abstract methods that subclasses must implement:

```java
public abstract class Shape {
    public abstract double area();

    public void describe() {
        System.out.printf("%s with area %.2f%n", getClass().getSimpleName(), area());
    }
}

public class Circle extends Shape {
    private final double r;
    public Circle(double r) { this.r = r; }
    @Override public double area() { return Math.PI * r * r; }
}
```

## Interfaces

An **interface** defines a contract — what a class can do. A class can implement **many** interfaces:

```java
public interface Payable {
    double amountDue();
}

public interface Printable {
    default void print() {                 // default method with a body
        System.out.println(this);
    }
}

public class Invoice implements Payable, Printable {
    private final double total;
    public Invoice(double total) { this.total = total; }
    @Override public double amountDue() { return total; }
    @Override public String toString() { return "Invoice ₹" + total; }
}
```

## Polymorphism

Code written against a parent type works with every subtype; the correct overridden method runs at run time:

```java
List<Shape> shapes = List.of(new Circle(1), new Circle(2.5));
for (Shape s : shapes) {
    s.describe();
}

List<Payable> bills = List.of(new Invoice(1200), new Invoice(450));
double total = 0;
for (Payable p : bills) total += p.amountDue();
```

## Abstract class vs interface

| Abstract class | Interface |
|---|---|
| Can have fields with state | Only constants (`static final`) |
| One per class (`extends`) | Many per class (`implements`) |
| Use for a shared base with common code | Use for a capability / contract |

## Key takeaways

- `extends` reuses a class; `super` calls the parent.
- `@Override` makes overriding explicit and checked.
- Program to interfaces (`List`, `Payable`) for flexible code.

## Practice

Create an interface `Vehicle` with `int wheels()` and `String fuel()`, implement it in `Car` and `Bike`, and print details of a list of vehicles.

<!-- lesson: collections-and-exceptions | Collections and Exceptions | 20 -->

## The Collections Framework

`java.util` provides ready-made data structures:

| Interface | Common implementation | Use |
|---|---|---|
| `List` | `ArrayList` | ordered, allows duplicates |
| `Set` | `HashSet`, `TreeSet` | unique elements |
| `Map` | `HashMap`, `TreeMap` | key → value pairs |
| `Queue` / `Deque` | `ArrayDeque` | FIFO / LIFO |

```java
import java.util.*;

public class Demo {
    public static void main(String[] args) {
        List<String> courses = new ArrayList<>();
        courses.add("Java");
        courses.add("Python");
        courses.add("Java");
        System.out.println(courses);          // [Java, Python, Java]

        Set<String> unique = new HashSet<>(courses);
        System.out.println(unique.size());    // 2

        Map<String, Integer> enrolled = new HashMap<>();
        enrolled.put("Java", 120);
        enrolled.put("Python", 200);
        enrolled.merge("Java", 1, Integer::sum);   // 121

        for (Map.Entry<String, Integer> e : enrolled.entrySet()) {
            System.out.println(e.getKey() + " -> " + e.getValue());
        }
    }
}
```

## Streams

Streams let you process collections declaratively:

```java
List<Integer> marks = List.of(45, 82, 91, 67, 38, 74);

double avg = marks.stream().mapToInt(Integer::intValue).average().orElse(0);
List<Integer> passed = marks.stream()
        .filter(m -> m >= 40)
        .sorted()
        .toList();          // [45, 67, 74, 82, 91]
```

## Exceptions

Exceptions signal errors. Handle them with `try / catch / finally`:

```java
try {
    int[] data = {1, 2, 3};
    System.out.println(data[5]);
} catch (ArrayIndexOutOfBoundsException e) {
    System.out.println("Invalid index: " + e.getMessage());
} finally {
    System.out.println("Always runs");
}
```

- **Checked exceptions** (e.g. `IOException`) must be caught or declared with `throws`.
- **Unchecked exceptions** (e.g. `NullPointerException`, `IllegalArgumentException`) extend `RuntimeException`.

### try-with-resources

Resources that implement `AutoCloseable` are closed automatically:

```java
import java.nio.file.*;
import java.io.*;

try (BufferedReader reader = Files.newBufferedReader(Path.of("notes.txt"))) {
    String line;
    while ((line = reader.readLine()) != null) {
        System.out.println(line);
    }
} catch (IOException e) {
    System.out.println("Could not read file: " + e.getMessage());
}
```

### Custom exceptions

```java
public class InsufficientFundsException extends Exception {
    public InsufficientFundsException(String message) {
        super(message);
    }
}
```

## Key takeaways

- Declare variables by interface type (`List<String> list = new ArrayList<>()`).
- Use streams for filtering, mapping and summarising data.
- Catch specific exceptions and use try-with-resources for files and connections.

## Practice

Read a list of words, store word frequencies in a `HashMap`, and print the three most frequent words using a stream sorted by count.
