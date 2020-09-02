import Main from '@/components/main'
import parentView from '@/components/parent-view'
export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  {
    path: '/homeAdmin',
    name: 'homeAdmin',

    meta: {
      icon: 'md-cloud-upload',
      title: '管理员首页'

    },
    component: Main,
    children: [
      {
        path: 'xiu_gai_mi_ma',
        name: 'homeAdmin',
        meta: {
          icon: 'md-clipboard',
          title: '首页'
        },
        component: () => import('@/view/single-page/home')
      },
      {
        path: 'ge_ren_zhong_xin',
        name: 'ge_ren_zhong_xin',
        meta: {
          icon: 'ios-document',
          title: '个人中心'
        },
        component: () => import('@/view/home_child/ge_ren_zhong_xin.vue')
      },

    ]
  }, {
    path: '/yun_ying_guan_li',
    name: 'yun_ying_guan_li',

    meta: {
      icon: 'md-cloud-upload',
      title: '运营管理'

    },
    component: Main,
    children: [
      {
        path: 'ke_bao_guan_li',
        name: 'ke_bao_guan_li',
        meta: {
          icon: 'md-clipboard',
          title: '课包管理'
        },
        component: () => import('@/view/yun_ying_guan_li/ke_bao_guan_li/ke_bao_guan_li_lie_biao.vue'),
      }, {
        path: 'ke_cheng_ding_dan',
        name: 'ke_cheng_ding_dan',
        meta: {
          icon: 'md-clipboard',
          title: '课程订单'

        },
        component: parentView,
        children: [{
          path: 'ke_cheng_ding_dan_lie_biao',
          name: 'ke_cheng_ding_dan_lie_biao',
          meta: {
            icon: 'md-clipboard',
            title: '课程订单列表'

          },
          component: () => import('@/view//yun_ying_guan_li/ke_cheng_ding_dan/ke_cheng_ding_dan_lie_biao.vue')
        }, {
          path: 'ding_dan_xiang_qing',
          name: 'ding_dan_xiang_qing',
          meta: {
            icon: 'md-clipboard',
            title: '订单详情'

          },
          component: () => import('@/view/yun_ying_guan_li/ke_cheng_ding_dan/ding_dan_xiang_qing.vue')
        }, {
          path: 'shen_qing_qu_xiao',
          name: 'shen_qing_qu_xiao',
          meta: {
            icon: 'md-clipboard',
            title: '订单详情-申请取消'

          },
          component: () => import('@/view/yun_ying_guan_li/ke_cheng_ding_dan/shen_qing_qu_xiao.vue')
        }, {
          path: 'shen_qing_tui_kuan',
          name: 'shen_qing_tui_kuan',
          meta: {
            icon: 'md-clipboard',
            title: '订单详情-申请退款'

          },
          component: () => import('@/view/yun_ying_guan_li/ke_cheng_ding_dan/shen_qing_tui_kuan')
        }]
      }, {
        path: 'chong_zhi_ding_dan',
        name: 'chong_zhi_ding_dan',
        meta: {
          icon: 'md-clipboard',
          title: '支付订单'

        },
        component: () => import('@/view/yun_ying_guan_li/chong_zhi_ding_dan.vue')
      }, {
        path: 'xu_ni_ding_dan',
        name: 'xu_ni_ding_dan',
        meta: {
          icon: 'md-clipboard',
          title: '虚拟订单'

        },
        component: () => import('@/view/yun_ying_guan_li/xu_ni_ding_dan.vue')
      }
    ]
  }, {
    path: '/yong_hu_guan_li',
    name: 'yong_hu_guan_li',

    meta: {
      icon: 'md-cloud-upload',
      title: '用户管理'

    },
    component: Main,
    children: [
      {
        path: 'yong_hu_guan_li_2',
        name: 'yong_hu_guan_li_2',
        meta: {
          icon: 'ios-document',
          title: '用户管理'
        },
        component: () => import('@/view/yong_hu_guan_li/yong_hu_guan_li_2.vue')
      },
      {
        path: 'xue_yuan_guan_li',
        name: 'xue_yuan_guan_li',
        meta: {
          icon: 'md-clipboard',
          title: '学员管理',
        },
        component: () => import('@/view/yong_hu_guan_li/xue_yuan_guan_li/xue_yuan_lie_baio.vue'),
      },
      {
        path: 'zhuan_ye_jiao_lian',
        name: 'zhuan_ye_jiao_lian',
        meta: {
          icon: 'md-clipboard',
          title: '专业教练',
        },
        component: () => import('@/view/yong_hu_guan_li/zhuan_ye_jiao_lian/zhuan_ye_jiao_lain_lie_biao.vue'),
      }
    ]
  }, {
    path: '/shang_cheng_guan_li',
    name: 'shang_cheng_guan_li',

    meta: {
      icon: 'md-cloud-upload',
      title: '商城管理'

    },
    component: Main,
    children: [{
      path: 'fen_lei_guan_li',
      name: 'fen_lei_guan_li',
      meta: {
        icon: 'ios-document',
        title: '分类管理'

      },
      component: () => import('@/view/shang_cheng_guan_li/fen_lei_guan_li/fen_lei_guan_li_lie_biao.vue'),
    },
    {
      path: 'shang_pin_guan_li',
      name: 'shang_pin_guan_li',
      meta: {
        icon: 'ios-document',
        title: '商品管理'

      },
      component: () => import('@/view/shang_cheng_guan_li/shang_pin_guan_li/shang_pin_guan_li_cha_xun_fen_lei.vue'),
    },
    {
      path: 'ding_dan_guan_li',
      name: 'ding_dan_guan_li',
      meta: {
        icon: 'md-clipboard',
        title: '商品订单',
      },
      component: () => import('@/view/shang_cheng_guan_li/shang_pin_ding_dan/shang_pin_ding_dan_lie_biao.vue'),
    }
    ]
  }, {
    path: '/nei_rong_guan_li',
    name: 'nei_rong_guan_li',

    meta: {
      icon: 'md-cloud-upload',
      title: '内容管理'

    },
    component: Main,
    children: [
      {
        path: 'zhuan_xiang_dong_zuo',
        name: 'zhuan_xiang_dong_zuo',
        meta: {
          icon: 'md-clipboard',
          title: '专项动作'

        },
        component: () => import('@/view//nei_rong_guan_li/zhuan_xiang_dong_zuo/zhuan_xiang_dong_zuo_lie_biao.vue'),
      }, {
        path: 'ji_hua_mo_ban',
        name: 'ji_hua_mo_ban',
        meta: {
          icon: 'ios-document',
          title: '训练计划模板'

        },
        component: parentView,
        children: [{
          path: 'ji_hua_mo_ban_lie_biao',
          name: 'ji_hua_mo_ban_lie_biao',
          meta: {
            icon: 'md-clipboard',
            title: '训练计划模板列表'

          },
          component: () => import('@/view/nei_rong_guan_li/xun_lian_ji_hua_mo_ban/xun_lian_ji_hua_mo_ban_lie_biao.vue')
        },
         {
          path: 'ke_jie_guan_li',
          name: 'ke_jie_guan_li',
          meta: {
            icon: 'md-clipboard',
            title: '课节管理'

          },
          component: () => import('@/view/nei_rong_guan_li/xun_lian_ji_hua_mo_ban/ke_jie_guan_li/ke_jie_guan_li_lie_biao.vue'),
        }]
      }, {
        path: 'n_ke_jie_guan_li',
        name: 'n_ke_jie_guan_li',
        meta: {
          icon: 'md-clipboard',
          title: '课节管理'

        },
        component: () => import('@/view/nei_rong_guan_li/ke_jie_guan_li/ke_jie_guan_li_lie_biao.vue'),
      },
      {
        path: 'xian_sahng_ke_cheng',
        name: 'xian_sahng_ke_cheng',
        meta: {
          icon: 'md-clipboard',
          title: '线上课程',
          showAlways: true
        },
        component: parentView,
        children: [{
          path: 'xian_sahng_ke_cheng_lie_biao',
          name: 'xian_sahng_ke_cheng_lie_biao',
          meta: {
            icon: 'md-clipboard',
            title: '线上课程列表'

          },
          component: () => import('@/view/nei_rong_guan_li/xian_shang_ke_cheng/xian_shang_ke_cheng_lie_biao.vue')
        }, {
          path: 'fen_lei_ming_xi',
          name: 'fen_lei_ming_xi',
          meta: {
            icon: 'md-clipboard',
            title: '分类明细'

          },
          component: () => import('@/view/nei_rong_guan_li/xian_shang_ke_cheng/fen_lei_ming_xi.vue')
        }, {
          path: 'x_xin_zeng_ke_cheng',
          name: 'x_xin_zeng_ke_cheng',
          meta: {
            icon: 'md-clipboard',
            title: '新增课程'

          },
          component: () => import('@/view/nei_rong_guan_li/xian_shang_ke_cheng/xin_zeng_ke_cheng.vue')
        }, {
          path: 'ke_cheng_guan_li',
          name: 'ke_cheng_guan_li',
          meta: {
            icon: 'md-clipboard',
            title: '课程管理'

          },
          component: () => import('@/view/nei_rong_guan_li/xian_shang_ke_cheng/ke_cheng_guan_li.vue')
        }, {
          path: 'x_xin_zeng_ke_jie',
          name: 'x_xin_zeng_ke_jie',
          meta: {
            icon: 'md-clipboard',
            title: '新增课节'

          },
          component: () => import('@/view/nei_rong_guan_li/xian_shang_ke_cheng/xin_zeng_ke_jie.vue')
        }]
      },
      {
        path: 'zhuan_jia_qing_xun_ying',
        name: 'zhuan_jia_qing_xun_ying',
        meta: {
          icon: 'ios-document',
          title: '专家青训营',
          showAlways: true
        },
        component: parentView,
        children: [{
          path: 'zhuan_jia_qing_xun_ying_lie_biao',
          name: 'zhuan_jia_qing_xun_ying_lie_biao',
          meta: {
            icon: 'ios-document',
            title: '专家青训营列表'

          },
          component: () => import('@/view/nei_rong_guan_li/zhuan_jia_qing_xun_ying/zhuan_jia_qing_xun_ying_lie_biao.vue')
        },
        {
          path: 'xin_zeng_xun_lian_ying_xun_lian_ji_hua',
          name: 'xin_zeng_xun_lian_ying_xun_lian_ji_hua',
          meta: {
            icon: 'ios-document',
            title: '新增训练营-训练计划'
          },
          component: () => import('@/view/nei_rong_guan_li/zhuan_jia_qing_xun_ying/xin_zeng_xun_lian_ying_xun_lian_ji_hua.vue')
        }, {
          path: 'xin_zeng_xun_lian_ying_zi_ding_yi',
          name: 'xin_zeng_xun_lian_ying_zi_ding_yi',
          meta: {
            icon: 'ios-document',
            title: '新增训练营-自定义',
            showAlways: true
          },
          component: parentView,
          children: [{
            path: 'xin_zeng_xun_lian_ying_zi_ding_yi_lie_biao',
            name: 'xin_zeng_xun_lian_ying_zi_ding_yi_lie_biao',
            meta: {
              icon: 'md-clipboard',
              title: '新增训练营-自定义列表'
            },
            component: () => import('@/view/nei_rong_guan_li/zhuan_jia_qing_xun_ying/xin_zeng_xun_lian_ying_zi_ding_yi/xin_zeng_xun_lian_ying_zi_ding_yi_lie_biao.vue')
          }, {
            path: 'x_xin_zeng_ke_jie',
            name: 'x_xin_zeng_ke_jie',
            meta: {
              icon: 'md-clipboard',
              title: '新增课节'
            },
            component: () => import('@/view/nei_rong_guan_li/zhuan_jia_qing_xun_ying/xin_zeng_xun_lian_ying_zi_ding_yi/xin_zeng_ke_jie.vue')
          }]
        }]
      },
      {
        path: 'i_hua_jing_xuan_guan_li',
        name: 'i_hua_jing_xuan_guan_li',
        meta: {
          icon: 'ios-document',
          title: 'i滑精选管理'
        },
        component: () => import('@/view/update/update-table.vue'),
        children: [{
          path: 'i_hua_jing_xuan_da_ka_jia_tang',
          name: 'i_hua_jing_xuan_da_ka_jia_tang',
          meta: {
            icon: 'md-clipboard',
            title: 'i滑精选-大咖讲堂'
          },
          component: () => import('@/view/update/update-paste.vue')
        }, {
          path: 'i_hua_jing_xuan_xin_zeng_nei_rong',
          name: 'i_hua_jing_xuan_xin_zeng_nei_rong',
          meta: {
            icon: 'md-clipboard',
            title: 'i滑精选-新增内容'
          },
          component: () => import('@/view/update/update-paste.vue')
        }]
      }
    ]
  },
  {
    path: '/cai_wu_guan_li',
    name: 'cai_wu_guan_li',

    meta: {
      icon: 'md-cloud-upload',
      title: '财务管理'

    },
    component: Main,
    children: [

      {
        path: 'tui_kuan_guan_li',
        name: 'tui_kuan_guan_li',
        meta: {
          icon: 'md-clipboard',
          title: '退款管理'

        },
        component: () => import('@/view/cai_wu_guan_li/tui_kuan_guan_li/tui_kuan_guan_li_lie_biao.vue'),
      }, {
        path: 'fen_run_guan_li',
        name: 'fen_run_guan_li',
        meta: {
          icon: 'md-clipboard',
          title: '分润管理'

        },
        component: parentView,
        children: [{
          path: 'fen_run_guan_li_lie_biao',
          name: 'fen_run_guan_li_lie_biao',
          meta: {
            icon: 'md-clipboard',
            title: '分润管理列表'

          },
          component: () => import('@/view/cai_wu_guan_li/fen_run_guan_li/fen_run_guan_li_lie_biao')
        }, {
          path: 'shou_yi_ming_xi',
          name: 'shou_yi_ming_xi',
          meta: {
            icon: 'md-clipboard',
            title: '收益明细'

          },
          component: () => import('@/view/cai_wu_guan_li/fen_run_guan_li/shou_yi_ming_xi.vue')
        }, {
          path: 'ti_xian_li_shi',
          name: 'ti_xian_li_shi',
          meta: {
            icon: 'md-clipboard',
            title: '提现历史'

          },
          component: () => import('@/view//cai_wu_guan_li/fen_run_guan_li/ti_xian_li_shi.vue')
        }]
      }
    ]
  },
  {
    path: 'xi_tong_guan_li',
    name: 'xi_tong_guan_li',

    meta: {
      icon: 'md-cloud-upload',
      title: '系统管理'

    },
    component: Main,
    children: [
      {
        path: 'guan_li_yuan',
        name: 'guan_li_yuan',
        meta: {
          icon: 'ios-document',
          title: '管理员'

        },
        component: () => import('@/view/xi_tong_guan_li/guan_li_yuan/guan_li_yun_lie_biao.vue'),
      },
      {
        path: 'jue_se_guan_li',
        name: 'jue_se_guan_li',
        meta: {
          icon: 'md-clipboard',
          title: '角色管理'

        },
        component: () => import('@/view/xi_tong_guan_li/jiao_se_guan_li/jiao_se_guan_li_lie_biao.vue'),
      },
      {
        path: 'cai_dan_guan_li',
        name: 'cai_dan_guan_li',
        meta: {
          icon: 'ios-document',
          title: '菜单管理'

        },
        component: () => import('@/view/xi_tong_guan_li/cai_dan_guan_li/cai_dan_guan_li.vue'),
       
      },
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
