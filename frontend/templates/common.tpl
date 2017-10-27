<!DOCTYPE html>
<html>

<head>
    <meta charset="utf8" />
    <meta content="IE=edge" http-equiv="x-ua-compatible" />
    <meta content="width=device-width, initial-scale=1, target-densityDpi=device-dpi, user-scalable=no" name="viewport" />
    <link href="<!--{$config['settings']['assets']}-->/images/favicon.ico" rel="shortcut icon" type="image/x-icon" />
    <title>Кабинет партнера</title>
    <link href="<!--{$config['settings']['assets']}-->/application.css" rel="stylesheet" type="text/css" />
    <script src="<!--{$config['bundles']['i18n']}-->/ru_RU.js" type="text/javascript"></script>
</head>

<body>
<div class="layout" id="layout__main"></div>

<script type="text/javascript">
    $CFG = {
        user: {
            id: <!--{$user['id']}-->, name: "<!--{$user['name']}-->", role: "<!--{$user['role']}-->", agent: "<!--{$user['agency_id']}-->",
            phone: "<!--{$user['phone']}-->", phone_country_code: "<!--{$user['phone_country_code']}-->", email: "<!--{$user['email']}-->", create_date: "<!--{$user['create_date']}-->"
        },


        form_sizes_width: <!--{$form_sizes_width}-->,
        form_sizes_height: <!--{$form_sizes_height}-->,
        form_sizes_available_height: <!--{$form_sizes_available_height}-->,
        partner_url: <!--{$partner_url}-->,

        timestamp: <!--{$smarty.now}-->,

        account_url: <!--{$account_url}-->,

        mirror_url: <!--{$mirror_url}-->,
        avatar_url: "<!--{$config['settings']['avatar_path']}-->",

        partner_id: <!--{$partner_id}-->,
        wl: <!--{$wl}-->
    }
</script>

<script type="application/javascript" src="<!--{$config['bundles']['partner']}-->"></script>

<!--{if $support}-->
<!--{include file="partner/support/partner.tpl"}-->
<!--{/if}-->

</body>

</html>
