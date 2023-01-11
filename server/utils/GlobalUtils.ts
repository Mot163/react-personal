import type { NextApiRequest, NextApiResponse } from 'next';
import Result from '../common/Result';

/**
 * 全局工具
 */
const GlobalUtils = {
    /**
     * 请求前置处理
     *
     * @param req 请求对象
     * @param res 响应对象
     */
    before: async (req: NextApiRequest, res: NextApiResponse): Promise<boolean> => {
        // 跨越配置
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
        res.setHeader('Access-Control-Allow-Headers', 'content-type');
        res.setHeader('Access-Control-Allow-Credentials', 'true');

        // 预检请求处理
        if (req.method === 'OPTIONS') {
            res.json({});
            return false;
        }

        return true;
    },

    /**
     * 请求后置处理
     *
     * @param req 请求对象
     * @param res 响应对象
     * @param result 返回结果
     */
    after: async (req: NextApiRequest, res: NextApiResponse, result: any) => {
        res.json(result instanceof Result ? result : Result.ok({ data: result }));
    },

    /**
     * 代理请求处理
     *
     * @param handler 原请求处理函数
     * @returns 代理请求处理函数
     */
    proxyReslove: (
        handler: (req: NextApiRequest, res: NextApiResponse) => any
    ): ((req: NextApiRequest, res: NextApiResponse) => Promise<void>) => {
        return async function proxyHandler(req: NextApiRequest, res: NextApiResponse) {
            if (await GlobalUtils.before(req, res)) {
                try {
                    const result = await handler(req, res);
                    await GlobalUtils.after(req, res, result);
                } catch (error) {
                    res.json(Result.error({ message: (<Error>error).message }));
                }
            }
        };
    }
};

export default GlobalUtils;
export const proxyReslove = GlobalUtils.proxyReslove;
