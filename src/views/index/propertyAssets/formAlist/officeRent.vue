<template>
    <section class="form-small-box">
      <router-link class="add-btn"
                    target="_blank"
                    v-if="isEdit"
                    :to="{
                      name: 'form-office',
                      query: {
                        officeCode: $route.query.officeCode,
                        type: 'officeRent'
                      }
                    }">
        <el-button type="primary" icon="plus" size="small">增加</el-button>
      </router-link>

      <el-table
        :data="barrieList"
        border
        style="width: 100%">
        <el-table-column
          label="开始时间">
          <template scope="scope">
            <span>{{scope.row.beginDate}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="结束时间">
          <template scope="scope">
            <span>{{scope.row.endDate}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="averageRent"
          label="平均租金(元 ㎡/天)">
        </el-table-column>
        <el-table-column
          prop="averageVacancy"
          label="平均空置率(%)">
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
                              type: 'officeRent',
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
              interface: 'officeRentHistoryList',
              data: {
                officeCode: this.$route.query.officeCode,
                pageNumber: this.pageNumber,
                pageSize: this.pageSize
              }
          }).then(res => {
              if (res.result.success == '1') {
                this.total = Number(res.result.total)

                if (res.result.result.length) {
                  res.result.result.forEach((item) => {
                    item.averageRent = (Number(item.rentHighLevel) + Number(item.rentMiddleLevel) + Number(item.rentLowLevel) + Number(item.rentUndergroundBusiness) + Number(item.rentBusiness)) / 7
                  })
                }

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
              interface: 'officeRentHistoryDelete',
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