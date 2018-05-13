<template>
    <section class="form-small-box">
      <div class="add-btn">
        <span>
          面积(m²)&nbsp;&nbsp;比例(%)&nbsp;&nbsp;租期(月)
        </span>
        <el-button type="primary" icon="plus" size="small"
                @click="addBarrier"
                v-if="isEdit">增加</el-button>
      </div>
      
      <section class="inForm" v-for="(item, index) in barrieList" :key="index">
        <div class="formDiscount">
          <section class="formBox">
              <span>租期</span>
              <el-date-picker class="input-box"
                              v-model="item.rangeDate"
                              type="daterange"
                              placeholder="选择租期">
              </el-date-picker>
          </section>
          <section class="formBox">
              <span>租户名称</span>
              <el-select
                class="input-box"
                v-model="item.tenantName"
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
              <span>租户类型</span>
              <el-select
                class="input-box"
                v-model="item.tenantType"
                filterable
                placeholder="请选择">
                <el-option
                        :label="'无'"
                        :value="''">
                </el-option>
                <el-option
                  v-for="(item, index) in dictionary.tenant_type"
                  :key="index"
                  :label="item.typeName"
                  :value="item.id">
                </el-option>
              </el-select>
          </section>
          <section class="formBox">
              <span>租金类型</span>
              <el-select
                class="input-box"
                v-model="item.leaseType"
                filterable
                placeholder="请选择">
                <el-option
                        :label="'无'"
                        :value="''">
                </el-option>
                <el-option
                  v-for="(item, index) in dictionary.lease_type"
                  :key="index"
                  :label="item.typeName"
                  :value="item.id">
                </el-option>
              </el-select>
          </section>
          <section class="formBox">
              <span>免租期</span>
              <el-input-number  class="input-box"
                                size="small"
                                :min="0"
                                :step="1"
                                v-model="item.rentFreePeriod"></el-input-number>
          </section>
          <section class="formBox">
              <span>主力店</span>
              <el-select
                class="input-box"
                v-model="item.tenantLevel"
                filterable
                placeholder="请选择">
                <el-option
                  v-for="(item, index) in tenantLevels"
                  :key="index"
                  :label="item.typeName"
                  :value="item.id">
                </el-option>
              </el-select>
          </section>
          <section class="formBox">
              <span>装修补贴</span>
              <el-input-number  class="input-box"
                                size="small"
                                :min="0"
                                :step="1"
                                v-model="item.constructionAllowance"></el-input-number>
          </section>
          <section class="formBox">
              <span>面积</span>
              <el-input-number  class="input-box"
                                size="small"
                                :min="0"
                                :step="0.01"
                                v-model="item.rentAcreage"></el-input-number>
          </section>
          <section class="formBox bigF">
            <span>租用目的</span>
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容,最140个字"
              :maxlength="140"
              v-model="item.rentBusinessGoal">
            </el-input>
            <div class="limit-box">剩余<a>{{140 - item.rentBusinessGoal.length}}</a>字</div>
          </section>
          <section class="formBox bigF">
            <span>租户简介</span>
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容,最140个字"
              :maxlength="140"
              v-model="item.tenantDesc">
            </el-input>
            <div class="limit-box">剩余<a>{{140 - item.tenantDesc.length}}</a>字</div>
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
        <el-button class="save-btn" type="danger" :plain="true" size="small" icon="delete2"
            @click="deleteBase(item, index)">删除</el-button>

        <el-button class="save-btn" type="info" :plain="true" size="small" icon="document"
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
            暂无租户
      </div>
    </section>
</template>
<script>
import util from '../../../../assets/common/util'
import { mapGetters } from 'vuex'
export default {
    props: ['base', 'enterpriseList', 'dictionary'],
    data () {
        return {
            barrieList: [],
            enterpriseTypes: [],
            tenantLevels: [
              {
                typeName: '主力店',
                id: '1'
              },
              {
                typeName: '非主力店',
                id: '0'
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
        getList () {
          util.request({
              method: 'get',
              interface: 'mallTenantInfoList',
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
            tenantName: '',
            tenantType: '',
            leaseType: '',
            tenantLevel: '',
            rentFreePeriod: '',
            constructionAllowance: '',
            rentAcreage: '',
            tenantDesc: '',
            rentBusinessGoal: '',
            memo: '',
            beginDate: '',
            endDate: ''
          })
        },
        deleteBase (barrieData, index) {
          if (!barrieData.id) {
            this.barrieList.splice(index, 1)
          } else {
            util.request({
                method: 'get',
                interface: 'mallTenantInfoDelete',
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

            var interfaceName = 'mallTenantInfoSave'

            if (barrieData.id) {
              interfaceName = 'mallTenantInfoUpdate'
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