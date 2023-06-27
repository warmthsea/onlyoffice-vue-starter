<script setup lang="ts">
import OnlyOffice from '@/components/office/onlyOffice.vue';
import { useOnlyOfficeState } from '@/components/office/index';

// use only office
const { officeState } = useOnlyOfficeState();

/** open drawer */
const initOffice = (): void => {
    officeState.fileData = {
        url: 'http://192.168.10.131:18898/group1/M00/01/50/wKgKg2LwacSAcdDSAAApo9O-Jyw61.xlsx',
        title: '这是一个测试文件标题'
    };
};

const goGithub = (): void => {
  window.open('https://github.com/warmthsea/onlyoffice-vue-starter','_blank');  
};
    
onMounted(() => {
    initOffice();
});
</script>

<template>
    <div class="flex h-screen flex-col md:flex-row">
        <div class="bg-gray-50 w-100% border-amber md:w-20% md:min-w-300px">
            <div class="py4 px5 flex items-center justify-between">
                <h1>
                    <span class="op50 font-300 text-lg leading-1em block"> only office </span>
                    <span class="font-80 leading-1em block"> Vue Component</span>
                </h1>
                <img @click="goGithub()" class="w-8 h-8 cursor-pointer" src="@/assets/github.svg" alt="github" />
            </div>
            <div>
                <!-- <el-button> open drawer </el-button> -->
            </div>
        </div>
        <div class="flex-1">
            <OnlyOffice
                :drawer="false"
                :fileData="officeState.fileData"
                v-model:officeDrawer="officeState.officeDrawer"
            ></OnlyOffice>
        </div>
    </div>
</template>
