# Setup: 5 Free Websites application API

The page lives at `public/free-websites/` and is served as-is at `/free-websites/`.
The form posts JSON to `POST /api/free-websites/apply` (`api/free-websites/apply.ts`).
Each application is saved to PocketBase and emailed to you through Resend.
If the PocketBase save fails, the email still goes out (and says the save failed). If both fail,
the visitor sees the WhatsApp fallback and the full application is logged in the Vercel function logs.

You need about 15 minutes. Do these in order.

## 1. PocketBase

Applications are stored in the `applications` collection on <https://backpocket.futurdevs.com>
(already created, with every API rule empty so only a superuser can read or write).

| Field | Type | Notes |
| --- | --- | --- |
| `business` | Text | required, max 80 |
| `type` | Text | required, max 60 |
| `what` | Text | required, max 160 |
| `city` | Text | required, max 60 |
| `goal` | Text | required, max 80 |
| `worth` | Text | max 40 |
| `content` | Text | required, max 40 |
| `domain` | Text | max 80 |
| `name` | Text | required, max 80 |
| `whatsapp` | Text | required, max 20 |
| `email` | Email | optional |
| `referral` | Text | max 160 |
| `agree` | Bool | required |
| `decision` | Select | `chosen`, `backup`, `waitlist`. You fill this in. |
| `created` | Autodate | set on create |

Recreating it elsewhere: add these fields in the dashboard (**Collections > New collection > Base**), then
open the collection's **API Rules** and leave all five rules empty (superuser only).

The function signs in as a superuser (`/api/collections/_superusers/auth-with-password`) and creates the record.
Use a **dedicated superuser** for this (Dashboard > `_superusers` > New record) rather than your own login,
so you can revoke it without locking yourself out. Its email and password become
`POCKETBASE_EMAIL` and `POCKETBASE_PASSWORD`. `POCKETBASE_URL` is the base URL with no `/_/`.

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
| `POCKETBASE_URL` | `https://backpocket.futurdevs.com` |
| `POCKETBASE_EMAIL` | email of the dedicated superuser |
| `POCKETBASE_PASSWORD` | its password |
| `RESEND_API_KEY` | Resend API key |
| `NOTIFY_EMAIL` | `davidjohn@futurdevs.com` |

Mark the password and API key **Sensitive**. Env var changes apply to **new** deployments only, so redeploy after adding them.

CLI alternative: `vercel env add POCKETBASE_PASSWORD preview` (repeat per variable and environment).

## 4. Hard rate limit (recommended, 2 minutes)

The function has an in-memory limit of 5 applications per IP per 10 minutes. That limit is per warm
instance, so it stops double-submits and casual spam but not a determined bot. On the Pro plan, add a
Firewall rule: **Project > Firewall > Add rule**, if **Request path** equals `/api/free-websites/apply`
and **Method** equals `POST`, then **Rate limit**: 5 requests per 10 minutes per IP, action Deny (or Challenge).

## 5. Test it

After redeploying with the variables set:

1. Open the preview URL `/free-websites/`, fill the form, submit.
2. Check: a new record in PocketBase (`applications`), and an email with the business name in the subject.
3. Or from a terminal (replace the host):

```sh
curl -sS -X POST https://<preview-host>/api/free-websites/apply \
  -H 'Content-Type: application/json' \
  -d '{"business":"Test Co","type":"Food and drink","what":"Bread","city":"Lagos","goal":"Bookings","worth":"","content":"Yes, ready","domain":"","name":"Test","whatsapp":"08031234567","email":"","referral":"","agree":"yes"}'
# {"ok":true}
```

Preview deployments sit behind Vercel Deployment Protection by default. Use the browser while logged
in to Vercel, or a protection-bypass token for curl. Delete test records from PocketBase afterwards.

## Troubleshooting

Look at **Vercel > Deployments > (deployment) > Functions / Logs**, filter for `[free-websites]`.

| Log line | Cause |
| --- | --- |
| `PocketBase save failed: PocketBase login 400` | Wrong `POCKETBASE_EMAIL` / `POCKETBASE_PASSWORD`, or the user is not in `_superusers` |
| `PocketBase save failed: PocketBase 400: ...` | A field in the collection does not match (required field renamed, max length lowered) |
| `PocketBase save failed: PocketBase 404` | The `applications` collection does not exist |
| `POCKETBASE_URL is not set` / `... are not set` | Variables missing for this environment, or no redeploy since adding them |
| `PocketBase save failed: ... The operation was aborted` | PocketBase unreachable (8 second timeout) |
| `email failed: Resend 403 ... domain is not verified` | futurdevs.com not verified in Resend yet |
| `email failed: Resend 401` | Wrong or revoked `RESEND_API_KEY` |
| `application NOT saved anywhere` | Both failed. The full application is in that log line, copy it out by hand |

## Local development

- `npm run dev` serves the page at <http://localhost:5173/free-websites/>. The API does not run under plain Vite.
- `vercel dev` runs the page and the function together. Put values in `.env.local` (see `.env.example`).
- `npm test` runs the API tests (validation, rate limit, formatting, handler behaviour with mocks).

## Changing the form

Field names are the contract between `public/free-websites/index.html` and `api/_lib/validate.ts`.
If you add or rename a field, update `validate.ts`, `pocketbase.ts` (`toRecord`), the email in `format.ts`, the PocketBase collection, and the tests.
The honeypot input is named `hp_url`. Keep it hidden and empty.
