# Contributing to Luminary

Thank you for considering contributing to Luminary! It's people like you that make this application better for everyone, we welcome all kinds of contributions, including bug reports, feature requests, and code improvements.

## Table of Contents

- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Features](#suggesting-features)
  - [Code Contributions](#code-contributions)
    - [Development Workflow](#development-workflow)
      - [Branch Naming Rules](#branch-naming-rules)
      - [Commit Message Rules](#commit-message-rules)
    - [Submitting Pull Requests](#submitting-pull-requests)
- [Code of Conduct](#code-of-conduct)
- [License](#license)

## Getting Started

1. Fork the repository.
2. Clone your forked repository:
   ```sh
   git clone https://github.com/<your-username>/Luminary.git
   ```
3. Navigate to the project directory:
   ```sh
   cd Luminary
   ```
4. Set up the Backend:
   The backend is built with Node.js and uses the **pnpm** package manager. Navigate to the `apps/backend` directory to install dependencies and run the local server.
   ```sh
   cd apps/backend
   pnpm install
   pnpm dev
   ```
5. Set up the Frontend:
   The frontend is located in the `apps/frontend` directory. Since it consists of static files, you can use a local package like `live-server` to run it, or simply open `apps/frontend/pages/index.html` in your browser.
   ```sh
   cd apps/frontend
   # Example using live-server
   npx live-server
   ```

## How to Contribute

### Reporting Bugs

Before creating bug reports, please check the issue tracker as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title** for the issue to identify the problem.
- **Describe the exact steps which reproduce the problem** in as many details as possible.
- **Provide specific examples to demonstrate the steps.** Include links to files or copy/paste snippets, which you use in those examples.
- **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior.
- **Explain which behavior you expected to see instead and why.**

### Suggesting Features

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please provide the following details:

- **Use a clear and descriptive title** for the issue to identify the suggestion.
- **Provide a step-by-step description of the suggested enhancement** in as many details as possible.
- **Explain why this enhancement would be useful** to most users.

### Code Contributions

> Please make sure to have created a fork of the original repository. This is where you will work in when contributing.

## Development Workflow

### 1. Branch Naming Convention

Branch names should follow this format:

`<type>-<area>/<short-description>`

#### Types

Use one of the following prefixes to indicate the type of work:

| Prefix     | Purpose                                           |
| ---------- | ------------------------------------------------- |
| `feature`  | New features or major additions                   |
| `fix`      | Bug fixes                                         |
| `refactor` | Code restructuring without changing functionality |
| `chore`    | Maintenance tasks (dependencies, configs, etc.)   |
| `docs`     | Documentation updates                             |

---

#### Area

Because this repository contains **both frontend and backend applications**, you must specify where the changes are being made:

| Suffix | Meaning  |
| ------ | -------- |
| `fe`   | Frontend |
| `be`   | Backend  |

---

#### Description

Add a **short, lowercase description** of the work you are doing. This is usually derived from the ticket title.

---

#### Branch Examples

- `feature-fe/authentication-flow`
- `fix-be/database-connection`
- `refactor-fe/form-state-management`
- `chore-be/update-dependencies`
- `docs-fe/update-readme`

---

### 2. Commit Your Changes

Once you've made your changes, commit them with a descriptive message.

```sh
git commit -m "type: commit message"
```

---

### Commit Message Convention

Commit messages follow this format:

`<type>: <short description>`

#### Examples

- `feature: add login page`
- `fix: resolve database connection issue`
- `refactor: use single state for formData`
- `docs: update contribution guide`

---

#### Writing Good Commit Messages

Use **imperative tense** when writing commit messages.

✅ Correct

- `fix login issue`
- `add authentication middleware`
- `update user validation`

❌ Incorrect

- `fixed login issue`
- `I fixed login issue`
- `fixing login issue`

---

### 3. Push Your Branch

Push your branch to your forked repository.

```sh
git push origin <branch-name>
```

#### Submitting Pull Requests

1. Ensure your branch is up to date with your remote repository:
   ```sh
   git checkout main
   git pull origin main
   git checkout <your-branch>
   git rebase main
   ```
   > You should regularly update your remote repository with changes from the main branch of the upstream repository
2. Submit a pull request from your branch to the upstream repository.
3. In your pull request description, explain what changes you made and why.

## Code of Conduct

This project adheres to the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/0/code_of_conduct/). By participating, you are expected to uphold this code. Please report unacceptable behavior to [sophieoyiza@gmail.com].

## License

By contributing, you agree that your contributions will be licensed under the [Apache License](LICENSE).
