SELECT mw_entry.*,
(SELECT COUNT(*) FROM mw_comments WHERE entry_id = $1) as answers,mw_users.name,
(SELECT COUNT(*) FROM mw_votes WHERE mw_votes.is_entry = true AND mw_votes.user_id = $2 AND mw_votes.vote_id = $1 AND mw_votes.is_upvote = 'true') as vote_upvote,
(SELECT COUNT(*) FROM mw_votes WHERE mw_votes.is_entry = true AND mw_votes.user_id = $2 AND mw_votes.vote_id = $1 AND mw_votes.is_upvote = 'false') as vote_downvote
FROM mw_entry 
JOIN mw_users 
ON mw_users.auto_id = mw_entry.master_contributor
WHERE mw_entry.auto_id = $1