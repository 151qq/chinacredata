<template>
    <section class="float-form-box">
      
      <div class="formDiscount">
        <section class="formBox">
            <span>开始时间</span>
            <el-date-picker class="input-box"
                            :disabled="!!$route.query.id"
                            v-model="barrieData.beginDate"
                            type="date"
                            placeholder="选择日期">
            </el-date-picker>
        </section>
        <section class="formBox">
            <span>结束时间</span>
            <el-date-picker class="input-box"
                            :disabled="!!$route.query.id"
                            v-model="barrieData.endDate"
                            type="date"
                            placeholder="选择日期">
            </el-date-picker>
        </section>
        <section class="formBox">
            <span>租户名称</span>
            <el-input
              class="input-box"
              :disabled="$route.query.id"
              placeholder="请输入内容"
              v-model="barrieData.tenantName">
            </el-input>
        </section>
        <section class="formBox">
            <span>租户类型</span>
            <el-select
              class="input-box"
              v-model="barrieData.tenantType"
              filterable
              placeholder="请选择">
              <el-option
                      :label="'无'"
                      :value="''">
              </el-option>
              <el-option
                v-for="(item, index) in dictionary.tenant_type"
                :key="index"
                :label="item.typeName"
                :value="item.id">
              </el-option>
            </el-select>
        </section>
        <section class="formBox">
            <span>免租期</span>
            <my-el-input class="input-box"
                      type="float"
                      v-model="barrieData.rentFreePeriod"></my-el-input>
        </section>
        <section class="formBox">
            <span>面积(m²)</span>
            <my-el-input class="input-box"
                      type="float"
                      v-model="barrieData.rentAcreage"></my-el-input>
        </section>
        <section class="formBox">
            <span>租金(元)</span>
            <my-el-input class="input-box"
                      type="float"
                      v-model="barrieData.tenantRent"></my-el-input>
        </section>
        <section class="formBox bigF">
          <span>租用目的</span>
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容,最140个字"
            :maxlength="140"
            v-model="barrieData.rentBusinessGoal">
          </el-input>
          <div class="limit-box">剩余<a>{{140 - barrieData.rentBusinessGoal.length}}</a>字</div>
        </section>
        <section class="formBox bigF">
          <span>租户简介</span>
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容,最140个字"
            :maxlength="140"
            v-model="barrieData.tenantDesc">
          </el-input>
          <div class="limit-box">剩余<a>{{140 - barrieData.tenantDesc.length}}</a>字</div>
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
      <el-button class="save-btn" type="info" :plain="true" size="small" icon="document"
          @click="saveBase">保存</el-button>
        
      <div class="clear"></div>
    </section>
</template>
<script>
import util from '../../../../assets/common/util'
import { mapGetters } from 'vuex'
export default {
    props: ['base', 'dictionary'],
    data () {
        return {
            barrieData: {
              officeCode: '',
              tenantName: '',
              tenantType: '',
              rentFreePeriod: '',
              rentAcreage: '',
              tenantRent: '',
              tenantDesc: '',
              rentBusinessGoal: '',
              memo: '',
              beginDate: '',
              endDate: ''
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
              interface: 'officeTenantInfoInfo',
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

            if (!this.barrieData.tenantName) {
                this.$message({
                    message: '请填写租户名称！',
                    type: 'warning'
                })
                return false
            }

            if (!this.barrieData.rentAcreage) {
                this.$message({
                    message: '请填写租用面积！',
                    type: 'warning'
                })
                return false
            }

            if (!this.barrieData.tenantRent) {
                this.$message({
                    message: '请填写租金！',
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

            this.barrieData.beginDate = new Date(this.barrieData.beginDate)
            this.barrieData.endDate = new Date(this.barrieData.endDate)
            var interfaceName = 'officeTenantInfoSave'

            if (this.barrieData.id) {
              interfaceName = 'officeTenantInfoUpdate'
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
                        type: 'officeTenant',
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