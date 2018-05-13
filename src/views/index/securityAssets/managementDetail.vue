<template>
    <div class="form-discount">
        <el-collapse v-model="activeNames" @change="collChange">
          <el-collapse-item class="float-form-box" title="基本信息" name="1">
            <management-base @change="baseChange"
                        :dictionary="dictionary"
                        :enterprise-list="enterpriseList"
                        @incomeChange="getIncomeList"
                        ref="baseForm"></management-base>
          </el-collapse-item>
          <div class="line-bold"></div>

          <!-- 股东信息 -->
          <el-collapse-item class="float-form-box" title="股东信息" name="2">
            <holder-list :enterprise-list="enterpriseList"
                        :base="baseData"
                        :security-code="$route.query.assetManagementProductCode"
                        :security-type="'security_type_1'"></holder-list>
          </el-collapse-item>
          <div class="line-bold"></div>

          <!-- 物业资产细节 -->
          <el-collapse-item class="float-form-box" title="物业资产细节" name="3">
            <property-list :enterprise-list="enterpriseList"
                        :base="baseData"
                        :dictionary="dictionary"
                        :security-code="$route.query.assetManagementProductCode"
                        :security-type="'security_type_1'"
                        @incomeChange="getIncomeList"></property-list>
          </el-collapse-item>
          <div class="line-bold"></div>

          <!-- 资管产品分层 -->
          <el-collapse-item class="float-form-box" title="资管产品分层" name="4">
            <management-level :base="baseData"
                            :dictionary="dictionary"
                            @incomeChange="getIncomeList"></management-level>
          </el-collapse-item>
          <template v-if="baseData.fundBeginDate && baseData.fundEndDate">
            <div class="line-bold"></div>
            <!-- 产品监控 -->
            <el-collapse-item class="float-form-box" title="产品监控" name="5">
              <income-tag :base="baseData" :ref="'incomeTag'"></income-tag>
            </el-collapse-item>
          </template>
          
        </el-collapse>
    </div>
</template>
<script>
import util from '../../../assets/common/util'
import managementBase from './formAlist/managementBase'
import holderList from './formAlist/holderList'
import propertyList from './formAlist/propertyList'
import managementLevel from './formAlist/managementLevel'
import incomeTag from './formAlist/incomeTag'
import { mapGetters } from 'vuex'

export default {
    data () {
        return {
            activeNames: ['1'],
            baseData: {},
            imgList: [],
            sourceData: [],
            enterpriseList: [],
            dictionaryTypes: [
              'enterprise_type',
              'property_type',
              'fund_level_type',
              'fund_level_repayment_type',
              'fund_level_rating'
            ],
            dictionary: {
              enterprise_type: [],
              property_type: [],
              fund_level_type: [],
              fund_level_repayment_type: [],
              fund_level_rating: []
            }
        }
    },
    mounted () {
        var managementColl = localStorage.getItem("managementColl")
        if (managementColl) {
            this.activeNames = managementColl.split(',')
        }

        this.getEnterprises()
        this.getDictionaryTypes()
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo'
        })
    },
    methods: {
      baseChange (result) {
        this.baseData = result
      },
      getIncomeList () {
        this.$refs['incomeTag'].getList()
      },
      getEnterprises () {
        var formData = {
            pageNumber: 1,
            pageSize: 1000
        }

        util.request({
            method: 'get',
            interface: 'showAllEnterprise',
            data: formData
        }).then(res => {
            if (res.result.success == '1') {
                this.enterpriseList = res.result.result
            } else {
                this.$message.error(res.result.message)
            }
        })       
      },
      getDictionaryTypes () {
        util.request({
            method: 'post',
            interface: 'disOfEnterpriseInfo',
            data: {
              types: this.dictionaryTypes.join(',')
            }
        }).then(res => {
            if (res.result.success == '1') {
              this.dictionary = res.result.result
            } else {
              this.$message.error(res.result.message)
            }
        })
      },
      collChange () {
          localStorage.setItem("managementColl", this.activeNames)
      }
    },
    components: {
        managementBase,
        holderList,
        propertyList,
        managementLevel,
        incomeTag
    }
}
</script>