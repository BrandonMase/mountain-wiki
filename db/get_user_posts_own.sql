SELECT mw_entry.*,mw_entry.auto_id as entry_id,mw_users.name,(SELECT COUNT(*) FROM mw_comments WHERE entry_id = mw_entry.auto_id) as answers FROM mw_entry 
JOIN mw_users
ON mw_users.auto_id = mw_entry.master_contributor
WHERE mw_entry.master_contributor = $1