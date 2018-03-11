INSERT INTO mw_comments (ref_answer_id,date,content,user_id,entry_id) VALUES ($1,$2,$3,$4,$5)
RETURNING auto_id;