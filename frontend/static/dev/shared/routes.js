import React from 'react';
import {Router, Route} from 'react-router';
import Application from '../components/Application';
import MainPage from '../components/MainPage';

import {BaseHelp, HelpFaq} from '../components/Help';
import {BasePromo, BasePromoAllMaterials, BaseWhiteLabel} from '../components/PromotionalMaterials';
import {PromoAllMaterialsLink, PromoAllMaterialsForms, PromoAllMaterialsBanners} from '../components/PromoAllMaterials';
import {PromoMyMaterials} from '../components/PromoMyMaterials';
import {PromoWhiteLabelCreate, PromoWhiteLabelList} from '../components/PromoWhiteLabel';
import {PromoArchive} from '../components/PromoArchive';
import {BaseProfile, ProfileReward, ProfileNotifications} from '../components/Profile';
import {Profile, ProfileChangePassword} from '../../../../account/static/frontend/common/components/Profile';
import ContentComponent from '../../../../account/static/frontend/common/components/ContentComponent';
import {RotationPage, RotationPageResult, EditRotationPage} from '../components/RotationPage';
import {BaseStatistics, MainStatistics} from '../components/Statistic';
import StatisticPromoList from '../components/StatisticPromoList';
import {BaseBill} from '../components/Bill';
import BillPageOutdraw from '../../../../account/static/frontend/common/components/BillPageOutdraw';
import BillPageHistory from '../../../../account/static/frontend/common/components/BillPageHistory';
import BillPageOutdrawAuthor from '../../../../account/static/frontend/common/components/BillPageOutdrawAuthor';
import WithdrawResultPage from '../../../../account/static/frontend/common/components/WithdrawResultPage';
import Error404Partner from '../components/Error404Partner';

export default (
    <Route component={Application}>
        <Route path="/" component={MainPage}/>
        <Route component={BaseProfile}>
            <Route path="/profile" title="Ваши данные" component={Profile}/>
            <Route path="/private/reward" title="Настройки заработка" component={ProfileReward}/>
            <Route path="/private/password" title="Сменить пароль" component={ProfileChangePassword}/>
            <Route path="/private/notifications" title="Уведомления" component={ProfileNotifications}/>
        </Route>
        <Route component={BaseHelp}>
            <Route path="/help/faq" title="FAQ" component={HelpFaq}/>
            <Route path="/help/:code" component={ContentComponent}/>
        </Route>
        <Route component={BasePromo}>
            <Route path="/promo/my" title="Мои промо-материалы" component={PromoMyMaterials}/>
            <Route path="/promo/all" title="Все промо-материалы" component={BasePromoAllMaterials}>
                <Route path="/promo/all/link" title="Все промо-материалы" component={PromoAllMaterialsLink} />
                <Route path="/promo/all/banners" title="Баннеры" component={PromoAllMaterialsBanners} />
                <Route path="/promo/all/forms" title="Формы заказа" component={PromoAllMaterialsForms} />
            </Route>
            <Route path="/promo/rotation" title="Ротация" component={RotationPage}/>
            <Route path="/promo/rotation/result" title="Ротация" component={RotationPageResult}/>
            <Route path="/promo/rotation/:id/edit" title="Ротация" component={EditRotationPage}/>
            <Route path="/promo/archive" title="Архив промо-материалов" component={PromoArchive}/>
            <Route path="/promo/whitelabel" title="White Label" component={BaseWhiteLabel}>
                <Route path="/promo/whitelabel/create" title="White Label" component={PromoWhiteLabelCreate} />
                <Route path="/promo/whitelabel/list" title="White Label" component={PromoWhiteLabelList} />
            </Route>
        </Route>
        <Route component={BaseStatistics}>
            <Route path="/statistics/main" title="Общая статистика" component={MainStatistics} />
            <Route path="/statistics/promo" title="Статистика по промо-материалам" component={StatisticPromoList} />
            <Route path="/statistics/archive" title="Статистика по архивным промо-материалам" component={MainStatistics} />
            <Route path="/statistics/orders" title="Статистика по заказам" component={MainStatistics} />
        </Route>
        <Route component={BaseBill}>
            <Route path="/bill/outdraw" title="Вывод средств" component={$CFG.user.role == 1 ? BillPageOutdraw : BillPageOutdrawAuthor} />
            <Route path="/bill/history" title="История операций" component={BillPageHistory} />
            <Route path="/bill/history/p:page" title="История операций" component={BillPageHistory} />
        </Route>
        <Route path="/withdraw/confirm/:id/:code" component={WithdrawResultPage} />
        <Route path='*' component={Error404Partner} />
    </Route>
);