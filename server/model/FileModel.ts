import type DocumentBaseConstruct from '../common/type/DocumentBaseConstruct';
import { createModel } from '../utils/DBUtils';

// 文件
const collection = 'b_file';
// 文档结构
const construct = {
    // 文件ID
    file_id: {
        required: true,
        unique: true,
        type: String
    },

    // 文件链接解析ID
    f_id: {
        required: true,
        unique: true,
        type: String
    },

    // 文件名称
    name: {
        required: true,
        type: String
    },

    // 文件大小
    size: String,

    // 创建时间
    create_time: {
        type: Date,
        default: Date.now
    }
};

/**
 * 文件创建结构
 */
export type FileCreateConstruct = {
    /** 文件ID */
    file_id: string;
    /** 文件链接解析ID */
    f_id: string;
    /** 文件名称 */
    name: string;
    /** 文件大小 */
    size?: string;
    /** 创建时间 */
    create_time?: number;
};

/**
 * 文件对象结构
 */
export type FileConstruct = FileCreateConstruct & DocumentBaseConstruct;

/** 文件模型 */
const fileModel = createModel(collection, construct);
export default fileModel;
