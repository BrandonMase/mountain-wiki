INSERT INTO mw_comments (date,content,entry_id,user_id) VALUES ($1,$2,$3,$4) RETURNING auto_id;

-- UPDATE mw_users SET total_points = total_points + 1 WHERE auto_id = $4;