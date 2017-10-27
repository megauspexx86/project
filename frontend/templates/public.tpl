<!DOCTYPE html>
<html lang="ru">

<head>
    <meta name="description" content="Партнерская программа студенческих работ по монетизации трафика от биржи Напишем. Принимайте участие в CPA-партнерке. Зарегистрируйся прямо сейчас" />
    <title>Партнерская программа по монетизации трафика, СРА-партнерка для заработка на услугах | Отзывы о работе, регистрация</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta property="og:image" content="{$config['settings']['public_assets']}/img/favicon-192x192.png" />
    <link href="{$config['settings']['public_assets']}/img/favicon-192x192.png" rel="shortcut icon" type="image/x-icon" />
    <link rel="stylesheet" href="{$config['settings']['public_assets']}/styles/common.css">
    </head>
<body>

{include file='partner/public/header.tpl'}
{include file='partner/public/main.tpl'}
{include file='partner/public/footer.tpl'}
{include file='partner/public/popup_login.tpl'}
{include file='partner/public/popup_register.tpl'}
{include file='partner/public/popup_pass_remind.tpl'}
{include file='partner/public/popup_pass_remind_completed.tpl'}
{include file='partner/public/popup_reminder_invalid.tpl'}
{include file='partner/public/popup_reminder_sms_sent.tpl'}
{include file='partner/public/popup_new_password.tpl'}
    <script src="{$config['settings']['public_assets']}/js/landing.js"></script>

{if $metrika}

    <!-- Yandex.Metrika counter -->
    <script type="text/javascript">
        (function (d, w, c) {
            (w[c] = w[c] || []).push(function() {
                try {
                    w.yaCounter43524239 = new Ya.Metrika({
                        id:43524239,
                        clickmap:true,
                        trackLinks:true,
                        accurateTrackBounce:true,
                        webvisor:true
                    });
                } catch(e) { }
            });

            var n = d.getElementsByTagName("script")[0],
                    s = d.createElement("script"),
                    f = function () { n.parentNode.insertBefore(s, n); };
            s.type = "text/javascript";
            s.async = true;
            s.src = "https://mc.yandex.ru/metrika/watch.js";

            if (w.opera == "[object Opera]") {
                d.addEventListener("DOMContentLoaded", f, false);
            } else { f(); }
        })(document, window, "yandex_metrika_callbacks");
    </script>
    <noscript><div><img src="https://mc.yandex.ru/watch/43524239" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
    <!-- /Yandex.Metrika counter -->

    <script>
        (function(i,s,o,g,r,a,m){
            i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-93896512-1', 'auto');
        ga('send', 'pageview');

    </script>

{/if}

</body>

</html>
