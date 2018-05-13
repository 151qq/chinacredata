<template>
    <div class="form-discount">
        <el-collapse v-model="activeNames" @change="collChange">
          <section class="float-form-box">
            <div class="formDiscount">
              <section class="formBox">
                  <span>写字楼名称</span>
                  <el-input
                    class="input-box"
                    placeholder="请输入内容，最多20个字"
                    :disabled="true"
                    :maxlength="20"
                    v-model="baseData.mallName">
                  </el-input>
              </section>

              <section class="formBox mapBox">
                  <span>写字楼地址</span>
                  <div class="input-box">
                    <div class="map-show-box">
                      <el-input
                        placeholder="请输入内容"
                        :disabled="true"
                        v-model="baseData.mallAddr">
                      </el-input>
                    </div>
                    <el-button class="map-show-btn" type="primary" size="small" @click="showMap">地图</el-button>
                  </div>
              </section>
            </div>
          </section>
          <div class="line-bold"></div>

          <el-collapse-item class="float-form-box" title="基本信息" name="1">
            <mall-base @change="baseChange"
                      :dictionary="dictionary"
                      :enterprise-list="enterpriseList"
                      ref="baseForm"></mall-base>
          </el-collapse-item>
          <div class="line-bold"></div>

          <!-- 产品图片 -->
          <el-collapse-item class="float-form-box" title="物业相册" name="2">
            <upload-list :img-lists="imgList"
                          :id-name="'propertyAlbum'"
                          :is-edit="baseData.recoder == userInfo.userCode"
                          :pro-cover="baseData.mallCover"
                          @changeImg="changeImg"
                          @setImg="setImg"
                          @deleteImg="deleteImg"></upload-list>
          </el-collapse-item>
          <div class="line-bold"></div>

          <!-- 业主信息 -->
          <el-collapse-item class="float-form-box" title="业主信息" name="3">
            <owner-list :enterprise-list="enterpriseList"
                        :base="baseData"
                        :property-code="$route.query.mallCode"
                        :property-type="'property_type_2'"></owner-list>
          </el-collapse-item>
          <div class="line-bold"></div>

          <!-- 交易历史 -->
          <el-collapse-item class="float-form-box" title="交易历史" name="4">
            <trade-list :enterprise-list="enterpriseList"
                        :base="baseData"
                        :dictionary="dictionary"
                        :property-code="$route.query.mallCode"
                        :property-type="'property_type_2'"></trade-list>
          </el-collapse-item>
          <div class="line-bold"></div>

          <!-- 租户信息 -->
          <el-collapse-item class="float-form-box" title="租户信息" name="5">
            <mall-tenant :enterprise-list="enterpriseList"
                          :base="baseData"
                          :dictionary="dictionary"></mall-tenant>
          </el-collapse-item>
          <div class="line-bold"></div>

          <!-- 物业收入 -->
          <el-collapse-item class="float-form-box" title="物业收入" name="6">
            <mall-income :base="baseData"></mall-income>
          </el-collapse-item>
          <div class="line-bold"></div>

          <!-- 物业支出 -->
          <el-collapse-item class="float-form-box" title="物业支出" name="7">
            <mall-cost :base="baseData"></mall-cost>
          </el-collapse-item>
          <div class="line-bold"></div>

          <!-- 物业估值 -->
          <el-collapse-item class="float-form-box" title="物业估值" name="8">
            <value-list :base="baseData"
                        :property-code="$route.query.mallCode"
                        :property-type="'property_type_2'"></value-list>
          </el-collapse-item>
          <div class="line-bold"></div>

          <!-- 租金和空置率 -->
          <el-collapse-item class="float-form-box" title="租金和空置率" name="9">
            <mall-rent :base="baseData"></mall-rent>
          </el-collapse-item>
          <div class="line-bold"></div>

          <!-- 资产证券化 -->
          <el-collapse-item class="float-form-box" title="资产证券化" name="10">
            <property-assets :property-code="$route.query.mallCode"></property-assets>
          </el-collapse-item>
        </el-collapse>

        <el-dialog title="写字楼地址" :visible.sync="isShowMap">
          <map-show :point-str="baseData.mallGps" :map-height="'300px'" ref="mapShow"></map-show>
          <div slot="footer" class="dialog-footer">
                <el-button @click="isShowMap = false">取 消</el-button>
          </div>
        </el-dialog>
    </div>
</template>
<script>
import util from '../../../assets/common/util'
import mapShow from '../../../components/common/map-show.vue'
import mallBase from './formAlist/mallBase'
import ownerList from './formAlist/ownerList'
import tradeList from './formAlist/tradeList'
import uploadList from '../../../components/common/upload-list'
import mallRent from './formAlist/mallRent'
import mallTenant from './formAlist/mallTenant'
import mallCost from './formAlist/mallCost'
import mallIncome from './formAlist/mallIncome'
import valueList from './formAlist/valueList'
import propertyAssets from './formAlist/propertyAssets'
import { mapGetters } from 'vuex'

