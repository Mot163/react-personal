import { readFileSync } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import Result from '../../../server/common/Result';
import fileService from '../../../server/service/FileService';
import { proxyReslove } from '../../../server/utils/GlobalUtils';
import { parseFile } from '../../../server/utils/UploadUtils';

// 取消默认body解析（必需）
export const config = { api: { bodyParser: false } };

/**
 * 单文件上传
 *
 * @param req 请求对象
 * @param res 响应对象
 */
async function upload(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return Result.error({ code: 403, message: `不支持'${req.method}'请求` });
    }
    const file = await parseFile(req);
    if (!file) {
        return Result.error({ message: '没有上传文件' });
    }
    const fileBlob = new Blob([readFileSync(file.filepath)]);
    const result = await fileService.upload(fileBlob, file.originalFilename || undefined);
    return Result.ok({ data: result });
}

export default proxyReslove(upload);
