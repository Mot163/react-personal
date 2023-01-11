/**
 * 集合文档基础结构
 */
type DocumentBaseConstruct = {
    /** 文档ID */
    _id: string;
    /** 文档版本 */
    __v: number;
};

export default DocumentBaseConstruct;
