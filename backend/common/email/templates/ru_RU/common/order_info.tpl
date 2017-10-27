<table class="row" style="border-collapse: collapse ; width: 550px" border="0" cellpadding="10px" cellspacing="0">
    <tbody>

    {if $order.work_class == 1}
        <tr>
            <td style="padding: 0; padding-top: 5px;font-size:14px;width:140px;vertical-align: top;">Тип:</td>
            <td style="padding: 0 ; padding-top: 5px ; font-size: 14px ; vertical-align: top">
                {$type_name}</td>
        </tr>
        <tr>
            <td style="padding: 0; padding-top: 5px;font-size:14px;width:140px;vertical-align: top;">Тема:</td>
            <td style="padding: 0; padding-top: 5px;font-size:14px;vertical-align: top;">
                {$order.title}
            </td>
        </tr>
        <tr>
            <td style="padding: 0; padding-top: 5px;font-size:14px;width:140px;vertical-align: top;">Предмет:</td>
            <td style="padding: 0; padding-top: 5px;font-size:14px;vertical-align: top;">
                {$subject_name}
            </td>
        </tr>
        <tr>
            <td style="padding: 0; padding-top: 5px;font-size:14px;width:140px;vertical-align: top;">Язык:</td>
            <td style="padding: 0; padding-top: 5px;font-size:14px;vertical-align: top;">{$language}
        </tr>
    {/if}

    {if $order.work_class == 2}
        <tr>
            <td style="padding: 0; padding-top: 5px;font-size:14px;width:140px;vertical-align: top;">Тип:</td>
            <td style="padding: 0 ; padding-top: 5px ; font-size: 14px ; vertical-align: top">
                {$type_name}</td>
        </tr>

        <tr>
            <td style="padding: 0; padding-top: 5px;font-size:14px;width:140px;vertical-align: top;">Язык оригинала:</td>
            <td style="padding: 0; padding-top: 5px;font-size:14px;vertical-align: top;">{$language}
        </tr>

        <tr>
            <td style="padding: 0; padding-top: 5px;font-size:14px;width:140px;vertical-align: top;">Язык перевода:</td>
            <td style="padding: 0; padding-top: 5px;font-size:14px;vertical-align: top;">{$language_to}
        </tr>

        <tr>
            <td style="padding: 0; padding-top: 5px;font-size:14px;width:140px;vertical-align: top;">Объём:</td>
            <td style="padding: 0; padding-top: 5px;font-size:14px;vertical-align: top;">
                {if $order.volume_from !=0 && $order.volume_to !=0}
                    {$order.volume_from} - {$order.volume_to} знаков.
                {/if}

                {if $order.volume_from !=0 && $order.volume_to ==0}
                    от {$order.volume_from} знаков.
                {/if}

                {if $order.volume_from == 0 && $order.volume_to !=0}
                    до {$order.volume_to} знаков.
                {/if}

                {if $order.volume_from == 0 && $order.volume_to ==0}
                    не определён
                {/if}
            </td> </tr>
    {/if}

    {if $order.work_class == 4}
        <tr>
            <td style="padding: 0; padding-top: 5px;font-size:14px;width:140px;vertical-align: top;">Тип:</td>
            <td style="padding: 0 ; padding-top: 5px ; font-size: 14px ; vertical-align: top">
                {$type_name}</td>
        </tr>

        <tr>
            <td style="padding: 0; padding-top: 5px;font-size:14px;width:140px;vertical-align: top;">Категория:</td>
            <td style="padding: 0; padding-top: 5px;font-size:14px;vertical-align: top;">{$category}
        </tr>

        <tr>
            <td style="padding: 0; padding-top: 5px;font-size:14px;width:140px;vertical-align: top;">Описание услуги:</td>
            <td style="padding: 0; padding-top: 5px;font-size:14px;vertical-align: top;">{$order.title}
        </tr>

        <tr>
            <td style="padding: 0; padding-top: 5px;font-size:14px;width:140px;vertical-align: top;">Объём:</td>

            <td style="padding: 0; padding-top: 5px;font-size:14px;vertical-align: top;">
                {if $order.volume_from !=0 && $order.volume_to !=0}
                    {$order.volume_from} - {$order.volume_to} знаков.
                {/if}

                {if $order.volume_from !=0 && $order.volume_to ==0}
                    от {$order.volume_from} знаков.
                {/if}

                {if $order.volume_from == 0 && $order.volume_to !=0}
                    до {$order.volume_to} знаков.
                {/if}

                {if $order.volume_from == 0 && $order.volume_to ==0}
                    не определён
                {/if}
        </tr>
    {/if}

    {if $order.work_class == 8}
        <tr>
            <td style="padding: 0; padding-top: 5px;font-size:14px;width:140px;vertical-align: top;">Тип:</td>
            <td style="padding: 0; padding-top: 5px;font-size:14px;vertical-align: top;">
                {$type_name}
            </td>
        </tr>
        <tr>
            <td style="padding: 0; padding-top: 5px;font-size:14px;width:140px;vertical-align: top;">Предмет:</td>
            <td style="padding: 0; padding-top: 5px;font-size:14px;vertical-align: top;">
                {$subject_name}
            </td>
        </tr>
        <tr>
            <td style="padding: 0; padding-top: 5px;font-size:14px;width:140px;vertical-align: top;">Язык:</td>
            <td style="padding: 0; padding-top: 5px;font-size:14px;vertical-align: top;">
                {$language}
            </td>
        </tr>
        <tr>
            <td style="padding: 0; padding-top: 5px;font-size:14px;width:140px;vertical-align: top;">Дата экзамена:</td>
            <td style="padding: 0; padding-top: 5px;font-size:14px;vertical-align: top;">
                {foreach from=$properties item=property}
                    {if $property.property_code == 'date'}
                        {$property.property_value}
                    {/if}
                {/foreach}
            </td>
        </tr>
        <tr>
            <td style="padding: 0; padding-top: 5px;font-size:14px;width:140px;vertical-align: top;">Время:</td>
            <td style="padding: 0; padding-top: 5px;font-size:14px;vertical-align: top;">
                {foreach from=$properties item=property}

                    {if $property.property_code == 'hour'}
                        {$property.property_value}
                    {/if}
                {/foreach}:{foreach from=$properties item=property}
                    {if $property.property_code == 'minute'}
                        {$property.property_value}
                    {/if}
                {/foreach} (МСК)
            </td>
        </tr>

    {/if}


    </tbody>
</table>