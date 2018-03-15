SELECT mw_entry.*,
(SELECT COUNT(*) FROM mw_comments WHERE mw_comments.entry_id = mw_entry.auto_id),
(SELECT mw_users.name FROM mw_users WHERE mw_entry.master_contributor = mw_users.auto_id) as name
FROM mw_entry WHERE seen = true ORDER BY total_points LIMIT 10;