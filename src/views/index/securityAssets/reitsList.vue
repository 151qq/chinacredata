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
                            name: 'reits-detail',
                            query: {
                                enterpriseCode: userInfo.enterpriseCode,
                                foreignReitsCode: item.foreignReitsCode
                            }
                        }">
                
                <section class="sou-box">
                    <!-- 图片 -->
                    <div class="cover-box">
                        <img class="cover-img" :src="item.foreignReitsCover">
                    </div>
                    <div class="title-box">
                        <div class="title" v-text="item.foreignReitsName"></div>
                        <span class="time">
                            {{item.securityTypeName}}
                            <span class="btn-box" v-if="item.recoder == userInfo.userCode">
                                <i @click.prevent="editItem(item)">编辑</i>
                            </span>
                            <span class="btn-box"
                                    v-if="item.recoder == userInfo.userCode && item.stockStatus == '1'">
                                <i @click.prevent="changeStatus(item, '2')">下架</i>
                            </span>
                            <span class="btn-box"
                                v-if="item.recoder == userInfo.userCode && item.stockStatus == '0'">
                                <i @click.prevent="changeStatus(item, '1')">发布</i>
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

        <el-dialog title="海外REITs" :visible.sync="isAddItem">
          <el-form :label-position="'left'" :model="addItemForm" label-width="80px">
            <el-form-item label="产品名称">
                <el-input v-model="addItemForm.foreignReitsName"
                          placeholder="请输入内容,最多40个字"
                          :maxlength="40"></el-input>
            </el-form-item>
            <el-form-item label="产品照片">
                <upload-file :path="addItemForm.foreignReitsCover"
                        :is-operate="true"
                        :bg-path="false"
                        :id-name="'foreignReitsCover'"
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
                foreignReitsCode: '',
                assetManagementProductName: '',
                foreignReitsName: '',
                foreignReitsCover: '',
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
                exchangeCode: this.$route.query.exchangeCode,
                foreignReitsCode: '',
                assetManagementProductName: '',
                foreignReitsName: '',
                foreignReitsCover: '',
                stockStatus: '0',
                securityType: 'security_type_1'
            }

            this.isAddItem = true
        },
        editItem (item) {
            this.addItemForm = Object.assign({}, item)
            this.isAddItem = true
        },
        changeItem (data) {
            this.addItemForm.foreignReitsCover = data.url
        },
        confirmItem () {
            if (!this.addItemForm.foreignReitsName) {
                this.$message({
                    message: '请填产品名称！',
                    type: 'warning'
                })
                return false
            }

            if (!this.addItemForm.foreignReitsCover) {
                this.$message({
                    message: '请添加产品照片！',
                    type: 'warning'
                })
                return false
            }

            this.addItemForm.enterpriseCode = this.$route.query.enterpriseCode

            if (this.addItemForm.foreignReitsCode) {
                this.updateItem()
            } else {
                this.insterItem()
            }
        },
        changeStatus (item, status) {
            util.request({
                method: 'get',
                interface: 'foreignReitsInfoUpdate',
                data: {
                    foreignReitsCode: item.foreignReitsCode,
                    stockStatus: status
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.sourceDatas = res.result.result
                } else {
                    this.$message.error(res.result.message)
                }
            })
        },
        getItems () {
            var formData = {
                enterpriseCode: this.$route.query.enterpriseCode,
                exchangeCode: this.$route.query.exchangeCode,
                pageNumber: this.pageNumber,
                pageSize: this.pageSize
            }

            if (this.selectExchange.exchangeCode) {
                formData.exchangeCode = this.selectExchange.exchangeCode
            }

            util.request({
                method: 'get',
                interface: 'foreignReitsInfoList',
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
                interface: 'foreignReitsInfoSave',
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
                interface: 'foreignReitsInfoUpdate',
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