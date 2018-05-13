<template>
    <div class="card-list-box">
        <div class="input-box">
            <input
                placeholder="请输入需查询条件"
                v-model="keyValue"
                @keyup.13="searchItem"
                class="input-search">
            <el-button class="search-btn" type="primary" icon="search" @click="searchItem">
              搜索
            </el-button>

            <el-button class="add-new-btn" type="primary" icon="plus" @click="addItem">增加</el-button>
        </div>
        
        <!-- 列表 -->
        <div class="clear"></div>
        <template v-if="sourceDatas.length">
            <section class="check-box" v-for="(item, index) in sourceDatas" :key="index">
                <!-- 选择框 -->
                <router-link class="sou-box"
                            target="_blank"
                            :to="{
                                name: 'securit-list',
                                query: {
                                    enterpriseCode: userInfo.enterpriseCode,
                                    exchangeCode: item.exchangeCode,
                                    exchangeName: item.exchangeName
                                }
                            }">
                    <div class="cover-box">
                        <img :src="item.exchangeCover">
                    </div>
                    <div class="title-box">
                        <div class="title">{{item.exchangeName}}</div>
                        <div class="time">
                            <span>
                                {{item.zoneTypeName}}
                            </span>
                            <span class="btn-box">
                                <i @click.prevent="editItem(item)" class="el-icon-document"></i>
                            </span>

                            <span class="btn-box">
                                <i @click.prevent="deleteItem(item.exchangeCode)" class="el-icon-delete2"></i>
                            </span>
                        </div>
                    </div>
                </router-link>
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
        </template>
        <!-- 无内容 -->
        <section v-else class="no-img">
            暂无交易所，请添加！！！
        </section>
        
        <!-- 添加弹窗 -->
        <el-dialog :title="operateText" :visible.sync="isAddItem">
          <el-form :label-position="'left'" :model="addItemForm" label-width="100px">
            <el-form-item label="交易所名称">
                <el-input v-model="addItemForm.exchangeName"
                            :maxlength="20"
                            placeholder="请输入内容，最多12个字"></el-input>
            </el-form-item>
            
            <el-form-item label="交易所描述">
                <el-input
                    type="textarea"
                    :rows="3"
                    placeholder="请输入内容"
                    :maxlength="500"
                    v-model="addItemForm.exchangeDesc">
                </el-input>
                <div class="limit-box">剩余<a>{{500 - addItemForm.exchangeDesc.length}}</a>字</div>
            </el-form-item>
            
            <el-form-item label="交易所图片">
                <upload-file :path="addItemForm.exchangeCover"
                            :is-operate="true"
                            :bg-path="false"
                            :id-name="'exchangeCover'"
                            @changeImg="changeImg"></upload-file>
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
            keyValue: '',
            // 获取
            sourceDatas: [],
            pageNumber: 1,
            pageSize: 15,
            total: 0,
            // 添加
            operateText: '添加',
            isAddItem: false,
            addItemForm: {
                enterpriseCode: '',
                exchangeName:'',
                exchangeDesc:'',
                exchangeCover:'',
                exchangeCode:''
            },
            tradingAreaTypes: []
        }
    },
    mounted () {
        this.getItems()
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo'
        })
    },
    methods: {
        searchItem () {
            this.getItems()
        },
        // 增删改查
        getItems () {
            var formData = {
                pageSize: this.pageSize,
                pageNumber: this.pageNumber
            }

            if (this.keyValue) {
                formData.exchangeName = this.keyValue
            }

            util.request({
                method: 'get',
                interface: 'exchangeInfoList',
                data: formData
            }).then(res => {
                if (res.result.success == '1') {
                    this.total = Number(res.result.total)
                    this.sourceDatas = res.result.result
                } else {
                    this.$message.error(res.result.message)
                }
            }) 
        },
        insterItem () {
            util.request({
                method: 'post',
                interface: 'exchangeInfoSave',
                data: this.addItemForm
            }).then(res => {
                if (res.result.success == '1') {
                    // 重置分页 刷新列表 关闭弹窗
                    this.$message({
                        message: '恭喜你，保存成功！',
                        type: 'success'
                    })
                    this.pageNumber = 1
                    this.isAddItem = false
                    this.getItems()
                } else {
                    this.$message.error(res.result.message)
                }
            })       
        },
        updateItem () {
            util.request({
                method: 'post',
                interface: 'exchangeInfoUpdate',
                data: this.addItemForm
            }).then(res => {
                if (res.result.success == '1') {
                    // 刷新列表 关闭弹窗
                    this.$message({
                        message: '恭喜你，保存成功！',
                        type: 'success'
                    })
                    this.isAddItem = false
                    this.getItems(this.currentParentCode)
                } else {
                    this.$message.error(res.result.message)
                }
            })       
        },
        deleteItem (code) {
            util.request({
                method: 'get',
                interface: 'exchangeInfoDelete',
                data: {
                    exchangeCode: code
                }
            }).then(res => {
                if (res.result.success == '1') {
                    this.getItems()
                } else {
                    this.$message.error(res.result.message)
                }
            })       
        },
        pageChange (size) {
            this.itemPageNumber = size
            this.getItems()
        },
        // 添加 编辑
        addItem () {
            this.operateText = '添加'
            this.addItemForm = {
                enterpriseCode: this.$route.query.enterpriseCode,
                exchangeName:'',
                exchangeDesc:'',
                exchangeCover:'',
                exchangeCode:''
            }

            this.isAddItem = true
        },
        editItem (item) {
            this.operateText = '编辑'
            this.addItemForm = Object.assign({}, item)
            this.isAddItem = true
        },
        changeImg (data) {
            this.addItemForm.exchangeCover = data.url
        },
        confirmItem () {
            if (!this.addItemForm.exchangeName) {
                this.$message({
                    message: '请输入交易所名称！',
                    type: 'warning'
                })
                return false
            }
            if (!this.addItemForm.exchangeCover) {
                this.$message({
                    message: '请上传交易所图片！',
                    type: 'warning'
                })
                return false
            }

            if (this.addItemForm.exchangeCode) {
                this.updateItem()
            } else {
                this.insterItem()
            }
        }
    },
    components: {
        uploadFile
    }
}
</script>