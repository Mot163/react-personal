import type { FileCreateConstruct, FileConstruct } from '../model/FileModel';
import PageData from '../common/PageData';
import fileModel from '../model/FileModel';

/**
 * 文件数据访问
 */
class FileMapper {
    /**
     * 分页查询文件
     *
     * @param query 查询参数对象
     * @param page 页码
     * @param size 每页数据条数
     * @returns 分页数据
     */
    public async page(query: any, page: number, size: number): Promise<PageData<FileConstruct>> {
        const skip = (page - 1) * size;
        const total = await fileModel.find(query).count();
        if (total <= skip) {
            return new PageData<FileConstruct>(total, []);
        }
        const list = await fileModel
            .find(query)
            .limit(size)
            .skip((page - 1) * size);
        return new PageData<FileConstruct>(total, list);
    }

    /**
     * 通过ID查询文件
     *
     * @param id ID
     * @returns 文件对象
     */
    public async findById(id: string): Promise<FileConstruct | null> {
        return await fileModel.findById(id);
    }

    /**
     * 添加文件
     *
     * @param file 文件数据
     * @returns 新文件对象
     */
    public async insert(file: FileCreateConstruct): Promise<FileConstruct> {
        return await fileModel.create(file);
    }

    /**
     * 通过ID删除文件
     *
     * @param id ID
     * @returns 删除的文件对象
     */
    public async deleteById(id: string): Promise<FileConstruct | null> {
        return await fileModel.findByIdAndDelete(id);
    }

    /**
     * 删除所有文件
     *
     * @returns 删除信息
     */
    public async deleteAll() {
        return await fileModel.deleteMany();
    }
}

/** 文件数据访问对象 */
const fileMapper = new FileMapper();
export default fileMapper;
