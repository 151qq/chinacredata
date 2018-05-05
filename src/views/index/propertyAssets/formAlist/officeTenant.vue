<template>
    <section class="form-small-box">
      <div class="add-btn">
        <span>
          面积(m²)&nbsp;&nbsp;比例(%)&nbsp;&nbsp;租金(元)&nbsp;&nbsp;租期(月)
        </span>
        <el-button type="primary" icon="plus" size="small"
                @click="addBarrier"
                v-if="isEdit">增加</el-button>
      </div>
      
      <section class="inForm" v-for="(item, index) in barrieList" :key="index">
        <div class="formDiscount">
          <section class="formBox">
              <span>租期</span>
              <el-date-picker class="input-box"
                              v-model="item.rangeDate"
                              type="daterange"
                              placeholder="选择租期">
              </el-date-picker>
          </section>
          <section class="formBox">
              <span>租户名称</span>
              <el-select
                class="input-box"
                v-model="item.tenantName"
                @change="tenantNameChange(item.tenantName, index)"
                filterable
                placeholder="请选择">
                <el-option
                        :label="'无'"
                        :value="''">
                </el-option>
                <el-option
                  v-for="(item, index) in enterpriseList"
                  :key="index"
                  :label="item.enterpriseNameReg"
                  :value="item.enterpriseCode">
                </el-option>
              </el-select>
          </section>
          <section class="formBox">
              <span>租户类型</span>
              <el-select
                class="input-box"
                v-model="item.tenantType"
                :disabled="true"
                filterable
                placeholder="请选择">
                <el-option
                  v-for="(item, index) in enterpriseTypes"
                  :key="index"
                  :label="item.dictKeyValue"
                  :value="item.dictKeyCode">
                </el-option>
              </el-select>
          </section>
          <section class="formBox">
              <span>免租期</span>
              <el-input-number  class="input-box"
                                size="small"
                                :min="0"
                                :step="1"
                                v-model="item.rentFreePeriod"></el-input-number>
          </section>
          <section class="formBox">
              <span>租金</span>
              <el-input-number  class="input-box"
                                size="small"
                                :min="0"
                                :step="1"
                                v-model="item.stockRightRation"></el-input-number>
          </section>
          <section class="formBox">
              <span>面积</span>
              <el-input-number  class="input-box"
                                size="small"
                                :min="0"
                                :step="0.01"
                                v-model="item.rentAcreage"></el-input-number>
          </section>
          <section class="formBox bigF">
            <span>租用目的</span>
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容,最140个字"
              :maxlength="140"
              v-model="item.rentBusinessGoal">
            </el-input>
            <div class="limit-box">剩余<a>{{140 - item.rentBusinessGoal.length}}</a>字</div>
          </section>
          <section class="formBox bigF">
            <span>租户简介</span>
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容,最140个字"
              :maxlength="140"
              v-model="item.tenantDesc">
            </el-input>
            <div class="limit-box">剩余<a>{{140 - item.tenantDesc.length}}</a>字</div>
          </section>
          <section class="formBox bigF">
            <span>备注</span>
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容,最140个字"
              :maxlength="140"
              v-model="item.memo">
            </el-input>
            <div class="limit-box">剩余<a>{{140 - item.memo.length}}</a>字</div>
          </section> 
        </div>
        <el-button class="save-btn" type="danger" :plain="true" size="small" icon="delete2"
            @click="deleteBase(item, index)">删除</el-button>

        <el-button class="save-btn" type="info" :plain="true" size="small" icon="document"
            @click="saveBase(item)">保存</el-button>
        <div class="clear"></div>
      </section>

      <div v-if="!barrieList.length" class="null-page">
            暂无租户
      </div>
    </section>
</template>
<script>
import util from '../../../../assets/common/util'
import { mapGetters } from 'vuex'
export default {
    props: ['base', 'enterpriseList'],
    data () {
        return {
            barrieList: [],
            enterpriseTypes: []
        }
    },
    mounted () {
      this.getList()
      this.getEnterpriseTypes()
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
        tenantNameChange (value, index) {
          for (var i = 0, len = this.enterpriseList.length; i < len; i++) {
            if (this.enterpriseList[i].enterpriseCode == value) {
              this.barrieList[index].tenantType = this.enterpriseList[i].enterpriseType
              break
            }
          }

          if (!value) {
            this.barrieList[index].tenantType = ''
          }
        },
        getEnterpriseTypes () {
          util.request({
              method: 'get',
              interface: 'findDictionaryByType',
              data: {
                typeCode: 'enterprise_type'
              }
          }).then(res => {
              if (res.result.success == '1') {
                this.enterpriseTypes = res.result.result
              } else {
                this.$message.error(res.result.message)
              }
          })
        },
        getList () {
          util.request({
              method: 'get',
              interface: 'officeTenantInfoList',
              data: {
                officeCode: this.$route.query.officeCode
              }
          }).then(res => {
              if (res.result.success == '1') {
                if (res.result.result.length) {
                  res.result.result.forEach((item) => {
                    item.rangeDate = [item.beginDate, item.endDate]
                  })
                }

                this.barrieList = res.result.result
              } else {
                this.$message.error(res.result.message)
              }
          })
        },
        addBarrier () {
          this.barrieList.unshift({
            officeCode: this.$route.query.officeCode,
            rangeDate: [],
            tenantName: '',
            tenantType: '',
            rentFreePeriod: '',
            rentAcreage: '',
            tenantDesc: '',
            rentBusinessGoal: '',
            memo: '',
            beginDate: '',
            endDate: ''
          })
        },
        deleteBase (barrieData, index) {
          if (!barrieData.id) {
            this.barrieList.splice(index, 1)
          } else {
            util.request({
                method: 'get',
                interface: 'officeTenantInfoDelete',
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
            if (!barrieData.rangeDate.length) {
                this.$message({
                    message: '请选择时间范围！',
                    type: 'warning'
                })
                return false
            }

            barrieData.beginDate = new Date(barrieData.rangeDate[0])
            barrieData.endDate = new Date(barrieData.rangeDate[1])

            var interfaceName = 'officeTenantInfoSave'

            if (barrieData.id) {
              interfaceName = 'officeTenantInfoUpdate'
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