import { randomUUID } from 'crypto';
import fileMapper from '../mapper/FileMapper';
import CacheUtils from '../utils/CacheUtils';
import LanZouUtils from '../utils/LanZouUtils';

/**
 * 文件服务
 */
class FileService {
    /**
     * 文件上传
     *
     * @param fileBlob 文件二进制对象
     * @param fileName 文件名
     */
    public async upload(fileBlob: Blob, fileName?: string) {
        let cookie: string | null = await CacheUtils.get('LANZOU_COOKIE');
        if (!cookie) {
            cookie = await LanZouUtils.login();
            CacheUtils.set('LANZOU_COOKIE', cookie, 86400);
        }
        fileName ??= randomUUID().substring(24);
        fileName += '.zip';
        const res = await LanZouUtils.upload(fileBlob, fileName, cookie);
        if (res.zt !== 1) {
            throw new Error('上传失败');
        }
        const data = res.text[0];
        return await fileMapper.insert({
            file_id: data.id,
            f_id: data.f_id,
            name: data.name_all,
            size: data.size
        });
    }
}

/** 用户服务对象 */
const fileService = new FileService();
export default fileService;
