import { NextApiRequest, NextApiResponse } from 'next';
import Result from '../../../../server/common/Result';
import { proxyReslove } from '../../../../server/utils/GlobalUtils';
import LanZouUtils from '../../../../server/utils/LanZouUtils';

/**
 * 文件直链解析（Restful）
 *
 * @param req 请求对象
 * @param res 响应对象
 */
async function parse(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return Result.error({ code: 403, message: `不支持'${req.method}'请求` });
    }
    if (!req.query.id) {
        return Result.ok({});
    }
    const directURL = await LanZouUtils.parse(req.query.id as string);
    return Result.ok({ data: req.query.id });
}

export default proxyReslove(parse);
