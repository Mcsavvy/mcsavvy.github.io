# Setup: 5 Free Websites application API

The page lives at `public/free-websites/` and is served as-is at `/free-websites/`.
The form posts JSON to `POST /api/free-websites/apply` (`api/free-websites/apply.ts`), which validates it
(required fields, WhatsApp at least 10 digits, `agree === "yes"`, honeypot, per-IP rate limit) and creates a
record in PocketBase. PocketBase emails you. If the save fails, the visitor sees the WhatsApp fallback and
the full application is logged in the Vercel function logs.

Vercel holds no PocketBase login. It only holds one random secret that can create records in one collection.

## 1. PocketBase collection `free_websites_applications`

On <https://backpocket.futurdevs.com> (Base collection). Fields:

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

**API rules.** Leave list, view, update and delete empty (superuser only). Set **Create rule** to:

```
@request.headers.x_free_websites_key = "PASTE_YOUR_SECRET_HERE" && @request.body.decision:isset = false
```

Generate the secret with `openssl rand -hex 24`. The second condition stops a caller from setting `decision`.
Check it: a request without the header must return 400 or 403, and one with the header must return 200:

```sh
curl -i -X POST https://backpocket.futurdevs.com/api/collections/free_websites_applications/records \
  -H 'Content-Type: application/json' -H 'X-Free-Websites-Key: <secret>' \
  -d '{"business":"Test","type":"t","what":"w","city":"c","goal":"g","content":"c","name":"n","whatsapp":"08031234567","agree":true}'
```

Delete the test record afterwards.

## 2. PocketBase email

1. **Settings > Mail settings**: set the sender name and address and your SMTP server, then **Send test email**.
   Also set **Application URL** under Settings > Application (the email links to it).
2. Copy `pocketbase/free_websites_notify.pb.js` from this repo into `pb_hooks/` next to your PocketBase binary.
   PocketBase reloads hooks on change (restart it if your setup does not).
3. Create a test record from the dashboard and check that the email arrives. If it does not, look in the
   PocketBase logs (Dashboard > Logs) for `free_websites_notify failed`.

The recipient is set at the top of the hook file (`NOTIFY`).

## 3. Vercel environment variables

In the Vercel dashboard: project > **Settings > Environment Variables**. Add for **Production and Preview**:

| Name | Value |
| --- | --- |
| `POCKETBASE_URL` | `https://backpocket.futurdevs.com` |
| `POCKETBASE_CREATE_KEY` | the same secret as in the create rule (mark **Sensitive**) |

Env var changes apply to new deployments only, so redeploy afterwards.
CLI alternative: `vercel env add POCKETBASE_CREATE_KEY preview`.

## 4. Hard rate limit (recommended)

The function has an in-memory limit of 5 applications per IP per 10 minutes, per warm instance, so it stops
double-submits and casual spam but not a determined bot. Anyone who learns the secret could also post
straight to PocketBase, so keep it out of the repo and rotate it (change it in the rule and in Vercel) if it leaks.
On the Pro plan, add a Firewall rule: **Project > Firewall > Add rule**, if **Request path** equals
`/api/free-websites/apply` and **Method** equals `POST`, then **Rate limit** 5 requests per 10 minutes per IP.

## 5. Test it

After redeploying with the variables set:

1. Open the preview URL `/free-websites/`, fill the form, submit.
2. Check: a new record in `free_websites_applications` and the email.
3. Or from a terminal (replace the host):

```sh
curl -sS -X POST https://<preview-host>/api/free-websites/apply \
  -H 'Content-Type: application/json' \
  -d '{"business":"Test Co","type":"Food and drink","what":"Bread","city":"Lagos","goal":"Bookings","worth":"","content":"Yes, ready","domain":"","name":"Test","whatsapp":"08031234567","email":"","referral":"","agree":"yes"}'
# {"ok":true}
```

Preview deployments sit behind Vercel Deployment Protection by default. Use the browser while logged in to
Vercel, or a protection-bypass token for curl. Delete test records afterwards.

## Troubleshooting

Vercel > Deployments > (deployment) > Logs, filter for `[free-websites]`.

| Log line | Cause |
| --- | --- |
| `PocketBase 400` or `403` | Secret in Vercel differs from the create rule, or the rule is empty or has a typo |
| `PocketBase 400: ...` with field names | A collection field does not match (required field renamed, max length lowered) |
| `PocketBase 404` | The collection does not exist or was renamed |
| `POCKETBASE_URL is not set` / `POCKETBASE_CREATE_KEY is not set` | Variable missing for this environment, or no redeploy since adding it |
| `The operation was aborted` | PocketBase unreachable (8 second timeout) |
| `application NOT saved` | The save failed. The full application is in that log line, copy it out by hand |

## Local development

- `npm run dev` serves the page at <http://localhost:5173/free-websites/>. The API does not run under plain Vite.
- `vercel dev` runs the page and the function together. Put values in `.env.local` (see `.env.example`).
- `npm test` runs the API tests.

## Changing the form

Field names are the contract between `public/free-websites/index.html`, `api/_lib/validate.ts`,
`api/_lib/pocketbase.ts` (`toRecord`), the PocketBase collection, and the email hook. Change them together,
and update the tests. The honeypot input is named `hp_url`. Keep it hidden and empty.
