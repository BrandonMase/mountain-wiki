(SELECT mw_entry.auto_id,is_entry,is_snippet,is_question,entry_id,title,labels,date,name,mw_entry.total_points,answers
FROM mw_entry 
JOIN mw_users
ON mw_users.auto_id = mw_entry.master_contributor 
AND mw_entry.is_question = true
AND seen = true
ORDER BY mw_entry.total_points DESC LIMIT 99)
UNION 
(SELECT mw_entry.auto_id,is_entry,is_snippet,is_question,entry_id,title,labels,date,name,mw_entry.total_points,answers
FROM mw_entry 
JOIN mw_users
ON mw_users.auto_id = mw_entry.master_contributor 
AND mw_entry.is_entry = true
AND seen = true
ORDER BY mw_entry.auto_id DESC LIMIT 99)
UNION
(SELECT mw_entry.auto_id,is_entry,is_snippet,is_question,entry_id,title,labels,date,name,mw_entry.total_points,answers
FROM mw_entry 
JOIN mw_users
ON mw_users.auto_id = mw_entry.master_contributor 
AND mw_entry.is_snippet = true
AND seen = true
ORDER BY mw_entry.total_points DESC LIMIT 99)