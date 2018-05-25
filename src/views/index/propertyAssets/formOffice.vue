<template>
    <div class="form-discount">
            <template v-if="$route.query.type == 'trade'">
                <trade-list :enterprise-list="enterpriseList"
                        :base="baseData"
                        :dictionary="dictionary"
                        :property-code="$route.query.officeCode"
                        :property-type="'property_type_1'"></trade-list>
            </template>
            <template v-if="$route.query.type == 'officeTenant'">
                <office-tenant :enterprise-list="enterpriseList"
                            :base="baseData"
                            :dictionary="dictionary"></office-tenant>
            </template>
            <template v-if="$route.query.type == 'officeIncome'">
                <office-income :base="baseData"></office-income>
            </template>
            <template v-if="$route.query.type == 'officeCost'">
                <office-cost :base="baseData"></office-cost>
            </template>
            <template v-if="$route.query.type == 'value'">
                <value-list :base="baseData"
                        :property-code="$route.query.officeCode"
                        :property-type="'property_type_1'"></value-list>
            </template>
            <template v-if="$route.query.type == 'officeRent'">
                <office-rent :base="baseData"></office-rent>
            </template>
    </div>
</template>
<script>
import util from '../../../assets/common/util'
import tradeList from './formPage/tradeList'
import uploadList from '../../../components/common/upload-list'
import officeRent from './formPage/officeRent'
import officeTenant from './formPage/officeTenant'
import officeCost from './formPage/officeCost'
import officeIncome from './formPage/officeIncome'
import valueList from './formPage/valueList'
import { mapGetters } from 'vuex'

export default {
    data () {
        return {
            activeNames: ['1'],
            isShowMap: false,
            baseData: {
              officeName: '',
              officeAddr: '',
              officeGps: ''
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
              'office_type',
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
              office_type: [],
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
              interface: 'officeInfo',
              data: {
                officeCode: this.$route.query.officeCode
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
        officeRent,
        officeTenant,
        officeCost,
        officeIncome,
        valueList
    }
}
</script>