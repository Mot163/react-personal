import type DocumentBaseConstruct from '../common/type/DocumentBaseConstruct';
import { createModel } from '../utils/DBUtils';

// 用户
const collection = 's_user';
// 文档结构
const construct = {
    // 昵称
    nickname: {
        type: String,
        trim: true,
        maxlength: 128
    },

    // 用户名
    username: {
        required: true,
        unique: true,
        type: String,
        trim: true,
        maxlength: 128
    },

    // 密码
    password: {
        required: true,
        type: String,
        trim: true,
        minlength: 8,
        maxlength: 16
    },

    // 头像
    avatar: {
        type: String,
        trim: true,
        maxlength: 256
    },

    // 是否为管理员
    is_admin: {
        type: Boolean,
        default: false
    },

    // 上次登录时间
    last_login_time: Date,

    // 状态(0: 禁用; 1: 启用)
    status: {
        type: Number,
        default: 1
    },

    // 创建时间
    create_time: {
        type: Date,
        default: Date.now
    },

    // 更新时间
    update_time: {
        type: Date,
        default: Date.now
    }
};

/**
 * 用户创建结构
 */
export type UserCreateConstruct = {
    /** 昵称 */
    nickname: string;
    /** 用户名 */
    username: string;
    /** 密码 */
    password: string;
    /** 头像 */
    avatar?: string;
    /** 是否为管理员 */
    is_admin?: boolean;
    /** 上次登录时间 */
    last_login_time?: number;
    /** 状态(0: 禁用; 1: 启用) */
    status?: number;
    /** 创建时间 */
    create_time?: number;
    /** 更新时间 */
    update_time?: number;
};

/**
 * 用户对象结构
 */
export type UserConstruct = UserCreateConstruct & DocumentBaseConstruct;

/** 用户模型 */
const userModel = createModel(collection, construct);
export default userModel;
