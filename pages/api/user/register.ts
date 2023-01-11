import { NextApiRequest, NextApiResponse } from 'next';
import Result from '../../../server/common/Result';
import userService from '../../../server/service/UserService';
import { proxyReslove } from '../../../server/utils/GlobalUtils';

/**
 * 注册用户
 *
 * @param req 请求对象
 * @param res 响应对象
 */
async function register(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return Result.error({ code: 403, message: `不支持'${req.method}'请求` });
    }
    const data = await userService.register(req.body);
    return Result.ok({ message: '用户注册成功', data });
}

export default proxyReslove(register);
