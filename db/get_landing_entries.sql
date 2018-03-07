(SELECT mw_entry.auto_id,entry_type,entry_id,title,labels,date,name,mw_entry.total_points,answers
FROM mw_entry 
JOIN mw_users
ON mw_users.auto_id = mw_entry.master_contributor 
AND mw_entry.entry_type = 'question'
AND seen = true
ORDER BY mw_entry.total_points DESC LIMIT 99)
UNION 
(SELECT mw_entry.auto_id,entry_type,entry_id,title,labels,date,name,mw_entry.total_points,answers
FROM mw_entry 
JOIN mw_users
ON mw_users.auto_id = mw_entry.master_contributor 
AND mw_entry.entry_type = 'entry'
AND seen = true
ORDER BY mw_entry.auto_id DESC LIMIT 99)
UNION
(SELECT mw_entry.auto_id,entry_type,entry_id,title,labels,date,name,mw_entry.total_points,answers
FROM mw_entry 
JOIN mw_users
ON mw_users.auto_id = mw_entry.master_contributor 
AND mw_entry.entry_type = 'snippet'
AND seen = true
ORDER BY mw_entry.total_points DESC LIMIT 99)