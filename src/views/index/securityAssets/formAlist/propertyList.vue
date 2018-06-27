<template>
    <section class="activity-box">
        <div class="add-btn">
          <el-button type="primary" icon="plus" size="small"
                  @click="addItem"
                  v-if="isEdit">增加</el-button>
        </div>
        
        <el-table
          :data="itemList"
          border
          style="width: 100%">
          <el-table-column
            prop="assetRatio"
            label="贡献比例(%)">
          </el-table-column>
          <el-table-column
            label="物业名称">
            <template scope="scope">
              <a class="black nav-hover"
                    v-if="scope.row.propertyType == 'property_type_1'"
                    target="_blank"
                    :href="domainFont + 'propertyAssets/officeDetail?officeCode=' + scope.row.propertyCode">
                {{scope.row.propertyName}}
              </a>
    
              <a class="black nav-hover"
                    v-if="scope.row.propertyType == 'property_type_2'"
                    target="_blank"
                    :href="domainFont + 'propertyAssets/mallDetail?mallCode=' + scope.row.propertyCode">
                {{scope.row.propertyName}}      
              </a>
            </template>
          </el-table-column>
          <el-table-column
            v-if="isEdit"
            label="操作"
            width="70">
            <template scope="scope" v-if="isEdit">
              <i class="el-icon-delete2" @click="deleteItem(scope.row)"></i>
              <i class="el-icon-document" @click="editItem(scope.row)"></i>
            </template>
          </el-table-column>
        </el-table>
        
        <div class="clear"></div>
        <el-pagination
            v-if="total"
            class="page-box"
            @current-change="pageChange"
            layout="prev, pager, next"
            :page-size="pageSize"
            :total="total">
        </el-pagination>

        <el-dialog :title="operateText" :visible.sync="isAddOEdit">
          <el-form :label-position="'left'" :model="itemData" label-width="100px">
            <el-form-item label="贡献比例(%)">
                <my-el-input  type="float"
                                :max="100"
                                v-model="itemData.assetRatio"></my-el-input>
            </el-form-item>
            <el-form-item label="物业类型">
                <el-select
                  v-model="itemData.propertyType"
                  filterable
                  placeholder="请选择">
                  <el-option
                    v-for="(item, index) in dictionary.property_type"
                    :key="index"
                    :label="item.typeName"
                    :value="item.id">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="物业" v-if="itemData.propertyType">
                <search-input :search-data="itemData"
                              :fetch-suggestions="getPropertList"
                              :m-code="'propertyCode'"
                              :m-name="'propertyName'"
                              :s-code="codeKey"
                              :s-name="nameKey"></search-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
                <el-button @click="isAddOEdit = false">取 消</el-button>
                <el-button type="primary" @click="confirmItem">确 定</el-button>
          </div>
        </el-dialog>
    </section>
</template>
<script>
import util from '../../../../assets/common/util'
import searchInput from '../../../../components/common/search-input'
import { mapGetters } from 'vuex'

