<!DOCTYPE html>
<html>

<head>
    <meta charset="utf8" />
    <meta content="IE=edge" http-equiv="x-ua-compatible" />
    <meta content="width=device-width, initial-scale=1, target-densityDpi=device-dpi, user-scalable=no" name="viewport" />
    <link href="<!--{$config['settings']['assets']}-->/images/favicon.ico" rel="shortcut icon" type="image/x-icon" />
    <title>Кабинет партнера</title>
</head>

<body>
<div id="partner_form_napishem"></div>

<script type="text/javascript">
    var  s = document.createElement('script');
    var container = 'partner_form_napishem';
    var charset = document.characterSet ? document.characterSet : document.charset;
    s.async = false;
    var url = '{$partner_url}';
    var id = {$template_id};
    s.src = url+'/widget_template.js?id='+id+'&c=' + container + '&charset=' + charset;
    document.onload = document.body.appendChild(s);
    window.onload = function() {
        var form = document.getElementById('napishemPartnerForm');
        form.setAttribute('data-api','');
        form.action = '';
    }

</script>
</body>

</html>
