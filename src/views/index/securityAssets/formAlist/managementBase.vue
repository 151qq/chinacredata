<template>
    <section>
      <div class="formDiscount">
          <section class="formBox">
              <span>产品名称</span>
              <el-input
                class="input-box"
                placeholder="请输入内容"
                v-model="base.assetManagementProductName">
              </el-input>
          </section>
          <section class="formBox">
              <span>产品简称</span>
              <el-input
                class="input-box"
                placeholder="请输入内容"
                v-model="base.assetManagementProductShortName">
              </el-input>
          </section>
          <section class="formBox">
              <span>产品编码</span>
              <el-input
                class="input-box"
                placeholder="请输入内容"
                v-model="base.assetManagementProductId">
              </el-input>
          </section>
          <!-- <section class="formBox">
              <span>产品状态</span>
              <el-input
                class="input-box"
                placeholder="请输入内容"
                v-model="base.assetManagementProductStatus">
              </el-input>
          </section> -->
          <section class="formBox">
              <span>总金额(元)</span>
              <my-el-input  class="input-box"
                                type="float"
                                v-model="base.totalMoney"></my-el-input>
          </section>
          <section class="formBox">
              <span>无异议时间</span>
              <el-date-picker class="input-box"
                              v-model="base.noObjectionDate"
                              type="date"
                              placeholder="选择日期">
              </el-date-picker>
          </section>
          <section class="formBox">
              <span>基金备案时间</span>
              <el-date-picker class="input-box"
                              v-model="base.fundRegisteDate"
                              type="date"
                              placeholder="选择日期">
              </el-date-picker>
          </section>
          <section class="formBox">
              <span>成立时间</span>
              <el-date-picker class="input-box"
                              v-model="base.createdDate"
                              type="date"
                              placeholder="选择日期">
              </el-date-picker>
          </section>
          <section class="formBox">
              <span>产品生效时间</span>
              <el-date-picker class="input-box"
                              v-model="base.fundBeginDate"
                              type="date"
                              placeholder="选择日期">
              </el-date-picker>
          </section>
          <section class="formBox">
              <span>产品失效时间</span>
              <el-date-picker class="input-box"
                              v-model="base.fundEndDate"
                              type="date"
                              placeholder="选择日期">
              </el-date-picker>
          </section>
          <section class="formBox">
              <span>计划管理人</span>
              <search-input class="input-box"
                              :search-data="base"
                              :fetch-suggestions="getEnterpriseList"
                              :m-code="'assetManagementPlanManager'"
                              :m-name="'assetManagementPlanManagerName'"
                              :s-code="'enterpriseCode'"
                              :s-name="'enterpriseNameReg'"></search-input>
          </section>
          <section class="formBox">
              <span>托管机构</span>
              <search-input class="input-box"
                              :search-data="base"
                              :fetch-suggestions="getEnterpriseList"
                              :m-code="'fundTrusteeship'"
                              :m-name="'fundTrusteeshipName'"
                              :s-code="'enterpriseCode'"
                              :s-name="'enterpriseNameReg'"></search-input>
          </section>
          <section class="formBox">
              <span>资产服务机构</span>
              <search-input class="input-box"
                              :search-data="base"
                              :fetch-suggestions="getEnterpriseList"
                              :m-code="'assetServiceUnit'"
                              :m-name="'assetServiceUnitName'"
                              :s-code="'enterpriseCode'"
                              :s-name="'enterpriseNameReg'"></search-input>
          </section>
          <section class="formBox">
              <span>会计事务所</span>
              <search-input class="input-box"
                              :search-data="base"
                              :fetch-suggestions="getEnterpriseList"
                              :m-code="'accountingFirm'"
                              :m-name="'accountingFirmName'"
                              :s-code="'enterpriseCode'"
                              :s-name="'enterpriseNameReg'"></search-input>
          </section>
          <section class="formBox">
              <span>律师事务所</span>
              <search-input class="input-box"
                              :search-data="base"
                              :fetch-suggestions="getEnterpriseList"
                              :m-code="'lawFirm'"
                              :m-name="'lawFirmName'"
                              :s-code="'enterpriseCode'"
                              :s-name="'enterpriseNameReg'"></search-input>
          </section>
          <section class="formBox">
              <span>监管银行</span>
              <search-input class="input-box"
                              :search-data="base"
                              :fetch-suggestions="getEnterpriseList"
                              :m-code="'trusteeBank'"
                              :m-name="'trusteeBankName'"
                              :s-code="'enterpriseCode'"
                              :s-name="'enterpriseNameReg'"></search-input>
          </section>
          <section class="formBox">
              <span>财务顾问</span>
              <search-input class="input-box"
                              :search-data="base"
                              :fetch-suggestions="getEnterpriseList"
                              :m-code="'financialAdvisor'"
                              :m-name="'financialAdvisorName'"
                              :s-code="'enterpriseCode'"
                              :s-name="'enterpriseNameReg'"></search-input>
          </section>
          <section class="formBox">
              <span>项目安排人</span>
              <search-input class="input-box"
                              :search-data="base"
                              :fetch-suggestions="getEnterpriseList"
                              :m-code="'projectManager'"
                              :m-name="'projectManagerName'"
                              :s-code="'enterpriseCode'"
                              :s-name="'enterpriseNameReg'"></search-input>
          </section>
          <section class="formBox">
              <span>主承销商</span>
              <search-input class="input-box"
                              :search-data="base"
                              :fetch-suggestions="getEnterpriseList"
                              :m-code="'mainUnderwriter'"
                              :m-name="'mainUnderwriterName'"
                              :s-code="'enterpriseCode'"
                              :s-name="'enterpriseNameReg'"></search-input>
          </section>
          <section class="formBox">
              <span>评估机构一</span>
              <search-input class="input-box"
                              :search-data="base"
                              :fetch-suggestions="getEnterpriseList"
                              :m-code="'evaluationAgency1'"
                              :m-name="'evaluationAgency1Name'"
                              :s-code="'enterpriseCode'"
                              :s-name="'enterpriseNameReg'"></search-input>
          </section>
          <section class="formBox">
              <span>评估机构二</span>
              <search-input class="input-box"
                              :search-data="base"
                              :fetch-suggestions="getEnterpriseList"
                              :m-code="'evaluationAgency2'"
                              :m-name="'evaluationAgency2Name'"
                              :s-code="'enterpriseCode'"
                              :s-name="'enterpriseNameReg'"></search-input>
          </section>
          <section class="formBox">
              <span>评估机构三</span>
              <search-input class="input-box"
                              :search-data="base"
                              :fetch-suggestions="getEnterpriseList"
                              :m-code="'evaluaitonAgency3'"
                              :m-name="'evaluaitonAgency3Name'"
                              :s-code="'enterpriseCode'"
                              :s-name="'enterpriseNameReg'"></search-input>
          </section>
          <section class="formBox">
              <span>评估机构四</span>
              <search-input class="input-box"
                              :search-data="base"
                              :fetch-suggestions="getEnterpriseList"
                              :m-code="'evaluaitonAgency4'"
                              :m-name="'evaluaitonAgency4Name'"
                              :s-code="'enterpriseCode'"
                              :s-name="'enterpriseNameReg'"></search-input>
          </section>
          <section class="formBox">
              <span>评估机构五</span>
              <search-input class="input-box"
                              :search-data="base"
                              :fetch-suggestions="getEnterpriseList"
                              :m-code="'evaluationAgency5'"
                              :m-name="'evaluationAgency5Name'"
                              :s-code="'enterpriseCode'"
                              :s-name="'enterpriseNameReg'"></search-input>
          </section>
          <section class="formBox">
              <span>审计机构</span>
              <search-input class="input-box"
                              :search-data="base"
                              :fetch-suggestions="getEnterpriseList"
                              :m-code="'auditAgency'"
                              :m-name="'auditAgencyName'"
                              :s-code="'enterpriseCode'"
                              :s-name="'enterpriseNameReg'"></search-input>
          </section>
          <section class="formBox">
              <span>基金管理人</span>
              <search-input class="input-box"
                              :search-data="base"
                              :fetch-suggestions="getEnterpriseList"
                              :m-code="'fundManager'"
                              :m-name="'fundManagerName'"
                              :s-code="'enterpriseCode'"
                              :s-name="'enterpriseNameReg'"></search-input>
          </section>
          <section class="formBox">
              <span>验资机构</span>
              <search-input class="input-box"
                              :search-data="base"
                              :fetch-suggestions="getEnterpriseList"
                              :m-code="'captialVerificaitonUnit'"
                              :m-name="'captialVerificaitonUnitName'"
                              :s-code="'enterpriseCode'"
                              :s-name="'enterpriseNameReg'"></search-input>
          </section>
          <section class="formBox">
              <span>评级机构一</span>
              <search-input class="input-box"
                              :search-data="base"
                              :fetch-suggestions="getEnterpriseList"
                              :m-code="'ratingAgency1'"
                              :m-name="'ratingAgency1Name'"
                              :s-code="'enterpriseCode'"
                              :s-name="'enterpriseNameReg'"></search-input>
          </section>
          <section class="formBox">
              <span>评级机构二</span>
              <search-input class="input-box"
                              :search-data="base"
                              :fetch-suggestions="getEnterpriseList"
                              :m-code="'ratingAgency2'"
                              :m-name="'ratingAgency2Name'"
                              :s-code="'enterpriseCode'"
                              :s-name="'enterpriseNameReg'"></search-input>
          </section>
          <section class="formBox">
              <span>评级机构三</span>
              <search-input class="input-box"
                              :search-data="base"
                              :fetch-suggestions="getEnterpriseList"
                              :m-code="'ratingAgency3'"
                              :m-name="'ratingAgency3Name'"
                              :s-code="'enterpriseCode'"
                              :s-name="'enterpriseNameReg'"></search-input>
          </section>
          <section class="formBox">
              <span>评级机构四</span>
              <search-input class="input-box"
                              :search-data="base"
                              :fetch-suggestions="getEnterpriseList"
                              :m-code="'ratingAgency4'"
                              :m-name="'ratingAgency4Name'"
                              :s-code="'enterpriseCode'"
                              :s-name="'enterpriseNameReg'"></search-input>
          </section>
          <section class="formBox">
              <span>评级机构五</span>
              <search-input class="input-box"
                              :search-data="base"
                              :fetch-suggestions="getEnterpriseList"
                              :m-code="'ratingAgency5'"
                              :m-name="'ratingAgency5Name'"
                              :s-code="'enterpriseCode'"
                              :s-name="'enterpriseNameReg'"></search-input>
          </section>
          <section class="formBox">
              <span>现金预测机构一</span>
              <search-input class="input-box"
                              :search-data="base"
                              :fetch-suggestions="getEnterpriseList"
                              :m-code="'cashFlowForcaster1'"
                              :m-name="'cashFlowForcaster1Name'"
                              :s-code="'enterpriseCode'"
                              :s-name="'enterpriseNameReg'"></search-input>
          </section>
          <section class="formBox">
              <span>现金预测机构二</span>
              <search-input class="input-box"
                              :search-data="base"
                              :fetch-suggestions="getEnterpriseList"
                              :m-code="'cashFlowForcaster2'"
                              :m-name="'cashFlowForcaster2Name'"
                              :s-code="'enterpriseCode'"
                              :s-name="'enterpriseNameReg'"></search-input>
          </section>
          <section class="formBox">
              <span>现金预测机构三</span>
              <search-input class="input-box"
                              :search-data="base"
                              :fetch-suggestions="getEnterpriseList"
                              :m-code="'cashFlowForcaster3'"
                              :m-name="'cashFlowForcaster3Name'"
                              :s-code="'enterpriseCode'"
                              :s-name="'enterpriseNameReg'"></search-input>
          </section>
          <section class="formBox">
              <span>现金预测机构四</span>
              <search-input class="input-box"
                              :search-data="base"
                              :fetch-suggestions="getEnterpriseList"
                              :m-code="'cashFlowForcaster4'"
                              :m-name="'cashFlowForcaster4Name'"
                              :s-code="'enterpriseCode'"
                              :s-name="'enterpriseNameReg'"></search-input>
          </section>
          <section class="formBox">
              <span>现金预测机构五</span>
              <search-input class="input-box"
                              :search-data="base"
                              :fetch-suggestions="getEnterpriseList"
                              :m-code="'cashFlowForcaster5'"
                              :m-name="'cashFlowForcaster5Name'"
                              :s-code="'enterpriseCode'"
                              :s-name="'enterpriseNameReg'"></search-input>
          </section>
          <section class="formBox">
              <span>信托管理人</span>
              <search-input class="input-box"
                              :search-data="base"
                              :fetch-suggestions="getEnterpriseList"
                              :m-code="'trustManager'"
                              :m-name="'trustManagerName'"
                              :s-code="'enterpriseCode'"
                              :s-name="'enterpriseNameReg'"></search-input>
          </section>
          <section class="formBox">
              <span>优先收购权</span>
              <search-input class="input-box"
                              :search-data="base"
                              :fetch-suggestions="getEnterpriseList"
                              :m-code="'priorityAcquisitionUnit'"
                              :m-name="'priorityAcquisitionUnitName'"
                              :s-code="'enterpriseCode'"
                              :s-name="'enterpriseNameReg'"></search-input>
          </section>
          <section class="formBox">
              <span>挂牌转让时间</span>
              <el-date-picker class="input-box"
                              v-model="base.listedDate"
                              type="date"
                              placeholder="选择日期">
              </el-date-picker>
          </section>
          <section class="formBox">
              <span>原实际控制人</span>
              <search-input class="input-box"
                              :search-data="base"
                              :fetch-suggestions="getEnterpriseList"
                              :m-code="'originController'"
                              :m-name="'originControllerName'"
                              :s-code="'enterpriseCode'"
                              :s-name="'enterpriseNameReg'"></search-input>
          </section>
          <section class="formBox bigF">
              <span>产品描述</span>
              <el-input
                type="textarea"
                :rows="4"
                :maxlength="500"
                placeholder="请输入内容"
                v-model="base.assetManagementProductDesc">
              </el-input>
              <div class="limit-box">剩余<a>{{500 - base.assetManagementProductDesc.length}}</a>字</div>
          </section>
          <section class="formBox">
            <span>产品封面</span>
            <div class="input-box">
              <upload :path="base.assetManagementProductCover"
                      :id-name="'assetManagementProductCover'"
                      :bg-path="false"
                      :is-operate="isEdit"
                      @changeImg="changeImgCover"></upload>
            </div>
          </section>
          <section class="formBox">
            <span>产品结构图</span>
            <div class="input-box">
              <upload :path="base.assetManagementProductChart"
                      :id-name="'assetManagementProductChart'"
                      :bg-path="false"
                      :is-operate="isEdit"
                      @changeImg="changeImgChart"></upload>
            </div>
          </section>
          <div class="clear"></div>
      </div>
      <el-button class="save-btn" type="info" :plain="true" size="small" icon="document"
            v-if="isEdit"
            @click="saveBase">保存</el-button>
      <div class="clear"></div>
    </section>
    
