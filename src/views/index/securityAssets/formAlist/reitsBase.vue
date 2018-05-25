<template>
    <section>
      <div class="formDiscount">
          <section class="formBox">
              <span>产品名称</span>
              <el-input
                class="input-box"
                placeholder="请输入内容"
                v-model="base.foreignReitsName">
              </el-input>
          </section>
          <section class="formBox">
              <span>产品编码</span>
              <el-input
                class="input-box"
                placeholder="请输入内容"
                v-model="base.foreignReitsId">
              </el-input>
          </section>
          <!-- <section class="formBox">
              <span>产品状态</span>
              <el-input
                class="input-box"
                placeholder="请输入内容"
                v-model="base.stockStatus">
              </el-input>
          </section> -->
          <section class="formBox">
              <span>上市时间</span>
              <el-date-picker class="input-box"
                              v-model="base.listedDate"
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
              <span>发行价格(万元)</span>
              <el-input  class="input-box"
                                size="small"
                                v-my-float="base.issuePrice"></el-input>
          </section>
          <section class="formBox">
              <span>发行股份数</span>
              <el-input  class="input-box"
                                size="small"
                                v-my-integer="base.fundShares"></el-input>
          </section>
          <section class="formBox">
              <span>相关链接</span>
              <el-input
                class="input-box"
                placeholder="请输入内容"
                v-model="base.foreignReitsWeb">
              </el-input>
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
              <span>评级机构一</span>
              <search-input class="input-box"
                              :search-data="base"
                              :fetch-suggestions="getEnterpriseList"
                              :m-code="'evaluationAgency1'"
                              :m-name="'evaluationAgency1Name'"
                              :s-code="'enterpriseCode'"
                              :s-name="'enterpriseNameReg'"></search-input>
          </section>
          <section class="formBox">
              <span>评级机构二</span>
              <search-input class="input-box"
                              :search-data="base"
                              :fetch-suggestions="getEnterpriseList"
                              :m-code="'evaluationAgency2'"
                              :m-name="'evaluationAgency2Name'"
                              :s-code="'enterpriseCode'"
                              :s-name="'enterpriseNameReg'"></search-input>
          </section>
          <section class="formBox">
              <span>评级机构三</span>
              <search-input class="input-box"
                              :search-data="base"
                              :fetch-suggestions="getEnterpriseList"
                              :m-code="'evaluationAgency3'"
                              :m-name="'evaluationAgency3Name'"
                              :s-code="'enterpriseCode'"
                              :s-name="'enterpriseNameReg'"></search-input>
          </section>
          <section class="formBox">
              <span>评级机构四</span>
              <search-input class="input-box"
                              :search-data="base"
                              :fetch-suggestions="getEnterpriseList"
                              :m-code="'evaluationAgency4'"
                              :m-name="'evaluationAgency4Name'"
                              :s-code="'enterpriseCode'"
                              :s-name="'enterpriseNameReg'"></search-input>
          </section>
          <section class="formBox">
              <span>评级机构五</span>
              <search-input class="input-box"
                              :search-data="base"
                              :fetch-suggestions="getEnterpriseList"
                              :m-code="'evaluationAgency5'"
                              :m-name="'evaluationAgency5Name'"
                              :s-code="'enterpriseCode'"
                              :s-name="'enterpriseNameReg'"></search-input>
          </section>
          <section class="formBox">
              <span>物业持有人</span>
              <search-input class="input-box"
                              :search-data="base"
                              :fetch-suggestions="getEnterpriseList"
                              :m-code="'propertyFundOwner'"
                              :m-name="'propertyFundOwnerName'"
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
                v-model="base.foreignReitsDesc">
              </el-input>
              <div class="limit-box">剩余<a>{{500 - base.foreignReitsDesc.length}}</a>字</div>
          </section>
          <section class="formBox">
            <span>产品封面</span>
            <div class="input-box">
              <upload :path="base.foreignReitsCover"
                      :id-name="'foreignReitsCover'"
                      :bg-path="false"
                      :is-operate="isEdit"
                      @changeImg="changeImgCover"></upload>
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
import upload from '../../../../components/common/upload'
import searchInput from '../../../../components/common/search-input'
import { mapGetters } from 'vuex'
export default {
    props: ['enterpriseList', 'dictionary'],
    data () {
        return {
            base: {
              foreignReitsDesc: ''
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
        setInteger (data, key) {
          var str = this[data][key] + ''
          if (/[^0-9]*/.test(str)) {
            str = str.replace(/[^0-9]*/g, '')
          }
          setTimeout(() => {
            this[data][key] = str
          }, 0)
        },
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
        changeImgCover () {
          this.base.foreignReitsCover = data.url
        },
        getBase () {
          util.request({
              method: 'get',
              interface: 'foreignReitsInfo',
              data: {
                foreignReitsCode: this.$route.query.foreignReitsCode
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
          if (!this.base.foreignReitsName) {
              this.$message({
                  message: '请填产品名称！',
                  type: 'warning'
              })
              return false
          }

          if (!this.base.foreignReitsId) {
              this.$message({
                  message: '请填写产品编码！',
                  type: 'warning'
              })
              return false
          }

          if (!this.base.foreignReitsCover) {
              this.$message({
                  message: '请添加产品照片！',
                  type: 'warning'
              })
              return false
          }

          if (this.base.createdDate) {
            this.base.createdDate = new Date(this.base.createdDate)
          }

          if (this.base.listedDate) {
            this.base.listedDate = new Date(this.base.listedDate)
          }

          util.request({
              method: 'post',
              interface: 'foreignReitsInfoUpdate',
              data: this.base
          }).then(res => {
              if (res.result.success == '1') {
                this.$message({
                    message: '恭喜你，保存成功！',
                    type: 'success'
                })
                this.getBase()
              } else {
                this.$message.error(res.result.message)
              }
          })
        }
    },
    components: {
      upload,
      searchInput
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