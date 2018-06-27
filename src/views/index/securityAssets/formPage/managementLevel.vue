<template>
    <section class="float-form-box">
        <div class="formDiscount">
          <section class="formBox">
              <span>名称</span>
              <el-input
                class="input-box"
                placeholder="请输入内容， 最多16个字"
                :maxlength="16"
                v-model="barrieData.fundLevelName">
              </el-input>
          </section>
          <section class="formBox">
              <span>比例(%)</span>
              <my-el-input  class="input-box"
                                type="float"
                                :max="100"
                                v-model="barrieData.fundLevelRatio"></my-el-input>
          </section>
          <section class="formBox">
              <span>编码</span>
              <el-input
                class="input-box"
                placeholder="请输入内容"
                v-model="barrieData.fundLevelStockId">
              </el-input>
          </section>
          <section class="formBox">
              <span>发行规模(元)</span>
              <my-el-input  class="input-box"
                                type="float"
                                v-model="barrieData.fundLevelMoney"></my-el-input>
          </section>
          <section class="formBox">
              <span>最低利率</span>
              <my-el-input  class="input-box"
                                type="float"
                                v-model="barrieData.fundLevelInterestMinRate"></my-el-input>
          </section>
          <section class="formBox">
              <span>最高利率</span>
              <my-el-input  class="input-box"
                                type="float"
                                v-model="barrieData.fundLevelInterestMaxRate"></my-el-input>
          </section>
          <section class="formBox">
              <span>类型</span>
              <el-select
                class="input-box"
                v-model="barrieData.fundLevelType"
                filterable
                placeholder="请选择">
                <el-option
                        :label="'无'"
                        :value="''">
                </el-option>
                <el-option
                  v-for="(item, index) in dictionary.fund_level_type"
                  :key="index"
                  :label="item.typeName"
                  :value="item.id">
                </el-option>
              </el-select>
          </section>
          <section class="formBox">
              <span>还本方式</span>
              <el-select
                class="input-box"
                v-model="barrieData.fundLevelRepaymentType"
                filterable
                placeholder="请选择">
                <el-option
                        :label="'无'"
                        :value="''">
                </el-option>
                <el-option
                  v-for="(item, index) in dictionary.fund_level_repayment_type"
                  :key="index"
                  :label="item.typeName"
                  :value="item.id">
                </el-option>
              </el-select>
          </section>
          <section class="formBox">
              <span>期限</span>
              <my-el-input  class="input-box"
                                type="float"
                                v-model="barrieData.fundLevelRepaymentDuration"></my-el-input>
          </section>
          <section class="formBox">
              <span>评级</span>
              <el-select
                class="input-box"
                v-model="barrieData.fundLevelRating"
                filterable
                placeholder="请选择">
                <el-option
                        :label="'无'"
                        :value="''">
                </el-option>
                <el-option
                  v-for="(item, index) in dictionary.fund_level_rating"
                  :key="index"
                  :label="item.typeName"
                  :value="item.id">
                </el-option>
              </el-select>
          </section>
          <section class="formBox bigF">
            <span>备注</span>
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容,最140个字"
              :maxlength="140"
              v-model="barrieData.fundLevelDesc">
            </el-input>
            <div class="limit-box">剩余<a>{{140 - barrieData.fundLevelDesc.length}}</a>字</div>
          </section> 
        </div>
        
        <div class="clear"></div>
        <el-button v-if="isEdit" class="save-btn" type="info" :plain="true" size="small" icon="document"
            @click="saveBase">保存</el-button>
        <div class="clear"></div>
      </section>
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
              assetManagementProductCode: '',
              fundLevelName: '',
              fundLevelRatio: '',
              fundLevelStockId: '',
              fundLevelMoney: '',
              fundLevelInterestMinRate: '',
              fundLevelInterestMaxRate: '',
              fundLevelType: '',
              fundLevelRepaymentType: '',
              fundLevelRepaymentDuration: '',
              fundLevelRating: '',
              fundLevelDesc: ''
            },
            pageNumber: 1,
            pageSize: 3,
            total: 0
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
            this.barrieData.assetManagementProductCode = this.$route.query.assetManagementProductCode
            return false
          }

          util.request({
              method: 'get',
              interface: 'assetManagementProductLevelInfo',
              data: {
                assetManagementProductCode: this.$route.query.assetManagementProductCode,
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
            if (this.barrieData.fundLevelName.trim() === '') {
                this.$message({
                    message: '请填写分层名称！',
                    type: 'warning'
                })
                return false
            }

            if (!this.barrieData.fundLevelRatio) {
                this.$message({
                    message: '请填写分层比例！',
                    type: 'warning'
                })
                return false
            }

            var interfaceName = 'assetManagementProductLevelSave'

            if (this.barrieData.fundLevelCode) {
              interfaceName = 'assetManagementProductLevelUpdate'
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
                      name: 'form-management',
                      query: {
                        assetManagementProductCode: this.$route.query.assetManagementProductCode,
                        type: 'managementLevel',
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