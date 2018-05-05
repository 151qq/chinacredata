const routers = [
  {
    path: '/',
    name: 'home',
    component (resolve) {
      require.ensure(['./main.vue'], () => {
        resolve(require('./main.vue'))
      })
    },
    children: [
      {
        // 物业资产 - 商圈列表
        path: 'propertyAssets',
        name: 'propertyAssets',
        component (resolve) {
          require.ensure(['./propertyAssets/main.vue'], () => {
            resolve(require('./propertyAssets/main.vue'))
          })
        },
        children: [
          {
            // 企业信息
            path: '',
            name: 'zone-list',
            component (resolve) {
              require.ensure(['./propertyAssets/zoneList.vue'], () => {
                resolve(require('./propertyAssets/zoneList.vue'))
              })
            },
            meta: {
              title: '物业资产'
            }
          },
          {
            // 企业信息详情
            path: 'assetsList',
            name: 'assets-list',
            component (resolve) {
              require.ensure(['./propertyAssets/assetsList.vue'], () => {
                resolve(require('./propertyAssets/assetsList.vue'))
              })
            },
            meta: {
              title: '物业资产'
            }
          },
          {
            // 平台企业信息详情
            path: 'officeDetail',
            name: 'office-detail',
            component (resolve) {
              require.ensure(['./propertyAssets/officeDetail.vue'], () => {
                resolve(require('./propertyAssets/officeDetail.vue'))
              })
            },
            meta: {
              title: '写字楼'
            }
          },
          {
            // 平台企业信息详情
            path: 'mallDetail',
            name: 'mall-detail',
            component (resolve) {
              require.ensure(['./propertyAssets/mallDetail.vue'], () => {
                resolve(require('./propertyAssets/mallDetail.vue'))
              })
            },
            meta: {
              title: '购物中心'
            }
          }
        ],
        meta: {
          title: '物业资产'
        }
      },
      {
        // 企业信息
        path: 'enterprise',
        component (resolve) {
          require.ensure(['./enterprise/main.vue'], () => {
            resolve(require('./enterprise/main.vue'))
          })
        },
        children: [
          {
            // 企业信息
            path: '',
            name: 'enterprise',
            component (resolve) {
              require.ensure(['./enterprise/enterpriseList.vue'], () => {
                resolve(require('./enterprise/enterpriseList.vue'))
              })
            },
            meta: {
              title: '企业信息'
            }
          },
          {
            // 企业信息详情
            path: 'enterpriseDetail',
            name: 'enterprise-detail',
            component (resolve) {
              require.ensure(['./enterprise/enterpriseDetail.vue'], () => {
                resolve(require('./enterprise/enterpriseDetail.vue'))
              })
            },
            meta: {
              title: '企业信息'
            }
          },
          {
            // 平台企业信息详情
            path: 'platformDetail',
            name: 'platform-detail',
            component (resolve) {
              require.ensure(['./enterprise/platformDetail.vue'], () => {
                resolve(require('./enterprise/platformDetail.vue'))
              })
            },
            meta: {
              title: '企业信息'
            }
          }
        ]
      }
    ]
  },
  {
    // 登录页
    path: '/login',
    name: 'login',
    component (resolve) {
      require.ensure(['./login.vue'], () => {
        resolve(require('./login.vue'))
      })
    },
    meta: {
      title: '登录页'
    }
  }
]

export default routers
