SELECT *,
(SELECT name FROM mw_users WHERE auto_id = mw_pms.to_user) as to_name,
(SELECT name FROM mw_users WHERE auto_id = mw_pms.from_user) as from_name
FROM mw_pms
WHERE to_user = $1 OR from_user = $1