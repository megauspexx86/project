<!--content statrs-->
<tbody><tr class="body" style="background-color:#fff;">
    <td colspan="3" align="center">
        <table class="row" style="border-collapse:
												collapse;width: 95%; border-bottom:1px solid #e5e5e5;" border="0" cellpadding="10px" cellspacing="0">

            <tbody><tr>
                <td style="font-size:14px; line-height:24px;
															padding-top: 30px;font-family: Arial;">Здравствуйте, {$name}!</td>
            </tr>
            <tr>
                <td style="font-size:14px; line-height:24px;padding-top: 0;font-family: Arial;">
                    Вы приняли работу автора ID{$author.id} {$author.name} имя по заказу {$type_name} №{$order.id} по теме "{$order.title}".
                </td>
            </tr>

            <tr>
                <td style="font-size:14px; line-height:24px;padding-top: 0;font-family: Arial;">
                    Ваш отзыв: "{$response.author_response}"<br/>
                    Ваша оценка: {$response.work_quality}<br/>
                    Оценка сроков: {if $response.time_quality == 2}Выполнил раньше срока{/if}{if $response.time_quality == 1}Выполнил в срок{/if}{if $response.time_quality == 0}Задержал работу{/if}
                </td>
            </tr>


            <tr>
                <td style="font-size:14px; line-height:24px;padding-top: 0;font-family: Arial;">
                    Сейчас заказ находится на этапе гарантийной поддержки, который продлится до {$expire_date}.
                    В течение данного периода Вы можете обратиться к автору за доработками, если таковые имеются.
                </td>
            </tr>


            <!--[if !(gte mso 9)]>-->
            <tr style="text-align:center;">
                <td style="padding-top:40px;
											 											padding-bottom:60px;">
                    <a target="_blank" style="color:white;text-transform:uppercase;border-radius:5px;
											 												background-color:#3273b5;text-decoration:none;padding:15px;
											 												font-size:12px; font-weight:bold;font-family: Arial;" href="{$__AUTOLOGIN_BASE__}/{$order_link}">Перейти в заказ</a>
                </td>
            </tr>

            <!--<![endif]-->
            </tbody></table>
    </td>
</tr>
<!--content end-->