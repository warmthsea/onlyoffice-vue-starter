/**
 * @docs https://api.onlyoffice.com/editors/advanced
 */
import type { OnlyOfficeConfigType, OnlyOfficeFunType, OnlyOfficePropsType } from './type';

/** word Type */
export const WordType: Array<string> = ["doc", "docm", "docx", "dot", "dotm", "dotx", "epub", "fodt", "fb2", "htm", "html", "mht", "odt", "ott", "oxps", "pdf", "rtf", "txt", "djvu", "xml", "xps", "ceb"];
/** cell Type */
export const CellType: Array<string> = ["csv", "fods", "ods", "xls", "xlsb", "xlsm", "xlsx", "xlt", "xltm", "xltx"];
/** slide Type */
export const SlideType: Array<string> = ["fodp", "odp", "otp", "pot", "potm", "potx", "pps", "ppsm", "ppsx", "ppt", "pptm", "pptx"];

/** save env link */
export const saveOfficeEnvUrl = (String(import.meta.env.VITE_APP_PAGEOFFICE_URL).replace(/\/$/, ""));

/** 
 * only office state
 * props state
 */
export const useOnlyOfficeState = () => {
    /** component props data */
    const officeState = reactive<OnlyOfficePropsType>({
        fileData: null,
        officeDrawer: false,
        title: '预览文件',
        editData: null,
    });

    return {
        officeState
    };
};

/** useOnlyOffice core */
export const useOnlyOffice = (props: OnlyOfficePropsType) => {
    /** only office DOM */
    const editorRef = ref<OnlyOfficeFunType>(null);
    /** file data clone  */
    const fileDataClone = ref<string>(null);

    let config: OnlyOfficeConfigType = {
        editorConfig: {
            lang: "zh-CN",
            mode: "view",
            user: {
                name: 'user',
            },
            callbackUrl: null,
            customization: {
                forcesave: true,
                spellcheck: false,
                compactToolbar: true,
            }
        },
        document: {
            fileType: "docx",
            key: null,
            title: null,
            url: null,
        },
        documentType: "cell",
    };

    /** preview */
    const previewOffice = (): void => {
        config.editorConfig.mode = "view";
        config.document = {
            fileType: getSuffix(props.fileData.url),
            key: Math.random() * 10000 + '',
            title: props.fileData.title,
            url: props.fileData.url,
        };
        initOffice();
    };

    /** edit */
    const editOffice = (): void => {
        config.editorConfig.mode = "edit";
        config.editorConfig.callbackUrl = props.editData.callbackUrl;
        config.document = {
            fileType: getSuffix(props.fileData.url),
            key: props.editData.key,
            title: props.fileData.title,
            url: props.fileData.url,
        };
        initOffice();
    };

    /** init onlyOffice */
    const initOffice = (): void => {
        config.documentType = getDocumentType(props.fileData.url);
        /** DocsAPI , from header ——> create script import */
        editorRef.value = new DocsAPI.DocEditor("placeholder", config);
        console.log(editorRef.value);
        editorRef.value.denyEditingRights("message");
    };

    return {
        editorRef, fileDataClone,
        previewOffice, editOffice
    };
};

/** 
 * format documentType
 */
export const getDocumentType = (url: string): OnlyOfficeConfigType['documentType'] => {
    let suffix: string = getSuffix(url);
    if (WordType.includes(suffix)) return 'word';
    if (CellType.includes(suffix)) return 'cell';
    if (SlideType.includes(suffix)) return 'slide';
};

/** 
 * check only office if open
 */
export const runFileOpenType = (url: string): OnlyOfficeConfigType['documentType'] | undefined => {
    if (!getDocumentType(url)) {
        window.open(url, '_blank');
    };
    return getDocumentType(url);
};


/** get Suffix */
export const getSuffix = (str: string | null): string => {
    if (!str) return "";
    if (str.indexOf(".") == -1) return "";
    const fileExtension: string = str.substring(str.lastIndexOf(".") + 1);
    return fileExtension;
};