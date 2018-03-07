SELECT mw_entry.*,
(SELECT COUNT(*) FROM mw_comments WHERE entry_id = $1) as answers 
FROM mw_entry 
WHERE mw_entry.auto_id = $1