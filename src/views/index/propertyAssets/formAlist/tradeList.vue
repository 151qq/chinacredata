<template>
    <section class="form-small-box">
      <div class="add-btn">
        <span>
          比例(%)&nbsp;&nbsp;价格(元)
        </span>
        <el-button type="primary" icon="plus" size="small"
                @click="addBarrier"
                v-if="isEdit">增加</el-button>
      </div>
      
      <section class="inForm" v-for="(item, index) in barrieList" :key="index">
        <div class="formDiscount">
          <section class="formBox">
              <span>交易时间</span>
              <el-date-picker class="input-box"
                              v-model="item.tradeDate"
                              type="date"
                              placeholder="选择日期">
              </el-date-picker>
          </section>
          <section class="formBox">
              <span>交易甲方</span>
              <el-select
                class="input-box"
                v-model="item.firstParty"
                @change="firstPartyChange(item.firstParty, index)"
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
              <span>甲方类型</span>
              <el-select
                class="input-box"
                v-model="item.firstPartyType"
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
              <span>交易乙方</span>
              <el-select
                class="input-box"
                v-model="item.secondParty"
                @change="secondPartyChange(item.secondParty, index)"
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
              <span>乙方类型</span>
              <el-select
                class="input-box"
                v-model="item.secondPartyType"
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
              <span>交易类型</span>
              <el-select
                class="input-box"
                v-model="item.tradeType"
                filterable
                placeholder="请选择">
                <el-option
                  v-for="(item, index) in []"
                  :key="index"
                  :label="item.typeName"
                  :value="item.id">
                </el-option>
              </el-select>
          </section>
          <section class="formBox">
              <span>股权比例</span>
              <el-input-number  class="input-box"
                                size="small"
                                :min="0"
                                :max="100"
                                :step="0.01"
                                v-model="item.stockRightRation"></el-input-number>
          </section>
          <section class="formBox">
              <span>股权交易场所</span>
              <el-input
                class="input-box"
                placeholder="请输入内容"
                v-model="item.stockTracdePlace">
              </el-input>
          </section>
          <section class="formBox">
              <span>交易价格</span>
              <el-input-number  class="input-box"
                                size="small"
                                :min="0"
                                :step="0.01"
                                v-model="item.tradePrice"></el-input-number>
          </section>
          <!-- <section class="formBox">
              <span>记录人</span>
              <el-input
                class="input-box"
                :disabled="true"
                placeholder="请输入内容"
                v-model="item.recoder">
              </el-input>
          </section> -->
          <section class="formBox bigF">
            <span>交易说明</span>
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容,最140个字"
              :maxlength="500"
              v-model="item.tradeDesc">
            </el-input>
            <div class="limit-box">剩余<a>{{500 - item.tradeDesc.length}}</a>字</div>
          </section>      
        </div>
        <el-button v-if="isEdit" class="save-btn" type="danger" :plain="true" size="small" icon="delete2"
            @click="deleteBase(item, index)">删除</el-button>

        <el-button v-if="isEdit" class="save-btn" type="info" :plain="true" size="small" icon="document"
            @click="saveBase(item)">保存</el-button>
        <div class="clear"></div>
      </section>

      <div v-if="!barrieList.length" class="null-page">
            暂无交易
      </div>
    </section>
</template>
<script>
import util from '../../../../assets/common/util'
import { mapGetters } from 'vuex'
export default {
    props: ['base', 'enterpriseList', 'propertyCode', 'propertyType'],
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
        firstPartyChange (value, index) {
          for (var i = 0, len = this.enterpriseList.length; i < len; i++) {
            if (this.enterpriseList[i].enterpriseCode == value) {
              this.barrieList[index].firstPartyType = this.enterpriseList[i].enterpriseType
              break
            }
          }

          if (!value) {
            this.barrieList[index].firstPartyType = ''
          }
        },
        secondPartyChange (value, index) {
          for (var i = 0, len = this.enterpriseList.length; i < len; i++) {
            if (this.enterpriseList[i].enterpriseCode == value) {
              this.barrieList[index].secondPartyType = this.enterpriseList[i].enterpriseType
              break
            }
          }

          if (!value) {
            this.barrieList[index].secondPartyType = ''
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
              interface: 'propertyTradeList',
              data: {
                propertyCode: this.propertyCode
              }
          }).then(res => {
              if (res.result.success == '1') {
                this.barrieList = res.result.result
              } else {
                this.$message.error(res.result.message)
              }
          })
        },
        addBarrier () {
          this.barrieList.unshift({
            propertyCode: this.propertyCode,
            propertyType: this.propertyType,
            tradeDate: '',
            firstParty: '',
            firstPartyType: '',
            secondParty: '',
            secondPartyType: '',
            tradeType: '',
            stockRightRation: '',
            stockTracdePlace: '',
            tradePrice: '',
            recoder: '',
            tradeDesc: ''
          })
        },
        deleteBase (barrieData, index) {
          if (!barrieData.id) {
            this.barrieList.splice(index, 1)
          } else {
            util.request({
                method: 'get',
                interface: 'propertyTradeDelete',
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
            if (!barrieData.tradeDate) {
                this.$message({
                    message: '请选择交易日期！',
                    type: 'warning'
                })
                return false
            }

            if (!barrieData.firstParty) {
                this.$message({
                    message: '请选择交易甲方！',
                    type: 'warning'
                })
                return false
            }

            if (!barrieData.secondParty) {
                this.$message({
                    message: '请选择交易乙方！',
                    type: 'warning'
                })
                return false
            }

            if (barrieData.stockRightRation === '') {
                this.$message({
                    message: '请填写股权比例！',
                    type: 'warning'
                })
                return false
            }

            if (barrieData.stockTracdePlace === '') {
                this.$message({
                    message: '请填写交易场所！',
                    type: 'warning'
                })
                return false
            }

            if (barrieData.tradePrice === '') {
                this.$message({
                    message: '请填写交易价格！',
                    type: 'warning'
                })
                return false
            }

            barrieData.tradeDate = new Date(barrieData.tradeDate)

            var interfaceName = 'propertyTradeSave'

            if (barrieData.id) {
              interfaceName = 'propertyTradeUpdate'
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