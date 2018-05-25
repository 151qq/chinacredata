<template>
    <div class="form-discount">
            <template v-if="$route.query.type == 'managementLevel'">
                <management-level :base="baseData"
                            :dictionary="dictionary"></management-level>
            </template>
    </div>
</template>
<script>
import util from '../../../assets/common/util'
import managementLevel from './formPage/managementLevel'
import { mapGetters } from 'vuex'

export default {
    data () {
        return {
            baseData: {},
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
        this.getBase()
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
            interface: 'assetManagementProductInfo',
            data: {
              assetManagementProductCode: this.$route.query.assetManagementProductCode
            }
        }).then(res => {
            if (res.result.success == '1') {
              this.baseData = res.result.result
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
        managementLevel
    }
}
</script>