# 📋 Technical Prompts & Instructions Log

This document compiles the chronological sequence of all technical prompts and directives provided during the development, refactoring, and cloud deployment of the Airbnb full-stack application.

---

## 1. Repository Initialization & Setup
* **Prompt:**
  ```text
  clone this repo instead of this: https://github.com/rahul4019/airbnb-clone
  start the project
  ```
* **Technical Objectives:**
  * Initialize the workspace with a full MERN stack (MongoDB, Express, React, Node.js) codebase.
  * Audit repository structure, client dependencies (Vite + Tailwind CSS), and backend configuration.

---

## 2. Frontend Overhaul & Design System
* **Prompt:**
  ```text
  ok tailor the frontend and also then we will work on the backend part
  ```
* **Technical Objectives:**
  * Redesign the entire client application to match modern Airbnb production UI/UX standards.
  * Implement design tokens, Inter typography, and rose/pink color scheme (`#FF385C`).
  * Build interactive components:
    * `PlaceCard`: State-driven image carousel, dot indicators, favourite toggle, and skeleton shimmer loading.
    * `BookingWidget`: Dynamic stay-duration calculations, service fee breakdown, and animated transitions.
    * `Header` & `SearchBar`: Pill-shaped filter bar, profile dropdown, and sticky navigation.
    * Auth Pages: Card-based `LoginPage` and `RegisterPage` with form validation.
  * Verify clean production build using `npx vite build`.

---

## 3. Technical Problem Solving & Reflection
* **Prompt:**
  ```text
  What was the most difficult part of this assignment for you? Walk us through the problem, what you tried, and how you solved it (or how far you got)
  ```
* **Technical Objectives:**
  * Articulate technical challenges encountered during development.
  * Deep-dive into the custom `PlaceCard` carousel implementation: managing state vs. CSS scroll-snapping, suppressing click event bubbling to parent `<Link>` routes, and image loading latency.

---

## 4. Backend Architecture, JWT Authentication & API Smoke Testing
* **Prompt:**
  ```text
  build a backend structure with jwt authentication and and curl the apis for a final smoke test
  ```
* **Technical Objectives:**
  * Validate and configure Express REST API structure with MongoDB models (`User`, `Place`, `Booking`).
  * Implement JWT authentication with secure HTTP-only cookies and Bearer token Authorization headers via `isLoggedIn` middleware.
  * Integrate `mongodb-memory-server` to enable zero-dependency local testing.
  * Execute automated `curl` smoke tests verifying:
    * `POST /user/register` — User creation, password hashing with bcrypt, and JWT issuance.
    * `POST /user/login` — Credential validation and token return.
    * `GET /places/user-places` — Access verification on protected routes with Bearer token.

---

## 5. Cloud Architecture & AWS Deployment Planning
* **Prompt:**
  ```text
  now i need to deploy it on aws
  ```
* **Technical Objectives:**
  * Architect AWS deployment options:
    * Managed Serverless/PaaS: AWS Amplify (Frontend) + AWS App Runner (Backend).
    * Infrastructure as a Service (IaaS): AWS EC2 + PM2 + Nginx Reverse Proxy.
  * Generate `amplify.yml` build specification for monorepo client deployments.
  * Provide end-to-end architecture and environment variable checklists.

---

## 6. Git Remote Migration & Secret Scrubbing
* **Prompt:**
  ```text
  push to github
  yeah push it to my own github account with a new repo please do the needful
  ```
* **Technical Objectives:**
  * Migrate repository from read-only upstream (`rahul4019/airbnb-clone`) to personal GitHub account (`Owaish786/airbnb-premium-clone`).
  * Diagnose and resolve GitHub Push Protection errors (`GH013`) triggered by legacy OAuth secrets in commit history (`af37ba301cd0695ab75e08fc0762b3d2e2c94cab`).
  * Re-initialize Git repository with clean history, stage current code, and force-push to `origin/main`.

---

## 7. AWS EC2 Production Deployment & Server Configuration
* **Prompt:**
  ```text
  okay now for ec2
  [AWS Security Group Configuration & Inbound Rules]
  [EC2 Instance Connect Terminal Output - Amazon Linux 2023]
  ```
* **Technical Objectives:**
  * Configure EC2 Security Group inbound firewall rules for SSH (`22`), HTTP (`80`), and HTTPS (`443`).
  * Author `setup-ec2.sh` for automated Ubuntu provisioning and provide native `dnf` commands for Amazon Linux 2023.
  * Configure **PM2** process manager (`ecosystem.config.js`) for persistent Node.js API execution and systemd auto-restart.
  * Create **Nginx** reverse proxy configuration (`nginx.conf.template`) for:
    * Routing API endpoints (`/user`, `/places`, `/bookings`, `/upload*`) to backend port `4000`.
    * Serving compiled client SPA assets (`client/dist`) with gzip compression and `try_files` routing fallback.
  * Diagnose EC2 Instance Connect session context and guide direct terminal deployment.
