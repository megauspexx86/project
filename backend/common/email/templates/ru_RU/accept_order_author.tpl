<!--content statrs-->
<tr class="body" style="background-color:#fff;">
    <td colspan="3" align="center">
        <table class="row" style="border-collapse:
                    collapse;width: 95%; border-bottom:1px solid #e5e5e5;" border="0" cellpadding="10px"
               cellspacing="0">

            <tbody>
            <tr>
                <td style="font-size:14px; line-height:24px;
                                    padding-top: 30px;font-family: Arial;">Здравствуйте, {$name}!
                </td>
            </tr>
            <tr>
                <td style="font-size:14px; line-height:24px;
                                    padding-top: 0;font-family: Arial;">Поздравляем Вас! Заказчик принял работу по
                    заказу:
                </td>
            </tr>
            <tr>
                <td class="text-2" style="font-size:14px;
                line-height:24px;padding-top:0;font-family: Arial;padding-bottom:20px">
                    {include "common/order_info.tpl"}
                </td>
            </tr>

            <tr>
                <td class="text-2" style="font-size:14px;
                    line-height:24px;padding-top:0;font-family: Arial;padding-bottom:10px">Отзыв :
                </td>
            </tr>
            <tr>
                <td class="text-2" style="font-size:14px;
                    line-height:24px;padding-top:0;font-family: Arial;padding-bottom:10px">{$response.author_response}</td>
            </tr>
            <tr>
                <td class="text-2" style="font-size:14px;
                    line-height:24px;padding-top:0;font-family: Arial;padding-bottom:10px">
                    Оценка: {$response.work_quality}</td>
            </tr>
            <tr>
                <td class="text-2" style="font-size:14px;
                    line-height:24px;padding-top:0;font-family: Arial;padding-bottom:10px">
                    Сроки: {if $response.time_quality == 2}Выполнил раньше срока{/if}{if $response.time_quality == 1}Выполнил в срок{/if}{if $response.time_quality == 0}Задержал работу{/if}</td>
            </tr>

            <tr>
                <td class="text-2" style="font-size:14px;
                line-height:24px;padding-top:0;font-family: Arial;padding-bottom:10px">Заказ переведен в выполненные.
                    Заказчик может запросить доработку работы в течение гарантийного срока.
                </td>
            </tr>
            <tr>
                <td class="text-2" style="font-size:14px;
                line-height:24px;padding-top:0;font-family: Arial;padding-bottom:10px">Оплата за выполненную работу
                    будет переведена на Ваш счет по истечении гарантийного срока — через 7 дней.
                </td>
            </tr>
            <!--[if !(gte mso 9)]>-->
            <tr style="text-align:center;">
                <td style="padding-top:40px;
                                                                padding-bottom:60px;">
                    <a target="_blank" style="color:white;text-transform:uppercase;border-radius:5px;
                                                                    background-color:#3273b5;text-decoration:none;padding:15px;
                                                                    font-size:12px; font-weight:bold;font-family: Arial;"
                       href="{$__AUTOLOGIN_BASE__}/{$order_link}">Перейти в заказ
                    </a>
                </td>
            </tr>
            <!--<![endif]-->
            </tbody>
        </table>

    </td>
</tr>
<!--content end-->