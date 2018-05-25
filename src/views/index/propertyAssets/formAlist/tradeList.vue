<template>
    <section class="form-small-box">
      <router-link class="add-btn"
                    target="_blank"
                    v-if="isEdit"
                    :to="{
                      name: getUrlPath().name,
                      query: getUrlPath().query
                    }">
        <el-button type="primary" icon="plus" size="small">增加</el-button>
      </router-link>

      <el-table
        :data="barrieList"
        border
        style="width: 100%">
        <el-table-column
          label="交易时间">
          <template scope="scope">
            <span>{{scope.row.tradeDate.split(' ')[0]}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="交易甲方">
          <template scope="scope">
            <router-link class="black nav-hover"
                          target="_blank"
                          :to="{
                            name: 'enterprise-info',
                            query: {
                              enterpriseCode: scope.row.firstParty
                            }
                          }">
                {{scope.row.firstPartyName}}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
          label="交易乙方">
          <template scope="scope">
            <router-link class="black nav-hover"
                          target="_blank"
                          :to="{
                            name: 'enterprise-info',
                            query: {
                              enterpriseCode: scope.row.secondParty
                            }
                          }">
                {{scope.row.secondPartyName}}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="tradeTypeName"
          label="交易类型">
        </el-table-column>
        <el-table-column
          prop="stockRightRation"
          label="股权比例(%)">
        </el-table-column>
        <el-table-column
          prop="tradePrice"
          label="交易价格">
        </el-table-column>
        <el-table-column
          v-if="isEdit"
          label="操作"
          width="70">
          <template scope="scope">
            <i class="el-icon-delete2" @click="deleteItem(scope.row)"></i>
            <router-link class="el-icon-document"
                          target="_blank"
                          :to="{
                            name: getUrlPath(scope.row.id).name,
                            query: getUrlPath(scope.row.id).query
                          }">
            </router-link>
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
    </section>
</template>
<script>
import util from '../../../../assets/common/util'
import searchInput from '../../../../components/common/search-input'
import { mapGetters } from 'vuex'
export default {
    props: ['base', 'propertyCode', 'propertyType'],
    data () {
        return {
            barrieList: [],
            pageNumber: 1,
            pageSize: 5,
            total: 0
        }
    },
    mounted () {
      this.getList()
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
        getUrlPath (id) {
          var pathData = {}

          if (this.propertyType == 'property_type_1') {
            pathData = {
              name: 'form-office',
              query: {
                officeCode: this.propertyCode,
                type: 'trade'
              }
            }
          }

          if (this.propertyType == 'property_type_2') {
            pathData = {
              name: 'form-mall',
              query: {
                mallCode: this.propertyCode,
                type: 'trade'
              }
            }
          }

          if (id) {
            pathData.query.id = id
          }

          return pathData
        },
        getList () {
          util.request({
              method: 'get',
              interface: 'propertyTradeList',
              data: {
                propertyCode: this.propertyCode,
                pageNumber: this.pageNumber,
                pageSize: this.pageSize
              }
          }).then(res => {
              if (res.result.success == '1') {
                this.total = Number(res.result.total)
                this.barrieList = res.result.result.length ? res.result.result : []
              } else {
                this.$message.error(res.result.message)
              }
          })
        },
        pageChange (size) {
            this.pageNumber = size
            this.getList()
        },
        deleteItem (barrieData) {
          util.request({
              method: 'get',
              interface: 'propertyTradeDelete',
              data: {
                id: barrieData.id
              }
          }).then(res => {
              if (res.result.success == '1') {
                  this.getList()
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