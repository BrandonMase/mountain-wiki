(SELECT * FROM mw_entry WHERE is_entry = true ORDER BY date DESC LIMIT 99)
union
(SELECT * FROM mw_entry WHERE is_question = true ORDER BY total_points DESC LIMIT 99)
union
(SELECT * FROM mw_entry WHERE is_snippet = true ORDER BY date DESC LIMIT 99)
