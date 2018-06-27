<template>
    <section class="form-small-box">
      <div></div>
      <section class="inForm inTwoForm" v-if="itemInfo && itemInfo.totalProfitList">
        <div class="formDiscount">
          <section class="formBox">
              <span>预测现金流(元)</span>
              <my-el-input  class="input-box"
                                type="float"
                                v-model="itemInfo.productCashFlow.forcastCashFlow"></my-el-input>
          </section>
          <section class="formBox">
              <span>真实现金流(元)</span>
              <my-el-input  class="input-box"
                                type="float"
                                v-model="itemInfo.productCashFlow.realCashFlow"></my-el-input>
          </section>
          <div class="clear"></div>
          <template v-for="(level, index) in itemInfo.totalProfitList">
            <section class="formBox">
                <span>{{level.fundLevelName}}回报率(预测)</span>
                <my-el-input  class="input-box"
                                  type="float"
                                  v-model="level.fundForcastProfit"></my-el-input>
            </section>
            <section class="formBox">
                <span>{{level.fundLevelName}}回报率(实际)</span>
                <my-el-input  class="input-box"
                                  type="float"
                                  v-model="level.fundRealProfit"></my-el-input>
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
              <span>预测现金流(元)</span>
              <my-el-input  class="input-box"
                                type="float"
                                v-model="item.assetCashFlow.forcastCashFlow"></my-el-input>
          </section>
          <section class="formBox">
              <span>真实现金流(元)</span>
              <div class="input-btn-box">
                <my-el-input  class="input-b"
                                type="float"
                                v-model="item.assetCashFlow.realCashFlow"></my-el-input>

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
                <my-el-input  class="input-box"
                                  type="float"
                                  v-model="level.fundYearForcastProfit"></my-el-input>
            </section>
            <section class="formBox">
                <span>{{level.fundLevelName}}回报率(实际)</span>
                <my-el-input  class="input-box"
                                  type="float"
                                  v-model="level.fundYearRealProfit"></my-el-input>
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
        checkMessage (item) {
          util.request({
              method: 'post',
              interface: 'validateAssetProfit',
              data: {
                assetManagementProductCode: this.$route.query.assetManagementProductCode,
                dateStart: this.year,
                fundAssetCode: item.assetCode
              }
          }).then(res => {
              if (res.result.success == '1') {
                if (res.result.result.toFixed(2) == item.realCashFlow.toFixed(2)) {
                  this.$message({
                    type: 'success',
                    message: '现金流校验成功!'
                  })
                }
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