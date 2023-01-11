/**
 * 分页数据
 */
class PageData<T> {
    /**
     * 数据总条数
     */
    private total: number;

    /**
     * 数据列表
     */
    private list: Array<T>;

    /**
     * @param total 数据总条数
     * @param list 数据列表
     */
    constructor(total: number, list: Array<T>) {
        this.total = total;
        this.list = list;
    }

    public getTotal(): number {
        return this.total;
    }

    public getList(): Array<T> {
        return this.list;
    }
}

export default PageData;
