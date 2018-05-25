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

                    <span class="btn-box" v-if="isPlatform">
                        <i @click.prevent="eidtItem(item)">编辑</i>
                    </span>
                    <span class="btn-box">
                        <i @click.prevent="deleteItem(item)">删除</i>
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
                <el-input type="number"
                          :disabled="!!itemData.id"
                          v-model="itemData.userMobile"></el-input>
            </el-form-item>
            <el-form-item label="角色" v-if="isPlatform">
              <section class="dia-check-body">
                <section v-for="(item, index) in roleDatas" 
                        :index="index"
                        @click.stop="selectRole(item)"
                        class="select-item-box"
                        :class="itemData.roleList.indexOf(item.roleCode) > -1 ? 'active' : ''">
                    {{item.roleName}}
                </section>
              </section>
            </el-form-item>
            <el-form-item label="用户名片">
                <upload :path="itemData.userWechatLogo"
                            :is-operate="true"
                            :bg-path="false"
                            :id-name="'userWechatLogo'"
                            @changeImg="changeImg"></upload>
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
    props: ['isPlatform'],
    data () {
        return {
          itemList: [],
          isAddOEdit: false,
          itemData: {
            userName: '',
            userMobile: '',
            userWechatLogo: '',
            roleList: ''
          },
          pageNumber: 1,
          pageSize: 20,
          total: 0,
          roleDatas: []
        }
    },
    mounted () {
      this.getRoleList()
      this.getItemList()
    },
    watch: {
      $route () {
        this.getRoleList()
        this.getItemList()
      }
    },
    methods: {
      getRoleList () {
        util.request({
            method: 'get',
            interface: 'roleList',
            data: {}
        }).then(res => {
            if (res.result.success == '1') {
              var datas = res.result.result
              this.total = Number(res.result.total)

              var roleList = []

              if (datas.length) {
                for (var i = 0, len = datas.length; i < len; i++) {
                  if (['platform_root', 'platform_user', 'enterprise_user'].indexOf(datas[i].roleCode) < 0) {
                    roleList.push(datas[i])
                  }
                }
              }
              this.roleDatas = roleList
            } else {
              this.$message.error(res.result.message)
            }
        })
      },
      changeImg (data) {
          this.itemData.userWechatLogo = data.url
      },
      eidtItem (item) {
        this.itemData = Object.assign({}, item)
        this.isAddOEdit = true
      },
      selectRole (item) {
        var roleList = []
        if (this.itemData.roleList.length) {
          roleList = this.itemData.roleList.split(',')
        }

        var index = roleList.indexOf(item.roleCode)

        if (index > -1) {
          roleList.splice(index, 1)
        } else {
          roleList.push(item.roleCode)
        }

        this.itemData.roleList = roleList.join(',') 
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

              var userList = []

              if (datas.length) {
                for (var i = 0, len = datas.length; i < len; i++) {
                  if (datas[i].securityRoles.length) {
                    var isShow = true
                    var roleList = []
                    datas[i].securityRoles.forEach((role) => {
                      if (role.roleCode == 'platform_root') {
                        isShow = false
                      }

                      if (['platform_root', 'platform_user', 'enterprise_user'].indexOf(role.roleCode) < 0) {
                        roleList.push(role.roleCode)
                      }
                    })
                    
                    if (isShow) {
                      datas[i].roleList = roleList.join(',')
                      userList.push(datas[i])
                    }
                  }
                }
              }
              this.itemList = userList
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
          isPlatform: this.isPlatform ? '1' : '0',
          userName: '',
          userMobile: '',
          userWechatLogo: '',
          roleList: ''
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
        var interfaceName = 'addUser'

        if (this.itemData.id) {
          interfaceName = 'updateUser'
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