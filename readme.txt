 зайди через putty

 sudo nano /etc/nginx/sites-available/napishembase

 после строки  server_name www.project.lc;
 добавь

 location /production/ {
   root /vagrant/project/frontend/static;
 }

 location /dev/ {
   root /vagrant/project/frontend/static;
 }
 потом нажми
 ctrl x

 Y

 Enter

 потом
 sudo service  nginx restart
