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
            prop="ownerStockRight"
            label="股权比例(%)">
          </el-table-column>
          <el-table-column
            label="业主名称">
            <template scope="scope">
              <router-link class="black nav-hover"
                            target="_blank"
                            :to="{
                              name: 'enterprise-info',
                              query: {
                                enterpriseCode: scope.row.ownerEnterpriseCode
                              }
                            }">
                  {{scope.row.enterpriseNameReg}}
              </router-link>
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
          <el-form :label-position="'left'" :model="itemData" label-width="90px">
            <el-form-item label="股权比例(%)">
                <my-el-input  size="small"
                                type="float"
                                :max="100"
                                v-model="itemData.ownerStockRight"></my-el-input>
            </el-form-item>
            <el-form-item label="业主">
                <search-input :search-data="itemData"
                              :fetch-suggestions="getEnterpriseList"
                              :m-code="'ownerEnterpriseCode'"
                              :m-name="'enterpriseNameReg'"
                              :s-code="'enterpriseCode'"
                              :s-name="'enterpriseNameReg'"></search-input>
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
    props: ['base', 'enterpriseList', 'propertyCode', 'propertyType'],
    data () {
        return {
          operateText: '添加',
          itemList: [],
          isAddOEdit: false,
          itemData: {
            propertyCode: '',
            ownerStockRight: '',
            propertyType: '',
            ownerEnterpriseCode: ''
          },
          itemNowIndex: '',
          pageNumber: 1,
          pageSize: 10,
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
      getItemList () {
        util.request({
            method: 'get',
            interface: 'propertyOwnerList',
            data: {
              propertyCode: this.propertyCode,
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
          propertyCode: this.propertyCode,
          ownerStockRight: '',
          propertyType: this.propertyType,
          ownerEnterpriseCode: ''
        }

        this.operateText = '添加'

        this.itemNowIndex = ''

        this.isAddOEdit = true
      },
      editItem (item) {
        this.itemNowIndex = this.itemList.indexOf(item)

        this.itemData = Object.assign({}, item)

        this.operateText = '编辑'

        this.isAddOEdit = true
      },
      confirmItem () {
        if (this.itemData.ownerStockRight === '') {
          this.$message({
              message: '请填写股权比例！',
              type: 'warning'
          })
          return false
        }

        if (this.itemData.ownerEnterpriseCode === '') {
          this.$message({
              message: '请选择业主！',
              type: 'warning'
          })
          return false
        }

        var sum = 0

        for (var i = 0, len = this.itemList.length; i < len; i++) {
          if (i !== this.itemNowIndex) {
            sum += Number(this.itemList[i].ownerStockRight)
          }
        }

        sum += Number(this.itemData.ownerStockRight)

        if (sum > 100) {
          this.$message({
              message: '总股权比例必须小于100！',
              type: 'warning'
          })
          return false
        }

        this.insertOrUpdateItem()
      },
      insertOrUpdateItem () {
        var interfaceName = 'propertyOwnerSave'

        if (this.itemData.id) {
          interfaceName = 'propertyOwnerUpdate'
        }

        util.request({
            method: 'post',
            interface: interfaceName,
            data: this.itemData
        }).then((res) => {
            if (res.result.success == '1') {
              this.getItemList()
              this.isAddOEdit = false
            } else {
              this.$message.error(res.result.message)
            }
        })
      },
      deleteItem (row) {
        util.request({
            method: 'post',
            interface: 'propertyOwnerDelete',
            data: {
              id: row.id,
              propertyCode: row.propertyCode,
              ownerEnterpriseCode: row.ownerEnterpriseCode
            }
        }).then(res => {
          if (res.result.success == '1') {
            this.getItemList()

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