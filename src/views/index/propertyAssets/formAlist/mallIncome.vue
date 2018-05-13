<template>
    <section class="form-small-box">
      <div class="add-btn">
        <span>
          面积(m²)&nbsp;&nbsp;费用(元)
        </span>
        <el-button type="primary" icon="plus" size="small"
                @click="addBarrier"
                v-if="isEdit">增加</el-button>
      </div>
      
      <section class="inForm" v-for="(item, index) in barrieList" :key="index">
        <div class="formDiscount">
          <section class="formBox">
              <span>时间类型</span>
              <el-select
                class="input-box"
                v-model="item.dateType"
                filterable
                :disabled="!!item.id"
                placeholder="请选择">
                <el-option
                  v-for="(item, index) in dateTypes"
                  :key="index"
                  :label="item.typeName"
                  :value="item.id">
                </el-option>
              </el-select>
          </section>
          <section class="formBox">
              <span>年份</span>
              <el-date-picker class="input-box"
                              :disabled="!!item.id"
                              v-model="item.dateYear"
                              type="year"
                              placeholder="选择租期">
              </el-date-picker>
          </section>
          <section class="formBox" v-show="item.dateType == '2'">
            <span>月份</span>
            <el-select
              class="input-box"
              v-model="item.dateOther"
              :disabled="!!item.id"
              filterable
              placeholder="请选择">
              <el-option
                v-for="(item, index) in months"
                :key="index"
                :label="item.typeName"
                :value="item.id">
              </el-option>
            </el-select>
          </section>
          <section class="formBox">
              <span>年化租金</span>
              <el-input-number  class="input-box"
                                size="small"
                                :min="0"
                                :step="1"
                                v-model="item.annualRentIncome"></el-input-number>
          </section>
          <section class="formBox">
              <span>能源费</span>
              <el-input-number  class="input-box"
                                size="small"
                                :min="0"
                                :step="1"
                                v-model="item.energyIncome"></el-input-number>
          </section>
          <section class="formBox">
              <span>物业管理费</span>
              <el-input-number  class="input-box"
                                size="small"
                                :min="0"
                                :step="1"
                                v-model="item.estateManagementIncome"></el-input-number>
          </section>
          <section class="formBox">
              <span>广告费</span>
              <el-input-number  class="input-box"
                                size="small"
                                :min="0"
                                :step="1"
                                v-model="item.adIncome"></el-input-number>
          </section>
          <section class="formBox">
              <span>车位费</span>
              <el-input-number  class="input-box"
                                size="small"
                                :min="0"
                                :step="1"
                                v-model="item.packingLotIncome"></el-input-number>
          </section>
          <section class="formBox">
              <span>花车费</span>
              <el-input-number  class="input-box"
                                size="small"
                                :min="0"
                                :step="1"
                                v-model="item.flowerIncome"></el-input-number>
          </section>
          <section class="formBox">
              <span>其他收入</span>
              <el-input-number  class="input-box"
                                size="small"
                                :min="0"
                                :step="1"
                                v-model="item.otherIncome"></el-input-number>
          </section>
          <section class="formBox">
              <span>总收入</span>
              <div class="input-btn-box">
                <el-input-number  class="input-b"
                                size="small"
                                :min="0"
                                :step="1"
                                v-model="item.totalIncome"></el-input-number>

                <el-button class="input-btn"
                              type="primary"
                              size="small"
                              :disabled="checkHandle(item)"
                              @click="checkMessage(item)">校验</el-button>
              </div>
              
          </section>
          <section class="formBox bigF">
            <span>其他收入说明</span>
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容,最140个字"
              :maxlength="140"
              v-model="item.otherIncomeDesc">
            </el-input>
            <div class="limit-box">剩余<a>{{140 - item.otherIncomeDesc.length}}</a>字</div>
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
        <el-button v-if="isEdit" class="save-btn" type="danger" :plain="true" size="small" icon="delete2"
            @click="deleteBase(item, index)">删除</el-button>

        <el-button v-if="isEdit" class="save-btn" type="info" :plain="true" size="small" icon="document"
            @click="saveBase(item)">保存</el-button>
        <div class="clear"></div>
      </section>

      <div class="clear"></div>
      <el-pagination
          v-if="total"
          class="page-box"
          @current-change="pageChange"
          layout="prev, pager, next"
          :page-size="pageSize"
          :total="total">
      </el-pagination>

      <div v-if="!barrieList.length" class="null-page">
            暂无收入
      </div>
    </section>
