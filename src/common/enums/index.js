/**
 * 该文件主要方式枚举相关文件
 */

import Enums from './enums';

// 预警类型
const PLATE_WARN_TYPE = new Enums({
    fake: {
        text: '假牌',
        value: 3
    },
    repeat: {
        text: '套牌',
        value: 4
    }
});

export {
    PLATE_WARN_TYPE
};
