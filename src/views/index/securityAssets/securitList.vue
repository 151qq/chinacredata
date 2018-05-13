<template>
    <div class="source-box">
        <template v-if="selectExchange.exchangeCode">
            <el-tabs v-model="activeName">
                <el-tab-pane :label="'资管产品'" :name="'management'">
                    <management-list></management-list>
                </el-tab-pane>
                <el-tab-pane :label="'海外REITs'" :name="'reits'">
                    <reits-list></reits-list>
                </el-tab-pane>
            </el-tabs>
        </template>
    </div>
</template>
<script>
import util from '../../../assets/common/util'
import managementList from './managementList'
import reitsList from './reitsList'
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            activeName: 'management'
        }
    },
    mounted () {
        this.setSelectExchange({
            exchangeName: this.$route.query.exchangeName,
            exchangeCode: this.$route.query.exchangeCode
        })
    },
    computed: {
        ...mapGetters({
            selectExchange: 'getSelectExchange'
        })
    },
    methods: {
        ...mapActions([
            'setSelectExchange'
        ])
    },
    components: {
        managementList,
        reitsList
    }
}
</script>