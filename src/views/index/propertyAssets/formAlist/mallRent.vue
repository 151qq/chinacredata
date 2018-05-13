<template>
    <section class="form-small-box">
      <div class="add-btn">
        <span>
          率(%)&nbsp;&nbsp;租金(元 ㎡/天)
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
                              v-model="item.rangeDate"
                              type="daterange"
                              placeholder="选择租期">
              </el-date-picker>
          </section>
          <section class="formBox">
              <span>楼层</span>
              <el-input-number  class="input-box"
                                size="small"
                                :min="0"
                                :step="1"
                                v-model="item.floorLevel"></el-input-number>
          </section>
          <section class="formBox">
              <span>楼层位置</span>
              <el-input
                class="input-box"
                placeholder="请输入内容"
                v-model="item.floorZone">
              </el-input>
          </section>
          <section class="formBox">
              <span>平均租金</span>
              <el-input-number  class="input-box"
                                size="small"
                                :min="0"
                                :step="1"
                                v-model="item.rentAve"></el-input-number>
          </section>
          <section class="formBox">
              <span>空置率</span>
              <el-input-number  class="input-box"
                                size="small"
                                :min="0"
                                :max="100"
                                :step="1"
                                v-model="item.vacancyAve"></el-input-number>
          </section>
          <section class="formBox">
              <span>时租停车费</span>
              <el-input-number  class="input-box"
                                size="small"
                                :min="0"
                                :step="1"
                                v-model="item.parkingHourFee"></el-input-number>
          </section>
          <section class="formBox">
              <span>月租停车费</span>
              <el-input-number  class="input-box"
                                size="small"
                                :min="0"
                                :step="1"
                                v-model="item.parkingMonthFee"></el-input-number>
          </section>
          <!-- <section class="formBox">
              <span>记录人</span>
              <el-input
                class="input-box"
                placeholder="请输入内容"
                v-model="item.recorder">
              </el-input>
          </section> -->
          <section class="formBox bigF">
            <span>停车费说明</span>
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容,最140个字"
              :maxlength="500"
              v-model="item.parkingFeeDesc">
            </el-input>
            <div class="limit-box">剩余<a>{{500 - item.parkingFeeDesc.length}}</a>字</div>
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
            暂无内容
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
        getList () {
          util.request({
              method: 'get',
              interface: 'mallRentHistoryList',
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
            rangeDate: [],
            beginDate: '',
            endDate: '',
            floorLevel: '',
            floorZone: '',
            rentAve: '',
            vacancyAve: '',
            parkingHourFee: '',
            parkingMonthFee: '',
            parkingFeeDesc: ''
          })
        },
        deleteBase (barrieData, index) {
          if (!barrieData.id) {
            this.barrieList.splice(index, 1)
          } else {
            util.request({
                method: 'get',
                interface: 'mallRentHistoryDelete',
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

            var interfaceName = 'mallRentHistorySave'

            if (barrieData.id) {
              interfaceName = 'mallRentHistoryUpdate'
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