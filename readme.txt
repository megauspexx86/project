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


1)меню слева:
а)для выбора обычного окна нужно блоку с классом constructor__image менять id в соответствии:

одностворчатое окно - это id = type_1_1 а так же блоку с классом constructor__center менять id на ctype_1_1,

двустворчатое id = type_1_2 а так же блоку с классом constructor__center менять id на ctype_1_2,

трехстворчатое id = type_1_3 а так же блоку с классом constructor__center менять id на ctype_1_3,

а так же менять заголовок внутри блока с id = main-title в зависимости от типа окна
(Одностворчатое окно, Двухстворчатое окно, Трехстворчатое окно)

//////////////////////////////////////////////////////////////////////////////////////////////////

б) для выбора окна с фрамугой, нобходимо блоку с классом constructor__image менять id в соответствии:

одностворчатое окно с фрамугой  id = type_2_1 а так же блоку с классом constructor__center менять id на ctype_2_1,

двустворчатое окно с фрамугой id = type_2_2 а так же блоку с классом constructor__center менять id на ctype_2_2,

трехстворчатое окно с фрамугой  id = type_2_3, а так же блоку с классом constructor__center менять id на ctype_2_3,

а так же менять заголовок внутри блока с id = main-title в зависимости от типа окна
(Одностворчатое окно с фрамугой, Двухстворчатое окно с фрамугой, Трехстворчатое окно с фрамугой)

//////////////////////////////////////////////////////////////////////////////////////////////////

в) для выбора балконного блока нужно блоку с классом constructor__image менять id в соответствии:

Одностворчатый балконный блок id = type_3_1, а так же блоку с классом constructor__center менять id на ctype_3_1,

двустворчатый балконный блок id = type_3_2, а так же блоку с классом constructor__center менять id на ctype_3_2,

а так же менять заголовок внутри блока с id = main-title в зависимости от типа окна
(Одностворчатый балконный блок, Двухстворчатый балконный блок)



2)блок по центру

а)при клике на окно, блоку с классом constructor__box необходимо менять класс и заголовок в соответствии:
    <a href="#" class="constructor__box constructor__box-window_11" title="Глухая"></a>
    <a href="#" class="constructor__box constructor__box-window_12" title="Поворотная"></a>
    <a href="#" class="constructor__box constructor__box-window_13" title="Поворотно-откидная"></a>