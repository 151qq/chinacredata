<template>
    <div class="form-discount">
        <el-collapse v-model="activeNames" @change="collChange">
          <!-- 基本信息 -->
          <el-collapse-item class="float-form-box" title="基本信息" name="1">
            <div class="formDiscount">
              <section class="formBox btnB">
                  <span>企业工商名称</span>
                  <el-input
                    class="input-box"
                    placeholder="请输入标题，最多25个字"
                    v-model="base.enterpriseCname">
                  </el-input>
                  <div class="btn-box"
                      :class="base.enterpriseCname ? '' : 'noClick'"
                      @click="getEnterpriseInfo">查询</div>
              </section>

              <section class="formBox">
                  <span>企业简称</span>
                  <el-input
                    class="input-box"
                    placeholder="请输入简称，最多12个字"
                    :maxlength="12"
                    v-model="base.enterpriseNameReg">
                  </el-input>
              </section>

              <section class="formBox">
                  <span>企业类型</span>
                  <el-select class="input-box"
                            v-model="base.enterpriseType"
                            placeholder="请选择">
                      <el-option
                        v-for="item in enterpriseTypes"
                        :key="item.id"
                        :label="item.dictKeyValue"
                        :value="item.dictKeyCode">
                      </el-option>
                  </el-select>
              </section>

              <section class="formBox">
                  <span>企业法人</span>
                  <el-input
                    class="input-box"
                    placeholder="请输入内容"
                    v-model="base.enterpriseCorporateRep">
                  </el-input>
              </section>

              <section class="formBox">
                  <span>公司税号</span>
                  <el-input
                    class="input-box"
                    placeholder="请输入内容"
                    v-model="base.enterpriseTaxNo">
                  </el-input>
              </section>

              <section class="formBox">
                  <span>结算银行</span>
                  <el-input
                    class="input-box"
                    placeholder="请输入内容"
                    v-model="base.enterpriseBank">
                  </el-input>
              </section>

              <section class="formBox">
                  <span>银行账号</span>
                  <el-input
                    class="input-box"
                    placeholder="请输入内容"
                    v-model="base.enterpriseBankAccount">
                  </el-input>
              </section>

              <section class="formBox">
                  <span>公司网站</span>
                  <el-input
                    class="input-box"
                    placeholder="请输入内容"
                    v-model="base.enterpriseWeb">
                  </el-input>
              </section>
              
              <template v-if="base.enterpriseType == 'enterprise_type_0'">
                <section class="formBox">
                  <span>超级管理员</span>
                  <div class="input-btn-box">
                    <el-input
                      class="input-b"
                      placeholder="请输入内容"
                      @blur="checkUserName"
                      v-model="base.userName">
                    </el-input>

                    <el-button class="input-btn"
                              type="primary"
                              size="small"
                              :disabled="hasTel"
                              @click="checkName">验证</el-button>
                  </div>
                  
                </section>

                <section class="formBox">
                    <span>企业职务</span>
                    <el-input
                      class="input-box"
                      placeholder="请输入内容"
                      v-model="base.userPosition">
                    </el-input>
                </section>
              </template>

              <section class="formBox bigF">
                <span>企业简介</span>
                <el-input
                  type="textarea"
                  :rows="4"
                  :maxlength="500"
                  placeholder="请输入内容"
                  v-model="base.enterpriseAddrDetail">
                </el-input>
                <div class="limit-box">剩余<a>{{500 - base.enterpriseAddrDetail.length}}</a>字</div>
              </section>

              <section class="formBox">
                <span>企业LOGO</span>
                <div class="input-box">
                  <div class="logo-upload">
                    <upload :path="base.enterpriseLogo"
                            :bg-path="true"
                            :is-operate="true"
                            :img-width="'120px'"
                            @changeImg="changeImg"></upload>
                  </div>
                </div>
              </section>
              
              <div class="clear"></div>
              <el-button class="save-btn" type="info" :plain="true" size="small" icon="document"
              @click="saveBase">保存</el-button>
            </div>
          </el-collapse-item>

          <template v-if="!!$route.query.enterpriseCode">
            <div class="line-bold"></div>
            <el-collapse-item class="float-form-box" title="员工管理" name="2">
              <user-list></user-list>
            </el-collapse-item>
          </template>
        </el-collapse>

        <el-dialog
            title="手机验证"
            :visible.sync="dialogVisible"
            size="tiny">
          
            <div class="form-check-tel">
                <section>
                    <span>手机</span>
                    <el-input placeholder="请输入内容" @input="checkTel" v-model="base.userMobile"></el-input>
                </section>
                <section>
                    <span>验证码</span>
                    <el-input placeholder="请输入内容" v-model="checkData.code">
                        <template v-if="timer" slot="append">
                            <span class="secondBox">剩余<i>{{seconds}}</i>秒</span>
                        </template>
                        <template v-else slot="append">
                            <span class="codeBox clickBox" :class="{clickBox: isClick}" @click="getCode">获取验证码</span>
                        </template>
                    </el-input>
                </section>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="checkTelphone">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import util from '../../../assets/common/util'
