# Changelog Builder

This script is used to automatically build CHANGELOG.md file based on pull request commit messages.

You can use it as a part of CI/CD process in order to track all of your changes in a single file.

# Usage

In order to build the script from the source, you will need to install Node.JS 16+ on your machine. Then, run

```bash
npm install
```

to install dependencies. Then, run

```bash
npm run build
```

to start the build process. When finished, the built *changelog.js* file can be found within the *dist* directory. This file can be copied anywhere and be executed without *node_modules* or other dependencies because it contains all the necessary dependencies.

Usage:

```bash
node changelog.js --id=PullRequestID --username="Github username" --repo="Github Repository" --name="Your name for a commit" --email="your@e-mail.addr" [--increment] [--branch="master"] [--filename="CHANGELOG.md"]
```

Parameters:

- **id**: pull request ID (used to fetch data from GitHub API)
- **username**: Github username
- **repo**: Github repository name
- **name**: your name (e.g. "John Doe")
- **email**: your e-mail address
- **increment** *(optional)*: increment minor version from *package.json* file
- **branch** *(optional)*: branch name (*master* by default)
- **filename** *(optional)*: changelog filename (*CHANGELOG.md* by default)