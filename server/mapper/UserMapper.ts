import type { UserCreateConstruct, UserConstruct } from '../model/UserModel';
import PageData from '../common/PageData';
import userModel from '../model/UserModel';

/**
 * 用户数据访问
 */
class UserMapper {
    /**
     * 分页查询用户
     *
     * @param query 查询参数对象
     * @param page 页码
     * @param size 每页数据条数
     * @returns 分页数据
     */
    public async page(query: any, page: number, size: number): Promise<PageData<UserConstruct>> {
        const skip = (page - 1) * size;
        const total = await userModel.find(query).count();
        if (total <= skip) {
            return new PageData<UserConstruct>(total, []);
        }
        const list = await userModel
            .find(query)
            .limit(size)
            .skip((page - 1) * size);
        return new PageData<UserConstruct>(total, list);
    }

    /**
     * 通过ID查询用户
     *
     * @param id 用户ID
     * @returns 用户对象
     */
    public async findById(id: string): Promise<UserConstruct | null> {
        return await userModel.findById(id);
    }

    /**
     * 添加用户
     *
     * @param user 用户数据
     * @returns 新用户对象
     */
    public async insert(user: UserCreateConstruct): Promise<UserConstruct> {
        return await userModel.create(user);
    }

    /**
     * 通过ID删除用户
     *
     * @param id 用户ID
     * @returns 删除的用户对象
     */
    public async deleteById(id: string): Promise<UserConstruct | null> {
        return await userModel.findByIdAndDelete(id);
    }

    /**
     * 删除所有用户
     *
     * @returns 删除信息
     */
    public async deleteAll() {
        return await userModel.deleteMany();
    }

    /**
     * 通过用户ID修改用户
     *
     * @param user 用户更新数据
     * @returns 用户更新后数据
     */
    public async updateById({
        id,
        ...updateData
    }: UserCreateConstruct & { id: string }): Promise<UserConstruct | null> {
        return await userModel.findByIdAndUpdate(id, updateData);
    }
}

/** 用户数据访问对象 */
const userMapper = new UserMapper();
export default userMapper;
