<template>
    <section>
      <div class="add-btn">
        <span>
          高度(m)&nbsp;&nbsp;面积(m²)&nbsp;&nbsp;率(%)&nbsp;&nbsp;年限(年)
        </span>
      </div>
      <div class="formDiscount">
          <section class="formBox">
              <span>地上建筑面积</span>
              <el-input-number  class="input-box"
                                size="small"
                                @change="computAreaUp"
                                :min="0"
                                :step="0.01"
                                v-model="base.groundBuiltupArea"></el-input-number>
          </section>
          <section class="formBox">
              <span>套内面积</span>
              <el-input-number  class="input-box"
                                size="small"
                                :min="0"
                                :step="0.01"
                                v-model="base.innerArea"></el-input-number>
          </section>
          <section class="formBox">
              <span>地上层数</span>
              <el-input-number  class="input-box"
                                size="small"
                                :min="0"
                                :step="1"
                                v-model="base.floorOvergroundLayer"></el-input-number>
          </section>
          <section class="formBox">
              <span>地下建筑面积</span>
              <el-input-number  class="input-box"
                                size="small"
                                @change="computAreaUn"
                                :min="0"
                                :step="0.01"
                                v-model="base.undergroundBuiltupArea"></el-input-number>
          </section>
          <section class="formBox">
              <span>地下商业面积</span>
              <el-input-number  class="input-box"
                                size="small"
                                :min="0"
                                :step="0.01"
                                v-model="base.undergroundBusinessArea"></el-input-number>
          </section>
          <section class="formBox">
              <span>地下层数</span>
              <el-input-number  class="input-box"
                                size="small"
                                :min="0"
                                :step="1"
                                v-model="base.floorUndergroundLayer"></el-input-number>
          </section>
          <section class="formBox">
              <span>总建筑面积</span>
              <el-input-number  class="input-box"
                                size="small"
                                :disabled="true"
                                :min="0"
                                :step="0.01"
                                v-model="totalArea"></el-input-number>
          </section>
          <section class="formBox">
              <span>层高</span>
              <el-input-number  class="input-box"
                                size="small"
                                :min="0"
                                :step="0.01"
                                v-model="base.floorHeight"></el-input-number>
          </section>
          <section class="formBox">
              <span>静高</span>
              <el-input-number  class="input-box"
                                size="small"
                                :min="0"
                                :step="0.01"
                                v-model="base.clearHeight"></el-input-number>
          </section>
          <section class="formBox">
              <span>车位数量</span>
              <el-input-number  class="input-box"
                                size="small"
                                :min="0"
                                :step="1"
                                v-model="base.parkingNumber"></el-input-number>
          </section>
          <section class="formBox">
              <span>电梯数量</span>
              <el-input-number  class="input-box"
                                size="small"
                                :min="0"
                                :step="1"
                                v-model="base.liftNumber"></el-input-number>
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
                  v-for="(item, index) in dictionary.airconditionerType"
                  :key="index"
                  :label="item.dictKeyValue"
                  :value="item.dictKeyCode">
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
                  v-for="(item, index) in dictionary.floorType"
                  :key="index"
                  :label="item.dictKeyValue"
                  :value="item.dictKeyCode">
                </el-option>
              </el-select>
          </section>
          <section class="formBox">
              <span>物业官网</span>
              <el-input
                class="input-box"
                placeholder="请输入内容"
                v-model="base.officeWeb">
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
                  v-for="(item, index) in dictionary.propertySaleModel"
                  :key="index"
                  :label="item.dictKeyValue"
                  :value="item.dictKeyCode">
                </el-option>
              </el-select>
          </section>
          <section class="formBox">
              <span>设计单位</span>
              <el-input
                class="input-box"
                placeholder="请输入内容"
                v-model="base.designerUnit">
              </el-input>
          </section>
          <section class="formBox">
              <span>施工单位</span>
              <el-input
                class="input-box"
                placeholder="请输入内容"
                v-model="base.builderUnit">
              </el-input>
          </section>
          <section class="formBox">
              <span>物业公司</span>
              <el-input
                class="input-box"
                placeholder="请输入内容"
                v-model="base.propertyManagementUnit">
              </el-input>
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
                  v-for="(item, index) in dictionary.landType"
                  :key="index"
                  :label="item.dictKeyValue"
                  :value="item.dictKeyCode">
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
                  v-for="(item, index) in dictionary.landUsageRightType"
                  :key="index"
                  :label="item.dictKeyValue"
                  :value="item.dictKeyCode">
                </el-option>
              </el-select>
          </section>
          <section class="formBox">
              <span>土地使用权所属</span>
              <el-input
                class="input-box"
                placeholder="请输入内容"
                v-model="base.landUsageUnit">
              </el-input>
          </section>
          <section class="formBox">
              <span>获地时间</span>
              <el-date-picker class="input-box"
                              v-model="base.landGetDate"
                              type="date"
                              placeholder="选择日期">
              </el-date-picker>
          </section>
          <section class="formBox">
              <span>土地剩余年限</span>
              <el-input-number  class="input-box"
                                size="small"
                                :min="0"
                                :step="1"
                                v-model="base.landLifeLeft"></el-input-number>
          </section>
          <section class="formBox">
              <span>容积率</span>
              <el-input-number  class="input-box"
                                size="small"
                                :min="0"
                                :max="100"
                                :step="1"
                                v-model="base.plotRation"></el-input-number>
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
              <span>投入使用时间</span>
              <el-date-picker class="input-box"
                              v-model="base.officeOpenDate"
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
          <section class="formBox">
              <span>写字楼等级</span>
              <el-select
                class="input-box"
                v-model="base.officeLevel"
                filterable
                placeholder="请选择">
                <el-option
                        :label="'无'"
                        :value="''">
                </el-option>
                <el-option
                  v-for="(item, index) in dictionary.officeLevel"
                  :key="index"
                  :label="item.dictKeyValue"
                  :value="item.dictKeyCode">
                </el-option>
              </el-select>
          </section>
          <section class="formBox bigF">
              <span>写字楼介绍</span>
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
import searchBox from '../../../../components/common/search-box.vue'
import mapShow from '../../../../components/common/map-show.vue'
import { mapGetters } from 'vuex'
export default {
    data () {
        return {
            base: {
              officeCode: '',
              officeAddr: '',
              officeName: '',
              officeGps: '',
              zoneCode: '',
              officeType: '',
              officeCover: '',
              officeLevel: '',
              groundBuiltupArea: '',
              undergroundBuiltupArea: '',
              undergroundBusinessArea: '',
              innerArea: '',
              plotRation: '',
              floorHeight: '',
              clearHeight: '',
              floorOvergroundLayer: '',
              floorUndergroundLayer: '',
              parkingNumber: '',
              floorType: '',
              airconditionerType: '',
              liftNumber: '',
              designerUnit: '',
              builderUnit: '',
              propertyManagementUnit: '',
              officeWeb: '',
              propertySaleModel: '',
              landType: '',
              landUsageRightType: '',
              landUsageUnit: '',
              landGetDate: '',
              landLifeLeft: '',
              officeOpenDate: '',
              landOtherMemo: '',
              propertyManager: '',
              propertyDesc: '',
              propertyAlbum: '',
              recoder: ''
            },
            totalArea: '',
            dictionary: {
              airconditionerType: [],
              landUsageRightType: [],
              floorType: [],
              propertySaleModel: [],
              landType: [],
              officeLevel: []
            }
        }
    },
    mounted () {
      this.getBase()
      // this.getTypes()
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
        computAreaUp (value) {
          this.totalArea = Number(value) + Number(this.base.undergroundBuiltupArea)
        },
        computAreaUn (value) {
          this.totalArea = Number(this.base.groundBuiltupArea) + Number(value)
        },
        mapChange (mapInfo) {
          this.base.officeAddr = mapInfo.title
          this.base.officeGps = mapInfo.point.lng + ',' + mapInfo.point.lat
        },
        getBase () {
          util.request({
              method: 'get',
              interface: 'officeInfo',
              data: {
                officeCode: this.$route.query.officeCode
              }
          }).then(res => {
              if (res.result.success == '1') {
                this.base = res.result.result
                this.totalArea = Number(this.base.groundBuiltupArea) + Number(this.base.undergroundBuiltupArea)
                this.$emit('change', res.result.result)
              } else {
                this.$message.error(res.result.message)
              }
          })
        },
        geProductTypes (type) {
          util.request({
              method: 'get',
              interface: 'findDictionaryByType',
              data: {
                typeCode: type
              }
          }).then(res => {
              if (res.result.success == '1') {
                this.productTypes = res.result.result
              } else {
                this.$message.error(res.result.message)
              }
          })
        },
        saveBase () {
          if (!this.base.officeName) {
              this.$message({
                  message: '请填写写字楼名称！',
                  type: 'warning'
              })
              return false
          }

          if (!this.base.officeAddr) {
            this.$message({
                  message: '请填写写字楼地址！',
                  type: 'warning'
              })
              return false
          }

          util.request({
              method: 'post',
              interface: 'officeUpdate',
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