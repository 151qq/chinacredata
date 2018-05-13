<template>
    <section class="form-small-box">
      <div class="add-btn">
        <span>
          费用(元)
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
              <span>运维成本</span>
              <el-input-number  class="input-box"
                                size="small"
                                :min="0"
                                :step="1"
                                v-model="item.maintainCost"></el-input-number>
          </section>
          <section class="formBox">
              <span>人力成本</span>
              <el-input-number  class="input-box"
                                size="small"
                                :min="0"
                                :step="1"
                                v-model="item.hrCost"></el-input-number>
          </section>
          <section class="formBox">
              <span>管理成本</span>
              <el-input-number  class="input-box"
                                size="small"
                                :min="0"
                                :step="1"
                                v-model="item.managementCost"></el-input-number>
          </section>
          <section class="formBox">
              <span>能源成本</span>
              <el-input-number  class="input-box"
                                size="small"
                                :min="0"
                                :step="1"
                                v-model="item.energyCost"></el-input-number>
          </section>
          <section class="formBox">
              <span>营销成本</span>
              <el-input-number  class="input-box"
                                size="small"
                                :min="0"
                                :step="1"
                                v-model="item.adCost"></el-input-number>
          </section>
          <section class="formBox">
              <span>商业管理成本</span>
              <el-input-number  class="input-box"
                                size="small"
                                :min="0"
                                :step="1"
                                v-model="item.businessManagementCost"></el-input-number>
          </section>
          <section class="formBox">
              <span>税费</span>
              <el-input-number  class="input-box"
                                size="small"
                                :min="0"
                                :step="1"
                                v-model="item.tax"></el-input-number>
          </section>
          <section class="formBox">
              <span>其他成本</span>
              <el-input-number  class="input-box"
                                size="small"
                                :min="0"
                                :step="1"
                                v-model="item.otherCost"></el-input-number>
          </section>
          <section class="formBox">
              <span>总成本</span>
              <div class="input-btn-box">
                <el-input-number  class="input-b"
                                size="small"
                                :min="0"
                                :step="1"
                                v-model="item.totalCost"></el-input-number>

                <el-button class="input-btn"
                              type="primary"
                              size="small"
                              :disabled="checkHandle(item)"
                              @click="checkMessage(item)">校验</el-button>
              </div>
              
          </section>
          <section class="formBox bigF">
            <span>其他成本说明</span>
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容,最140个字"
              :maxlength="140"
              v-model="item.otherCostDesc">
            </el-input>
            <div class="limit-box">剩余<a>{{140 - item.otherCostDesc.length}}</a>字</div>
          </section>
          <section class="formBox bigF">
            <span>税费说明</span>
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容,最140个字"
              :maxlength="140"
              v-model="item.taxDesc">
            </el-input>
            <div class="limit-box">剩余<a>{{140 - item.taxDesc.length}}</a>字</div>
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
            暂无支出
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
          return !(item.maintainCost && item.hrCost && item.managementCost && item.energyCost && item.adCost && item.businessManagementCost && item.tax && totalCost)
        },
        checkMessage (item) {
          var total = Number(item.maintainCost) + Number(item.hrCost) + Number(item.managementCost) + Number(item.energyCost) + Number(item.adCost) + Number(item.businessManagementCost) + Number(item.tax) + Number(item.otherCost)

          if (Number(item.totalCost) !== total) {
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
              interface: 'mallCostList',
              data: {
                mallCode: this.$route.query.mallCode,
                pageNumber: this.pageNumber,
                pageSize: this.pageSize
              }
          }).then(res => {
              if (res.result.success == '1') {
                if (res.result.result.length) {
                  res.result.result.forEach((item) => {
                    item.rangeDate = [item.beginDate, item.endDate]
                  })
                }

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
          })
        },
        deleteBase (barrieData, index) {
          if (!barrieData.id) {
            this.barrieList.splice(index, 1)
          } else {
            util.request({
                method: 'get',
                interface: 'mallCostDelete',
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

            var interfaceName = 'mallCostSave'

            if (barrieData.id) {
              interfaceName = 'mallCostUpdate'
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