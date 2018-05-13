<template>
    <div>
        <el-tabs v-model="activeName"
                    @tab-click="getList">
            <el-tab-pane v-for="(item, index) in yearList"
                          :label="item" :name="item">
                <management-income  :year="item"
                                    :ref="'incomeForm' + item"
                                    :is-edit="isEdit"></management-income>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import util from '../../../../assets/common/util'
import managementIncome from './managementIncome'
import { mapGetters } from 'vuex'

export default {
    props: ['base'],
    data () {
        return {
            yearList: [],
            activeName: ''
        }
    },
    mounted () {
      this.getYearList()
      this.getList()
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo'
        }),
        isEdit () {
          return this.base.recoder == this.userInfo.userCode
        }
    },
    methods: {
      getList () {
        setTimeout(() => {
            if (this.$refs['incomeForm' + this.activeName].length) {
                this.$refs['incomeForm' + this.activeName][0].getList(this.activeName)
                this.$refs['incomeForm' + this.activeName][0].getInfo(this.activeName)
            }
        }, 0)
      },
      getYearList () {
        var startYear = new Date(this.base.fundBeginDate).getFullYear()
        var endyear = new Date(this.base.fundEndDate).getFullYear()
        var yearList = []

        for (var i = Number(startYear); i <= Number(endyear); i++) {
          yearList.unshift(String(i))
        }

        this.yearList = yearList
        this.activeName = yearList[0]
      }
    },
    components: {
      managementIncome
    }
}
</script>