#!/bin/bash
curl http://localhost:3000/register -d 'username=lw&password=123' 
curl http://localhost:3000/login -d 'username=lw&password=123' -D cookie
MAX=32
for ((count=30; $count<MAX; count++))
do
    curl http://localhost:3000/del_post/$count -b cookie
done
curl http://localhost:3000/add_post -b cookie -d 'title=first&content=Hello'
curl http://localhost:3000/add_post -b cookie -d 'title=second&content=Hello'
curl http://localhost:3000/post/first
curl http://localhost:3000/post_id/30
curl http://localhost:3000/edit_post/32 -b cookie -d 'title=edit&content=Hello'
curl http://localhost:3000/logout
