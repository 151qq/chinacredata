<template>
    <section class="form-small-box">
      <router-link class="add-btn"
                    target="_blank"
                    v-if="isEdit"
                    :to="{
                      name: 'form-office',
                      query: {
                        officeCode: $route.query.officeCode,
                        type: 'officeIncome'
                      }
                    }">
        <el-button type="primary" icon="plus" size="small">增加</el-button>
      </router-link>

      <el-table
        :data="barrieList"
        border
        style="width: 100%">
        <el-table-column
          prop="dateStart"
          label="开始时间">
        </el-table-column>
        <el-table-column
          prop="dateEnd"
          label="结束时间">
        </el-table-column>
        <el-table-column
          prop="totalIncome"
          label="总收入(元)">
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
                            name: 'form-office',
                            query: {
                              officeCode: scope.row.officeCode,
                              type: 'officeIncome',
                              id: scope.row.id
                            }
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
import { mapGetters } from 'vuex'
export default {
    props: ['base'],
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
        getList () {
          util.request({
              method: 'get',
              interface: 'officeIncomeList',
              data: {
                officeCode: this.$route.query.officeCode,
                pageNumber: this.pageNumber,
                pageSize: this.pageSize
              }
          }).then(res => {
              if (res.result.success == '1') {
                this.total = Number(res.result.total)
                this.barrieList = res.result.result
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
              interface: 'officeIncomeDelete',
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
    }
}
</script>