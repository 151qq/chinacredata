<template>
    <div class="form-discount">
            <template v-if="$route.query.type == 'trade'">
                <trade-list :enterprise-list="enterpriseList"
                        :base="baseData"
                        :dictionary="dictionary"
                        :property-code="$route.query.mallCode"
                        :property-type="'property_type_2'"></trade-list>
            </template>
            <template v-if="$route.query.type == 'mallTenant'">
                <mall-tenant :enterprise-list="enterpriseList"
                            :base="baseData"
                            :dictionary="dictionary"></mall-tenant>
            </template>
            <template v-if="$route.query.type == 'mallIncome'">
                <mall-income :base="baseData"></mall-income>
            </template>
            <template v-if="$route.query.type == 'mallCost'">
                <mall-cost :base="baseData"></mall-cost>
            </template>
            <template v-if="$route.query.type == 'value'">
                <value-list :base="baseData"
                        :property-code="$route.query.mallCode"
                        :property-type="'property_type_2'"></value-list>
            </template>
            <template v-if="$route.query.type == 'mallRent'">
                <mall-rent :base="baseData"></mall-rent>
            </template>
    </div>
</template>
<script>
import util from '../../../assets/common/util'
import tradeList from './formPage/tradeList'
import uploadList from '../../../components/common/upload-list'
import mallRent from './formPage/mallRent'
import mallTenant from './formPage/mallTenant'
import mallCost from './formPage/mallCost'
import mallIncome from './formPage/mallIncome'
import valueList from './formPage/valueList'
import { mapGetters } from 'vuex'

export default {
    data () {
        return {
            activeNames: ['1'],
            isShowMap: false,
            baseData: {
              mallName: '',
              mallAddr: '',
              mallGps: ''
            },
            imgList: [],
            sourceData: [],
            enterpriseList: [],
            dictionaryTypes: [
              'enterprise_type',
              'floor_type',
              'airconditioner_type',
              'property_sale_model',
              'land_type',
              'land_usage_right_type',
              'mall_type',
              'trade_type',
              'tenant_type',
              'lease_type'
            ],
            dictionary: {
              enterprise_type: [],
              floor_type: [],
              airconditioner_type: [],
              property_sale_model: [],
              land_type: [],
              land_usage_right_type: [],
              mall_type: [],
              trade_type: [],
              tenant_type: [],
              lease_type: []
            }
        }
    },
    mounted () {
        this.getBase()
        this.getEnterprises()
        this.getDictionaryTypes()
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo'
        })
    },
    methods: {
        getBase () {
          util.request({
              method: 'get',
              interface: 'mallInfo',
              data: {
                mallCode: this.$route.query.mallCode
              }
          }).then(res => {
              if (res.result.success == '1') {
                this.baseData = res.result.result
              } else {
                this.$message.error(res.result.message)
              }
          })
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
        }
    },
    components: {
        tradeList,
        uploadList,
        mallRent,
        mallTenant,
        mallCost,
        mallIncome,
        valueList
    }
}
</script>