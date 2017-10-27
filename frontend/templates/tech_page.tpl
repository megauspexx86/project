
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf8" />
    <meta content="IE=edge" http-equiv="x-ua-compatible" />
    <meta content="width=device-width, initial-scale=1, target-densityDpi=device-dpi, user-scalable=no" name="viewport" />
    <link href="/assets/images/favicon.ico" rel="shortcut icon" type="image/x-icon" />
    <title></title>
    <link href="/assets/application.css" rel="stylesheet" type="text/css" />
    <script src="/assets/javascripts/application.js" type="text/javascript"></script>
</head>

<body>
<div class="layout">
    <div class="layout__inner">

        <div class="timer-page">
            <div class="timer-page__logo">
                <img width=125 src="/assets/images/partnerLK/Logo.svg" alt="napishem.com" class="timer-page__logo">
            </div>
            <div class="timer-page__inner">
                <div class="timer-page__text timer-page__text--large timer-page__text--mb15">
                    ПОЗДРАВЛЯЕМ!
                </div>
                <div class="timer-page__text">
                    Теперь вы стали нашим партнером!
                </div>
                <div class="timer">

                </div>
                <div class="timer-page__text timer-page__text--blue">
                    Через 3 секунды вы попадете в личный кабинет.
                </div>
            </div>
            <div class="timer-page__footer">
                <div class="timer-page__text timer-page__text--small">
                    ©2017. Биржа «Напишем». Все права защищены.
                </div>
            </div>
        </div>

        <a class="js-exit-off-canvas"></a>
    </div>
</div>

<script src="{$config['settings']['public_assets']}/js/lib/progressbar.js"></script>

<script>
    var container = document.getElementsByClassName('timer')[0];
    var bar = new ProgressBar.Circle(container, {
        color: '#aaa',
        // This has to be the same size as the maximum width to
        // prevent clipping
        strokeWidth: 5,
        trailWidth: 5,
        easing: 'easeInOut',
        duration: 1400,
        text: {
            style: {
                fontFamily: 'Roboto, sans-serif',
                fontSize: '3rem',
                position: 'absolute',
                padding: 0,
                margin: 0,
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)'
            }
        },
        from: { color: '#2671bb', width: 5 },
        to: { color: '#2671bb', width: 5 },
        // Set default step function for all animate calls
        step: function(state, circle) {
            circle.path.setAttribute('stroke', state.color);
            circle.path.setAttribute('stroke-width', state.width);
        }
    });

            function timer(){
                val--;

                bar.setText(val);
                bar.set(1 - val/3);

                if(val == 0){
                    document.location.href = '/help/rules';
                }
                else{
                    setTimeout(timer,1000);
                }
            }

    var val = 3;
    bar.setText(val);
    bar.set(1 - val/3);
    setTimeout(timer,1000);





//bar.setText(1);
//    bar.set(0.4);  // Number from 0.0 to 1.0
</script>

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
