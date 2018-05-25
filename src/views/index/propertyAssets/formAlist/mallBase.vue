<template>
    <section>
      <div class="formDiscount">
          <section class="formBox">
              <span>购物中心类型</span>
              <el-select
                class="input-box"
                v-model="base.mallType"
                filterable
                placeholder="请选择">
                <el-option
                        :label="'无'"
                        :value="''">
                </el-option>
                <el-option
                  v-for="(item, index) in dictionary.mall_type"
                  :key="index"
                  :label="item.typeName"
                  :value="item.id">
                </el-option>
              </el-select>
          </section>
          <section class="formBox">
              <span>地上建筑面积(m²)</span>
              <el-input  class="input-box"
                                size="small"
                                @change="computAreaUp"
                                v-my-float="base.groundBuiltupArea"></el-input>
          </section>
          <section class="formBox">
              <span>地下建筑面积(m²)</span>
              <el-input  class="input-box"
                                size="small"
                                @change="computAreaUn"
                                v-my-float="base.undergroundBuildupArea"></el-input>
          </section>
          <section class="formBox">
              <span>总建筑面积(m²)</span>
              <el-input  class="input-box"
                                size="small"
                                v-my-float="totalArea"></el-input>
          </section>
          <section class="formBox">
              <span>地上经营面积(m²)</span>
              <el-input  class="input-box"
                                size="small"
                                v-my-float="base.groundOperationAera"></el-input>
          </section>
          <section class="formBox">
              <span>地下经营面积(m²)</span>
              <el-input  class="input-box"
                                size="small"
                                v-my-float="base.undergroundOperationArea"></el-input>
          </section>
          <section class="formBox">
              <span>地上可租面积(m²)</span>
              <el-input  class="input-box"
                                size="small"
                                v-my-float="base.groundRentArea"></el-input>
          </section>
          <section class="formBox">
              <span>地下可租面积(m²)</span>
              <el-input  class="input-box"
                                size="small"
                                v-my-float="base.undergroundRentArea"></el-input>
          </section>
          <section class="formBox">
              <span>层高(m)</span>
              <el-input  class="input-box"
                                size="small"
                                v-my-float="base.floorHeight"></el-input>
          </section>
          <section class="formBox">
              <span>净高(m)</span>
              <el-input  class="input-box"
                                size="small"
                                v-my-float="base.floorNetHeight"></el-input>
          </section>
          <section class="formBox">
              <span>容积率(%)</span>
              <el-input  class="input-box"
                                size="small"
                                :max="100"
                                v-my-float="base.plotRation"></el-input>
          </section>
          <section class="formBox">
              <span>车位数量</span>
              <el-input  class="input-box"
                                size="small"
                                v-my-integer="base.parkingNumber"></el-input>
          </section>
          <section class="formBox">
              <span>地上层数</span>
              <el-input  class="input-box"
                                size="small"
                                v-my-integer="base.floorOvergroundLayer"></el-input>
          </section>
          <section class="formBox">
              <span>地下层数</span>
              <el-input  class="input-box"
                                size="small"
                                v-my-integer="base.floorUndergroundLayer"></el-input>
          </section>
          <section class="formBox">
              <span>电梯数量</span>
              <el-input  class="input-box"
                                size="small"
                                v-my-integer="base.liftNumber"></el-input>
          </section>
          <section class="formBox">
              <span>空调类型</span>
              <el-select
                class="input-box"
                v-model="base.airconditionerType"
                filterable
                placeholder="请选择">
                <el-option
                        :label="'无'"
                        :value="''">
                </el-option>
                <el-option
                  v-for="(item, index) in dictionary.airconditioner_type"
                  :key="index"
                  :label="item.typeName"
                  :value="item.id">
                </el-option>
              </el-select>
          </section>
          <section class="formBox">
              <span>地板类型</span>
              <el-select
                class="input-box"
                v-model="base.floorType"
                filterable
                placeholder="请选择">
                <el-option
                        :label="'无'"
                        :value="''">
                </el-option>
                <el-option
                  v-for="(item, index) in dictionary.floor_type"
                  :key="index"
                  :label="item.typeName"
                  :value="item.id">
                </el-option>
              </el-select>
          </section>
          <section class="formBox">
              <span>设计单位</span>
              <search-input class="input-box"
                              :search-data="base"
                              :fetch-suggestions="getEnterpriseList"
                              :m-code="'designerUnit'"
                              :m-name="'designerUnitName'"
                              :s-code="'enterpriseCode'"
                              :s-name="'enterpriseNameReg'"></search-input>
          </section>
          <section class="formBox">
              <span>施工单位</span>
              <search-input class="input-box"
                              :search-data="base"
                              :fetch-suggestions="getEnterpriseList"
                              :m-code="'builderUnit'"
                              :m-name="'builderUnitName'"
                              :s-code="'enterpriseCode'"
                              :s-name="'enterpriseNameReg'"></search-input>
          </section>
          <section class="formBox">
              <span>物业公司</span>
              <search-input class="input-box"
                              :search-data="base"
                              :fetch-suggestions="getEnterpriseList"
                              :m-code="'propertyManagementUnit'"
                              :m-name="'propertyManagementUnitName'"
                              :s-code="'enterpriseCode'"
                              :s-name="'enterpriseNameReg'"></search-input>
          </section>
          <section class="formBox">
              <span>商业运营单位</span>
              <search-input class="input-box"
                              :search-data="base"
                              :fetch-suggestions="getEnterpriseList"
                              :m-code="'mallBusinessOperator'"
                              :m-name="'mallBusinessOperatorName'"
                              :s-code="'enterpriseCode'"
                              :s-name="'enterpriseNameReg'"></search-input>
          </section>
          <section class="formBox">
              <span>购物中心官网</span>
              <el-input
                class="input-box"
                placeholder="请输入内容"
                v-model="base.mallWeb">
              </el-input>
          </section>
          <section class="formBox">
              <span>物业持有</span>
              <el-select
                class="input-box"
                v-model="base.propertySaleModel"
                filterable
                placeholder="请选择">
                <el-option
                        :label="'无'"
                        :value="''">
                </el-option>
                <el-option
                  v-for="(item, index) in dictionary.property_sale_model"
                  :key="index"
                  :label="item.typeName"
                  :value="item.id">
                </el-option>
              </el-select>
          </section>
          <section class="formBox">
              <span>地类(用途)</span>
              <el-select
                class="input-box"
                v-model="base.landType"
                filterable
                placeholder="请选择">
                <el-option
                        :label="'无'"
                        :value="''">
                </el-option>
                <el-option
                  v-for="(item, index) in dictionary.land_type"
                  :key="index"
                  :label="item.typeName"
                  :value="item.id">
                </el-option>
              </el-select>
          </section>
          <section class="formBox">
              <span>使用权类型</span>
              <el-select
                class="input-box"
                v-model="base.landUsageRightType"
                filterable
                placeholder="请选择">
                <el-option
                        :label="'无'"
                        :value="''">
                </el-option>
                <el-option
                  v-for="(item, index) in dictionary.land_usage_right_type"
                  :key="index"
                  :label="item.typeName"
                  :value="item.id">
                </el-option>
              </el-select>
          </section>
          <section class="formBox">
              <span>土地使用权所属</span>
              <search-input class="input-box"
                              :search-data="base"
                              :fetch-suggestions="getEnterpriseList"
                              :m-code="'landUsageUnit'"
                              :m-name="'landUsageUnitName'"
                              :s-code="'enterpriseCode'"
                              :s-name="'enterpriseNameReg'"></search-input>
          </section>
          <section class="formBox">
              <span>获地时间</span>
              <el-date-picker class="input-box"
                              v-model="base.landGetDate"
                              type="date"
                              placeholder="选择日期">
              </el-date-picker>
          </section>
          <section class="formBox bigF">
              <span>土地使用说明</span>
              <el-input
                type="textarea"
                :rows="4"
                :maxlength="140"
                placeholder="请输入内容"
                v-model="base.landOtherMemo">
              </el-input>
              <div class="limit-box">剩余<a>{{140 - base.landOtherMemo.length}}</a>字</div>
          </section>
          <section class="formBox">
              <span>土地剩余年限</span>
              <el-input  class="input-box"
                                size="small"
                                v-my-integer="base.landLifeLeft"></el-input>
          </section>
          <section class="formBox">
              <span>投入使用时间</span>
              <el-date-picker class="input-box"
                              v-model="base.mallOpenDate"
                              type="date"
                              placeholder="选择日期">
              </el-date-picker>
          </section>
          <section class="formBox">
              <span>物业管理经理</span>
              <el-input
                class="input-box"
                placeholder="请输入内容"
                v-model="base.propertyManager">
              </el-input>
          </section>
          <section class="formBox bigF">
              <span>购物中心介绍</span>
              <el-input
                type="textarea"
                :rows="4"
                :maxlength="500"
                placeholder="请输入内容"
                v-model="base.propertyDesc">
              </el-input>
              <div class="limit-box">剩余<a>{{500 - base.propertyDesc.length}}</a>字</div>
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
import searchBox from '../../../../components/common/search-box.vue'
import mapShow from '../../../../components/common/map-show.vue'
import { mapGetters } from 'vuex'
export default {
    props: ['enterpriseList', 'dictionary'],
    data () {
        return {
            base: {
              mallCode: '',
              mallAddr: '',
              mallName: '',
              mallGps: '',
              zoneCode: '',
              mallType: '',
              mallCover: '',
              groundBuiltupArea: '',
              undergroundBuildupArea: '',
              groundOperationAera: '',
              undergroundOperationArea: '',
              groundRentArea: '',
              undergroundRentArea: '',
              plotRation: '',
              floorHeight: '',
              floorNetHeight: '',
              floorOvergroundLayer: '',
              floorUndergroundLayer: '',
              parkingNumber: '',
              floorType: '',
              airconditionerType: '',
              liftNumber: '',
              designerUnit: '',
              builderUnit: '',
              propertyManagementUnit: '',
              mallBusinessOperator: '',
              mallWeb: '',
              propertySaleModel: '',
              landType: '',
              landUsageRightType: '',
              landUsageUnit: '',
              landGetDate: '',
              landLifeLeft: '',
              mallOpenDate: '',
              landOtherMemo: '',
              propertyManager: '',
              propertyDesc: '',
              propertyAlbum: '',
              recoder: ''
            },
            totalArea: ''
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
        computAreaUp (value) {
          this.totalArea = Number(value) + Number(this.base.undergroundBuildupArea)
        },
        computAreaUn (value) {
          this.totalArea = Number(this.base.groundBuiltupArea) + Number(value)
        },
        mapChange (mapInfo) {
          this.base.mallAddr = mapInfo.title
          this.base.mallGps = mapInfo.point.lng + ',' + mapInfo.point.lat
        },
        getBase () {
          util.request({
              method: 'get',
              interface: 'mallInfo',
              data: {
                mallCode: this.$route.query.mallCode
              }
          }).then(res => {
              if (res.result.success == '1') {
                this.base = res.result.result
                this.totalArea = Number(this.base.groundBuiltupArea) + Number(this.base.undergroundBuildupArea)
                this.$emit('change', res.result.result)
              } else {
                this.$message.error(res.result.message)
              }
          })
        },
        saveBase () {
          if (!this.base.mallName) {
              this.$message({
                  message: '请填写购物中心名称！',
                  type: 'warning'
              })
              return false
          }

          if (!this.base.mallAddr) {
            this.$message({
                  message: '请填写购物中心地址！',
                  type: 'warning'
              })
              return false
          }

          if (this.base.landGetDate) {
            this.base.landGetDate = new Date(this.base.landGetDate)
          }

          if (this.base.mallOpenDate) {
            this.base.mallOpenDate = new Date(this.base.mallOpenDate)
          }

          // this.base.totalArea = this.totalArea

          util.request({
              method: 'post',
              interface: 'mallInfoUpdate',
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
      searchInput,
      searchBox,
      mapShow
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