<template>
    <section class="float-form-box">
        <div class="formDiscount">
          <section class="formBox bigBigSpan">
              <span>开始时间</span>
              <el-date-picker class="input-box"
                              v-model="barrieData.beginDate"
                              :disabled="!!barrieData.id"
                              type="month"
                              placeholder="选择日期">
              </el-date-picker>
          </section>
          <section class="formBox bigBigSpan">
              <span>结束时间</span>
              <el-date-picker class="input-box"
                              v-model="barrieData.endDate"
                              :disabled="!!barrieData.id"
                              type="month"
                              placeholder="选择日期">
              </el-date-picker>
          </section>
          <section class="formBox bigBigSpan">
              <span>高区租金(元 ㎡/天)</span>
              <my-el-input  class="input-box"
                                type="float"
                                v-model="barrieData.rentHighLevel"></my-el-input>
          </section>
          <section class="formBox bigBigSpan">
              <span>中区租金(元 ㎡/天)</span>
              <my-el-input  class="input-box"
                                type="float"
                                v-model="barrieData.rentMiddleLevel"></my-el-input>
          </section>
          <section class="formBox bigBigSpan">
              <span>低区租金(元 ㎡/天)</span>
              <my-el-input  class="input-box"
                                type="float"
                                v-model="barrieData.rentLowLevel"></my-el-input>
          </section>
          <section class="formBox bigBigSpan">
              <span>地上商业租金(元 ㎡/天)</span>
              <my-el-input  class="input-box"
                                type="float"
                                v-model="barrieData.rentBusiness"></my-el-input>
          </section>
          <section class="formBox bigBigSpan">
              <span>地下商业租金(元 ㎡/天)</span>
              <my-el-input  class="input-box"
                                type="float"
                                v-model="barrieData.rentUndergroundBusiness"></my-el-input>
          </section>
          <section class="formBox bigBigSpan">
              <span>高区空置率(%)</span>
              <my-el-input  class="input-box"
                                :max="100"
                                type="float"
                                v-model="barrieData.vacancyHighLevel"></my-el-input>
          </section>
          <section class="formBox bigBigSpan">
              <span>中区空置率(%)</span>
              <my-el-input  class="input-box"
                                :max="100"
                                type="float"
                                v-model="barrieData.vacancyMiddleLevel"></my-el-input>
          </section>
          <section class="formBox bigBigSpan">
              <span>低区空置率(%)</span>
              <my-el-input  class="input-box"
                                :max="100"
                                type="float"
                                v-model="barrieData.vacancyLowLevel"></my-el-input>
          </section>
          <section class="formBox bigBigSpan">
              <span>地下商业空置率(%)</span>
              <my-el-input  class="input-box"
                                :max="100"
                                type="float"
                                v-model="barrieData.vacancyUndergroundBusiness"></my-el-input>
          </section>
          <section class="formBox bigBigSpan">
              <span>地上商业空置率(%)</span>
              <my-el-input  class="input-box"
                                :max="100"
                                type="float"
                                v-model="barrieData.vacancyBusiness"></my-el-input>
          </section>
          <section class="formBox bigBigSpan">
              <span>平均空置率(%)</span>
              <my-el-input  class="input-box"
                                type="float"
                                v-model="barrieData.averageVacancy"></my-el-input>
          </section>
          <section class="formBox bigBigSpan">
              <span>时租停车费(元)</span>
              <my-el-input  class="input-box"
                                type="float"
                                v-model="barrieData.parkingHourFee"></my-el-input>
          </section>
          <section class="formBox bigBigSpan">
              <span>月租停车费(元)</span>
              <my-el-input  class="input-box"
                                type="float"
                                v-model="barrieData.parkingMonthFee"></my-el-input>
          </section>
          <section class="formBox bigBigSpan bigBigSpanF">
            <span>停车费说明</span>
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容,最500个字"
              :maxlength="500"
              v-model="barrieData.parkingFeeDesc">
            </el-input>
            <div class="limit-box">剩余<a>{{500 - barrieData.parkingFeeDesc.length}}</a>字</div>
          </section>      
        </div>
        
        <div class="clear"></div>
        <el-button v-if="isEdit" class="save-btn" type="info" :plain="true" size="small" icon="document"
            @click="saveBase(item)">保存</el-button>
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
              beginDate: '',
              endDate: '',
              rentHighLevel: '',
              rentMiddleLevel: '',
              rentLowLevel: '',
              rentUndergroundBusiness: '',
              rentBusiness: '',
              vacancyHighLevel: '',
              vacancyMiddleLevel: '',
              vacancyLowLevel: '',
              vacancyUndergroundBusiness: '',
              vacancyBusiness: '',
              averageVacancy: '',
              parkingHourFee: '',
              parkingMonthFee: '',
              parkingFeeDesc: ''
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
            this.barrieData.officeCode = this.$route.query.officeCode
            return false
          }

          util.request({
              method: 'get',
              interface: 'officeRentHistoryInfo',
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
        saveBase (barrieData) {
            if (!this.barrieData.beginDate) {
                this.$message({
                    message: '请选择开始时间！',
                    type: 'warning'
                })
                return false
            }

            if (!this.barrieData.endDate) {
                this.$message({
                    message: '请选择结束时间！',
                    type: 'warning'
                })
                return false
            }

            if (new Date(this.barrieData.endDate).getTime() < new Date(this.barrieData.beginDate).getTime()) {
                this.$message({
                    message: '结束时间不能大于开始时间！',
                    type: 'warning'
                })
                return false
            }

            this.barrieData.beginDate = util.formMonthDate(this.barrieData.beginDate)
            this.barrieData.endDate = util.formMonthDate(this.barrieData.endDate)

            var interfaceName = 'officeRentHistorySave'

            if (this.barrieData.id) {
              interfaceName = 'officeRentHistoryUpdate'
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
                        type: 'officeRent',
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