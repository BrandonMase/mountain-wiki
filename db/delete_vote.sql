DELETE FROM mw_votes WHERE user_id = $1 AND is_entry = $2 AND vote_id = $3;

-- UPDATE mw_users SET total_points = total_points -1 WHERE auto_id = $1;