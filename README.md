<p align="center">
  <img src="https://github.com/tammy-young/genie/blob/main/frontend/public/genie-logo.png" />
</p>

# Genie
A GUI for Stardoll debug search.

# Running Locally
To run Genie locally, first clone the repository.
```
git clone https://github.com/tammy-young/genie.git
```
Next, open a terminal in the repository on your machine and type `make run`.

# Security Concerns
Due to ongoing security concerns surrounding hacked accounts, here is a transparent explanation on how Genie works without you having to log in to your Stardoll account.

The [base debug search link](https://www.stardoll.com/en/com/user/getStarBazaar.php?search) requires you to be logged in to use. After comparing the cookies for a logged in user and one that is logged out, we notice that the `pdhUser` cookie is the one that tells Stardoll's backend that you're logged in. By sending this cookie as a header with the `GET` request to the debug search page (see below for how that's done), we can simulate a logged in user.
```python
USER_COOKIE = "pdhUser=460859043%3A2b888bad5e9867832ac89b36c8383940%3Asdw161.stardoll.com"
headers = {
    'Cookie': USER_COOKIE
}
response = session.get(url, headers=headers)
```
