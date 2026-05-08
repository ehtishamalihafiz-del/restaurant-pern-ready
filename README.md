# Restaurant PERN/Supabase Ready Project

This project includes:

- React + Vite + Tailwind frontend
- Node.js + Express backend
- Supabase PostgreSQL SQL schema
- Ready deployment instructions

## 1. Supabase Setup

1. Create a Supabase project.
2. Open SQL Editor.
3. Paste and run `supabase/schema.sql`.
4. Go to Project Settings > API.
5. Copy:
   - Project URL
   - Service Role Key

Important: Service Role Key must only be used in backend `.env`, never frontend.

## 2. Backend Local Setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Edit `.env`:

```env
PORT=5000
CLIENT_URL=http://localhost:5173
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

Backend runs on:

```text
http://localhost:5000
```

Menu API:

```text
http://localhost:5000/api/menu
```

## 3. Frontend Local Setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Edit frontend `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Frontend runs on:

```text
http://localhost:5173
```

## 4. Deploy Backend on Render

1. Push this project to GitHub.
2. Create new Web Service on Render.
3. Root directory: `backend`
4. Build command:

```bash
npm install
```

5. Start command:

```bash
npm start
```

6. Add environment variables:

```env
PORT=5000
CLIENT_URL=https://your-netlify-site.netlify.app
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## 5. Deploy Frontend on Netlify

1. Create new Netlify site from GitHub.
2. Base directory: `frontend`
3. Build command:

```bash
npm run build
```

4. Publish directory:

```text
dist
```

5. Add environment variable:

```env
VITE_API_URL=https://your-render-backend-url.onrender.com/api
```

## 6. Important Notes

- Never upload `.env` to GitHub.
- Use `.env.example` only for sample variables.
- If menu does not load, check backend URL and Supabase keys.
- If orders fail, check Supabase table names and backend console.
