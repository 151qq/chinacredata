<template>
    <section class="float-form-box">
        <div class="formDiscount">
          <section class="formBox">
              <span>时间</span>
              <el-date-picker class="input-box"
                              v-model="barrieData.evaluationDate"
                              :disabled="!!barrieData.id"
                              type="date"
                              placeholder="选择租期">
              </el-date-picker>
          </section>
          <section class="formBox">
              <span>总收入(元)</span>
              <my-el-input  class="input-box"
                                type="float"
                                v-model="barrieData.totalIncome"></my-el-input>
          </section>
          <section class="formBox">
              <span>总成本(元)</span>
              <my-el-input  class="input-box"
                                type="float"
                                v-model="barrieData.totalCost"></my-el-input>
          </section>
          <section class="formBox">
              <span>息税前利润(元)</span>
              <my-el-input  class="input-box"
                                type="float"
                                v-model="barrieData.totalProfit"></my-el-input>
          </section>
          <section class="formBox">
              <span>折旧与摊销(元)</span>
              <my-el-input  class="input-box"
                                type="float"
                                v-model="barrieData.depreciationAmortization"></my-el-input>
          </section>
          <section class="formBox">
              <span>财务支出(元)</span>
              <my-el-input  class="input-box"
                                type="float"
                                v-model="barrieData.financeCost"></my-el-input>
          </section>
          <section class="formBox bigF">
            <span>财务支出说明</span>
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容,最140个字"
              :maxlength="140"
              v-model="barrieData.financeCostDesc">
            </el-input>
            <div class="limit-box">剩余<a>{{140 - barrieData.financeCostDesc.length}}</a>字</div>
          </section>
          <section class="formBox">
              <span>所得税(元)</span>
              <my-el-input  class="input-box"
                                type="float"
                                v-model="barrieData.incomeTax"></my-el-input>
          </section>
          <section class="formBox">
              <span>净利润(元)</span>
              <my-el-input  class="input-box"
                                type="float"
                                v-model="barrieData.netProfit"></my-el-input>
          </section>
          <section class="formBox">
              <span>资本化率(%)</span>
              <my-el-input  class="input-box"
                                type="float"
                                :max="100"
                                v-model="barrieData.capitalizaitonRate"></my-el-input>
          </section>
          <section class="formBox">
              <span>估值(元)</span>
              <my-el-input  class="input-box"
                                type="float"
                                v-model="barrieData.propertyValue"></my-el-input>
          </section>
          <section class="formBox">
              <span>估值人</span>
              <el-input  class="input-box"
                                size="small"
                                v-model="barrieData.propertyValuer"></el-input>
          </section>
          <section class="formBox bigF">
            <span>估值说明</span>
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容,最140个字"
              :maxlength="500"
              v-model="barrieData.propertyEvaluationDesc">
            </el-input>
            <div class="limit-box">剩余<a>{{500 - barrieData.propertyEvaluationDesc.length}}</a>字</div>
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
import { mapGetters } from 'vuex'
export default {
    props: ['base', 'propertyCode', 'propertyType'],
    data () {
        return {
            barrieData: {
              propertyCode: '',
              propertyType: '',
              evaluationDate: '',
              totalIncome: '',
              totalCost: '',
              totalProfit: '',
              depreciationAmortization: '',
              financeCost: '',
              financeCostDesc: '',
              incomeTax: '',
              netProfit: '',
              capitalizaitonRate: '',
              propertyValue: '',
              propertyValuer: '',
              propertyEvaluationDesc: ''
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
        getInfo () {
          if (!this.$route.query.id) {
            this.barrieData.propertyCode = this.propertyCode
            this.barrieData.propertyType = this.propertyType
            return false
          }

          util.request({
              method: 'get',
              interface: 'propertyValueInfo',
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
            if (!this.barrieData.evaluationDate) {
                this.$message({
                    message: '请选择评估时间！',
                    type: 'warning'
                })
                return false
            }

            if (!this.barrieData.propertyValue) {
                this.$message({
                    message: '请添加估值！',
                    type: 'warning'
                })
                return false
            }

            this.barrieData.evaluationDate = new Date(this.barrieData.evaluationDate)

            var interfaceName = 'propertyValueSave'

            if (this.barrieData.id) {
              interfaceName = 'propertyValueUpdate'
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
                          type: 'value',
                          id: res.result.result
                        }
                      }
                    }

                    if (this.propertyType == 'property_type_2') {
                      pathData = {
                        name: 'form-mall',
                        query: {
                          mallCode: this.propertyCode,
                          type: 'value',
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
    }
}
</script>