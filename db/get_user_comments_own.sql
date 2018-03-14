SELECT mw_entry.auto_id as entry_id,mw_entry.seen,mw_entry.master_contributor,mw_entry.title,mw_comments.content,mw_entry.date as entry_date,mw_comments.date as date,mw_entry.total_points as entry_points,mw_comments.total_points as comment_points,mw_entry.total_points,(SELECT COUNT(*) FROM mw_comments WHERE mw_entry.auto_id = mw_comments.entry_id) as answers,(SELECT name FROM mw_users WHERE auto_id = $1),(SELECT mw_users.name FROM mw_users WHERE auto_id = mw_entry.master_contributor) as entry_name,(SELECT auto_id FROM mw_users WHERE auto_id = $1)
FROM mw_comments
JOIN mw_entry
ON mw_comments.entry_id = mw_entry.auto_id
WHERE mw_comments.user_id = $1