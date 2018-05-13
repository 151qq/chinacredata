<template>
    <section class="card-list-box user-list-wx-box">
        <el-button class="add-btn" type="primary" icon="plus" size="small" @click="addItem">增加</el-button>
        
        <div class="sou-box check-box"
              v-for="(item, index) in itemList"
              :key="index">
            <div class="cover-box">
                <img :src="item.userWechatLogo">
            </div>
            <div class="title-box">
                <div class="title">{{item.userName}}</div>
                <div class="time">
                    <span>
                        {{item.userMobile}}
                    </span>

                    <span class="btn-box">
                        <i @click.prevent="deleteItem(item.zoneCode)" class="el-icon-delete2"></i>
                    </span>
                </div>
            </div>
        </div>

        <div v-if="!itemList.length" class="null-page">
              暂无内容
        </div>

        <div class="clear"></div>
        <el-pagination
            v-if="total && itemList.length"
            class="page-box"
            @current-change="pageChange"
            layout="prev, pager, next"
            :page-size="pageSize"
            :total="total">
        </el-pagination>


        <el-dialog class="user-add-box" title="添加员工" :visible.sync="isAddOEdit">
          <el-form :label-position="'left'" :model="itemData" label-width="80px">
            <el-form-item label="用户名">
                <el-input v-model="itemData.userName"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input type="number" v-model="itemData.userMobile"></el-input>
            </el-form-item>
            <el-form-item label="用户名片">
                <upload-file :path="itemData.userWechatLogo"
                            :is-operate="true"
                            :bg-path="false"
                            :id-name="'userWechatLogo'"
                            @changeImg="changeImg"></upload-file>
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
import upload from '../../../../components/common/uploadFile'

export default {
    data () {
        return {
          itemList: [],
          isAddOEdit: false,
          itemData: {
            userName: '',
            userMobile: '',
            userWechatLogo: ''
          },
          pageNumber: 1,
          pageSize: 20,
          total: 0
        }
    },
    mounted () {
      this.getItemList()
    },
    watch: {
      $route () {
        this.getItemList()
      }
    },
    methods: {
      changeImg (data) {
          this.itemData.userWechatLogo = data.url
      },
      getItemList () {
        util.request({
            method: 'get',
            interface: 'selectUserInfoOfPage',
            data: {
              enterpriseCode: this.$route.query.enterpriseCode,
              pageSize: this.pageSize,
              pageNumber: this.pageNumber
            }
        }).then(res => {
            if (res.result.success == '1') {
              var datas = res.result.result
              this.total = Number(res.result.total)

              if (datas.length) {
                for (var i = 0, len = datas.length; i < len; i++) {
                  if (datas[i].securityRoles.length) {
                    var isShow = true
                    datas[i].securityRoles.forEach((role) => {
                      if (role.roleCode == 'platform_root') {
                        isShow = false
                      }
                    })
                    
                    if (!isShow) {
                      datas.splice(i, 1)
                      break
                    }
                  }
                }
              }
              this.itemList = datas
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
          enterpriseCode: this.$route.query.enterpriseCode,
          userName: '',
          userName: '',
          userWechatLogo: ''
        }

        this.isAddOEdit = true
      },
      confirmItem () {
        if (!this.itemData.userName) {
          this.$message({
              message: '请填写用户名称！',
              type: 'warning'
          })
          return false
        }

        if (!(/^1[3|4|5|8][0-9]{9}$/).test(this.itemData.userMobile.trim())) {
          this.$message.error('请输入11位用户手机号')
          return false
        }

        if (!this.itemData.userWechatLogo) {
          this.$message({
              message: '请填写用户名片！',
              type: 'warning'
          })
          return false
        }

        this.insertOrUpdateItem()
      },
      insertOrUpdateItem () {
        util.request({
            method: 'post',
            interface: 'addUser',
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
            interface: 'deleteUser',
            data: {
              enterpriseCode: this.$route.query.enterpriseCode,
              userCode: row.userCode,
              userMobile: row.userMobile
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
      upload
    }
}
</script>
<style lang="scss">
.user-list-wx-box {
  position: static;
  margin: 0 auto 30px;
}
</style>