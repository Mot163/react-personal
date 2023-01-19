import DBUtils from './DBUtils';

// 连接数据库
DBUtils.connect();

/** 缓存集合名称 */
const collection = 'utils_cache';
/** 缓存模型 */
const cacheModel = DBUtils.createModel(collection, {
    key: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    },
    expireAt: {
        type: Date,
        expires: 0
    }
});

/**
 * 缓存工具
 */
const CacheUtils = {
    /**
     * 设置
     *
     * @param key 键名
     * @param value 键值
     * @param expires expires秒后过期
     */
    set: async (key: string, value: any, expires?: number) => {
        const expireAt = expires != null ? Date.now() + expires * 1000 : undefined;
        await cacheModel.deleteMany({ key });
        return await cacheModel.create({ key, value: JSON.stringify(value), expireAt });
    },

    /**
     * 获取
     *
     * @param key 键名
     */
    get: async (key: string) => {
        const doc = await cacheModel.findOne({ key });
        if (!doc) {
            return null;
        }
        return JSON.parse(doc.value);
    }
};

export default CacheUtils;