</template>
<script>
import util from '../../../../assets/common/util'
import { mapGetters } from 'vuex'
export default {
    props: ['base'],
    data () {
        return {
            barrieList: [],
            dateTypes: [
              {
                typeName: '以年为单位',
                id: '1'
              },
              {
                typeName: '以月为单位',
                id: '2'
              }
            ],
            months: [
              {
                typeName: '一月',
                id: '1'
              },
              {
                typeName: '二月',
                id: '2'
              },
              {
                typeName: '三月',
                id: '3'
              },
              {
                typeName: '四月',
                id: '4'
              },
              {
                typeName: '五月',
                id: '5'
              },
              {
                typeName: '六月',
                id: '6'
              },
              {
                typeName: '七月',
                id: '7'
              },
              {
                typeName: '八月',
                id: '8'
              },
              {
                typeName: '九月',
                id: '9'
              },
              {
                typeName: '十月',
                id: '10'
              },
              {
                typeName: '十一月',
                id: '11'
              },
              {
                typeName: '十二月',
                id: '12'
              }
            ],
            pageNumber: 1,
            pageSize: 5,
            total: 0
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
        checkHandle (item) {
          return !(item.annualRentIncome && item.energyIncome && item.estateManagementIncome && item.adIncome && item.packingLotIncome && item.flowerIncome && totalIncome)
        },
        checkMessage (item) {
          var total = Number(item.annualRentIncome) + Number(item.energyIncome) + Number(item.estateManagementIncome) + Number(item.adIncome) + Number(item.packingLotIncome) + Number(item.flowerIncome) + Number(item.otherIncome)

          if (Number(item.totalIncome) !== total) {
            this.$message({
                message: '校验失败！',
                type: 'warning'
            })
          } else {
            this.$message({
                message: '校验成功！',
                type: 'success'
            })
          }
        },
        getList () {
          util.request({
              method: 'get',
              interface: 'mallIncomeList',
              data: {
                mallCode: this.$route.query.mallCode,
                pageNumber: this.pageNumber,
                pageSize: this.pageSize
              }
          }).then(res => {
              if (res.result.success == '1') {
                this.total = Number(res.result.total)
                this.barrieList = res.result.result
              } else {
                this.$message.error(res.result.message)
              }
          })
        },
        pageChange (size) {
            this.pageNumber = size
            this.getList()
        },
        addBarrier () {
          this.barrieList.unshift({
            mallCode: this.$route.query.mallCode,
            dateType: '1',
            dateYear: '',
            dateOther: '',
            annualRentIncome: '',
            energyIncome: '',
            estateManagementIncome: '',
            adIncome: '',
            packingLotIncome: '',
            flowerIncome: '',
            otherIncome: '',
            totalIncome: '',
            otherIncomeDesc: '',
            memo: ''
          })
        },
        deleteBase (barrieData, index) {
          if (!barrieData.id) {
            this.barrieList.splice(index, 1)
          } else {
            util.request({
                method: 'get',
                interface: 'mallIncomeDelete',
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
            if (!barrieData.dateYear) {
                this.$message({
                    message: '请选择年份！',
                    type: 'warning'
                })
                return false
            }

            if (barrieData.dateType == '2' && !barrieData.dateOther) {
                this.$message({
                    message: '请选择季度！',
                    type: 'warning'
                })
                return false
            }

            if (barrieData.dateType == '3' && !barrieData.dateOther) {
                this.$message({
                    message: '请选择月份！',
                    type: 'warning'
                })
                return false
            }

            var interfaceName = 'mallIncomeSave'

            if (barrieData.id) {
              interfaceName = 'mallIncomeUpdate'
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