<p align="center">
  <img src="https://github.com/tammy-young/genie/blob/main/frontend/public/genie-logo.png" />
</p>

# Genie
A GUI for Stardoll debug search.

# Running Locally
Make sure you have `npm` installed.
To run Genie locally, first clone the repository.
```
git clone https://github.com/tammy-young/genie.git
```
Open a terminal in the project and do a `make install`. This will install all the required dependencies.

## Configuring Your Environment
Now you need to configure your environment variables. Create a `.env` file in the `backend` directory that looks like this:
```
PDH_USER=YOUR_PDH_USER_COOKIE
```
Login to [Stardoll](http://www.stardoll.com/en/) and right click, then inspect element. Find the cookies (usually under `Application` or `Storage` and copy the value of `pdhUser`. Replace `YOUR_PDH_USER_COOKIE` in your `.env` file with this value.

Now your environment is configured and you can do a `make run` in your terminal to run Genie.

# Security Concerns
Due to ongoing security concerns surrounding hacked accounts, here is a transparent explanation on how Genie works without you having to log in to your Stardoll account.

The [base debug search link](https://www.stardoll.com/en/com/user/getStarBazaar.php?search) requires you to be logged in to use. After comparing the cookies for a logged in user and one that is logged out, we notice that the `pdhUser` cookie is the one that tells Stardoll's backend that you're logged in. By sending this cookie as a header with the `GET` request to the debug search page (see below for how that's done), we can simulate a logged in user. As part of setting up your environment with the `.env` file, you were required to provide this cookie. This cookie will be used to send requests to Stardoll.
```javascript
// backend/bazaarRequest.js

const response = await fetch(url, {
  withCredentials: true,
  headers: {
    Cookie: "pdhUser=" + process.env.PDH_USER + ";"
  }
});
```

# Troubleshooting
The most common issue you will run into is infinitely long searching. The search function is desgiend to time out in 10 seconds, or when it finds 20 matching items. If your search is running infinitely, it's probably because your `PDH_USER` cookie expired. If your `PDH_USER` cookie is expired, Genie will not work. You will need to follow [the steps above](https://github.com/tammy-young/genie?tab=readme-ov-file#configuring-your-environment) for configuring your environment to replace the `PDH_USER` value in `.env`.
