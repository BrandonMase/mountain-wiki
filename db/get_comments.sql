select mw_comments.entry_id,mw_comments.auto_id,ref_answer_id,mw_comments.total_points,date,content,mw_users.name,mw_users.total_points as user_total_points,mw_users.picture,mw_comments.user_id
FROM mw_comments
JOIN mw_users 
ON mw_users.auto_id = mw_comments.user_id AND mw_comments.entry_id = $1