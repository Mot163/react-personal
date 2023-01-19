import { NextApiRequest, NextApiResponse } from 'next';
import Result from '../../../server/common/Result';
import { proxyReslove } from '../../../server/utils/GlobalUtils';
import LanZouUtils from '../../../server/utils/LanZouUtils';

/**
 * 文件直链解析
 *
 * @param req 请求对象
 * @param res 响应对象
 */
async function parse(req: NextApiRequest, res: NextApiResponse) {
    if (!req.query.i) {
        return Result.ok({});
    }
    const fileId = req.query.i instanceof Array ? req.query.i[0] : req.query.i;
    const directURL = await LanZouUtils.parse(fileId);
    return Result.ok({ data: directURL });
}

export default proxyReslove(parse);
