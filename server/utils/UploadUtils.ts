import { File, IncomingForm } from 'formidable';
import { NextApiRequest } from 'next';

/**
 * 文件上传工具
 */
const UploadUtils = {
    /**
     * 单文件解析
     *
     * @param req 请求体
     * @returns 文件
     */
    parseFile: (req: NextApiRequest) => {
        return new Promise<File | null>((resolve, reject) => {
            const form = new IncomingForm();
            form.on('file', (field, file) => resolve(file));
            form.on('end', () => resolve(null));
            form.on('error', (err) => reject(err));
            form.parse(req);
        });
    },

    /**
     * 多文件解析
     *
     * @param req 请求体
     * @returns [字段, 文件]数组
     */
    parseFiles: (req: NextApiRequest) => {
        return new Promise<Array<[string, File]>>((resolve, reject) => {
            const files = new Array<[string, File]>();
            const form = new IncomingForm();
            form.on('file', (field, file) => files.push([field, file]));
            form.on('end', () => resolve(files));
            form.on('error', (err) => reject(err));
            form.parse(req);
        });
    }
};

export default UploadUtils;
export const parseFile = UploadUtils.parseFile;
export const parseFiles = UploadUtils.parseFiles;