export default {
    data () {
        return {
            activeNames: ['1'],
            isShowMap: false,
            baseData: {
              mallName: '',
              mallAddr: '',
              mallGps: ''
            },
            imgList: [],
            sourceData: [],
            enterpriseList: [],
            dictionaryTypes: [
              'enterprise_type',
              'floor_type',
              'airconditioner_type',
              'property_sale_model',
              'land_type',
              'land_usage_right_type',
              'mall_type',
              'office_type',
              'trade_type',
              'tenant_type',
              'lease_type'
            ],
            dictionary: {
              enterprise_type: [],
              floor_type: [],
              airconditioner_type: [],
              property_sale_model: [],
              land_type: [],
              land_usage_right_type: [],
              mall_type: [],
              office_type: [],
              trade_type: [],
              tenant_type: [],
              lease_type: []
            }
        }
    },
    mounted () {
        var mallColl = localStorage.getItem("mallColl")
        if (mallColl) {
            this.activeNames = mallColl.split(',')
        }

        this.getEnterprises()
        this.getDictionaryTypes()
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo'
        })
    },
    methods: {
      showMap () {
        this.isShowMap = true
        setTimeout(() => {
          this.$refs['mapShow'].initMap()
        }, 30)
      },
      baseChange (result) {
        this.baseData = result
        this.getItems(this.baseData.propertyAlbum)
      },
      getEnterprises () {
        var formData = {
            pageNumber: 1,
            pageSize: 1000
        }

        util.request({
            method: 'get',
            interface: 'showAllEnterprise',
            data: formData
        }).then(res => {
            if (res.result.success == '1') {
                this.enterpriseList = res.result.result
            } else {
                this.$message.error(res.result.message)
            }
        })       
      },
      getDictionaryTypes () {
        util.request({
            method: 'post',
            interface: 'disOfEnterpriseInfo',
            data: {
              types: this.dictionaryTypes.join(',')
            }
        }).then(res => {
            if (res.result.success == '1') {
              this.dictionary = res.result.result
            } else {
              this.$message.error(res.result.message)
            }
        })
      },
      getItems (docCode) {
          util.request({
              method: 'get',
              interface: 'listPage',
              data: {
                  enterpriseCode: this.$route.query.enterpriseCode,
                  docFolder: docCode,
                  pageNumber: 1,
                  pageSize: 1000
              }
          }).then(res => {
              if (res.result.success == '1') {
                  var arrs = []
                  res.result.result.forEach((item) => {
                      item.docCreateTime = item.docCreateTime.split(' ')[0]
                      arrs.push(item.fileCode)
                  })

                  this.imgList = arrs
                  this.sourceData = res.result.result
              } else {
                  this.$message.error(res.result.message)
              }
          })       
      },
      changeImg (url) {
        var addItemForm = {
            enterpriseCode: this.$route.query.enterpriseCode,
            docType: '2',
            docTitle: this.baseData.mallName + '-' + (this.imgList.length + 1),
            fileCode: url,
            docDesc: this.baseData.mallName + '-' + (this.imgList.length + 1),
            docCover: '',
            docFolder: this.baseData.propertyAlbum
        }

        util.request({
            method: 'post',
            interface: 'materialFolderInsert',
            data: addItemForm
        }).then(res => {
            if (res.result.success == '1') {
                this.getItems(this.baseData.propertyAlbum)
            } else {
                this.$message.error(res.result.message)
            }
        })       
      },
      deleteImg (index) {
        util.request({
            method: 'post',
            interface: 'materialFolderDelete',
            data: {
                docType: '2',
                docCodes: [this.sourceData[index].docCode]
            }
        }).then(res => {
            if (res.result.success == '1') {
                this.getItems(this.baseData.propertyAlbum)
            } else {
                this.$message.error(res.result.message)
            }
        })
      },
      setImg (url) {
        util.request({
            method: 'post',
            interface: 'mallInfoCover',
            data: {
                mallCode: this.$route.query.mallCode,
                mallCover: url
            }
        }).then(res => {
            if (res.result.success == '1') {
                this.baseData.mallCover = url
                this.$refs.baseForm.base.mallCover = url
            } else {
                this.$message.error(res.result.message)
            }
        })
      },
      collChange () {
          localStorage.setItem("mallColl", this.activeNames)
      }
    },
    components: {
        mapShow,
        mallBase,
        ownerList,
        tradeList,
        uploadList,
        mallRent,
        mallTenant,
        mallCost,
        mallIncome,
        valueList,
        propertyAssets
    }
}
</script>