export default {
    props: ['base', 'securityCode', 'securityType', 'dictionary'],
    data () {
        return {
          domainFont: 'http://enterprisedev.chinacredata.com/',
          operateText: '添加',
          itemList: [],
          propertyList: [],
          nameKey: '',
          codeKey: '',
          isAddOEdit: false,
          itemData: {
            securityCode: '',
            assetRatio: '',
            securityType: '',
            propertyType: '',
            propertyCode: '',
            propertyName: ''
          },
          itemNowIndex: '',
          pageNumber: 1,
          pageSize: 5,
          total: 0
        }
    },
    mounted () {
      this.getItemList()
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
      getPropertList (queryString, cb) {
        if (!this.requestNum) {
          this.requestNum = 1
        } else {
          this.requestNum++
        }
        
        var requestNum = this.requestNum
        var interfaceName = ''

        switch (this.itemData.propertyType) {
          case 'property_type_1':
            interfaceName = 'officeList'
            this.nameKey = 'officeName'
            this.codeKey = 'officeCode'
            break
          case 'property_type_2':
            interfaceName = 'mallInfoList'
            this.nameKey = 'mallName'
            this.codeKey = 'mallCode'
            break
        }

        var formData = {
          enterpriseCode: this.$route.query.enterpriseCode,
          pageNumber: 1,
          pageSize: 20
        }

        formData[this.nameKey] = queryString

        util.request({
            method: 'get',
            interface: interfaceName,
            data: formData
        }).then(res => {
            if (res.result.success == '1') {
                if (requestNum == this.requestNum) {
                  cb(res.result.result)
                }
            } else {
                this.$message.error(res.result.message)
            }
        })       
      },
      handleSelect (item) {
        this.itemData.propertyCode = item[this.codeKey]
        this.itemData.propertyName = item[this.nameKey]
      },
      getItemList () {
        util.request({
            method: 'get',
            interface: 'securityAssetList',
            data: {
              securityCode: this.securityCode,
              pageNumber: this.pageNumber,
              pageSize: this.pageSize
            }
        }).then(res => {
            if (res.result.success == '1') {
                this.total = Number(res.result.total)
                this.itemList = res.result.result
            } else {
                this.$message.error(res.result.message)
            }  
        })
      },
      pageChange (size) {
          this.pageNumber = size
          this.getItemList()
      },
      addItem () {
        this.itemData = {
          securityCode: this.securityCode,
          assetRatio: '',
          securityType: this.securityType,
          propertyType: '',
          propertyCode: '',
          propertyName: ''
        }

        this.operateText = '添加'

        this.isAddOEdit = true
      },
      editItem (item) {
        this.itemNowIndex = this.itemList.indexOf(item)

        this.itemData = Object.assign({}, item)

        this.operateText = '编辑'

        this.isAddOEdit = true
      },
      confirmItem () {
        if (this.itemData.assetRatio === '') {
          this.$message({
              message: '请填写贡献比例！',
              type: 'warning'
          })
          return false
        }

        if (this.itemData.propertyType === '') {
          this.$message({
              message: '请选择物业类型！',
              type: 'warning'
          })
          return false
        }

        if (this.itemData.propertyCode === '') {
          this.$message({
              message: '请选择物业！',
              type: 'warning'
          })
          return false
        }

        var sum = 0

        for (var i = 0, len = this.itemList.length; i < len; i++) {
          if (i !== this.itemNowIndex) {
            sum += Number(this.itemList[i].assetRatio)
          }
        }

        sum += Number(this.itemData.assetRatio)

        if (sum > 100) {
          this.$message({
              message: '总贡献比例必须小于100！',
              type: 'warning'
          })
          return false
        }

        this.insertOrUpdateItem()
      },
      insertOrUpdateItem () {
        var interfaceName = 'securityAssetSave'

        if (this.itemData.id) {
          interfaceName = 'securityAssetUpdate'
        }

        util.request({
            method: 'post',
            interface: interfaceName,
            data: this.itemData
        }).then((res) => {
            if (res.result.success == '1') {
              this.getItemList()
              if (this.securityType == 'security_type_1') {
                this.$emit('incomeChange')
              }
              this.isAddOEdit = false
            } else {
              this.$message.error(res.result.message)
            }
        })
      },
      deleteItem (row) {
        util.request({
            method: 'get',
            interface: 'securityAssetDelete',
            data: {
              id: row.id,
              securityCode: row.securityCode,
              propertyCode: row.propertyCode,
              securityType: row.securityType,
              propertyType: row.propertyType
            }
        }).then(res => {
          if (res.result.success == '1') {
            this.getItemList()
            if (this.securityType == 'security_type_1') {
              this.$emit('incomeChange')
            }

            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          } else {
            this.$message.error(res.result.message)
          }
        })
      }
    },
    components: {
      searchInput
    }
}
</script>