</template>
<script>
import util from '../../../../assets/common/util'
import searchInput from '../../../../components/common/search-input'
import upload from '../../../../components/common/upload'
import { mapGetters } from 'vuex'
export default {
    props: ['enterpriseList', 'dictionary'],
    data () {
        return {
            base: {
              assetManagementProductDesc: ''
            }
        }
    },
    mounted () {
      this.getBase()
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
        getEnterpriseList (queryString, cb) {
          if (!this.requestNum) {
            this.requestNum = 1
          } else {
            this.requestNum++
          }
          
          var requestNum = this.requestNum

          var formData = {
            keyName: queryString,
            status: '0',
            pageNumber: 1,
            pageSize: 20
          }

          util.request({
              method: 'get',
              interface: 'enterpriseListByKeyname',
              data: formData
          }).then(res => {
              if (res.result.success == '1') {
                  if (requestNum == this.requestNum) {
                    if (res.result.result.length) {
                      cb(res.result.result)
                    }
                  }
              } else {
                  this.$message.error(res.result.message)
              }
          })       
        },
        changeImgCover (data) {
          this.base.assetManagementProductCover = data.url
        },
        changeImgChart (data) {
          this.base.assetManagementProductChart = data.url
        },
        getBase () {
          util.request({
              method: 'get',
              interface: 'assetManagementProductInfo',
              data: {
                assetManagementProductCode: this.$route.query.assetManagementProductCode
              }
          }).then(res => {
              if (res.result.success == '1') {
                this.base = res.result.result
                this.$emit('change', res.result.result)
              } else {
                this.$message.error(res.result.message)
              }
          })
        },
        saveBase () {
          if (!this.base.assetManagementProductName) {
              this.$message({
                  message: '请填产品名称！',
                  type: 'warning'
              })
              return false
          }

          if (!this.base.assetManagementProductShortName) {
              this.$message({
                  message: '请填写产品简称！',
                  type: 'warning'
              })
              return false
          }

          if (!this.base.assetManagementProductId) {
              this.$message({
                  message: '请填写产品编码！',
                  type: 'warning'
              })
              return false
          }


          if (!this.base.assetManagementProductCover) {
              this.$message({
                  message: '请添加产品照片！',
                  type: 'warning'
              })
              return false
          }

          // 验证多机构不能重复
          var ratingAgencyMap = {
            ratingAgency1: this.base.ratingAgency1,
            ratingAgency2: this.base.ratingAgency2,
            ratingAgency3: this.base.ratingAgency3,
            ratingAgency4: this.base.ratingAgency4,
            ratingAgency5: this.base.ratingAgency5,
          }

          if (!this.checkMutKey(this.base, ratingAgencyMap)) {
            this.$message({
                message: '评级机构不能重复！',
                type: 'warning'
            })
            return false
          }

          var evaluationAgencyMap = {
            evaluationAgency1: this.base.evaluationAgency1,
            evaluationAgency2: this.base.evaluationAgency2,
            evaluaitonAgency3: this.base.evaluaitonAgency3,
            evaluaitonAgency4: this.base.evaluaitonAgency4,
            evaluationAgency5: this.base.evaluationAgency5,
          }

          if (!this.checkMutKey(this.base, evaluationAgencyMap)) {
            this.$message({
                message: '评估机构不能重复！',
                type: 'warning'
            })
            return false
          }

          var cashFlowForcasterMap = {
            cashFlowForcaster1: this.base.cashFlowForcaster1,
            cashFlowForcaster2: this.base.cashFlowForcaster2,
            cashFlowForcaster3: this.base.cashFlowForcaster3,
            cashFlowForcaster4: this.base.cashFlowForcaster4,
            cashFlowForcaster5: this.base.cashFlowForcaster5,
          }

          if (!this.checkMutKey(this.base, cashFlowForcasterMap)) {
            this.$message({
                message: '现金预测机构不能重复！',
                type: 'warning'
            })
            return false
          }

          if (this.base.noObjectionDate) {
            this.base.noObjectionDate = new Date(this.base.noObjectionDate)
          }

          if (this.base.fundRegisteDate) {
            this.base.fundRegisteDate = new Date(this.base.fundRegisteDate)
          }

          if (this.base.createdDate) {
            this.base.createdDate = new Date(this.base.createdDate)
          }

          if (this.base.fundBeginDate) {
            this.base.fundBeginDate = new Date(this.base.fundBeginDate)
          }

          if (this.base.fundEndDate) {
            this.base.fundEndDate = new Date(this.base.fundEndDate)
          }

          if (this.base.listedDate) {
            this.base.listedDate = new Date(this.base.listedDate)
          }

          util.request({
              method: 'post',
              interface: 'assetManagementProductInfoUpdate',
              data: this.base
          }).then(res => {
              if (res.result.success == '1') {
                this.$message({
                    message: '恭喜你，保存成功！',
                    type: 'success'
                })
                this.getBase()
                this.$emit('incomeChange')
              } else {
                this.$message.error(res.result.message)
              }
          })
        },
        // 多个字段不能重复
        checkMutKey (data, obj) {
          var valueList = []
          var keyMap = {}
          var mapLen = 0
          var result = true
          for (var key in obj) {
            if (data[key]) {
              valueList.push(data[key])
              keyMap[data[key]] = null
            }
          }

          for (var key in keyMap) {
            mapLen++
          }

          if (mapLen && mapLen != valueList.length) {
            result = false
          }

          return result
        }
    },
    components: {
      searchInput,
      upload
    }
}
</script>
<style lang="scss">
.product-base-box {
  overflow: hidden;

  .form-box {
    overflow: hidden;
  }
}
</style>