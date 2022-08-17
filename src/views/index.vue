<script setup lang="ts">
import OnlyOffice from '@/components/office/onlyOffice.vue';
import { useOnlyOfficeState } from '@/components/office/index';

// use only office
const { officeState } = useOnlyOfficeState();

/** open drawer */
const openDrawer = (): void => {
    officeState.fileData = {
        url: 'https://warmthsea.github.io/test.xlsx',
        title: '这是一个测试文件标题'
    };
    officeState.officeDrawer = true;
};

onMounted(() => {
    const oldScript = document.getElementById('onlyOffice');
    if (!oldScript) {
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://warmthsea.github.io/office_api.js';
        script.id = 'onlyOffice';
        document.body.appendChild(script);
    }
});
</script>

<template>
    <div class="flex h-screen">
        <div class="bg-gray-50 w-25%">
            <div class="py4 px5 flex items-center justify-between">
                <h1>
                    <span class="op50 font-300 text-lg leading-1em block"> only office </span>
                    <span class="font-100 leading-1em block"> Vue Component</span>
                </h1>
                <img class="w-8 h-8" src="@/assets/github.svg" alt="github" />
            </div>
            <div>
                <el-button @click="openDrawer()"> open drawer </el-button>
            </div>
        </div>
        <div class="flex-1">
            <OnlyOffice
                :fileData="officeState.fileData"
                v-model:officeDrawer="officeState.officeDrawer"
            ></OnlyOffice>
        </div>
    </div>
</template>
