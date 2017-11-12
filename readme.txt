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




12.11.2017 21:58

sudo nano /etc/nginx/sites-available/napishembase


 location / {
                rewrite ^/(.*)$ /index.php last;
        }



добавь последним в location

sudo service  nginx restart


http://www.project.lc/ab страница с констуктором в шапке