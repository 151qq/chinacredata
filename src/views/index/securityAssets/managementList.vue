<template>
    <div class="image-su-box">
        <div class="btn-input-box">
            <el-button class="add-new-btn"
                       type="primary"
                       icon="plus"
                       @click="addItem">增加</el-button>
        </div>
        <!-- 内容 -->
        <template v-if="sourceDatas.length">
            <router-link v-for="(item, index) in sourceDatas"
                        class="check-box"
                        target="_blank"
                        :to="{
                            name: 'management-detail',
                            query: {
                                enterpriseCode: userInfo.enterpriseCode,
                                assetManagementProductCode: item.assetManagementProductCode
                            }
                        }">
                
                <section class="sou-box">
                    <!-- 图片 -->
                    <div class="cover-box">
                        <img class="cover-img" :src="item.assetManagementProductCover">
                    </div>
                    <div class="title-box">
                        <div class="title" v-text="item.assetManagementProductShortName"></div>
                        <span class="time">
                            {{item.securityTypeName}}
                            <span class="btn-box" v-if="item.recoder == userInfo.userCode">
                                <i @click.prevent="editItem(item)" class="el-icon-document"></i>
                            </span>
                        </span>
                    </div>
                </section>
            </router-link>
        </template>
        <section v-if="!sourceDatas.length" class="no-img">
            暂无内容！！！
        </section>
        
        <div class="clear"></div>
        <el-pagination
            v-if="total"
            class="page-box"
            @current-change="pageChange"
            layout="prev, pager, next"
            :page-size="pageSize"
            :total="total">
        </el-pagination>
        <div class="clear"></div>

        <el-dialog title="资管产品" :visible.sync="isAddItem">
          <el-form :label-position="'left'" :model="addItemForm" label-width="80px">
            <el-form-item label="产品名称">
                <el-input v-model="addItemForm.assetManagementProductName"
                          placeholder="请输入内容"
                          :maxlength="40"></el-input>
            </el-form-item>
            <el-form-item label="产品简称">
                <el-input v-model="addItemForm.assetManagementProductShortName"
                          placeholder="请输入内容,最多16个字"
                          :maxlength="14"></el-input>
            </el-form-item>
            <el-form-item label="产品照片">
                <upload-file :path="addItemForm.assetManagementProductCover"
                        :is-operate="true"
                        :bg-path="false"
                        :id-name="'assetManagementProductCover'"
                        @changeImg="changeItem"></upload-file>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
                <el-button @click="isAddItem = false">取 消</el-button>
                <el-button type="primary" @click="confirmItem">保 存</el-button>
          </div>
        </el-dialog>
    </div>
</template>
<script>
import uploadFile from '../../../components/common/uploadFile.vue'
import util from '../../../assets/common/util'
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            sourceDatas: [],
            isCheck: false,
            isAddItem: false,
            addItemForm: {
                exchangeCode: '',
                assetManagementProductCode: '',
                assetManagementProductName: '',
                assetManagementProductShortName: '',
                assetManagementProductCover: '',
                securityType: ''
            },
            pageNumber: 1,
            pageSize: 15,
            total: 0
        }
    },
    mounted () {
        this.getItems()
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo',
            selectExchange: 'getSelectExchange'
        })
    },
    watch: {
       selectExchange () {
           this.getItems()
       } 
    },
    methods: {
        addItem () {
            this.addItemForm = {
                exchangeCode: this.selectExchange.exchangeCode,
                assetManagementProductCode: '',
                assetManagementProductName: '',
                assetManagementProductShortName: '',
                assetManagementProductCover: '',
                assetManagementProductStatus: '1',
                securityType: 'security_type_1'
            }

            this.isAddItem = true
        },
        editItem (item) {
            this.addItemForm = Object.assign({}, item)
            this.isAddItem = true
        },
        changeItem (data) {
            this.addItemForm.assetManagementProductCover = data.url
        },
        confirmItem () {
            if (!this.addItemForm.assetManagementProductName) {
                this.$message({
                    message: '请填产品名称！',
                    type: 'warning'
                })
                return false
            }

            if (!this.addItemForm.assetManagementProductShortName) {
                this.$message({
                    message: '请填写产品简称！',
                    type: 'warning'
                })
                return false
            }

            if (!this.addItemForm.assetManagementProductCover) {
                this.$message({
                    message: '请添加产品照片！',
                    type: 'warning'
                })
                return false
            }

            if (this.addItemForm.noObjectionDate) {
                this.addItemForm.noObjectionDate = new Date(this.addItemForm.noObjectionDate)
            }

            if (this.addItemForm.fundRegisteDate) {
                this.addItemForm.fundRegisteDate = new Date(this.addItemForm.fundRegisteDate)
            }

            if (this.addItemForm.createdDate) {
                this.addItemForm.createdDate = new Date(this.addItemForm.createdDate)
            }

            if (this.addItemForm.fundBeginDate) {
                this.addItemForm.fundBeginDate = new Date(this.addItemForm.fundBeginDate)
            }

            if (this.addItemForm.fundEndDate) {
                this.addItemForm.fundEndDate = new Date(this.addItemForm.fundEndDate)
            }

            if (this.addItemForm.listedDate) {
                this.addItemForm.listedDate = new Date(this.addItemForm.listedDate)
            }

            this.addItemForm.enterpriseCode = this.$route.query.enterpriseCode

            if (this.addItemForm.assetManagementProductCode) {
                this.updateItem()
            } else {
                this.insterItem()
            }
        },
        getItems () {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                exchangeCode: this.selectExchange.exchangeCode,
                pageNumber: this.pageNumber,
                pageSize: this.pageSize
            }

            util.request({
                method: 'get',
                interface: 'assetManagementProductInfoList',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    this.sourceDatas = res.result.result
                } else {
                    this.$message.error(res.result.message)
                }
            })       
        },
        pageChange (size) {
            this.pageNumber = size
            this.getItems()
        },
        insterItem () {
            util.request({
                method: 'post',
                interface: 'assetManagementProductInfoSave',
                data: this.addItemForm
            }).then(res => {
                if (res.result.success == '1') {
                    this.itemPageNumber = 1
                    this.getItems()
                    this.isAddItem = false
                } else {
                    this.$message.error(res.result.message)
                }
            })       
        },
        updateItem () {
            util.request({
                method: 'post',
                interface: 'assetManagementProductInfoUpdate',
                data: this.addItemForm
            }).then(res => {
                if (res.result.success == '1') {
                    this.getItems()
                    this.isAddItem = false
                } else {
                    this.$message.error(res.result.message)
                }
            })       
        }
    },
    components: {
        uploadFile
    }
}
</script>