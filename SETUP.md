# Setup: 5 Free Websites application API

The page lives at `public/free-websites/` and is served as-is at `/free-websites/`.
The form posts JSON to `POST /api/free-websites/apply` (`api/free-websites/apply.ts`).
Each application is appended to a Google Sheet and emailed to you through Resend.
If the sheet write fails, the email still goes out (and says the sheet failed). If both fail,
the visitor sees the WhatsApp fallback and the full application is logged in the Vercel function logs.

You need about 15 minutes. Do these in order.

## 1. Google Sheet and service account

1. Go to <https://console.cloud.google.com>, create a project (e.g. `free-websites`).
2. **APIs & Services > Library**, search "Google Sheets API", click **Enable**.
3. **APIs & Services > Credentials > Create credentials > Service account**. Name it
   `free-websites`. Skip the optional role and user-access steps. Click Done.
4. Open the new service account, **Keys > Add key > Create new key > JSON**. A file downloads.
   Treat it like a password. Do not commit it.
5. From that JSON file you need two values:
   - `client_email` goes in `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `private_key` goes in `GOOGLE_PRIVATE_KEY` (the whole string, `\n` escapes included)
6. Create a new Google Sheet, for example "5 Free Websites: applications".
7. Click **Share**, paste the `client_email` address, give it **Editor**, untick "Notify people", Share.
8. Copy the sheet id from the URL: `https://docs.google.com/spreadsheets/d/`**`THIS_PART`**`/edit`. That is `SHEET_ID`.

The function writes into the **first tab**. If cell A1 is empty it writes the header row first:
`Submitted at (WAT), Business, Type, What they sell, City, Page goal, Customer worth, Content ready,
Domain, Name, WhatsApp, Email, Referral, Decision`. Fill the `Decision` column by hand
(chosen / backup / waitlist).

## 2. Resend

1. Sign up at <https://resend.com> and open **Domains > Add domain**: `futurdevs.com`.
2. Resend shows DNS records (SPF `TXT`, DKIM `TXT`, and an MX for the `send` subdomain). Add them at
   whoever hosts the DNS for futurdevs.com. Click **Verify** (can take a few minutes up to a few hours).
3. **API Keys > Create API key**, permission "Sending access", domain `futurdevs.com`. Copy it. That is `RESEND_API_KEY`.
4. `NOTIFY_EMAIL` is where applications are sent: `davidjohn@futurdevs.com`.

Emails are sent from `Five Free Websites <apply@futurdevs.com>`. Any address on the verified domain
works. To change it, set the optional `FROM_EMAIL` variable.

## 3. Vercel environment variables

In the Vercel dashboard: your project > **Settings > Environment Variables**. Add each of these for
**Production and Preview** (Preview is needed so the preview deployment can be tested):

| Name | Value |
| --- | --- |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | `client_email` from the JSON key |
| `GOOGLE_PRIVATE_KEY` | `private_key` from the JSON key. Paste it as is, with the `\n` escapes. The code converts them. |
| `SHEET_ID` | id from the sheet URL |
| `RESEND_API_KEY` | Resend API key |
| `NOTIFY_EMAIL` | `davidjohn@futurdevs.com` |

Mark the key variables **Sensitive**. Env var changes apply to **new** deployments only, so redeploy after adding them.

CLI alternative: `vercel env add GOOGLE_PRIVATE_KEY preview` (repeat per variable and environment).

## 4. Hard rate limit (recommended, 2 minutes)

The function has an in-memory limit of 5 applications per IP per 10 minutes. That limit is per warm
instance, so it stops double-submits and casual spam but not a determined bot. On the Pro plan, add a
Firewall rule: **Project > Firewall > Add rule**, if **Request path** equals `/api/free-websites/apply`
and **Method** equals `POST`, then **Rate limit**: 5 requests per 10 minutes per IP, action Deny (or Challenge).

## 5. Test it

After redeploying with the variables set:

1. Open the preview URL `/free-websites/`, fill the form, submit.
2. Check: a new row in the sheet, and an email with the business name in the subject.
3. Or from a terminal (replace the host):

```sh
curl -sS -X POST https://<preview-host>/api/free-websites/apply \
  -H 'Content-Type: application/json' \
  -d '{"business":"Test Co","type":"Food and drink","what":"Bread","city":"Lagos","goal":"Bookings","worth":"","content":"Yes, ready","domain":"","name":"Test","whatsapp":"08031234567","email":"","referral":"","agree":"yes"}'
# {"ok":true}
```

Preview deployments sit behind Vercel Deployment Protection by default. Use the browser while logged
in to Vercel, or a protection-bypass token for curl. Delete test rows from the sheet afterwards.

## Troubleshooting

Look at **Vercel > Deployments > (deployment) > Functions / Logs**, filter for `[free-websites]`.

| Log line | Cause |
| --- | --- |
| `sheet write failed: ... 403 / The caller does not have permission` | Sheet not shared with the service account as Editor |
| `sheet write failed: ... 404 / Requested entity was not found` | Wrong `SHEET_ID` |
| `sheet write failed: ... DECODER routines` or `invalid_grant` | `GOOGLE_PRIVATE_KEY` pasted wrong, or key deleted |
| `Google Sheets env vars are not set` | Variables missing for this environment, or no redeploy since adding them |
| `email failed: Resend 403 ... domain is not verified` | futurdevs.com not verified in Resend yet |
| `email failed: Resend 401` | Wrong or revoked `RESEND_API_KEY` |
| `application NOT saved anywhere` | Both failed. The full application is in that log line, copy it out by hand |

## Local development

- `npm run dev` serves the page at <http://localhost:5173/free-websites/>. The API does not run under plain Vite.
- `vercel dev` runs the page and the function together. Put values in `.env.local` (see `.env.example`).
- `npm test` runs the API tests (validation, rate limit, formatting, handler behaviour with mocks).

## Changing the form

Field names are the contract between `public/free-websites/index.html` and `api/_lib/validate.ts`.
If you add or rename a field, update `validate.ts`, `format.ts` (`SHEET_COLUMNS`, `toRow`, email), and the tests.
The honeypot input is named `hp_url`. Keep it hidden and empty.
