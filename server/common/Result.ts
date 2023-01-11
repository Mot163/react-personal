/**
 * 返回体参数类型
 */
type ResultParam = {
    code?: number;
    message?: string;
    data?: any;
};

/**
 * 返回体
 */
class Result {
    /**
     * 响应代码
     */
    private code: number;

    /**
     * 响应消息
     */
    private message: string;

    /**
     * 响应数据
     */
    private data: any;

    /**
     * @param code 响应代码
     * @param message 响应消息
     * @param data 响应数据
     */
    constructor(code: number, message: string, data: any) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    /**
     * 失败返回
     *
     * @param param0 返回信息
     * @returns 返回对象
     */
    public static error({ code = -1, message = 'error', data }: ResultParam) {
        return new Result(code, message, data);
    }

    /**
     * 成功返回
     *
     * @param param0 返回信息
     * @returns 返回对象
     */
    public static ok({ code = 200, message = 'success', data }: ResultParam) {
        return new Result(code, message, data);
    }

    /**
     * 获取响应码
     *
     * @returns 响应代码
     */
    public getCode(): number {
        return this.code;
    }

    /**
     * 获取响应消息
     *
     * @returns 响应消息
     */
    public getMessage(): string {
        return this.message;
    }

    /**
     * 获取响应数据
     *
     * @returns 响应数据
     */
    public getData(): any {
        return this.data;
    }
}

export default Result;
