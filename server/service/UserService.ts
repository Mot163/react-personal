import type { UserCreateConstruct, UserConstruct } from '../model/UserModel';
import PageData from '../common/PageData';
import userMapper from '../mapper/UserMapper';

/**
 * 用户服务
 */
class UserService {
    /**
     * 注册用户
     *
     * @param user 注册用户数据
     * @returns 新用户对象
     */
    public async register(user: UserCreateConstruct): Promise<UserConstruct> {
        return await userMapper.insert(user);
    }

    /**
     * 分页查询用户
     *
     * @param query 查询参数对象
     * @param page 页码
     * @param size 每页数据条数
     * @returns 分页数据
     */
    public async page(query: any, page?: number, size?: number): Promise<PageData<UserConstruct>> {
        return await userMapper.page(query, page || 1, size || 10);
    }
}

/** 用户服务对象 */
const userService = new UserService();
export default userService;
