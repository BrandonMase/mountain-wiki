SELECT mw_entry.*,
(SELECT COUNT(*) FROM mw_comments WHERE entry_id = $1) as answers,mw_users.name
FROM mw_entry 
JOIN mw_users 
ON mw_users.auto_id = mw_entry.master_contributor
WHERE mw_entry.auto_id = $1