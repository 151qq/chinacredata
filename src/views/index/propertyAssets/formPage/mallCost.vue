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
              <span>运维成本</span>
              <el-input  class="input-box"
                                size="small"
                                v-my-float="barrieData.maintainCost"></el-input>
          </section>
          <section class="formBox">
              <span>人力成本</span>
              <el-input  class="input-box"
                                size="small"
                                v-my-float="barrieData.hrCost"></el-input>
          </section>
          <section class="formBox">
              <span>管理成本</span>
              <el-input  class="input-box"
                                size="small"
                                v-my-float="barrieData.managementCost"></el-input>
          </section>
          <section class="formBox">
              <span>能源成本</span>
              <el-input  class="input-box"
                                size="small"
                                v-my-float="barrieData.energyCost"></el-input>
          </section>
          <section class="formBox">
              <span>营销成本</span>
              <el-input  class="input-box"
                                size="small"
                                v-my-float="barrieData.adCost"></el-input>
          </section>
          <section class="formBox">
              <span>商业管理成本</span>
              <el-input  class="input-box"
                                size="small"
                                v-my-float="barrieData.businessManagementCost"></el-input>
          </section>
          <section class="formBox">
              <span>税费</span>
              <el-input  class="input-box"
                                size="small"
                                v-my-float="barrieData.tax"></el-input>
          </section>
          <section class="formBox">
              <span>其他成本</span>
              <el-input  class="input-box"
                                size="small"
                                v-my-float="barrieData.otherCost"></el-input>
          </section>
          <section class="formBox">
              <span>总成本</span>
              <div class="input-btn-box">
                <el-input  class="input-b"
                                size="small"
                                v-my-float="barrieData.totalCost"></el-input>

                <el-button class="input-btn"
                              type="primary"
                              size="small"
                              :disabled="checkHandle(barrieData)"
                              @click="checkMessage(barrieData)">校验</el-button>
              </div>
              
          </section>
          <section class="formBox bigF">
            <span>其他成本说明</span>
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容,最140个字"
              :maxlength="140"
              v-model="barrieData.otherCostDesc">
            </el-input>
            <div class="limit-box">剩余<a>{{140 - barrieData.otherCostDesc.length}}</a>字</div>
          </section>
          <section class="formBox bigF">
            <span>税费说明</span>
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容,最140个字"
              :maxlength="140"
              v-model="barrieData.taxDesc">
            </el-input>
            <div class="limit-box">剩余<a>{{140 - barrieData.taxDesc.length}}</a>字</div>
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
              mallCode: '',
              dateType: '2',
              dateStart: '',
              dateEnd: '',
              maintainCost: '',
              hrCost: '',
              managementCost: '',
              energyCost: '',
              adCost: '',
              businessManagementCost: '',
              otherCost: '',
              otherCostDesc: '',
              tax: '',
              totalCost: '',
              taxDesc: '',
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
          return !(item.maintainCost && item.hrCost && item.managementCost && item.energyCost && item.adCost && item.businessManagementCost && item.tax && totalCost)
        },
        checkMessage (item) {
          var total = Number(item.maintainCost) + Number(item.hrCost) + Number(item.managementCost) + Number(item.energyCost) + Number(item.adCost) + Number(item.businessManagementCost) + Number(item.tax) + Number(item.otherCost)

          if (Number(item.totalCost) !== total) {
            this.$message({
                message: '总支出和分项支出总和不符！',
                type: 'warning'
            })
          } else {
            this.$message({
                message: '总支出和分项支出总和相符！',
                type: 'success'
            })
          }
        },
        getInfo () {
          if (!this.$route.query.id) {
            this.barrieData.mallCode = this.$route.query.mallCode
            return false
          }

          util.request({
              method: 'get',
              interface: 'mallCostInfo',
              data: {
                mallCode: this.$route.query.mallCode,
                id: this.$route.query.id
              }
          }).then(res => {
              if (res.result.success == '1') {
                res.result.result.yearDate = new Date(res.result.result.dateYear)
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

            var interfaceName = 'mallCostSave'

            if (this.barrieData.id) {
              interfaceName = 'mallCostUpdate'
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
                      name: 'form-mall',
                      query: {
                        mallCode: this.$route.query.mallCode,
                        type: 'mallCost',
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