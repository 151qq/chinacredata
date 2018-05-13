<template>
    <el-autocomplete
        v-model="searchData[mName]"
        :fetch-suggestions="fetchDatas"
        placeholder="请输入内容"
        :trigger-on-focus="false"
        :props="{value: sCode, label: sName}"
        @select="handleSelect"></el-autocomplete>
</template>
<script>
export default {
    props: ['searchData', 'mCode', 'mName', 'mType', 'sCode', 'sName', 'sType', 'fetchSuggestions'],
    data () {
        return {}
    },
    methods: {
        handleSelect (item) {
            if (this.mCode) {
                this.searchData[this.mCode] = item[this.sCode]
            }
            if (this.mName) {
                this.searchData[this.mName] = item[this.sName]
            }
            if (this.mType) {
                this.searchData[this.mType] = item[this.sType]
            }
        },
        fetchDatas (queryString, cb) {
            this.fetchSuggestions(queryString, cb)
        }
    }
}
</script>