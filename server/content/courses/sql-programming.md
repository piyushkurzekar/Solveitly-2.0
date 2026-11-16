<!-- lesson: introduction | Introduction to Databases & SQL | 10 -->

A **database** is an organised collection of data. A **relational database** stores data in **tables** made of rows and columns, and links tables together using keys. **SQL** (Structured Query Language) is the standard language for working with relational databases such as MySQL, PostgreSQL, SQLite, SQL Server and Oracle.

## Tables, rows and columns

A `students` table:

| id | name | city | age |
|---|---|---|---|
| 1 | Asha | Pune | 21 |
| 2 | Ravi | Nagpur | 23 |
| 3 | Meera | Mumbai | 22 |

- A **column** defines one attribute and its data type (`name` is text, `age` is a number).
- A **row** (or record) is one student.

## Keys

- **Primary key** — uniquely identifies each row (`id`). It can never be `NULL` or duplicated.
- **Foreign key** — a column that refers to the primary key of another table, creating a relationship.

```
students (id, name, city)          enrollments (id, student_id → students.id, course)
```

## Categories of SQL commands

| Category | Purpose | Commands |
|---|---|---|
| DDL — Data Definition | define structure | `CREATE`, `ALTER`, `DROP` |
| DML — Data Manipulation | change data | `INSERT`, `UPDATE`, `DELETE` |
| DQL — Data Query | read data | `SELECT` |
| DCL — Data Control | permissions | `GRANT`, `REVOKE` |
| TCL — Transaction Control | transactions | `COMMIT`, `ROLLBACK` |

## Your first query

```sql
SELECT name, city
FROM students;
```

SQL keywords are not case-sensitive (`select` works), but writing them in UPPERCASE makes queries easier to read. End statements with a semicolon.

## Practising SQL

You can practise without installing anything using an online playground (for example SQLite Online or DB Fiddle), or install **MySQL** or **PostgreSQL** locally.

## Key takeaways

- Relational databases store data in related tables.
- Primary keys identify rows; foreign keys connect tables.
- `SELECT` reads data; `INSERT`, `UPDATE` and `DELETE` change it.

## Practice

Sketch two tables for a library — `books` and `members` — and decide which column should be the primary key of each.

<!-- lesson: select-queries | Retrieving Data with SELECT | 15 -->

We will use this `employees` table:

| id | name | department | salary | city | joined_on |
|---|---|---|---|---|---|
| 1 | Asha | Engineering | 85000 | Pune | 2022-03-01 |
| 2 | Ravi | Sales | 52000 | Nagpur | 2021-07-15 |
| 3 | Meera | Engineering | 98000 | Mumbai | 2020-01-10 |
| 4 | Karan | HR | 45000 | Pune | 2023-05-20 |
| 5 | Sneha | Sales | 61000 | Mumbai | 2022-11-02 |

## Selecting columns

```sql
SELECT * FROM employees;                  -- all columns
SELECT name, salary FROM employees;       -- specific columns
SELECT name, salary * 12 AS annual_salary FROM employees;   -- calculated column with alias
SELECT DISTINCT department FROM employees;                  -- unique values
```

## Filtering with WHERE

```sql
SELECT name, salary
FROM employees
WHERE department = 'Engineering';

SELECT name FROM employees WHERE salary >= 60000 AND city = 'Mumbai';
SELECT name FROM employees WHERE city IN ('Pune', 'Nagpur');
SELECT name FROM employees WHERE salary BETWEEN 50000 AND 90000;
SELECT name FROM employees WHERE name LIKE 'S%';      -- starts with S
SELECT name FROM employees WHERE city IS NULL;        -- test for NULL with IS
```

| Operator | Meaning |
|---|---|
| `=  <>  <  >  <=  >=` | comparison |
| `AND`, `OR`, `NOT` | combine conditions |
| `IN (...)` | matches any value in a list |
| `BETWEEN a AND b` | inclusive range |
| `LIKE` | pattern: `%` = any characters, `_` = one character |
| `IS NULL` | value is missing |

## Sorting and limiting

```sql
SELECT name, salary
FROM employees
ORDER BY salary DESC          -- highest first
LIMIT 3;                      -- top 3 (SQL Server uses SELECT TOP 3)
```

Sort by several columns:

```sql
SELECT name, department, salary
FROM employees
ORDER BY department ASC, salary DESC;
```

## Order of clauses

```sql
SELECT   columns
FROM     table
WHERE    row filter
ORDER BY sort
LIMIT    number;
```

## Key takeaways

- Select only the columns you need instead of `*` in real applications.
- Strings use single quotes: `'Pune'`.
- `NULL` is compared with `IS NULL`, never `= NULL`.

## Practice

Write queries to find (1) all Sales employees earning more than 55,000, (2) employees who joined in 2022, and (3) the two lowest-paid employees.

<!-- lesson: aggregate-functions | Aggregates and GROUP BY | 15 -->

Aggregate functions summarise many rows into a single value.

| Function | Returns |
|---|---|
| `COUNT(*)` | number of rows |
| `SUM(col)` | total |
| `AVG(col)` | average |
| `MIN(col)` / `MAX(col)` | smallest / largest |