import $ from 'Jquery'
import upload from '../../../components/common/uploadFile'
import userList from './formAlist/userList'

export default {
    data () {
        return {
            isOperate: true,
            activeNames: ['1'],
            isCheckTel: false,
            hasTel: false,
            userName: '',
            base: {
              enterpriseAddrCity: '',
              enterpriseAddrDetail: '',
              enterpriseBank: '',
              enterpriseBankAccount: '',
              enterpriseCname: '',
              enterpriseCode: '',
              enterpriseCorporateRep: '',
              enterpriseIndustry: '',
              enterpriseInvoiceTitle: '',
              enterpriseInvoiceType: '',
              enterpriseLogo: '',
              enterpriseNameReg: '',
              enterprisePlatformSales: '',
              enterpriseRegDate: '',
              enterpriseScale: '',
              enterpriseStatus: '',
              enterpriseTaxNo: '',
              enterpriseZipCode: '',
              enterpriseType: '',
              enterpriseWeb: '',
              userName: '',
              userMobile: '',
              userPosition: ''
            },
            enterpriseTypes: [],
            // 手机验证
            isClick: false,
            dialogVisible: false,
            checkData: {
                code: ''
            },
            timer: null,
            seconds: 90,
            productEventList: [],
            isPost: false
        }
    },
    mounted () {
      var surveyColl = localStorage.getItem("enterpriseColl")
      if (surveyColl) {
          this.activeNames = surveyColl.split(',')
      }
      if (this.$route.query.enterpriseCode) {
        this.getBase()
      }
      
      this.getEnterpriseTypes()
    },
    methods: {
        changeImg (data) {
            this.base.enterpriseLogo = data.url
        },
        getEnterpriseInfo () {
          if (this.base.enterpriseCname === '') {
            this.$message({
              message: '请填写企业工商名称!',
              type: 'warning'
            })
            return false
          }

          util.request({
              method: 'get',
              interface: 'enterpriseQCCGet',
              data: {
                  enterpriseCname: this.base.enterpriseCname
              }
          }).then((res) => {
              if (res.result.success == '1') {
                  var data = res.result.result
                  if (data) {
                    var enterpriseData = {
                      enterpriseBank: data.enterpriseBank,
                      enterpriseBankAccount: data.enterpriseBankAccount,
                      enterpriseTaxNo: data.enterpriseTaxNo,
                      enterpriseCorporateRep: data.enterpriseCorporateRep
                    }

                    this.base = Object.assign(this.base, enterpriseData)
                  } else {
                    this.$message({
                      message: '该企业不存在!',
                      type: 'warning'
                    })
                  }
              } else {
                  this.$message.error(res.result.message)
              }
          })
        },
        checkUserName () {
          if (this.userName != '' && this.base.userName == this.userName) {
            this.hasTel = true
          } else {
            this.hasTel = false
          }
        },
        checkName () {
          if (this.isCheckTel) {
            return false
          }

          if (this.base.userName == '') {
              this.$message({
                message: '请先填写超级管理员!',
                type: 'warning'
              })
              return false
          }

          this.dialogVisible = true
        },
        checkTel () {
          if (!(/^1[3|4|5|8][0-9]{9}$/).test(this.base.userMobile.trim())) {
              this.isClick = false
          } else {
              this.isClick = true
          }
        },
        getCode () {
            util.request({
                method: 'get',
                interface: 'getValidateCode',
                data: {
                    mobile: this.base.userMobile
                }
            }).then((res) => {
                if (res.result.success == '1') {
                    this.timer = setInterval(() => {
                        this.seconds--
                        if (this.seconds === 0) {
                            clearInterval(this.timer)
                            this.seconds = 90
                            this.timer = null
                        }
                    }, 1000)
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        checkTelphone () {
          util.request({
                method: 'get',
                interface: 'valiSmsPass',
                data: {
                    mobile: this.base.userMobile,
                    smsContent: this.checkData.code
                }
            }).then((res) => {
                if (res.result.success == '1') {
                    if (res.result.result == '1') {
                      this.isCheckTel = true
                      this.dialogVisible = false
                      this.checkData.code = ''
                      clearInterval(this.timer)
                      this.timer = null
                    } else {
                      this.isCheckTel = false
                      this.$message({
                        message: '手机验证码不正确!',
                        type: 'warning'
                      })
                    }
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        getBase () {
          util.request({
              method: 'get',
              interface: 'showEnterpriseInfo',
              data: {
                enterpriseCode: this.$route.query.enterpriseCode
              }
          }).then((res) => {
              if (res.result.success == '1') {
                  this.base = res.result.result
                  this.userName = this.base.userName
                  this.isCheckTel = true
                  this.switchStatus = this.base.enterpriseStatus
              } else {
                  this.$message.error(res.result.message)
              }
          })
        },
        getEnterpriseTypes () {
          util.request({
              method: 'get',
              interface: 'findDictionaryByType',
              data: {
                typeCode: 'enterprise_type'
              }
          }).then((res) => {
              if (res.result.success == '1') {
                  this.enterpriseTypes = res.result.result
              } else {
                  this.$message.error(res.result.message)
              }
          })
        },
        collChange () {
            localStorage.setItem("enterpriseColl", this.activeNames)
        },
        saveBase () {
          // if (this.isPost) {
          //   return false
          // }

          if (!this.base.enterpriseCname) {
            this.$message({
              message: '请填写企业工商名称!',
              type: 'warning'
            })
            return false
          }

          if (this.base.enterpriseNameReg == '') {
              this.$message({
                message: '请填写企业简称!',
                type: 'warning'
              })
              return false
          }

          if (this.base.enterpriseType == '') {
              this.$message({
                message: '请填写企业类型!',
                type: 'warning'
              })
              return false
          }

          if (this.base.userName == '' && this.base.enterpriseType == 'enterprise_type_0') {
              this.$message({
                message: '请填写超级管理员!',
                type: 'warning'
              })
              return false
          }

          if ((this.userName == '' || this.base.userName !== this.userName) && !this.isCheckTel && this.base.enterpriseType == 'enterprise_type_0') {
            this.dialogVisible = true
            return false
          }

          if (this.base.enterpriseWeb == '') {
              this.$message({
                message: '请填写公司网站!',
                type: 'warning'
              })
              return false
          }

          if (this.base.enterpriseLogo == '') {
              this.$message({
                message: '请填加企业LOGO!',
                type: 'warning'
              })
              return false
          }

          this.isPost = true

          util.request({
              method: 'post',
              interface: 'enterpriseWechatInfoSave',
              data: this.base
          }).then((res) => {
              this.isPost = false
              if (res.result.success == '1') {
                  this.$message({
                    message: '恭喜你，保存成功!',
                    type: 'success'
                  })

                  if (this.$route.query.enterpriseCode) {
                    this.getBase()
                  } else {

                    window.location.replace('/enterprise/enterpriseDetail?enterpriseCode=' + res.result.result)
                  }
              } else {
                  this.$message.error(res.result.message)
              }
          })
        }
    },
    components: {
      upload,
      userList
    }
}
</script>
<style lang="scss">
.null-page-box {
    text-align: center;
    font-size: 14px;
    line-height: 80px;
    color: #999999;
    padding-top: 20px;
}

.form-check-tel {
  section {
    position: relative;
    height: 36px;
    padding-left: 60px;
    margin-bottom: 15px;

    .el-input-group__append {
      background-color: #20a0ff;
      border: 1px solid #20a0ff;
      color: #f0f0f0;
    }

    &>span {
      position: absolute;
      left: 0;
      top: 0;
      width: 60px;
      height: 40px;
      line-height: 36px;
    }

    .secondBox {
      color: #ffffff;
    }

    .clickBox {
      color: #ffffff;
      cursor: pointer;
    }
  }
}
</style>