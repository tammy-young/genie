<p align="center">
  <img src="https://github.com/tammy-young/genie/blob/main/public/genie-logo.png" />
</p>

# Genie 🧞 [![Netlify Status](https://api.netlify.com/api/v1/badges/7ec8dd45-a039-4f09-94a2-e96e76955207/deploy-status)](https://app.netlify.com/sites/stardoll-genie/deploys)
A GUI for Stardoll debug search built with [React](https://react.dev/).

# Backend 🔧
Please see the [Genie API](https://github.com/tammy-young/genie-api).

# Installation 🛠️
To run Genie locally, first clone the repository.
```bash
git clone https://github.com/tammy-young/genie.git
```
Open a terminal in the project and do a `make install`. This will install all the required dependencies. Then, follow the instructions below for configuring your environment and running the app.

# Configuring Your Environment ⚙️
Create a `.env` file in the project directory that looks like this:
```dotenv
REACT_APP_API_URL=http://localhost:3001
REACT_APP_ENV=dev
```

# Running Locally 💻
Run `make local` in your terminal to run Genie.

# Why? 🤔
I made Genie because I was frustrated with using the built-in search in Starbazaar. The launcher is slow, and the amount of customization I could do with filters was limited. I'm so glad I discovered the search API (aka "debug search"). I know many users don't want to look at the wall of text that the debug search shows, so I wanted to create a tool using it that's easy to use, and solves our shared issues of the Stardoll launcher.
