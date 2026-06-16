-- Nova Panel — D1 schema
-- NOTE: The worker creates these automatically on first request, so running this
-- by hand is OPTIONAL. Provided for manual setup / inspection / migrations.
--
-- Apply with:
--   wrangler d1 execute nova-panel-db --remote --file=schema.sql

CREATE TABLE IF NOT EXISTS usage (
  k     TEXT PRIMARY KEY,
  up    INTEGER DEFAULT 0,
  down  INTEGER DEFAULT 0,
  total INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS logs (
  id   INTEGER PRIMARY KEY AUTOINCREMENT,
  TYPE TEXT,
  IP   TEXT,
  ASN  TEXT,
  CC   TEXT,
  URL  TEXT,
  UA   TEXT,
  TIME INTEGER
);

-- General document store (replaces KV; holds config, subs, network settings, etc.)
CREATE TABLE IF NOT EXISTS kvstore (
  k       TEXT PRIMARY KEY,
  v       TEXT,
  updated INTEGER
);
