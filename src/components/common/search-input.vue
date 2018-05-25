<template>
    <div class="auto-box">
        <el-autocomplete
            v-model="searchData[mName]"
            :fetch-suggestions="fetchDatas"
            placeholder="请输入内容"
            :trigger-on-focus="false"
            :props="{value: sCode, label: sName}"
            @select="handleSelect"></el-autocomplete>

        <router-link class="nav-btn el-icon-information"
                        v-if="searchData[mCode] && sName == 'enterpriseNameReg'"
                        target="_blank"
                        :to="{
                          name: 'enterprise-info',
                          query: {
                            enterpriseCode: searchData[mCode]
                          }
                        }"></router-link>

        <span  class="nav-btn nav-disabled el-icon-information"
                        v-if="!searchData[mCode] && sName == 'enterpriseNameReg'"></span>
    </div>
    
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
<style lang="scss">
.auto-box {
    width: 100%;
    display: flex;

    .el-autocomplete {
        flex: 1;
    }

    .nav-btn {
        width: 30px;
        font-size: 18px;
        line-height: 30px;
        text-align: right;
        color: #333333;
    }

    .nav-disabled {
        color: #999999;
    }
}
</style>