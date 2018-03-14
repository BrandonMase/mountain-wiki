INSERT INTO mw_entry (title,content,entry_type,seen,date,master_contributor,labels,secret)
VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
RETURNING auto_id;