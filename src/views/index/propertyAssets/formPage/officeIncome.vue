<template>
    <section class="float-form-box">
        <div class="formDiscount">
          <section class="formBox">
            <span>开始时间</span>
            <el-date-picker
              class="input-box"
              :disabled="!!barrieData.id"
              v-model="barrieData.dateStart"
              type="month"
              placeholder="选择月">
            </el-date-picker>
          </section>
          <section class="formBox">
            <span>结束时间</span>
            <el-date-picker
              class="input-box"
              :disabled="!!barrieData.id"
              v-model="barrieData.dateEnd"
              type="month"
              placeholder="选择月">
            </el-date-picker>
          </section>
          <section class="formBox">
              <span>年化租金(元)</span>
              <my-el-input  class="input-box"
                          type="float"
                          v-model="barrieData.annualRentIncome"></my-el-input>
          </section>
          <section class="formBox">
              <span>物业管理费(元)</span>
              <my-el-input  class="input-box"
                          type="float"
                          v-model="barrieData.estateManagementIncome"></my-el-input>
          </section>
          <section class="formBox">
              <span>广告费(元)</span>
              <my-el-input  class="input-box"
                          type="float"
                          v-model="barrieData.adIncome"></my-el-input>
          </section>
          <section class="formBox">
              <span>车位费(元)</span>
              <my-el-input  class="input-box"
                                type="float"
                                v-model="barrieData.packingLotIncome"></my-el-input>
          </section>
          <section class="formBox">
              <span>其他收入(元)</span>
              <my-el-input  class="input-box"
                          type="float"
                          v-model="barrieData.otherIncome"></my-el-input>
          </section>
          <section class="formBox">
              <span>总收入(元)</span>
              <div class="input-btn-box">
                <my-el-input  class="input-b"
                            type="float"
                            v-model="barrieData.totalIncome"></my-el-input>

                <el-button class="input-btn"
                              type="primary"
                              size="small"
                              :disabled="checkHandle(barrieData)"
                              @click="checkMessage(barrieData)">校验</el-button>
              </div>
              
          </section>
          <section class="formBox">
            <span>其他收入说明</span>
            <el-input
              class="input-box"
              placeholder="请输入内容,最140个字"
              :maxlength="140"
              v-model="barrieData.otherIncomeDesc">
            </el-input>
          </section>
          <section class="formBox bigF">
            <span>备注</span>
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容,最140个字"
              :maxlength="140"
              v-model="barrieData.memo">
            </el-input>
            <div class="limit-box">剩余<a>{{140 - barrieData.memo.length}}</a>字</div>
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
    props: ['base'],
    data () {
        return {
            barrieData: {
              officeCode: '',
              dateType: '2',
              dateStart: '',
              dateEnd: '',
              annualRentIncome: '',
              estateManagementIncome: '',
              adIncome: '',
              packingLotIncome: '',
              otherIncome: '',
              totalIncome: '',
              otherIncomeDesc: '',
              memo: ''
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
        checkHandle (item) {
          return !(item.annualRentIncome && item.estateManagementIncome && item.adIncome && item.packingLotIncome && item.totalIncome)
        },
        checkMessage (item) {
          var total = Number(item.annualRentIncome) + Number(item.estateManagementIncome) + Number(item.adIncome) + Number(item.packingLotIncome) + Number(item.otherIncome)

          if (Number(item.totalIncome).toFixed(2) !== total.toFixed(2)) {
            this.$message({
                message: '总收入和分项收入总和不符！',
                type: 'warning'
            })
          } else {
            this.$message({
                message: '总收入和分项收入总和相符！',
                type: 'success'
            })
          }
        },
        getInfo () {
          if (!this.$route.query.id) {
            this.barrieData.officeCode = this.$route.query.officeCode
            return false
          }

          util.request({
              method: 'get',
              interface: 'officeIncomeInfo',
              data: {
                officeCode: this.$route.query.officeCode,
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
            if (!this.barrieData.dateStart) {
                this.$message({
                    message: '请选择开始时间！',
                    type: 'warning'
                })
                return false
            }

            if (!this.barrieData.dateEnd) {
                this.$message({
                    message: '请选择结束时间！',
                    type: 'warning'
                })
                return false
            }

            if (new Date(this.barrieData.dateEnd).getTime() < new Date(this.barrieData.dateStart).getTime()) {
                this.$message({
                    message: '结束时间不能大于开始时间！',
                    type: 'warning'
                })
                return false
            }

            if (new Date(this.barrieData.dateEnd).getFullYear() != new Date(this.barrieData.dateStart).getFullYear()) {
                this.$message({
                    message: '结束时间与开始时间必须同年份！',
                    type: 'warning'
                })
                return false
            }

            this.barrieData.dateStart = util.formMonthDate(this.barrieData.dateStart)
            this.barrieData.dateEnd = util.formMonthDate(this.barrieData.dateEnd)

            var interfaceName = 'officeIncomeSave'

            if (this.barrieData.id) {
              interfaceName = 'officeIncomeUpdate'
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

                    var pathData = {
                      name: 'form-office',
                      query: {
                        officeCode: this.$route.query.officeCode,
                        type: 'officeIncome',
                        id: res.result.result
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