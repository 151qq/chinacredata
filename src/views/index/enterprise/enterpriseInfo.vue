<template>
    <div class="form-discount">
        <div class="float-form-box">
          <div class="formDiscount static-box">
              <section class="formBox bigF">
                  <span>企业工商名称</span>
                  <div class="input-box">
                    {{base.enterpriseCname}}
                  </div>
              </section>

              <section class="formBox">
                  <span>企业简称</span>
                  <div class="input-box">
                    {{base.enterpriseNameReg}}
                  </div>
              </section>

              <section class="formBox">
                  <span>企业类型</span>
                  <div class="input-box">
                    {{base.enterpriseTypeName}}
                  </div>
              </section>

              <section class="formBox">
                  <span>企业法人</span>
                  <div class="input-box">
                    {{base.enterpriseCorporateRep}}
                  </div>
              </section>

              <section class="formBox">
                  <span>公司税号</span>
                  <div class="input-box">
                    {{base.enterpriseTaxNo}}
                  </div>
              </section>

              <section class="formBox">
                  <span>结算银行</span>
                  <div class="input-box">
                    {{base.enterpriseBank}}
                  </div>
              </section>

              <section class="formBox">
                  <span>银行账号</span>
                  <div class="input-box">
                    {{base.enterpriseBankAccount}}
                  </div>
              </section>
              
              <template v-if="base.enterpriseType == 'enterprise_type_0'">
                <section class="formBox">
                  <span>超级管理员</span>
                  <div class="input-box">
                    {{base.userName}}
                  </div>
                </section>

                <section class="formBox">
                    <span>企业职务</span>
                    <div class="input-box">
                      {{base.userPosition}}
                    </div>
                </section>
              </template>

              <section class="formBox">
                  <span>公司网站</span>
                  <div class="input-box">
                      {{base.enterpriseWeb}}
                  </div>
              </section>

              <section class="formBox bigF">
                <span>企业简介</span>
                <div class="input-box">
                    {{base.enterpriseAddrDetail}}
                </div>
              </section>

              <section class="formBox">
                <span>企业LOGO</span>
                <div class="static-small-img">
                  <img :src="base.enterpriseLogo">
                </div>
              </section>
            </div>
        </div>
    </div>
</template>
<script>
import util from '../../../assets/common/util'
import $ from 'Jquery'

export default {
    data () {
        return {
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
            }
        }
    },
    mounted () {
      this.getBase()
    },
    methods: {
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
              } else {
                  this.$message.error(res.result.message)
              }
          })
        }
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