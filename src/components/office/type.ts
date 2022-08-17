// simple import
// read more: https://api.onlyoffice.com/editors/basic

/** only office config type */
export interface OnlyOfficeConfigType {
    /** 定义与编辑器界面有关的参数 */
    editorConfig: {
        /** 语言 */
        lang: 'zh-CN' | 'us';
        /** 模式 */
        mode: 'view' | 'edit';
        /** 用户相关 */
        user: {
            /** 名称 */
            name: string;
        };
        /** mode = edit required */
        callbackUrl: string;
        customization: {
            /** 强制保存 */
            forcesave: boolean;
            /** 关闭拼写检查 */
            spellcheck: boolean;
            /** 是否查看紧凑工具栏 */
            compactToolbar: boolean;
        };
    };
    /** 
     * 包含与文档有关的所有参数（标题、网址、文件类型等）
     * https://api.onlyoffice.com/editors/config/document#title
     */
    document: {
        /** 文件类型 */
        fileType: string;
        /** key */
        key: string;
        /** title */
        title: string;
        /** url */
        url: string;
    };
    /** 
     * 打开的文档类型
     * https://api.onlyoffice.com/editors/config/
     */
    documentType: 'word' | 'cell' | 'slide';
    /** 
     * 编辑时 配置
     * https://api.onlyoffice.com/editors/config/editor
     */

};

/** 
 * only office function type
 * https://api.onlyoffice.com/editors/config/events
 */
export interface OnlyOfficeFunType {
    /** 拒绝编辑 */
    denyEditingRights: (msg: string) => void;
    /** 销毁 */
    destroyEditor: () => void;
};

/** file data */
export interface OnlyOfficePropsFileType {
    url: string;
    title: string;
    edit?: boolean;
};

/** file edit props data */
export interface OnlyOfficePropsEditType {
    /** 编辑回调地址 */
    callbackUrl: string;
    /** key 值 */
    key: string;
};


/** components props */
export interface OnlyOfficePropsType {
    fileData: OnlyOfficePropsFileType;
    officeDrawer: boolean;
    title?: string;
    /** fileData.edit = true required */
    editData?: OnlyOfficePropsEditType;
};
