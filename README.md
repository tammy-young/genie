<p align="center">
  <img src="https://github.com/tammy-young/genie/blob/main/frontend/public/genie-logo.png" />
</p>

# Genie 🧞 [![Netlify Status](https://api.netlify.com/api/v1/badges/7ec8dd45-a039-4f09-94a2-e96e76955207/deploy-status)](https://app.netlify.com/sites/stardoll-genie/deploys)
A GUI for Stardoll debug search.

# Running Locally 💻
Make sure you have `npm` installed.
To run Genie locally, first clone the repository.
```
git clone https://github.com/tammy-young/genie.git
```
Open a terminal in the project and do a `make install`. This will install all the required dependencies.

## Configuring Your Environment ⚙️
Now you need to configure your environment variables. Create a `.env` file in the `backend` directory that looks like this:
```
PDH_USER=YOUR_PDH_USER_COOKIE
```
1. Login to [Stardoll](http://www.stardoll.com/en/)
2. Right click > inspect element
3. Find the cookies (usually under the `Application` or `Storage` tab)
4. Copy the value of `pdhUser`
5. Replace `YOUR_PDH_USER_COOKIE` in your `.env` file with the copied value

Now that your environment is configured, change the path to the backend from the default `https://genie-api.netlify.app` to `localhost:8888` by changing the value of `constants.backend` in `frontend/src/constants.js`.

Finally, do a `make run` in your terminal to run Genie.

## Troubleshooting 🛠️
The most common issue you will run into is infinitely long searching. The search function is desigend to time out in 8 seconds, or when it finds 20 matching items. If your search is running for a long time, it's likely due to the `PDH_USER` cookie being expired. You will need to follow [the steps above](https://github.com/tammy-young/genie?tab=readme-ov-file#configuring-your-environment-%EF%B8%8F) for configuring your environment to replace the `PDH_USER` value in `.env`.

# Security Concerns 🔒
Due to ongoing security concerns, here is a transparent explanation on how Genie works without you having to log in to your Stardoll account.

The [base debug search link](https://www.stardoll.com/en/com/user/getStarBazaar.php?search) requires you to be logged in to use it. After comparing the cookies for a logged in user and one that is logged out, I noticed that the `pdhUser` cookie is the one that tells Stardoll's backend that you're logged in.

By sending this cookie as a header with the `GET` request to the debug search page (see below for how that's done), we can simulate a logged in user. As part of setting up your environment with the `.env` file, you were required to provide this cookie. This cookie will be used to send requests to Stardoll.
```javascript
// backend/bazaarRequest.js

const response = await fetch(url, {
  withCredentials: true,
  headers: {
    Cookie: "pdhUser=" + process.env.PDH_USER + ";"
  }
});
```

# Why? 🤔
I made Genie because I was frustrated with using the built-in search in Starbazaar. The launcher is slow, and the amount of customization I could do with filters was limited. I'm so glad I discovered the search API (aka "debug search"). I know many users don't want to look at the wall of text that the debug search shows, so I wanted to create a tool using it that's easy to use, and solves our shared issues of the Stardoll launcher.
