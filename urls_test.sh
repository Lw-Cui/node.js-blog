#!/bin/bash
curl http://localhost:3000/login -d 'username=lw&password=123' -D cookie
MAX=2
for ((count=1; $count<MAX; count++))
do
    curl http://localhost:3000/del_post/$count -b cookie
done
curl http://localhost:3000/add_post -b cookie -d 'title=first&content=Hello'
curl http://localhost:3000/add_post -b cookie -d 'title=second&content=Hello'
curl http://localhost:3000/post/first
curl http://localhost:3000/post_id/20
curl http://localhost:3000/edit_post/21 -b cookie -d 'title=edit&content=Hello'
curl http://localhost:3000/del_post/20 -b cookie
curl http://localhost:3000/logout
