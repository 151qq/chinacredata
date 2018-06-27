<template>
    <div class="form-discount">
        <el-collapse v-model="activeNames" @change="collChange">
          <el-collapse-item class="float-form-box" title="基本信息" name="1">
            <reits-base @change="baseChange"
                        :dictionary="dictionary"
                        ref="baseForm"></reits-base>
          </el-collapse-item>
          <div class="line-bold"></div>

          <!-- 股东信息 -->
          <el-collapse-item class="float-form-box" title="股东信息" name="2">
            <holder-list :base="baseData"
                        :security-code="$route.query.foreignReitsCode"
                        :security-type="'security_type_2'"></holder-list>
          </el-collapse-item>
          <div class="line-bold"></div>

          <!-- 物业资产细节 -->
          <el-collapse-item class="float-form-box" title="物业资产细节" name="3">
            <property-list :base="baseData"
                        :dictionary="dictionary"
                        :security-code="$route.query.foreignReitsCode"
                        :security-type="'security_type_2'"></property-list>
          </el-collapse-item>
        </el-collapse>
    </div>
</template>
<script>
import util from '../../../assets/common/util'
import reitsBase from './formAlist/reitsBase'
import holderList from './formAlist/holderList'
import propertyList from './formAlist/propertyList'
import { mapGetters } from 'vuex'

export default {
    data () {
        return {
            activeNames: ['1'],
            baseData: {},
            imgList: [],
            sourceData: [],
            dictionaryTypes: [
              'enterprise_type',
              'property_type'
            ],
            dictionary: {
              enterprise_type: [],
              property_type: []
            }
        }
    },
    mounted () {
        var reitsColl = localStorage.getItem("reitsColl")
        if (reitsColl) {
            this.activeNames = reitsColl.split(',')
        }

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
          localStorage.setItem("reitsColl", this.activeNames)
      }
    },
    components: {
        reitsBase,
        holderList,
        propertyList
    }
}
</script>