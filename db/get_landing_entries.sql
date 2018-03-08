(SELECT mw_entry.*, mw_users.name,(SELECT COUNT(*) FROM mw_comments WHERE entry_id = mw_entry.auto_id) as answers
FROM mw_entry
JOIN mw_users
ON mw_users.auto_id = mw_entry.master_contributor
WHERE mw_entry.entry_type = 'question'
AND mw_entry.seen = true
ORDER BY mw_entry.total_points DESC LIMIT 99)
UNION 
(SELECT mw_entry.*, mw_users.name,(SELECT COUNT(*) FROM mw_comments WHERE entry_id = mw_entry.auto_id) as answers
FROM mw_entry
JOIN mw_users
ON mw_users.auto_id = mw_entry.master_contributor
WHERE mw_entry.entry_type = 'entry'
AND mw_entry.seen = true
ORDER BY mw_entry.auto_id DESC LIMIT 99)
UNION
(SELECT mw_entry.*, mw_users.name,(SELECT COUNT(*) FROM mw_comments WHERE entry_id = mw_entry.auto_id) as answers
FROM mw_entry
JOIN mw_users
ON mw_users.auto_id = mw_entry.master_contributor
WHERE mw_entry.entry_type = 'snippet'
AND mw_entry.seen = true
ORDER BY mw_entry.total_points DESC LIMIT 99)