```sql
SELECT COUNT(*)      AS total_employees,
       SUM(salary)   AS payroll,
       AVG(salary)   AS average_salary,
       MAX(salary)   AS highest_salary
FROM employees;
```

## GROUP BY

`GROUP BY` splits rows into groups and calculates an aggregate for each group:

```sql
SELECT department,
       COUNT(*)            AS headcount,
       ROUND(AVG(salary))  AS avg_salary
FROM employees
GROUP BY department
ORDER BY avg_salary DESC;
```

Result:

| department | headcount | avg_salary |
|---|---|---|
| Engineering | 2 | 91500 |
| Sales | 2 | 56500 |
| HR | 1 | 45000 |

Every column in the `SELECT` list must either be in `GROUP BY` or be inside an aggregate function.

## HAVING — filter groups

`WHERE` filters rows **before** grouping; `HAVING` filters groups **after** aggregation:

```sql
SELECT city, COUNT(*) AS employees
FROM employees
WHERE salary > 40000          -- row filter
GROUP BY city
HAVING COUNT(*) >= 2;         -- group filter
```

## Logical order of execution

SQL is written in one order but executed in another:

1. `FROM`
2. `WHERE`
3. `GROUP BY`
4. `HAVING`
5. `SELECT`
6. `ORDER BY`
7. `LIMIT`

That is why you cannot use a `SELECT` alias inside `WHERE` in most databases.

## CASE expressions

```sql
SELECT name,
       salary,
       CASE
           WHEN salary >= 80000 THEN 'Senior'
           WHEN salary >= 50000 THEN 'Mid'
           ELSE 'Junior'
       END AS band
FROM employees;
```

## Key takeaways

- Aggregates turn many rows into one value per group.
- Use `WHERE` for rows and `HAVING` for groups.
- `CASE` adds if/else logic inside a query.

## Practice

Find the total salary paid per city, show only cities where the total exceeds 100,000, and sort by the total descending.

<!-- lesson: joins | Combining Tables with JOINs | 20 -->

Real databases split data across tables to avoid repetition. **JOINs** combine them again in queries.

```sql
-- customers
| id | name  | city   |
| 1  | Asha  | Pune   |
| 2  | Ravi  | Nagpur |
| 3  | Meera | Mumbai |

-- orders
| id | customer_id | amount | order_date |
| 101 | 1 | 1200 | 2024-01-05 |
| 102 | 1 | 450  | 2024-02-11 |
| 103 | 2 | 3000 | 2024-02-20 |
| 104 | 9 | 700  | 2024-03-01 |   -- customer 9 does not exist
```

## INNER JOIN — only matching rows

```sql
SELECT c.name, o.id AS order_id, o.amount
FROM customers AS c
INNER JOIN orders AS o ON o.customer_id = c.id;
```

Returns orders 101, 102 (Asha) and 103 (Ravi). Meera (no orders) and order 104 (no customer) are left out.

## LEFT JOIN — all rows from the left table

```sql
SELECT c.name, o.amount
FROM customers AS c
LEFT JOIN orders AS o ON o.customer_id = c.id;
```

Meera appears with `amount = NULL`. Find customers who never ordered:

```sql
SELECT c.name
FROM customers AS c
LEFT JOIN orders AS o ON o.customer_id = c.id
WHERE o.id IS NULL;
```

## RIGHT and FULL OUTER JOIN

- `RIGHT JOIN` keeps every row from the right table (order 104 would appear with `NULL` customer).
- `FULL OUTER JOIN` keeps unmatched rows from both sides (not supported in MySQL — combine a LEFT and RIGHT join with `UNION`).

| Join | Rows returned |
|---|---|
| INNER | only matches |
| LEFT | all left + matches |
| RIGHT | all right + matches |
| FULL | everything |

## Joins with aggregates

```sql
SELECT c.name,
       COUNT(o.id)            AS orders,
       COALESCE(SUM(o.amount), 0) AS total_spent
FROM customers AS c
LEFT JOIN orders AS o ON o.customer_id = c.id
GROUP BY c.id, c.name
ORDER BY total_spent DESC;
```

`COALESCE` replaces `NULL` with a default value.

## Self join

Join a table to itself, e.g. employees and their managers:

```sql
SELECT e.name AS employee, m.name AS manager
FROM employees AS e
LEFT JOIN employees AS m ON e.manager_id = m.id;
```

## Subqueries

```sql
SELECT name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);
```

## Key takeaways

- Always join on the key columns that relate the tables.
- Use short aliases (`c`, `o`) to keep queries readable.
- `LEFT JOIN … WHERE right.id IS NULL` finds rows without a match.

## Practice

Using `students`, `courses` and an `enrollments(student_id, course_id)` table, list each course with the number of enrolled students, including courses with zero students.

<!-- lesson: modifying-data | Creating Tables & Modifying Data | 15 -->

## CREATE TABLE

