import mongoose from 'mongoose';

/**
 * 数据库工具
 */
const DBUtils = {
    /**
     * 连接数据库
     */
    connect: async () => {
        if (!process.env.MONGODB_URI) {
            throw new Error('please set env MONGODB_URI');
        }
        await mongoose.connect(process.env.MONGODB_URI);
    },

    /**
     * 创建模型
     *
     * @param collection 集合名
     * @param construct 模型结构
     * @returns
     */
    createModel: (collection: string, construct: object) => {
        let model = mongoose.models[collection];
        if (!model) {
            const schema = new mongoose.Schema(construct);
            model = mongoose.model(collection, schema);
        }
        return model;
    }
};

// 连接数据库
mongoose.set('strictQuery', true);
DBUtils.connect();

const connect = DBUtils.connect;
const createModel = DBUtils.createModel;

export default DBUtils;
export { connect as connectDB, createModel };
