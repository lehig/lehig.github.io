export const aboutParagraphs = [
  "I love solving real world problems that help meet the needs of the people around me. I enjoy using what I learned from school, creators I follow, and videos I watch and implement those into real solutions. I naturally think from the user's point of view to make it as simple for the user as possible. The most optimal user experience is pressing a button and allowing the program to work. When I build something, I usually start by just creating that first file, thinking about the landing page, or understanding the data and then iterating from there.",
  "I've learned that good software requires clean, legible code with string logging, so that when it fails, you know where and how it failed. The hardest thing I've built so far was a platform supporting different types of users with unique roles and behaviors. It pushed me into areas I didn't know well at the time like web development, cloud infrastructure, and backend systems, but the result is a fully functional product ready to be used. This experience taught me the fundamentals of full-stack development, RESTful APIs, and AWS. From that experience, I learned that no problem is impossible. Solutions sometimes just take time, experimentation, and iteration.",
  "Right now I'm continuing to grow in machine learning while building real projects that strengthen my engineering skills. Long term, I want to become the kind of engineer who understands the mission behind the product, works closely with both technical and business perspectives, and build with a clear purpose rather than just writing code for the sake of it.",
];

export const projects = [
  {
    title: "Food Truck Locator",
    url: "https://github.com/lehig/food-truck-locator",
    image: "https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?auto=format&fit=crop&w=800&q=80",
    shortDescription: "A real-time platform for food trucks and small businesses with varied hours.",
    description: "Food Truck Locator is a production-ready, serverless web application that connects customers with local food truck businesses in real time. The platform supports multi-role authentication (customers and businesses), secure subscriptions, and business broadcast messaging using React, Go-based AWS Lambda microservices, DynamoDB, and Amazon Cognito. I designed and implemented the full system architecture, including role-based access control, JWT validation, DynamoDB query optimization, IAM least-privilege policies, and structured logging for observability."
  },
  {
    title: "Row-Reduction Calculator — Interactive RREF Web App",
    url: "https://github.com/lehig/Row-Reduction",
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Row-Reduction takes in a matrix in a gui form and returns it in RREF",
    description: "A full-stack web application that computes the Reduced Row Echelon Form (RREF) of a 3×3 matrix using a custom implementation of Gaussian elimination. The frontend is built in React, providing a clean UI for matrix input and real-time validation, while the backend is written in Go and can run both locally as an HTTP service and serverlessly on AWS Lambda. All matrix reduction logic is implemented from scratch without external math libraries, and the project includes automated tests and deployment scripts for both local and cloud environments."
  },
  {
    title: "GPG Privacy — Go-Based Encrypted File Service",
    url: "https://github.com/lehig/gpg-privacy",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
    shortDescription: "A Go-based service for encrypted file storage and retrieval using GPG.",
    description: "A secure file encryption and decryption service written in Go, demonstrating practical use of GopenPGP for OpenPGP-compatible cryptography and integration with AWS S3 for storage and retrieval. This project includes CLI drivers showing how to encrypt files locally, upload them to an S3 bucket, and retrieve & decrypt them — encapsulating key management and secure data handling workflows. Designed to showcase secure backend development with cryptographic primitives, cloud storage integration, and real-world privacy tooling."
  },
  {
    title: "Send-a-file",
    url: "https://github.com/lehig/Send-A-File",
    image: "https://images.unsplash.com/photo-1644088379091-d574269d422f?q=80&w=1693&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    shortDescription: "A C#/.NET peer-to-peer file transfer application that transmits files over TCP.",
    description: "SendAFile is a peer-to-peer file transfer application built in C# and .NET that enables users on the same LAN or WAN to securely send and receive files through both standard and encrypted workflows. The project implements a hybrid cryptography model using AES-256 for fast file encryption and RSA-2048 for secure key exchange, allowing efficient transfers without the performance limitations of pure asymmetric encryption. It features a fully interactive terminal user interface (TUI) with multi-window dialogs, threaded progress bars for real-time transfer feedback, and automatic filename handling through byte-level metadata headers. Built on TCP sockets and CryptoStreams, the application demonstrates practical experience in network programming, applied cryptography, concurrent processing, and user-focused CLI design while balancing performance, security, and usability."
  },
  {
    title: "WebCrawly",
    url: "https://github.com/lehig/WebCrawly",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    shortDescription: "A high-performance concurrent web crawler.",
    description: "A concurrent web crawler that traverses pages and writes structured output. It effectively handles rate-limiting, error recovery, and complex hierarchical data extraction."
  }
];

export const contactLinks = [
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/lehi-gracia-966196273/"
  },
  {
    label: "Email",
    url: "mailto:lehigraciaiii@gmail.com"
  }
];
