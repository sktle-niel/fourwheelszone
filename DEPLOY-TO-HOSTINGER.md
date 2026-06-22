# Deploy Four Wheels Zone to Hostinger — step by step

You are deploying **two things** on one Hostinger account:

| Part | What | Where it goes |
|------|------|---------------|
| **Frontend** | The React site (`dist/` build) | main domain → `public_html/` |
| **Backend API** | The PHP app (`fourwheelszone-api-backend`) | subdomain `api.YOURDOMAIN` → its `public/` folder |
| **Database** | MySQL `reviews` table | created in hPanel, schema imported |

Throughout, replace **YOURDOMAIN** with your real domain (e.g. `fourwheelszone.com`).

> Note: the sample reviews + images you tested with locally live only on your PC.
> Production starts with an **empty** database (no dummy data) — exactly right for launch.

---

## Prerequisites
- [ ] A Hostinger **web hosting plan** that runs **PHP + MySQL** (Premium / Business — not a static/builder-only plan).
- [ ] Access to **hPanel**.
- [ ] Free **SSL** enabled for the domain and the subdomain (hPanel → Security → SSL; usually automatic).

---

## PART 1 — Database (hPanel)

1. hPanel → **Databases → MySQL Databases**.
2. **Create a new database** (e.g. `fwz`). Hostinger prefixes it → real name like `u123456_fwz`.
3. **Create a database user** + strong password.
4. **Add the user to the database** with **All Privileges**.
5. Write down (you'll need these for `.env`):
   - DB name: `u123456_fwz`
   - DB user: `u123456_xxx`
   - DB password: `••••••`
   - DB host: `localhost`
6. hPanel → **phpMyAdmin** → click your database on the left → **Import** tab →
   **Choose File** → `fourwheelszone-api-backend/database/schema.sql` → **Go**.
   - You should see a `reviews` table get created (0 rows).

---

## PART 2 — Backend API (subdomain)

### 2a. Upload the backend (outside the web root)
1. hPanel → **File Manager**.
2. Go to your **home directory** (the folder that *contains* `public_html`).
3. Create a folder named `api_backend`.
4. On your PC, zip the backend project: select everything inside
   `fourwheelszone-api-backend` → **Send to → Compressed (zip)**.
   - You can delete the test images inside `public/uploads/` first (keep `.htaccess`).
5. Upload the zip into `api_backend` and **Extract** it there. You should now have:
   `api_backend/app`, `api_backend/public`, `api_backend/database`, etc.

### 2b. Create the subdomain pointing at `public/`
1. hPanel → **Domains → Subdomains**.
2. Create subdomain `api` → `api.YOURDOMAIN`.
3. Set its **Document Root** to: `api_backend/public`
   (so only `public/` is web-facing; `app/` and `.env` stay private).

### 2c. Create the production `.env`
In `api_backend/` (next to `app/` and `public/`), open the `.env` file (it came with
the upload) and **replace it** with your real values:

```
DB_HOST=localhost
DB_PORT=3306
DB_NAME=u123456_fwz
DB_USER=u123456_xxx
DB_PASS=your-real-db-password

ALLOWED_ORIGINS=https://YOURDOMAIN,https://www.YOURDOMAIN

IP_SALT=paste-any-long-random-string-here
```

- `ALLOWED_ORIGINS` = your **frontend** site (no trailing slash). Include both www and non-www.
- `IP_SALT` = any long random text (used to hash IPs for spam limiting).

### 2d. Final backend checks
- [ ] hPanel → **Advanced → PHP Configuration** → PHP **8.x** selected.
- [ ] `api_backend/public/uploads/` exists and is **writable** (755/775). It will be
      created automatically on first upload too.
- [ ] Visit **https://api.YOURDOMAIN/** → you should see a JSON health check.
- [ ] Visit **https://api.YOURDOMAIN/reviews.php** → JSON with `reviews: []`, `count: 0`.

If you get a 500 "Database error", re-check the `.env` DB values and that the import worked.

---

## PART 3 — Frontend (main domain)

### 3a. Point the site at your API, then build (on your PC)
1. In the frontend folder, create a file named **`.env.production`** with:
   ```
   VITE_API_BASE=https://api.YOURDOMAIN
   ```
2. Build:
   ```
   npm run build
   ```
   This creates the `dist/` folder.

### 3b. Upload the build to the main domain
1. hPanel → **File Manager** → open **`public_html`**.
2. Upload the **contents of `dist/`** (not the `dist` folder itself) so that
   `index.html` sits directly inside `public_html`.
   - Easiest: zip the **contents** of `dist/`, upload, extract into `public_html`.
   - **Important:** make sure the hidden **`.htaccess`** file is uploaded too
     (in File Manager: Settings → *Show hidden files*). It powers the `/reviews` route.

### 3c. Test the live site
- [ ] Open **https://YOURDOMAIN** → the site loads.
- [ ] Scroll to **Reviews** → you'll see "No reviews yet" (DB is empty — correct).
- [ ] Submit a review (with a photo) → it saves and appears; the photo loads.
- [ ] Open **https://YOURDOMAIN/reviews** directly in the address bar → the reviews
      page loads (this confirms SPA routing + `.htaccess` work).

---

## Done ✅

Your site is live, the API is on its own subdomain, reviews persist in MySQL, image
uploads work, and spam protection (honeypot + per-IP rate limit) is active.

### If something breaks
- **Reviews won't load / CORS error** → `ALLOWED_ORIGINS` in the API `.env` must
  exactly match your site origin (https, with and without www).
- **`/reviews` 404 on refresh** → the `.htaccess` in `public_html` is missing; re-upload it.
- **500 on the API** → wrong DB credentials in `.env`, or the schema wasn't imported.
- **Images don't appear** → make sure both domain and subdomain use **https**, and that
  `public/uploads/` is writable.
