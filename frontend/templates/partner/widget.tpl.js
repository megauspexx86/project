var napishem_partner_settings = {

    min_year: "<!--{$min_year}-->",
    min_month: "<!--{$min_month}-->",
    min_day: "<!--{$min_day}-->",

    max_year: "<!--{$max_year}-->",
    max_month: "<!--{$max_month}-->",
    max_day: "<!--{$max_day}-->",
    container: "<!--{$container}-->"
};

(function(d, w){


    var loadJS = function(src) {var s = d.createElement('script');s.type = 'text/javascript';s.src = src;s.async = false;s.charset='utf-8';d.body.appendChild(s);<!--{if $api_url}-->s.setAttribute('data-container', '<!--{$container}-->');s.setAttribute('data-cid', '<!--{$component_id}-->');s.setAttribute('data-api', '<!--{$api_url}-->');s.setAttribute('data-pid', '<!--{$partner_id}-->');<!--{/if}-->};
    var loadCSS = function(src) {var с = d.createElement('link');с.rel = 'stylesheet';с.type = 'text/css';с.href = src;с.media = 'all';d.head.appendChild(с);};

    <!--{foreach from=$css item=src}-->
    loadCSS("<!--{$src}-->");
    <!--{/foreach}-->

    <!--{foreach from=$js item=src}-->
    loadJS("<!--{$src}-->");
    <!--{/foreach}-->

    <!--{if $template}-->
        d.getElementById('<!--{$container}-->').innerHTML = '<!--{$template}-->';
    <!--{/if}-->

})(document, window);