<template>
    <section class="form-small-box">
      <div></div>
      <section class="inForm inTwoForm" v-if="itemInfo && itemInfo.totalProfitList">
        <div class="formDiscount">
          <section class="formBox">
              <span>预测现金流</span>
              <el-input  class="input-box"
                                size="small"
                                v-my-float="itemInfo.productCashFlow.forcastCashFlow"></el-input>
          </section>
          <section class="formBox">
              <span>真实现金流</span>
              <el-input  class="input-box"
                                size="small"
                                v-my-float="itemInfo.productCashFlow.realCashFlow"></el-input>
          </section>
          <div class="clear"></div>
          <template v-for="(level, index) in itemInfo.totalProfitList">
            <section class="formBox">
                <span>{{level.fundLevelName}}回报率(预测)</span>
                <el-input  class="input-box"
                                  type="number"
                                  size="small"
                                  :step="0.01"
                                  v-model="level.fundForcastProfit"></el-input>
            </section>
            <section class="formBox">
                <span>{{level.fundLevelName}}回报率(实际)</span>
                <el-input  class="input-box"
                                  type="number"
                                  size="small"
                                  :step="0.01"
                                  v-model="level.fundRealProfit"></el-input>
            </section>
            <div class="clear"></div>
          </template>
          <!-- <section class="formBox bigF">
            <span>备注</span>
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容,最140个字"
              :maxlength="140"
              v-model="item.memo">
            </el-input>
            <div class="limit-box">剩余<a>{{140 - item.memo.length}}</a>字</div>
          </section>  -->
        </div>
        <el-button v-if="isEdit" class="save-btn" type="info" :plain="true" size="small" icon="document"
            @click="saveBase(itemInfo)">保存</el-button>
        <div class="clear"></div>
      </section>
      <section class="inForm inTwoForm" v-for="(item, index) in barrieList" :key="index">
        <div class="formDiscount">
          <section class="item-title">
            物业：{{item.assetCashFlow.assetName}}
          </section>
          <div class="clear"></div>
          <section class="formBox">
              <span>预测现金流</span>
              <el-input  class="input-box"
                                type="number"
                                  size="small"
                                  :step="0.01"
                                v-model="item.assetCashFlow.forcastCashFlow"></el-input>
          </section>
          <section class="formBox">
              <span>真实现金流</span>
              <div class="input-btn-box">
                <el-input  class="input-b"
                                type="number"
                                  size="small"
                                  :step="0.01"
                                v-model="item.assetCashFlow.realCashFlow"></el-input>

                <el-button class="input-btn"
                              type="primary"
                              size="small"
                              :disabled="!item.assetCashFlow.realCashFlow"
                              @click="checkMessage(item.assetCashFlow)">校验</el-button>
              </div>
              
          </section>
          <div class="clear"></div>
          <template v-for="(level, index) in item.assetProfitList">
            <section class="formBox">
                <span>{{level.fundLevelName}}回报率(预测)</span>
                <el-input  class="input-box"
                                  type="number"
                                  size="small"
                                  :step="0.01"
                                  v-model="level.fundYearForcastProfit"></el-input>
            </section>
            <section class="formBox">
                <span>{{level.fundLevelName}}回报率(实际)</span>
                <el-input  class="input-box"
                                  type="number"
                                  size="small"
                                  :step="0.01"
                                  v-model="level.fundYearRealProfit"></el-input>
            </section>
            <div class="clear"></div>
          </template>
          <!-- <section class="formBox bigF">
            <span>备注</span>
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容,最140个字"
              :maxlength="140"
              v-model="item.memo">
            </el-input>
            <div class="limit-box">剩余<a>{{140 - item.memo.length}}</a>字</div>
          </section>  -->
        </div>
        <el-button v-if="isEdit" class="save-btn" type="info" :plain="true" size="small" icon="document"
            @click="saveAssets(item)">保存</el-button>
        <div class="clear"></div>
      </section>

      <div v-if="!barrieList.length" class="null-page">
            暂无数据
      </div>
    </section>
</template>
<script>
import util from '../../../../assets/common/util'
export default {
    props: ['isEdit', 'year'],
    data () {
        return {
            barrieList: [],
            itemInfo: {},
            pageNumber: 1,
            pageSize: 3,
            total: 0
        }
    },
    methods: {
        getFloat (data, key) {
          var value = this[data][key]
          if (/[^0-9 | .]*/.test(value)) {
              value = value.replace(/[^0-9 | .]*/g, '')
          }

          var index = value.indexOf('.')

          if (index === 0) {
              value = ''
          }

          if (value.split('.').length > 2) {
              value = value.split('.')[0]
          }

          if (index > 0) {
              value = value.substring(0, index + 3)
          }
          setTimeout(() => {
            this[data][key] = value
          }, 0)
        },
        checkMessage (item) {
          util.request({
              method: 'post',
              interface: 'validateAssetProfit',
              data: {
                assetManagementProductCode: this.$route.query.assetManagementProductCode,
                paybackDate: this.year,
                fundAssetCode: item.assetCode
              }
          }).then(res => {
              if (res.result.success == '1') {
                this.barrieList = res.result.result.length ? res.result.result : []
              } else {
                this.$message.error(res.result.message)
              }
          })
        },
        getList () {
          util.request({
              method: 'get',
              interface: 'assetProductLevelYearProfitList',
              data: {
                assetManagementProductCode: this.$route.query.assetManagementProductCode,
                paybackDate: this.year
              }
          }).then(res => {
              if (res.result.success == '1') {
                this.barrieList = res.result.result.length ? res.result.result : []
              } else {
                this.$message.error(res.result.message)
              }
          })
        },
        getInfo () {
          util.request({
              method: 'get',
              interface: 'poroductCashFlowInfo',
              data: {
                assetManagementProductCode: this.$route.query.assetManagementProductCode,
                paybackDate: this.year
              }
          }).then(res => {
              if (res.result.success == '1') {
                this.itemInfo = res.result.result
              } else {
                this.$message.error(res.result.message)
              }
          })
        },
        saveBase (barrieData) {            
            util.request({
                method: 'post',
                interface: 'assetProductLevelYearProfitUpdate',
                data: {
                  levelList: barrieData
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.$message({
                      type: 'success',
                      message: '保存成功!'
                    })

                    this.getInfo()
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        saveAssets (barrieData) {            
            util.request({
                method: 'post',
                interface: 'updateAssetProfitList',
                data: {
                  levelList: barrieData
                }
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