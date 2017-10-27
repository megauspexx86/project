<table style="margin-left: auto; margin-right: auto; border-collapse: collapse; border: none; font-family: Arial, sans-serif; background-color: #ffffff; font-size: 15px;" border="0" width="600px" cellspacing="0" cellpadding="0">
    <tbody>
        <tr>
            <td style="width: 100%;" align="center" valign="top">

                <table style="margin-left: auto; margin-right: auto; background-color: #ffffff; font-family: Arial;" border="0" width="600" cellspacing="0" cellpadding="0">
                    <tbody>
                        <tr>
                            <td style="width: 100%;" align="center" valign="top">

                                <table style="background-color: #ffffff; margin-left: auto; margin-right: auto; font-family: Arial;" border="0" width="600" cellspacing="0" cellpadding="0">

                                    <tbody>

                                        <tr class="body" style="background-color:#fff;">
                                            <td colspan="3" align="center">
                                                <table class="row" style="border-collapse:collapse;width: 95%; border-bottom:1px solid #e5e5e5;" border="0" cellpadding="10px" cellspacing="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="font-size:14px; line-height:24px;
                                                                            padding-top: 10px;font-family: Arial;">В систему Напишем (РБ) поступил новый заказ:</td>
                                                        </tr>
                                                        <tr>
                                                            <td class="text-2" style="font-size:14px; line-height:24px;padding-top:0;font-family: Arial;padding-bottom:20px">
                                                                <table class="row" style="border-collapse:
                                                    collapse;width: 280px;" border="0" cellpadding="10px" cellspacing="0">
                                                                    <tbody>

                                                                        <tr>
                                                                            <td style="padding: 0; padding-top: 5px;font-size:14px;width:80px;vertical-align: top;">№ заказа:</td>
                                                                            <td style="padding: 0; padding-top: 5px;font-size:14px;vertical-align: top;">{$order['id']}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style="padding: 0; padding-top: 5px;font-size:14px;width:80px;vertical-align: top;">Тип:</td>
                                                                            <td style="padding: 0; padding-top: 5px;font-size:14px;vertical-align: top;">{$order['type_name']}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style="padding: 0; padding-top: 5px;font-size:14px;width:80px;vertical-align: top;">Тема:</td>
                                                                            <td style="padding: 0; padding-top: 5px;font-size:14px;vertical-align: top;">
                                                                                {$order['title']}
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style="padding: 0; padding-top: 5px;font-size:14px;width:80px;vertical-align: top;">Предмет:</td>
                                                                            <td style="padding: 0; padding-top: 5px;font-size:14px;vertical-align: top;">
                                                                                {$order['subject_name']}
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style="padding: 0; padding-top: 5px;font-size:14px;width:80px;vertical-align: top;">Срок сдачи:</td>
                                                                            <td style="padding: 0; padding-top: 5px;font-size:14px;vertical-align: top;">
                                                                                {$order['formatted_terms']}
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td style="padding: 0; padding-top: 5px;font-size:14px;width:80px;vertical-align: top;">Объем:</td>
                                                                            <td style="padding: 0; padding-top: 5px;font-size:14px;vertical-align: top;">{$order['volume_from']}</td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td colspan="2" style="font-size:14px; line-height:24px; padding-top: 10px;padding-bottom: 10px;font-family: Arial;"><b>Информация о заказчике</b></td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td style="padding: 0; padding-top: 5px;font-size:14px;width:80px;vertical-align: top;">Имя:</td>
                                                                            <td style="padding: 0; padding-top: 5px;font-size:14px;vertical-align: top;">{$order['owner_name']}</td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td style="padding: 0; padding-top: 5px;font-size:14px;width:80px;vertical-align: top;">Телефон:</td>
                                                                            <td style="padding: 0; padding-top: 5px;font-size:14px;vertical-align: top;">{$order['owner_phone']}</td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td style="padding: 0; padding-top: 5px;font-size:14px;width:80px;vertical-align: top;">Email:</td>
                                                                            <td style="padding: 0; padding-top: 5px;font-size:14px;vertical-align: top;">{$order['owner_email']}</td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td style="padding: 0; padding-top: 5px;font-size:14px;width:80px;vertical-align: top;">Дата:</td>
                                                                            <td style="padding: 0; padding-top: 5px;font-size:14px;vertical-align: top;">{$order['formatted_create_date']}</td>
                                                                        </tr>

                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>

                                                </tbody>
                                                </table>
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>

                            </td>
                        </tr>
                    </tbody>
                </table>

            </td>
        </tr>

    </tbody>
</table>