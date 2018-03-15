-- UPDATE mw_users SET total_points = total_points + 1 WHERE auto_id = $1;
INSERT INTO mw_votes (user_id,is_entry,vote_id,is_upvote) VALUES(
    $1,$2,$3,$4
);
