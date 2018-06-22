import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
// import sdkFunc from './../utils/sdkfunc'
// import store from './../store/index'

Vue.use(Router)
// Vue.use(sdkFunc)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: '/index',
          name: 'Index',
          component (resolve) {
            require(['@/pages/indexPage'], resolve)
          }
        },
        // 预约挂号
        {
          path: '/hospList',
          name: 'HospList',
          component (resolve) {
            require(['@/pages/AppointmentRegister/HospList'], resolve)
          }
        },
        {
          path: '/departmentList',
          name: 'DepartmentList',
          component (resolve) {
            require(['@/pages/AppointmentRegister/DepartmentList'], resolve)
          }
        },
        {
          path: '/doctorList',
          name: 'DoctorList',
          component (resolve) {
            require(['@/pages/AppointmentRegister/DoctorList'], resolve)
          }
        },
        {
          path: '/doctorHomepage',
          name: 'DoctorHomepage',
          component (resolve) {
            require(['@/pages/AppointmentRegister/DoctorHomepage'], resolve)
          }
        },
        {
          path: '/regConfirm',
          name: 'RegistrationConfirm',
          component (resolve) {
            require(['@/pages/AppointmentRegister/RegistrationConfirmPage'], resolve)
          }
        },
        {
          path: '/rule',
          name: 'Rule',
          component (resolve) {
            require(['@/pages/AppointmentRegister/Rule'], resolve)
          }
        },
        // 挂号--挂号单详情
        {
          path: '/regDetail/:id',
          name: 'RegistrationDetail',
          component (resolve) {
            require(['@/pages/AppointmentRegister/RegistrationDetailPage'], resolve)
          }
        },
        {
          path: '/registerList',
          name: 'RegisterList',
          component (resolve) {
            require(['@/pages/AppointmentRegister/RegisterList'], resolve)
          }
        },
        // 医院主页
        {
          path: '/hospHomepage',
          name: 'HospHomepage',
          component (resolve) {
            require(['@/pages/HospHomepage/HospHomepage'], resolve)
          }
        },
        {
          path: '/hospSituation/:id',
          name: 'HospSituation',
          component (resolve) {
            require(['@/pages/HospHomepage/HospSituation'], resolve)
          }
        },
        // 家庭成员
        {
          path: '/familyMembers',
          name: 'FamilyMembers',
          component (resolve) {
            require(['@/pages/FamilyMember/FamilyMembers'], resolve)
          }
        },
        {
          path: '/addMembers',
          name: 'AddMember',
          component (resolve) {
            require(['@/pages/FamilyMember/AddMember'], resolve)
          }
        },
        {
          path: '/deleteMember',
          name: 'DeleteMember',
          component (resolve) {
            require(['@/pages/FamilyMember/deleteMember'], resolve)
          }
        },
        // 签约查询
        {
          path: '/signQueryResult',
          name: 'SignQueryResult',
          component (resolve) {
            require(['@/pages/FamilyMember/SignQueryResult'], resolve)
          }
        },
        {
          path: '/signQuery',
          name: 'SignQuery',
          component (resolve) {
            require(['@/pages/FamilyMember/signQuery'], resolve)
          }
        },
        // 办事指南
        {
          path: '/guideList',
          name: 'GuideList',
          component (resolve) {
            require(['@/pages/Guide/GuideList'], resolve)
          }
        },
        {
          path: '/guideDetail/:id',
          name: 'GuideDetail',
          component (resolve) {
            require(['@/pages/Guide/GuideDetail'], resolve)
          }
        },
        // 检查检验--报告单详情
        {
          path: '/inspectionList',
          name: 'InspectionList',
          component (resolve) {
            require(['@/pages/InspectionPage/InspectionList'], resolve)
          }
        },
        {
          path: '/inspectionDetail/:id',
          name: 'InspectionDetail',
          component (resolve) {
            require(['@/pages/InspectionPage/InspectionDetail'], resolve)
          }
        },
        {
          path: '/serviceAgreement',
          name: 'ServiceAgreement',
          component (resolve) {
            require(['@/pages/serviceAgreement'], resolve)
          }
        }
      ]
    }
  ],
  mode: 'history',
  strict: process.env.NODE_ENV !== 'production',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  }
})

// router.beforeEach((to, from, next) => {
//   // 全局首卫
//   let sessionId = sdkFunc.getUserIdFromSDK()
//   if (to.query.tag) {
//     console.log(sessionId)
//     // store().state.app.userInfo.userId = to.query.userId
//   }
//   next()
// })

export default router
