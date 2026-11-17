# OUR LITTLE CASTLE — Phase 1 foundation

React + Vite + TypeScript-ready JavaScript + React Three Fiber + Drei + Supabase client.

## Run locally

```bash
npm install
npm run dev
```

## Current implementation status

### Implemented in this phase
- Persian RTL welcome / entry screen.
- Responsive 3D exterior courtyard and castle towers.
- Free movement in the courtyard with WASD / arrow keys.
- Touch joystick on mobile.
- Six visible 3D room doors with labels; click a door or approach and use the interaction prompt.
- Stylized placeholder avatars and a small animated white kitten (Mochi).
- Account sign-in / sign-up UI using Supabase Auth when configured; no character dropdown or false identity selector.
- Sleep / away exit choice. Presence upsert is attempted only for a real authenticated user.
- Initial Supabase SQL schema for profiles and presence, with RLS policies.

### Not implemented yet (do not treat as working)
- Production-quality likeness avatars / full character animation rig.
- Actual interior 3D environments for the six rooms.
- Two-user realtime movement synchronization and robust presence heartbeat/reconnection.
- Persistent room content, photo/audio storage, scheduled letter delivery, Jalali calendar, gardening/cooking/game systems.
- PWA install flow, offline caching, production deployment and device testing.

## Supabase setup

1. Create a Supabase project.
2. Copy `.env.example` to `.env` and set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
3. Run `supabase-schema.sql` in the Supabase SQL editor.
4. Create the two individual accounts in Supabase Auth.
5. Insert each account's profile row with its matching `auth.users.id` and the exact display name (`نگار` or `آوین`). Never expose a service-role key in the browser.

The current schema is a starter for two explicitly authorized accounts, not a complete invitation/pairing model. The broad authenticated read policies are suitable only for a private project where exactly the two intended accounts are provisioned; before public deployment, replace them with a pair-membership table and membership-based RLS.

Build update - November 17
