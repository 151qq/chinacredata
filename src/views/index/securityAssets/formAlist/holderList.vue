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
            prop="shareholderShareRatio"
            label="股权比例(%)">
          </el-table-column>
          <el-table-column
            prop="enterpriseNameReg"
            label="股东名称">
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
            <el-form-item label="股权比例(%)">
                <el-input-number  size="small"
                                :min="0"
                                :max="100"
                                :step="0.01"
                                v-model="itemData.shareholderShareRatio"></el-input-number>
            </el-form-item>
            <el-form-item label="股东">
                <search-input :search-data="itemData"
                              :fetch-suggestions="getEnterpriseList"
                              :m-code="'securityShareholder'"
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
    props: ['base', 'enterpriseList', 'securityCode', 'securityType'],
    data () {
        return {
          operateText: '添加',
          itemList: [],
          isAddOEdit: false,
          itemData: {
            securityCode: '',
            shareholderShareRatio: '',
            securityType: '',
            securityShareholder: ''
          },
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
            interface: 'securityShareholderList',
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
          shareholderShareRatio: '',
          securityType: this.securityType,
          securityShareholder: ''
        }

        this.operateText = '添加'

        this.isAddOEdit = true
      },
      editItem (item) {
        this.itemData = Object.assign({}, item)

        this.operateText = '编辑'

        this.isAddOEdit = true
      },
      confirmItem () {
        if (this.itemData.shareholderShareRatio === '') {
          this.$message({
              message: '请填写股权比例！',
              type: 'warning'
          })
          return false
        }

        if (this.itemData.securityShareholder === '') {
          this.$message({
              message: '请选择股东！',
              type: 'warning'
          })
          return false
        }

        this.insertOrUpdateItem()
      },
      insertOrUpdateItem () {
        var interfaceName = 'securityShareholderSave'

        if (this.itemData.id) {
          interfaceName = 'securityShareholderUpdate'
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
            interface: 'securityShareholderDelete',
            data: {
              securityCode: row.securityCode,
              securityShareholder: row.securityShareholder
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