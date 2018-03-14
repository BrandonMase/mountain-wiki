SELECT mw_entry.*,
(SELECT COUNT(*) FROM mw_comments WHERE mw_comments.entry_id = mw_entry.auto_id) as answers,
(SELECT mw_users.name FROM mw_users WHERE mw_users.auto_id = mw_entry.master_contributor) as name
FROM mw_entry
WHERE (LOWER(title) LIKE LOWER( CONCAT('%',$1,'%'))
OR LOWER(content) LIKE LOWER( CONCAT('%',$1,'%'))
OR LOWER(labels) LIKE LOWER( CONCAT('%',$1,',%'))
OR LOWER(labels) LIKE LOWER( CONCAT('%',$1,'%')))
AND seen = true