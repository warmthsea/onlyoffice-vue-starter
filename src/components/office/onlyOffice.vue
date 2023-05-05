<script lang="ts" setup>
import { useVModel } from '@vueuse/core';
import { useOnlyOffice } from './index';
import type { OnlyOfficePropsFileType, OnlyOfficePropsEditType } from './type';

const props = withDefaults(
    defineProps<{
        fileData: OnlyOfficePropsFileType;
        /** open type : default true */
        drawer?: boolean;
        /** drawer show */
        officeDrawer: boolean;
        /** title */
        title?: string;
        /** fileData.edit = true , editData required */
        editData?: OnlyOfficePropsEditType;
    }>(),
    {
        drawer: true,
        title: '预览文件'
    }
);

const emit = defineEmits(['update:officeDrawer']);
const _officeDrawer = useVModel(props, 'officeDrawer', emit);
// office core
const { editorRef, fileDataClone, previewOffice, editOffice } = useOnlyOffice(props);

watch(
    () => props.fileData,
    async (val) => {
        if (JSON.stringify(val) !== fileDataClone.value && val.url) {
            if (editorRef.value) editorRef.value.destroyEditor();
            await nextTick();
            if (val.edit) {
                editOffice();
            } else {
                previewOffice();
            }
        }
        fileDataClone.value = JSON.stringify(val);
    },
    { immediate: true }
);

onUnmounted(() => {
    if (editorRef.value) editorRef.value.destroyEditor();
});
</script>

<template>
    <el-drawer
        v-if="props.drawer"
        v-model="_officeDrawer"
        :title="title"
        :append-to-body="true"
        custom-class="onlyoffice_innerdrawer"
        size="85%"
    >
        <div class="bg-gray-200 h-full">
            <div id="placeholder" class="pages"></div>
        </div>
    </el-drawer>
    <div v-else id="placeholder" class="pages" style="height: 100%"></div>
</template>

<style lang="scss">
.onlyoffice_innerdrawer {
    .el-drawer__header {
        margin-bottom: -10px;
        padding-top: 10px;
        span {
            color: #000;
        }
    }
}
</style>
