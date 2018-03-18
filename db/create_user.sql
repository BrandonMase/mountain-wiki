INSERT INTO mw_users (auth0_sub,email,name,picture,sign_up_date)
VALUES ($1,$2,$3,$4,$5)
RETURNING *;