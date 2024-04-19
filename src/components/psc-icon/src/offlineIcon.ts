import { addIcon } from '@iconify/vue/dist/offline';

/**
 * 本地图标，在 src/layout/index.vue 文件中加载
 * 接口字段也可使用，配置addIcon的key即可
 */

// 菜单图标
import HomeFilled from '@iconify-icons/ep/home-filled';
import FlUser from '@iconify-icons/ri/admin-line';
import Guide from '@iconify-icons/ep/guide';
import Menu from '@iconify-icons/ep/menu';
import Setting from '@iconify-icons/ri/settings-3-line';

addIcon('homeFilled', HomeFilled);
addIcon('flUser', FlUser);
addIcon('guide', Guide);
addIcon('menu', Menu);
addIcon('setting', Setting);

// header图标
import Expand from '@iconify-icons/ep/expand';
import Fold from '@iconify-icons/ep/fold';

addIcon('expand', Expand);
addIcon('fold', Fold);

// 页面使用图标
import Warn from '@iconify-icons/ep/warning';
import Paperclip from '@iconify-icons/ep/paperclip';
import Delete from '@iconify-icons/ep/delete';

addIcon('warn', Warn);
addIcon('paperclip', Paperclip);
addIcon('delete', Delete);
