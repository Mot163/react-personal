import { NextApiRequest, NextApiResponse } from 'next';
import Result from '../../../server/common/Result';
import userService from '../../../server/service/UserService';
import { proxyReslove } from '../../../server/utils/GlobalUtils';

/**
 * 分页查询用户
 *
 * @param req 请求对象
 * @param res 响应对象
 */
async function page(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return Result.error({ code: 403, message: `不支持'${req.method}'请求` });
    }
    let { page, size, ...query }: { page: number; size: number; query: any } = req.body;
    page ??= req.query.page instanceof Array ? Number(req.query.page[0]) : Number(req.query.page || 0);
    size ??= req.query.size instanceof Array ? Number(req.query.size[0]) : Number(req.query.size || 0);
    const data = await userService.page(query, page, size);
    return Result.ok({ data });
}

export default proxyReslove(page);
