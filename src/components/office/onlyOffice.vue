<script lang="ts" setup>
/**
 * @type './type.ts'
 * @demo ↓

// script lang="ts" setup
import OnlyOffice from '@/components/office/onlyOffice.vue';
import { useOnlyOfficeState , saveOfficeEnvUrl } from '@/components/office/index';
import type { OnlyOfficePropsType } from '@/components/office/type';

// use only office
const { officeState } = useOnlyOfficeState();

* @use office | preview
onMounted(() => {
    officeState.fileData = {
        url: 'http://192.168.10.131:18898/group1/M00/01/50/wKgKg2LwacSAcdDSAAApo9O-Jyw61.xlsx',
        title: '这是一个测试文件标题'
    };
    officeState.officeDrawer = true;
});

// template | office preview 
<OnlyOffice
    :fileData="officeState.fileData"
    v-model:officeDrawer="officeState.officeDrawer"
></OnlyOffice>

* @use office | edit 
onMounted(() => {
    officeState.title = '文件编辑';
    officeState.fileData = {
        title: '这是一个测试文件标题',
        url: 'http://192.168.10.131:18898/group1/M00/01/50/wKgKg2LwacSAcdDSAAApo9O-Jyw61.xlsx',
        edit: true
    };
    officeState.editData = {
        callbackUrl: saveOfficeEnvUrl + 'xxx',
        key: 'xxx'
    };
    officeState.officeDrawer = true;
});

<OnlyOffice
    :fileData="officeState.fileData"
    :editData="officeState.editData"
    :title="officeState.title"
    v-model:officeDrawer="officeState.officeDrawer"
></OnlyOffice>
 */

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
        fileData: () => ({
            url: 'http://192.168.10.131:18898/group1/M00/01/50/wKgKg2LwacSAcdDSAAApo9O-Jyw61.xlsx',
            title: 'user',
            edit: false
        }),
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
        if (JSON.stringify(val) !== fileDataClone.value && val) {
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
    <el-drawer v-if="props.drawer" v-model="_officeDrawer" :title="title" :append-to-body="true" custom-class="onlyoffice_innerdrawer" size="85%">
        <div class="drawer-body">
            <div>
                <div id="placeholder" class="pages"></div>
            </div>
        </div>
    </el-drawer>
    <div v-else id="placeholder" class="pages" style="height: 100%"></div>
</template>
