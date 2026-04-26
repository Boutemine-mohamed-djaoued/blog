# Mario Kart Writeup

## Idea

The goal is to buy the `Rainbow Road Golden Kart`. A new account can claim a
`$10.00` garage bonus once, but the kart costs `$42.00`, so one normal account
cannot afford it.

The intended bug is a race condition in account creation. The developer assumed
that usernames were unique, and tried to enforce that assumption in application
code. The database does not actually enforce uniqueness, so concurrent register
requests can create multiple accounts with the same username.

Each account can claim the bonus once, but the wallet is calculated by username.
That means duplicate accounts with the same username all add money to the same
wallet.

## Vulnerable Code

Registration checks whether a username already exists before inserting the new
account:

```python
def create_account(username: str, password: str) -> tuple[dict[str, Any], int]:
    username = normalize_username(username)

    if len(password) < 4:
        return {"ok": False, "error": "password must be at least 4 chars"}, 400

    if get_user_by_username(username):
        return {"ok": False, "error": "username already exists"}, 409

    password_hash = generate_password_hash(password)
    user_id = create_user(username, password_hash)
```

And the lookup only returns one user:

```python
def get_user_by_username(username: str) -> sqlite3.Row | None:
    with connect_db() as db:
        return db.execute(
            "SELECT id, username, password_hash, bonus_claimed FROM users WHERE username = ? LIMIT 1",
            (username,),
        ).fetchone()
```

This makes the code look like there can only be one account for a username. The
mistake is that `get_user_by_username()` and `create_user()` are separate
database operations. There is a small window where many requests can all see
"no user exists yet" and then all insert the same username.

The database schema allows this because `username` is not unique:

```sql
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    bonus_claimed INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

There is no `UNIQUE(username)` constraint.

## Why The Bonus Stacks

The bonus is only limited per account:

```python
if user["bonus_claimed"]:
    db.execute("ROLLBACK")
    raise AlreadyClaimedError

db.execute("UPDATE users SET bonus_claimed = 1 WHERE id = ?", (user["id"],))
```

That means account `id=1` can claim once, account `id=2` can claim once, and so
on.

But the wallet balance is calculated by username:

```python
SELECT ? AS wallet_owner, COALESCE(SUM(amount_cents), 0) AS balance_cents
FROM wallet_ledger
WHERE wallet_owner = ?
```

So if five accounts have the same username, each one can claim `$10.00`,
the shared username wallet reaches `$50.00`.

The kart costs `$42.00`, so five successful duplicate accounts are enough.
