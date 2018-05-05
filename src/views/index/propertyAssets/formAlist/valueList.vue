<template>
    <section class="form-small-box">
      <div class="add-btn">
        <span>
          率(%)&nbsp;&nbsp;费用(元)
        </span>
        <el-button type="primary" icon="plus" size="small"
                @click="addBarrier"
                v-if="isEdit">增加</el-button>
      </div>
      
      <section class="inForm" v-for="(item, index) in barrieList" :key="index">
        <div class="formDiscount">
          <section class="formBox">
              <span>时间</span>
              <el-date-picker class="input-box"
                              v-model="item.evaluationDate"
                              type="date"
                              placeholder="选择租期">
              </el-date-picker>
          </section>
          <section class="formBox">
              <span>总收入</span>
              <el-input-number  class="input-box"
                                size="small"
                                :min="0"
                                :step="1"
                                v-model="item.totalIncome"></el-input-number>
          </section>
          <section class="formBox">
              <span>总成本</span>
              <el-input-number  class="input-box"
                                size="small"
                                :min="0"
                                :step="1"
                                v-model="item.totalCost"></el-input-number>
          </section>
          <section class="formBox">
              <span>息税前利润</span>
              <el-input-number  class="input-box"
                                size="small"
                                :min="0"
                                :step="1"
                                v-model="item.totalProfit"></el-input-number>
          </section>
          <section class="formBox">
              <span>折旧与摊销</span>
              <el-input-number  class="input-box"
                                size="small"
                                :min="0"
                                :step="1"
                                v-model="item.depreciationAmortization"></el-input-number>
          </section>
          <section class="formBox">
              <span>财务支出</span>
              <el-input-number  class="input-box"
                                size="small"
                                :min="0"
                                :step="1"
                                v-model="item.financeCost"></el-input-number>
          </section>
          <section class="formBox bigF">
            <span>财务支出说明</span>
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容,最140个字"
              :maxlength="140"
              v-model="item.financeCostDesc">
            </el-input>
            <div class="limit-box">剩余<a>{{140 - item.financeCostDesc.length}}</a>字</div>
          </section>
          <section class="formBox">
              <span>所得税</span>
              <el-input-number  class="input-box"
                                size="small"
                                :min="0"
                                :step="1"
                                v-model="item.incomeTax"></el-input-number>
          </section>
          <section class="formBox">
              <span>净利润</span>
              <el-input-number  class="input-box"
                                size="small"
                                :min="0"
                                :step="1"
                                v-model="item.netProfit"></el-input-number>
          </section>
          <section class="formBox">
              <span>资本化率</span>
              <el-input-number  class="input-box"
                                size="small"
                                :min="0"
                                :max="100"
                                :step="1"
                                v-model="item.capitalizaitonRate"></el-input-number>
          </section>
          <section class="formBox">
              <span>估值</span>
              <el-input-number  class="input-box"
                                size="small"
                                :min="0"
                                :step="1"
                                v-model="item.propertyValue"></el-input-number>
          </section>
          <section class="formBox bigF">
            <span>估值说明</span>
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容,最140个字"
              :maxlength="500"
              v-model="item.propertyEvaluationDesc">
            </el-input>
            <div class="limit-box">剩余<a>{{500 - item.propertyEvaluationDesc.length}}</a>字</div>
          </section> 
        </div>
        <el-button v-if="isEdit" class="save-btn" type="danger" :plain="true" size="small" icon="delete2"
            @click="deleteBase(item, index)">删除</el-button>

        <el-button v-if="isEdit" class="save-btn" type="info" :plain="true" size="small" icon="document"
            @click="saveBase(item)">保存</el-button>
        <div class="clear"></div>
      </section>

      <div v-if="!barrieList.length" class="null-page">
            暂无渠道
      </div>
    </section>
</template>
<script>
import util from '../../../../assets/common/util'
import { mapGetters } from 'vuex'
export default {
    props: ['base', 'propertyCode', 'propertyType'],
    data () {
        return {
            barrieList: []
        }
    },
    mounted () {
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
          util.request({
              method: 'get',
              interface: 'propertyValueList',
              data: {
                propertyCode: this.propertyCode
              }
          }).then(res => {
              if (res.result.success == '1') {
                this.barrieList = res.result.result
              } else {
                this.$message.error(res.result.message)
              }
          })
        },
        addBarrier () {
          this.barrieList.unshift({
            propertyCode: this.propertyCode,
            propertyType: this.propertyType,
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
            propertyEvaluationDesc: ''
          })
        },
        deleteBase (barrieData, index) {
          if (!barrieData.id) {
            this.barrieList.splice(index, 1)
          } else {
            util.request({
                method: 'get',
                interface: 'propertyValueDelete',
                data: {
                  id: barrieData.id
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.getList()
                } else {
                    this.$message.error(res.result.message)
                }
            })
          }
        },
        saveBase (barrieData) {
            if (!barrieData.evaluationDate) {
                this.$message({
                    message: '请选择评估时间！',
                    type: 'warning'
                })
                return false
            }

            barrieData.evaluationDate = new Date(barrieData.evaluationDate)

            var interfaceName = 'propertyValueSave'

            if (barrieData.id) {
              interfaceName = 'propertyValueUpdate'
            }
            
            util.request({
                method: 'post',
                interface: interfaceName,
                data: barrieData
            }).then(res => {
                if (res.result.success == '1') {
                    this.$message({
                      type: 'success',
                      message: '保存成功!'
                    })

                    this.getList()
                } else {
                    this.$message.error(res.result.message)
                }
            })
        }
    }
}
</script>