# React + TypeScript + Vite + Redux + PocketBase

PocketBase cron jobs + hooks

- Start pocketbase
```
pocketbase serve
```

- Pocketbase login
```
http://127.0.0.1:8090/_/
user: test@test.com
password: 1234567890
```

- App login
```
http://localhost:5173
user: user@test.com
password: 1234567890
```

## Cron jobs

1. Invite code expirace - `__invite_code_exp__`

2. Odstranění neaktivního invite kódu - `__invite_code_inactive_remove__`

## Hooks

1. User register notification
> Po registraci bude vytvořena notifikace pro uživatele, jehož invite kód byl použit.