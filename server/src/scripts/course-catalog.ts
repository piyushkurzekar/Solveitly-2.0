/**
 * Course metadata. Lesson content lives in server/content/courses/<slug>.md
 * and is loaded into MongoDB by `npm run seed -w server`.
 */
export interface CatalogCourse {
  slug: string;
  title: string;
  description: string;
  overview: string;
  category: "Web Development" | "Programming" | "Cloud & DevOps" | "Databases";
  level: "Beginner" | "Intermediate" | "Advanced";
  image: string;
  imageAlt: string;
  popular?: boolean;
  outcomes: string[];
}

export const catalog: CatalogCourse[] = [
  {
    slug: "web-development-bootcamp",
    title: "Web Development Bootcamp",
    description:
      "Master front-end and back-end web development with hands-on projects using HTML, CSS, JavaScript, and Node.js.",
    overview:
      "A complete path from how the web works to shipping your own full-stack application. You will build pages with HTML and CSS, make them interactive with JavaScript, write a REST API with Node.js and Express, store data in a database and finish by building a full-stack notes app.",
    category: "Web Development",
    level: "Beginner",
    image: "/images/courses/web-development.webp",
    imageAlt: "Desktop screen with HTML, CSS and JavaScript code next to a coffee mug",
    popular: true,
    outcomes: [
      "Explain how browsers, servers, HTTP and DNS work together",
      "Build responsive pages with semantic HTML and modern CSS",
      "Add interactivity with JavaScript and the DOM",
      "Create a REST API with Node.js and Express",
      "Persist data in MongoDB and connect front end to back end",
    ],
  },
  {
    slug: "cloud-computing-basics",
    title: "Cloud Computing Basics",
    description:
      "Understand cloud services, deployment models, and architecture with hands-on AWS and Azure examples.",
    overview:
      "Learn what the cloud really is, how IaaS, PaaS and SaaS differ, and which deployment model fits which problem. You will map the core compute, storage and networking services of AWS and Azure and finish by hosting a website in the cloud.",
    category: "Cloud & DevOps",
    level: "Beginner",
    image: "/images/courses/cloud-computing.webp",
    imageAlt: "Person on a laptop with cloud infrastructure diagrams",
    popular: true,
    outcomes: [
      "Describe the key characteristics and benefits of cloud computing",
      "Choose between IaaS, PaaS and SaaS for a given workload",
      "Compare public, private, hybrid and multi-cloud setups",
      "Identify equivalent AWS and Azure services",
      "Host a static website using cloud storage",
    ],
  },
  {
    slug: "devops-tools",
    title: "DevOps Tools Course",
    description:
      "Learn essential DevOps tools like Docker, Kubernetes, Jenkins, and CI/CD pipelines to streamline software delivery.",
    overview:
      "DevOps is how modern teams ship software quickly and safely. This course covers the DevOps mindset, version control with Git, packaging apps with Docker, running them on Kubernetes and automating build, test and deploy with Jenkins pipelines.",
    category: "Cloud & DevOps",
    level: "Intermediate",
    image: "/images/courses/devops.webp",
    imageAlt: "DevOps tool icons and terminal windows on a laptop",
    popular: true,
    outcomes: [
      "Explain the DevOps lifecycle and its core practices",
      "Use Git branches, merges and pull requests confidently",
      "Containerise an application with a Dockerfile",
      "Deploy and scale containers on Kubernetes",
      "Automate CI/CD with a Jenkins pipeline",
    ],
  },
  {
    slug: "c-programming",
    title: "C Programming",
    description: "Learn the basics of C programming language, including syntax, pointers, and memory management.",
    overview:
      "C is the language behind operating systems, embedded devices and many other languages. Starting from your first program, you will learn variables, operators, control flow, functions, arrays and strings, and finally master pointers and dynamic memory.",
    category: "Programming",
    level: "Beginner",
    image: "/images/courses/c.webp",
    imageAlt: "Computer screen with C code",
    outcomes: [
      "Write, compile and run C programs",
      "Use variables, data types, operators and format specifiers",
      "Control program flow with conditions and loops",
      "Break programs into reusable functions",
      "Work with arrays, strings, pointers and dynamic memory",
    ],
  },
  {
    slug: "cpp-programming",
    title: "C++ Programming",
    description: "Explore object-oriented programming concepts and advanced features of C++ language.",
    overview:
      "Build on C with the power of C++. You will learn classes and objects, constructors and RAII, inheritance and polymorphism, templates and the Standard Template Library, and modern C++ features such as smart pointers and lambdas.",
    category: "Programming",
    level: "Intermediate",
    image: "/images/courses/cpp.webp",
    imageAlt: "Laptop screen with C++ code",
    outcomes: [
      "Use C++ I/O, references and namespaces",
      "Design classes with encapsulation",
      "Manage resources safely with constructors, destructors and RAII",
      "Apply inheritance and runtime polymorphism",
      "Use templates, STL containers, algorithms and smart pointers",
    ],
  },
  {
    slug: "python-programming",
    title: "Python Programming",
    description: "Learn the fundamentals of Python programming, including syntax, data types, and control flow.",
    overview:
      "Python is one of the most popular and beginner-friendly languages, used in web development, data science, automation and AI. This course takes you from your first line of Python to functions, data structures, files and error handling.",
    category: "Programming",
    level: "Beginner",
    image: "/images/courses/python.webp",
    imageAlt: "Laptop with Python code and a coffee cup on a wooden desk",
    outcomes: [
      "Install Python and run scripts and the interactive shell",
      "Work with numbers, strings, booleans and type conversion",
      "Write conditions, loops and reusable functions",
      "Use lists, tuples, dictionaries and sets effectively",
      "Read and write files and handle errors with exceptions",
    ],
  },
  {
    slug: "sql-programming",
    title: "SQL Programming",
    description: "Learn SQL fundamentals, database design, querying, and managing relational databases effectively.",
    overview:
      "SQL is the language of relational databases. You will query data with SELECT, filter and sort results, summarise with aggregates, combine tables with JOINs, create and modify tables, and design well-structured databases with normalization.",
    category: "Databases",
    level: "Beginner",
    image: "/images/courses/sql.webp",
    imageAlt: "Laptop with SQL code and database diagrams",
    outcomes: [
      "Understand tables, rows, columns and keys",
      "Write SELECT queries with filters, sorting and limits",
      "Summarise data with aggregate functions and GROUP BY",
      "Combine tables with INNER, LEFT and other JOINs",
      "Create tables with constraints and design normalized schemas",
    ],
  },
  {
    slug: "java-programming",
    title: "Java Programming",
    description: "Understand Java fundamentals, object-oriented programming, and build desktop and web applications.",
    overview:
      "Java powers enterprise systems, Android apps and large-scale back ends. Learn how the JVM runs your code, Java's type system and control flow, object-oriented design with classes, inheritance and interfaces, and the Collections framework with exception handling.",
    category: "Programming",
    level: "Beginner",
    image: "/images/courses/java.webp",
    imageAlt: "Laptop with Java code",
    outcomes: [
      "Explain how the JDK, JRE and JVM work together",
      "Use Java types, operators, control flow and methods",
      "Model problems with classes, objects and encapsulation",
      "Apply inheritance, interfaces and polymorphism",
      "Use List, Set and Map collections and handle exceptions",
    ],
  },
  {
    slug: "html-fundamentals",
    title: "HTML Fundamentals",
    description: "Learn the building blocks of the web with HTML5, creating structured and semantic web pages.",
    overview:
      "Every web page starts with HTML. Learn document structure, text, links and images, lists and tables, forms that collect user input, and semantic, accessible markup that works for everyone and ranks well in search engines.",
    category: "Web Development",
    level: "Beginner",
    image: "/images/courses/html.webp",
    imageAlt: "Computer screen with HTML code",
    outcomes: [
      "Write a valid HTML5 document from scratch",
      "Add headings, paragraphs, links and images",
      "Structure data with lists and tables",
      "Build forms with the right input types and validation",
      "Use semantic elements and accessibility best practices",
    ],
  },
  {
    slug: "css-styling",
    title: "CSS Styling",
    description: "Master CSS3 techniques to style and layout responsive, modern websites and user interfaces.",
    overview:
      "Turn plain HTML into beautiful, responsive interfaces. You will learn selectors and the cascade, the box model, modern layout with Flexbox and Grid, and responsive design with media queries and relative units.",
    category: "Web Development",
    level: "Beginner",
    image: "/images/courses/css.webp",
    imageAlt: "Laptop with CSS code styling a web page",
    outcomes: [
      "Apply styles with selectors, specificity and the cascade",
      "Control spacing and sizing with the box model",
      "Build one-dimensional layouts with Flexbox",
      "Build two-dimensional layouts with CSS Grid",
      "Make pages responsive with media queries",
    ],
  },
  {
    slug: "javascript-programming",
    title: "JavaScript Programming",
    description: "Learn JavaScript fundamentals, DOM manipulation, and build interactive web applications.",
    overview:
      "JavaScript makes the web interactive. Learn variables and types, functions and scope, arrays and objects, how to manipulate the page through the DOM and respond to events, and asynchronous programming with promises, async/await and fetch.",
    category: "Web Development",
    level: "Beginner",
    image: "/images/courses/javascript.webp",
    imageAlt: "Computer screen with JavaScript code",
    outcomes: [
      "Use variables, types, operators and conditionals",
      "Write functions, arrow functions and understand scope",
      "Transform data with array methods and objects",
      "Select and update page elements and handle events",
      "Fetch data from APIs with promises and async/await",
    ],
  },
];