```sql
CREATE TABLE courses (
    id          INT PRIMARY KEY AUTO_INCREMENT,   -- PostgreSQL: SERIAL or GENERATED ALWAYS AS IDENTITY
    title       VARCHAR(120) NOT NULL UNIQUE,
    category    VARCHAR(50)  NOT NULL,
    price       DECIMAL(8,2) NOT NULL DEFAULT 0 CHECK (price >= 0),
    created_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE enrollments (
    id          INT PRIMARY KEY AUTO_INCREMENT,
    student_id  INT NOT NULL,
    course_id   INT NOT NULL,
    enrolled_on DATE NOT NULL,
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (course_id)  REFERENCES courses(id) ON DELETE CASCADE,
    UNIQUE (student_id, course_id)
);
```

## Constraints

| Constraint | Guarantees |
|---|---|
| `PRIMARY KEY` | unique, not null identifier |
| `FOREIGN KEY` | value exists in the referenced table |
| `NOT NULL` | a value is required |
| `UNIQUE` | no duplicates |
| `CHECK` | value satisfies a condition |
| `DEFAULT` | value used when none is given |

## INSERT

```sql
INSERT INTO courses (title, category, price)
VALUES ('SQL Programming', 'Databases', 0);

INSERT INTO courses (title, category, price)
VALUES ('Python Programming', 'Programming', 0),
       ('Java Programming',   'Programming', 0);
```

## UPDATE

```sql
UPDATE courses
SET price = 499
WHERE title = 'Java Programming';
```

> ⚠️ An `UPDATE` or `DELETE` **without `WHERE`** changes every row in the table. Run the matching `SELECT` first to check which rows will be affected.

## DELETE

```sql
DELETE FROM enrollments WHERE enrolled_on < '2020-01-01';
```

## ALTER and DROP

```sql
ALTER TABLE courses ADD COLUMN level VARCHAR(20) DEFAULT 'Beginner';
ALTER TABLE courses DROP COLUMN level;
DROP TABLE IF EXISTS old_logs;
```

## Transactions

A transaction groups statements so they all succeed or all fail:

```sql
START TRANSACTION;           -- BEGIN in PostgreSQL
UPDATE accounts SET balance = balance - 500 WHERE id = 1;
UPDATE accounts SET balance = balance + 500 WHERE id = 2;
COMMIT;                      -- or ROLLBACK to undo
```

## Key takeaways

- Constraints protect data quality at the database level.
- Always use `WHERE` with `UPDATE` and `DELETE`.
- Wrap related changes in a transaction.

## Practice

Create a `products` table with suitable constraints, insert five products, increase the price of one category by 10% with `UPDATE`, and delete products that are out of stock.

<!-- lesson: database-design | Database Design & Normalization | 15 -->

Good database design avoids duplicated data and makes it hard to store inconsistent information.

## The problem with one big table

| order_id | customer_name | customer_phone | product | price |
|---|---|---|---|---|
| 1 | Asha | 98765… | Laptop | 55000 |
| 2 | Asha | 98765… | Mouse | 700 |

If Asha changes her phone number you must update many rows — and missing one leaves the data inconsistent. These are called **update anomalies**.

## Normalization

Normalization organises columns and tables to reduce redundancy.

### First Normal Form (1NF)

- Each cell holds a **single value** (no lists like `"C, Java, SQL"`).
- Each row is unique (has a primary key).

### Second Normal Form (2NF)

- In 1NF, and every non-key column depends on the **whole** primary key (matters for composite keys).

### Third Normal Form (3NF)

- In 2NF, and non-key columns depend **only on the key**, not on other non-key columns.
- Example: storing `city` and `pincode` together — `city` depends on `pincode`, so move it into a separate table.

## A normalized design

```sql
CREATE TABLE customers (
    id    INT PRIMARY KEY,
    name  VARCHAR(100) NOT NULL,
    phone VARCHAR(15)  NOT NULL
);

CREATE TABLE products (
    id    INT PRIMARY KEY,
    name  VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL
);

CREATE TABLE orders (
    id          INT PRIMARY KEY,
    customer_id INT NOT NULL REFERENCES customers(id),
    ordered_at  TIMESTAMP NOT NULL
);

CREATE TABLE order_items (
    order_id   INT REFERENCES orders(id),
    product_id INT REFERENCES products(id),
    quantity   INT NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10,2) NOT NULL,     -- price at the time of the order
    PRIMARY KEY (order_id, product_id)
);
```

## Relationship types

| Relationship | Example | How to model |
|---|---|---|
| One-to-one | user ↔ profile | foreign key with `UNIQUE` |
| One-to-many | customer → orders | foreign key on the "many" side |
| Many-to-many | students ↔ courses | a junction table (`enrollments`) |

## Indexes

An **index** speeds up searches on a column, like the index of a book:

```sql
CREATE INDEX idx_orders_customer ON orders(customer_id);
```

Index columns used often in `WHERE`, `JOIN` and `ORDER BY` — but remember each index slows down inserts and updates a little.

## Key takeaways

- Store each fact in exactly one place.
- Aim for 3NF in most transactional databases.
- Use junction tables for many-to-many relationships and indexes for frequent lookups.

## Practice

Design normalized tables for a school: students, teachers, classes and the subjects each teacher teaches in each class. Draw the relationships and write the `CREATE TABLE` statements.
