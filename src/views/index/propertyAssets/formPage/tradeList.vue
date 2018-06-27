<template>
    <section class="float-form-box">
      <div class="formDiscount">
          <section class="formBox">
              <span>交易时间</span>
              <el-date-picker class="input-box"
                              v-model="barrieData.tradeDate"
                              :disabled="!!barrieData.id"
                              type="date"
                              placeholder="选择日期">
              </el-date-picker>
          </section>
          <section class="formBox">
              <span>交易甲方</span>
              <search-input   :class="'input-box'"
                              :disabled="!!barrieData.id"
                              :search-data="barrieData"
                              :fetch-suggestions="getEnterpriseList"
                              :m-code="'firstParty'"
                              :m-name="'firstPartyName'"
                              :m-type="'firstPartyType'"
                              :s-code="'enterpriseCode'"
                              :s-name="'enterpriseNameReg'"
                              :s-type="'enterpriseType'"></search-input>
          </section>
          <section class="formBox">
              <span>交易乙方</span>
              <search-input   :class="'input-box'"
                              :disabled="!!barrieData.id"
                              :search-data="barrieData"
                              :fetch-suggestions="getEnterpriseList"
                              :m-code="'secondParty'"
                              :m-name="'secondPartyName'"
                              :m-type="'secondPartyType'"
                              :s-code="'enterpriseCode'"
                              :s-name="'enterpriseNameReg'"
                              :s-type="'enterpriseType'"></search-input>
          </section>
          <section class="formBox">
              <span>交易类型</span>
              <el-select
                class="input-box"
                v-model="barrieData.tradeType"
                filterable
                placeholder="请选择">
                <el-option
                  v-for="(item, index) in dictionary.trade_type"
                  :key="index"
                  :label="item.typeName"
                  :value="item.id">
                </el-option>
              </el-select>
          </section>
          <section class="formBox">
              <span>股权比例(%)</span>
              <my-el-input  class="input-box"
                                type="float"
                                :max="100"
                                v-model="barrieData.stockRightRation"></my-el-input>
          </section>
          <section class="formBox">
              <span>股权交易场所</span>
              <el-input
                class="input-box"
                placeholder="请输入内容"
                v-model="barrieData.stockTracdePlace">
              </el-input>
          </section>
          <section class="formBox">
              <span>交易价格(元)</span>
              <my-el-input  class="input-box"
                                type="float"
                                v-model="barrieData.tradePrice"></my-el-input>
          </section>
          <section class="formBox bigF">
            <span>交易说明</span>
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容,最140个字"
              :maxlength="500"
              v-model="barrieData.tradeDesc">
            </el-input>
            <div class="limit-box">剩余<a>{{500 - barrieData.tradeDesc.length}}</a>字</div>
          </section>      
        </div>
        <div class="clear"></div>
        <el-button v-if="isEdit" class="save-btn" type="info" :plain="true" size="small" icon="document"
            @click="saveBase">保存</el-button>
        <div class="clear"></div>
    </section>
</template>
<script>
import util from '../../../../assets/common/util'
import searchInput from '../../../../components/common/search-input'
import { mapGetters } from 'vuex'
export default {
    props: ['base', 'propertyCode', 'propertyType', 'dictionary'],
    data () {
        return {
            barrieData: {
              propertyCode: '',
              propertyType: '',
              tradeDate: '',
              firstParty: '',
              firstPartyType: '',
              secondParty: '',
              secondPartyType: '',
              tradeType: '',
              stockRightRation: '',
              stockTracdePlace: '',
              tradePrice: '',
              recoder: '',
              tradeDesc: ''
            }
        }
    },
    mounted () {
      this.getInfo()
    },
    watch: {
      $route () {
        this.getInfo()
      }
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
        getEnterpriseList (queryString, cb) {
          if (!this.requestNum) {
            this.requestNum = 1
          } else {
            this.requestNum++
          }
          
          var requestNum = this.requestNum

          var formData = {
            keyName: queryString,
            status: '0',
            pageNumber: 1,
            pageSize: 20
          }

          util.request({
              method: 'get',
              interface: 'enterpriseListByKeyname',
              data: formData
          }).then(res => {
              if (res.result.success == '1') {
                  if (requestNum == this.requestNum) {
                    if (res.result.result.length) {
                      cb(res.result.result)
                    }
                  }
              } else {
                  this.$message.error(res.result.message)
              }
          })       
        },
        getInfo () {
          if (!this.$route.query.id) {
            this.barrieData.propertyCode = this.propertyCode
            this.barrieData.propertyType = this.propertyType
            return false
          }

          util.request({
              method: 'get',
              interface: 'propertyTradeInfo',
              data: {
                propertyCode: this.propertyCode,
                id: this.$route.query.id
              }
          }).then(res => {
              if (res.result.success == '1') {
                this.barrieData = res.result.result
              } else {
                this.$message.error(res.result.message)
              }
          })
        },
        saveBase () {
            if (!this.barrieData.tradeDate) {
                this.$message({
                    message: '请选择交易日期！',
                    type: 'warning'
                })
                return false
            }

            if (!this.barrieData.firstParty) {
                this.$message({
                    message: '请选择交易甲方！',
                    type: 'warning'
                })
                return false
            }

            if (!this.barrieData.secondParty) {
                this.$message({
                    message: '请选择交易乙方！',
                    type: 'warning'
                })
                return false
            }

            if (this.barrieData.firstParty == this.barrieData.secondParty) {
                this.$message({
                    message: '交易双方不能相同！',
                    type: 'warning'
                })
                return false
            }

            if (this.barrieData.stockRightRation === '') {
                this.$message({
                    message: '请填写股权比例！',
                    type: 'warning'
                })
                return false
            }

            if (this.barrieData.stockTracdePlace === '') {
                this.$message({
                    message: '请填写交易场所！',
                    type: 'warning'
                })
                return false
            }

            if (this.barrieData.tradePrice === '') {
                this.$message({
                    message: '请填写交易价格！',
                    type: 'warning'
                })
                return false
            }

            this.barrieData.tradeDate = new Date(this.barrieData.tradeDate)

            var interfaceName = 'propertyTradeSave'

            if (this.barrieData.id) {
              interfaceName = 'propertyTradeUpdate'
            }

            util.request({
                method: 'post',
                interface: interfaceName,
                data: this.barrieData
            }).then(res => {
                if (res.result.success == '1') {
                    this.$message({
                      type: 'success',
                      message: '保存成功!'
                    })

                    if (this.barrieData.id) {
                      this.getInfo()
                      return
                    }

                    var pathData = {}

                    if (this.propertyType == 'property_type_1') {
                      pathData = {
                        name: 'form-office',
                        query: {
                          officeCode: this.propertyCode,
                          type: 'trade',
                          id: res.result.result
                        }
                      }
                    }

                    if (this.propertyType == 'property_type_2') {
                      pathData = {
                        name: 'form-mall',
                        query: {
                          mallCode: this.propertyCode,
                          type: 'trade',
                          id: res.result.result
                        }
                      }
                    }

                    this.$router.replace(pathData)
                } else {
                    this.$message.error(res.result.message)
                }
            })
        }
    },
    components: {
      searchInput
    }
}
</script>