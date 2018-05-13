<template>
    <section class="form-small-box">
      <div class="add-btn">
        <el-button type="primary" icon="plus" size="small"
                @click="addBarrier"
                v-if="isEdit">增加</el-button>
      </div>
      
      <section class="inForm" v-for="(item, index) in barrieList" :key="index">
        <div class="formDiscount">
          <section class="formBox">
              <span>名称</span>
              <el-input
                class="input-box"
                placeholder="请输入内容， 最多16个字"
                :maxlength="16"
                v-model="item.fundLevelName">
              </el-input>
          </section>
          <section class="formBox">
              <span>比例(%)</span>
              <el-input-number  class="input-box"
                                size="small"
                                :min="0"
                                :max="100"
                                :step="1"
                                v-model="item.fundLevelRatio"></el-input-number>
          </section>
          <section class="formBox">
              <span>编码</span>
              <el-input
                class="input-box"
                placeholder="请输入内容"
                v-model="item.fundLevelStockId">
              </el-input>
          </section>
          <section class="formBox">
              <span>发行规模(万元)</span>
              <el-input-number  class="input-box"
                                size="small"
                                :min="0"
                                :step="1"
                                v-model="item.fundLevelMoney"></el-input-number>
          </section>
          <section class="formBox">
              <span>最低利率</span>
              <el-input-number  class="input-box"
                                size="small"
                                :min="0"
                                :max="100"
                                :step="1"
                                v-model="item.fundLevelInterestMinRate"></el-input-number>
          </section>
          <section class="formBox">
              <span>最高利率</span>
              <el-input-number  class="input-box"
                                size="small"
                                :min="0"
                                :max="100"
                                :step="1"
                                v-model="item.fundLevelInterestMaxRate"></el-input-number>
          </section>
          <section class="formBox">
              <span>类型</span>
              <el-select
                class="input-box"
                v-model="item.fundLevelType"
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
                v-model="item.fundLevelRepaymentType"
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
              <el-input-number  class="input-box"
                                size="small"
                                :min="0"
                                :step="1"
                                v-model="item.fundLevelRepaymentDuration"></el-input-number>
          </section>
          <section class="formBox">
              <span>评级</span>
              <el-select
                class="input-box"
                v-model="item.fundLevelRating"
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
              v-model="item.fundLevelDesc">
            </el-input>
            <div class="limit-box">剩余<a>{{140 - item.fundLevelDesc.length}}</a>字</div>
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
            暂无分层
      </div>
    </section>
</template>
<script>
import util from '../../../../assets/common/util'
import { mapGetters } from 'vuex'
export default {
    props: ['base', 'dictionary'],
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
              interface: 'assetManagementProductLevelList',
              data: {
                assetManagementProductCode: this.$route.query.assetManagementProductCode,
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
            assetManagementProductCode: this.$route.query.assetManagementProductCode,
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
          })
        },
        deleteBase (barrieData, index) {
          if (!barrieData.fundLevelCode) {
            this.barrieList.splice(index, 1)
          } else {
            util.request({
                method: 'get',
                interface: 'assetManagementProductLevelDelete',
                data: {
                  fundLevelCode: barrieData.fundLevelCode
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.getList()
                    this.$emit('incomeChange')
                } else {
                    this.$message.error(res.result.message)
                }
            })
          }
        },
        saveBase (barrieData) {
            if (barrieData.fundLevelName.trim() === '') {
                this.$message({
                    message: '请填写分层名称！',
                    type: 'warning'
                })
                return false
            }

            if (!barrieData.fundLevelRatio) {
                this.$message({
                    message: '请填写分层比例！',
                    type: 'warning'
                })
                return false
            }

            var interfaceName = 'assetManagementProductLevelSave'

            if (barrieData.fundLevelCode) {
              interfaceName = 'assetManagementProductLevelUpdate'
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
                    this.$emit('incomeChange')
                } else {
                    this.$message.error(res.result.message)
                }
            })
        }
    }
}
</script>