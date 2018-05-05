<template>
    <section class="activity-box">
        <div class="add-btn">
          <span>
            比例(%)
          </span>
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
            label="股权比例">
          </el-table-column>
          <el-table-column
            prop="enterpriseType"
            label="业主类型">
          </el-table-column>
          <el-table-column
            prop="enterpriseNameReg"
            label="业主名称">
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
          <el-form :label-position="'left'" :model="itemData" label-width="80px">
            <el-form-item label="股权比例">
                <el-input-number  size="small"
                                :min="0"
                                :step="0.01"
                                v-model="itemData.ownerStockRight"></el-input-number>
            </el-form-item>
            <el-form-item label="业主">
                <el-select
                  v-model="itemData.ownerEnterpriseCode"
                  filterable
                  placeholder="请选择">
                  <el-option
                    v-for="(item, index) in enterpriseList"
                    :key="index"
                    :label="item.enterpriseNameReg"
                    :value="item.enterpriseCode">
                  </el-option>
                </el-select>
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

        this.isAddOEdit = true
      },
      editItem (item) {
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
    }
}
</script>