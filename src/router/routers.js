import Main from '@/components/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */
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
        path: 'ge_ren_zhong_xin',
        name: 'ge_ren_zhong_xin',
        meta: {
          icon: 'ios-document',
          title: '个人中心'

        },
        component: () => import('@/view/home_child/ge_ren_zhong_xin.vue')
      },
      {
        path: 'xiu_gai_mi_ma',
        name: 'xiu_gai_mi_ma',
        meta: {
          icon: 'md-clipboard',
          title: '修改密码'

        },
        component: () => import('@/view/home_child/xiu_gai_mi_ma.vue')
      }
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
        component: parentView,
        children: [{
          path: 'ke_bao_guan_li_lie_biao',
          name: 'ke_bao_guan_li_lie_biao',
          meta: {
            icon: 'md-clipboard',
            title: '课包管理列表'

          },
          component: () => import('@/view/yun_ying_guan_li/ke_bao_guan_li/ke_bao_guan_li_lie_biao.vue')
        },
        // {
        //   path: 'xin_zeng_ke_bao_wu_an',
        //   name: 'xin_zeng_ke_bao_wu_an',
        //   meta: {
        //     icon: 'md-clipboard',
        //     title: '新增课包-无安排'

        //   },
        //   component: () => import('@/view/update/update-paste.vue')
        // },
        {
          path: 'xin_zeng_ke_bao_xun_lian',
          name: 'xin_zeng_ke_bao_xun_lian',
          meta: {
            icon: 'md-clipboard',
            title: '新增课包-训练计划'

          },
          component: () => import('@/view/yun_ying_guan_li/ke_bao_guan_li/xin_zeng_ke_bao_xun_lian.vue')
        }, {
          path: 'xin_zeng_ke_bao_zi_ding_yi',
          name: 'xin_zeng_ke_bao_zi_ding_yi',
          meta: {
            icon: 'md-clipboard',
            title: '新增课包-自定义课节',
            showAlways: true
          },
          component: () => import('@/view/update/update-paste.vue'),
          children: [{
            path: 'xin_zeng_ke_bao_zi_ding_yi_lie_biao',
            name: 'xin_zeng_ke_bao_zi_ding_yi_lie_biao',
            meta: {
              icon: 'md-clipboard',
              title: '新增课包-自定义课节列表'

            },
            component: () => import('@/view/update/update-paste.vue')
          }, {
            path: 'xin_zeng_ke_jie_xiao_guo',
            name: 'xin_zeng_ke_jie_xiao_guo',
            meta: {
              icon: 'md-clipboard',
              title: '新增课节效果'

            },
            component: () => import('@/view/update/update-paste.vue')
          }]
        }]
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
          // showAlways: true
        },
        component: () => import('@/view/yong_hu_guan_li/yong_hu_guan_li_2.vue')
        // children: [{
        //   path: 'yong_hu_xiang_qing',
        //   name: 'yong_hu_xiang_qing',
        //   meta: {
        //     icon: 'ios-document',
        //     title: '用户详情'

        //   },
        //   component: () => import('@/view/update/update-table.vue')
        // }]
      },
      {
        path: 'xue_yuan_guan_li',
        name: 'xue_yuan_guan_li',
        meta: {
          icon: 'md-clipboard',
          title: '学员管理',
          showAlways: true
        },
        component: parentView,
        children: [{
          path: 'xue_yuan_lie_baio',
          name: 'xue_yuan_lie_baio',
          meta: {
            icon: 'ios-document',
            title: '学员列表'

          },
          component: () => import('@/view/yong_hu_guan_li/xue_yuan_guan_li/xue_yuan_lie_baio.vue')
        }, {
          path: 'xue_yuan_xiang_qing',
          name: 'xue_yuan_xiang_qing',
          meta: {
            icon: 'ios-document',
            title: '学员详情'

          },
          component: () => import('@/view/yong_hu_guan_li/xue_yuan_guan_li/xue_yuan_xiang_qing.vue')
        }]
      }, {
        path: 'ban_zhuan_ye_jiao_lain',
        name: 'ban_zhuan_ye_jiao_lain',
        meta: {
          icon: 'ios-document',
          title: '半专业教练',
          showAlways: true
        },
        component: parentView,
        children: [{
          path: 'ban_zhuan_ye_jiao_lain_lie_biao',
          name: 'ban_zhuan_ye_jiao_lain_lie_biao',
          meta: {
            icon: 'ios-document',
            title: '半专业教练列表'

          },
          component: () => import('@/view//yong_hu_guan_li/ban_zhuan_ye_jiao_lain/ban_zhuan_ye_jiao_lain_lie_biao.vue')
        }, {
          path: 'ban_zhuan_ye_jiao_lian_xiang_qing',
          name: 'ban_zhuan_ye_jiao_lian_xiang_qing',
          meta: {
            icon: 'ios-document',
            title: '教练详情'

          },
          component: () => import('@/view/yong_hu_guan_li/ban_zhuan_ye_jiao_lain/ban_zhuan_ye_jiao_lian_xiang_qing.vue')
        }, {
          path: 'ban_zhuan_ye_jiao_lain_shen_he',
          name: 'ban_zhuan_ye_jiao_lain_shen_he',
          meta: {
            icon: 'ios-document',
            title: '账号审核'

          },
          component: () => import('@/view/yong_hu_guan_li/ban_zhuan_ye_jiao_lain/ban_zhuan_ye_jiao_lain_shen_he.vue')
        }]
      },
      {
        path: 'zhuan_ye_jiao_lian',
        name: 'zhuan_ye_jiao_lian',
        meta: {
          icon: 'md-clipboard',
          title: '专业教练',
          showAlways: true
        },
        component: parentView,
        children: [{
          path: 'zhuan_ye_jiao_lain_lie_biao',
          name: 'zhuan_ye_jiao_lain_lie_biao',
          meta: {
            icon: 'ios-document',
            title: '专业教练列表'

          },
          component: () => import('@/view/yong_hu_guan_li/zhuan_ye_jiao_lian/zhuan_ye_jiao_lain_lie_biao.vue')
        }, {
          path: 'zhuan_ye_jiao_lain_xiang_qing',
          name: 'zhuan_ye_jiao_lain_xiang_qing',
          meta: {
            icon: 'ios-document',
            title: '查看详情'

          },
          component: () => import('@/view/yong_hu_guan_li/zhuan_ye_jiao_lian/zhuan_ye_jiao_lain_xiang_qing.vue')
        }, {
          path: 'zhuan_ye_jiao_lain_shen_he',
          name: 'zhuan_ye_jiao_lain_shen_he',
          meta: {
            icon: 'ios-document',
            title: '认证审核-待认证'

          },
          component: () => import('@/view/yong_hu_guan_li/zhuan_ye_jiao_lian/zhuan_ye_jiao_lain_shen_he.vue')
        }]
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
      component: parentView,
      children: [{
        path: 'fen_lei_guan_li_lie_biao',
        name: 'fen_lei_guan_li_lie_biao',
        meta: {
          icon: 'md-clipboard',
          title: '分类管理列表'

        },
        component: () => import('@/view/shang_cheng_guan_li/fen_lei_guan_li/fen_lei_guan_li_lie_biao.vue')
      }, {
        path: 'xin_zeng_fen_lei',
        name: 'xin_zeng_fen_lei',
        meta: {
          icon: 'md-clipboard',
          title: '新增分类'

        },
        component: () => import('@/view/shang_cheng_guan_li/fen_lei_guan_li/xin_zeng_fen_lei.vue')
      }]
    },
    {
      path: 'shang_pin_guan_li',
      name: 'shang_pin_guan_li',
      meta: {
        icon: 'ios-document',
        title: '商品管理'

      },
      component: parentView,
      children: [{
        path: 'shang_pin_guan_li_lie_biao',
        name: 'shang_pin_guan_li_lie_biao',
        meta: {
          icon: 'md-clipboard',
          title: '商品管理列表'

        },
        component: () => import('@/view//shang_cheng_guan_li/shang_pin_guan_li/shang_pin_guan_li_lie_biao.vue')
      }, {
        path: 'shang_pin_guan_li_cha_xun_fen_lei',
        name: 'shang_pin_guan_li_cha_xun_fen_lei',
        meta: {
          icon: 'md-clipboard',
          title: '商品管理-查询分类'

        },
        component: () => import('@/view/shang_cheng_guan_li/shang_pin_guan_li/shang_pin_guan_li_cha_xun_fen_lei.vue')
      }, {
        path: 'xin_zeng_sahng_pin',
        name: 'xin_zeng_sahng_pin',
        meta: {
          icon: 'md-clipboard',
          title: '新增商品'

        },
        component: () => import('@/view/shang_cheng_guan_li/shang_pin_guan_li/xin_zeng_shang_pin.vue')
      }, {
        path: 'shan_chu_shang_pin',
        name: 'shan_chu_shang_pin',
        meta: {
          icon: 'md-clipboard',
          title: '删除商品'

        },
        component: () => import('@/view/shang_cheng_guan_li/shang_pin_guan_li/shan_chu_shang_pin.vue')
      }]
    },
    {
      path: 'ding_dan_guan_li',
      name: 'ding_dan_guan_li',
      meta: {
        icon: 'md-clipboard',
        title: '商品订单',
        showAlways: true
      },
      component: parentView,
      children: [{
        path: 'ding_dan_guan_li_lie_biao',
        name: 'ding_dan_guan_li_lie_biao',
        meta: {
          icon: 'md-clipboard',
          title: '商品订单列表'

        },
        component: () => import('@/view/shang_cheng_guan_li/shang_pin_ding_dan/shang_pin_ding_dan_lie_biao.vue')
      }, {
        path: 'ding_dan_xaing_qing_dai_zhi_fu',
        name: 'ding_dan_xaing_qing_dai_zhi_fu',
        meta: {
          icon: 'md-clipboard',
          title: '订单详情-待支付'

        },
        component: () => import('@/view/shang_cheng_guan_li/shang_pin_ding_dan/ding_dan_xiang_qing_dai_zhi_fu.vue')
      }, {
        path: 'ding_dan_xaing_qing_dai_fa_huo',
        name: 'ding_dan_xaing_qing_dai_fa_huo',
        meta: {
          icon: 'md-clipboard',
          title: '订单详情-待发货'

        },
        component: () => import('@/view/shang_cheng_guan_li/shang_pin_ding_dan/ding_dan_xiang_qing_dai_fa_huo.vue')
      }, {
        path: 'ding_dan_xaing_qing_dai_shou_huo',
        name: 'ding_dan_xaing_qing_dai_shou_huo',
        meta: {
          icon: 'md-clipboard',
          title: '订单详情-待收货'

        },
        component: () => import('@/view/shang_cheng_guan_li/shang_pin_ding_dan/ding_dan_xiang_qing_dai_shou_huo.vue')
      }, {
        path: 'ding_dan_xaing_qing_shen_qing_tui_kuan',
        name: 'ding_dan_xaing_qing_shen_qing_tui_kuan',
        meta: {
          icon: 'md-clipboard',
          title: '订单详情-申请退款'

        },
        component: () => import('@/view/shang_cheng_guan_li/shang_pin_ding_dan/ding_dan_xiang_qing_shen_qing_tui_kuan.vue')
      }]
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
        component: () => import('@/view/update/update-paste.vue'),
        children: [{
          path: 'zhuan_xiang_dong_zuo_lie_biao',
          name: 'zhuan_xiang_dong_zuo_lie_biao',
          meta: {
            icon: 'md-clipboard',
            title: '专项动作列表'

          },
          component: () => import('@/view/update/update-paste.vue')
        }, {
          path: 'zhuan_xiang_dong_zuo_huaxing_xaing_qing',
          name: 'zhuan_xiang_dong_zuo_huaxing_xaing_qing',
          meta: {
            icon: 'md-clipboard',
            title: '专项动作-滑行列表'

          },
          component: () => import('@/view/update/update-paste.vue')
        }, {
          path: 'zhuan_xiang_dong_zuo_dongzuo_xiang_qing',
          name: 'zhuan_xiang_dong_zuo_dongzuo_xiang_qing',
          meta: {
            icon: 'md-clipboard',
            title: '专项动作-动作详情'

          },
          component: () => import('@/view/update/update-paste.vue')
        }]
      }, {
        path: 'ji_hua_mo_ban',
        name: 'ji_hua_mo_ban',
        meta: {
          icon: 'ios-document',
          title: '训练计划模板'

        },
        component: () => import('@/view/update/update-table.vue'),
        children: [{
          path: 'ji_hua_mo_ban_lie_biao',
          name: 'ji_hua_mo_ban_lie_biao',
          meta: {
            icon: 'md-clipboard',
            title: '训练计划模板列表'

          },
          component: () => import('@/view/update/update-paste.vue')
        }, {
          path: 'xing_zeng_mo_ban',
          name: 'xing_zeng_mo_ban',
          meta: {
            icon: 'md-clipboard',
            title: '新增模板'

          },
          component: () => import('@/view/update/update-paste.vue')
        }, {
          path: 'ke_jie_guan_li',
          name: 'ke_jie_guan_li',
          meta: {
            icon: 'md-clipboard',
            title: '课节管理'

          },
          component: () => import('@/view/update/update-paste.vue'),
          children: [{
            path: 'ke_jie_guan_li_lie_baio',
            name: 'ke_jie_guan_li_lie_baio',
            meta: {
              icon: 'md-clipboard',
              title: '课节管理列表'

            },
            component: () => import('@/view/update/update-paste.vue')
          }, {
            path: 'xin_zeng_ke_jie',
            name: 'xin_zeng_ke_jie',
            meta: {
              icon: 'md-clipboard',
              title: '新增课节'

            },
            component: () => import('@/view/update/update-paste.vue')
          }]
        }]
      }, {
        // 内容管理下的课节管理
        path: 'n_ke_jie_guan_li',
        name: 'n_ke_jie_guan_li',
        meta: {
          icon: 'md-clipboard',
          title: '课节管理'

        },
        component: () => import('@/view/update/update-paste.vue'),
        children: [{
          path: 'n_ke_jie_guan_li_lie_baio',
          name: 'n_ke_jie_guan_li_lie_baio',
          meta: {
            icon: 'md-clipboard',
            title: '课节管理列表'

          },
          component: () => import('@/view/update/update-paste.vue')
        }, {
          path: 'n_xin_zeng_ke_jie',
          name: 'n_xin_zeng_ke_jie',
          meta: {
            icon: 'md-clipboard',
            title: '新增课节'

          },
          component: () => import('@/view/update/update-paste.vue')
        }]
      },
      {
        path: 'xian_sahng_ke_cheng',
        name: 'xian_sahng_ke_cheng',
        meta: {
          icon: 'md-clipboard',
          title: '线上课程',
          showAlways: true
        },
        component: () => import('@/view/update/update-paste.vue'),
        children: [{
          path: 'xian_sahng_ke_cheng_lie_biao',
          name: 'xian_sahng_ke_cheng_lie_biao',
          meta: {
            icon: 'md-clipboard',
            title: '线上课程列表'

          },
          component: () => import('@/view/update/update-paste.vue')
        }, {
          path: 'fen_lei_ming_xi',
          name: 'fen_lei_ming_xi',
          meta: {
            icon: 'md-clipboard',
            title: '分类明细'

          },
          component: () => import('@/view/update/update-paste.vue')
        }, {
          path: 'x_xin_zeng_ke_cheng',
          name: 'x_xin_zeng_ke_cheng',
          meta: {
            icon: 'md-clipboard',
            title: '新增课程'

          },
          component: () => import('@/view/update/update-paste.vue')
        }, {
          path: 'ke_cheng_guan_li',
          name: 'ke_cheng_guan_li',
          meta: {
            icon: 'md-clipboard',
            title: '课程管理'

          },
          component: () => import('@/view/update/update-paste.vue')
        }, {
          path: 'x_xin_zeng_ke_jie',
          name: 'x_xin_zeng_ke_jie',
          meta: {
            icon: 'md-clipboard',
            title: '新增课节'

          },
          component: () => import('@/view/update/update-paste.vue')
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
        component: () => import('@/view/update/update-table.vue'),
        children: [{
          path: 'zhuan_jia_qing_xun_ying_lie_biao',
          name: 'zhuan_jia_qing_xun_ying_lie_biao',
          meta: {
            icon: 'ios-document',
            title: '专家青训营列表'

          },
          component: () => import('@/view/update/update-table.vue')
        },
        // {
        //   path: 'xin_zeng_xun_lian_ying_wu_an_pai',
        //   name: 'xin_zeng_xun_lian_ying_wu_an_pai',
        //   meta: {
        //     icon: 'ios-document',
        //     title: '新增训练营-无安排'

        //   },
        //   component: () => import('@/view/update/update-table.vue')
        // },
        {
          path: 'xin_zeng_xun_lian_ying_xun_lian_ji_hua',
          name: 'xin_zeng_xun_lian_ying_xun_lian_ji_hua',
          meta: {
            icon: 'ios-document',
            title: '新增训练营-训练计划'
            // showAlways: true,
          },
          component: () => import('@/view/update/update-table.vue')
        }, {
          path: 'xin_zeng_xun_lian_ying_zi_ding_yi',
          name: 'xin_zeng_xun_lian_ying_zi_ding_yi',
          meta: {
            icon: 'ios-document',
            title: '新增训练营-自定义',
            showAlways: true
          },
          component: () => import('@/view/update/update-table.vue'),
          children: [{
            path: 'xin_zeng_xun_lian_ying_zi_ding_yi_lie_biao',
            name: 'xin_zeng_xun_lian_ying_zi_ding_yi_lie_biao',
            meta: {
              icon: 'md-clipboard',
              title: '新增训练营-自定义列表'
            },
            component: () => import('@/view/update/update-paste.vue')
          }, {
            path: 'x_xin_zeng_ke_jie',
            name: 'x_xin_zeng_ke_jie',
            meta: {
              icon: 'md-clipboard',
              title: '新增课节'
            },
            component: () => import('@/view/update/update-paste.vue')
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
        component: parentView,
        children: [{
          path: 'tui_kuan_guan_li_lie_biao',
          name: 'tui_kuan_guan_li_lie_biao',
          meta: {
            icon: 'md-clipboard',
            title: '退款管理列表'

          },
          component: () => import('@/view/cai_wu_guan_li/tui_kuan_guan_li/tui_kuan_guan_li_lie_biao.vue')
        }, {
          path: 'shen_he_tui_kuan',
          name: 'shen_he_tui_kuan',
          meta: {
            icon: 'md-clipboard',
            title: '审核退款'

          },
          component: () => import('@/view/cai_wu_guan_li/tui_kuan_guan_li/shen_he_tui_kuan.vue')
        }, {
          path: 'cha_kan_xiang_qing',
          name: 'cha_kan_xiang_qing',
          meta: {
            icon: 'md-clipboard',
            title: '查看详情'

          },
          component: () => import('@/view/cai_wu_guan_li/tui_kuan_guan_li/cha_kan_xiang_qing.vue')
        }]
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
        component: parentView,
        children: [{
          path: 'guan_li_yuan_lie_biao',
          name: 'guan_li_yuan_lie_biao',
          meta: {
            icon: 'ios-document',
            title: '管理员列表'

          },
          component: () => import('@/view/xi_tong_guan_li/guan_li_yuan/guan_li_yun_lie_biao.vue')
        }, {
          path: 'g_xing_zeng',
          name: 'g_xing_zeng',
          meta: {
            icon: 'ios-document',
            title: '新增'

          },
          component: () => import('@/view/xi_tong_guan_li/guan_li_yuan/xin_zeng.vue')
        }, {
          path: 'g_bian_ji',
          name: 'g_bian_ji',
          meta: {
            icon: 'ios-document',
            title: '编辑'

          },
          component: () => import('@/view/xi_tong_guan_li/guan_li_yuan/bian_ji.vue')
        }, {
          path: 'chong_zhi_mi_ma',
          name: 'chong_zhi_mi_ma',
          meta: {
            icon: 'ios-document',
            title: '重置密码'

          },
          component: () => import('@/view/xi_tong_guan_li/guan_li_yuan/chong_zhi_mi_ma.vue')
        }]
      },
      {
        path: 'jue_se_guan_li',
        name: 'jue_se_guan_li',
        meta: {
          icon: 'md-clipboard',
          title: '角色管理'

        },
        component: parentView,
        children: [{
          path: 'jue_se_guan_li_lie_biao',
          name: 'jue_se_guan_li_lie_biao',
          meta: {
            icon: 'md-clipboard',
            title: '角色管理列表'

          },
          component: () => import('@/view/xi_tong_guan_li/jiao_se_guan_li/jiao_se_guan_li_lie_biao.vue')
        }, {
          path: 'j_xing_zeng',
          name: 'j_xing_zeng',
          meta: {
            icon: 'md-clipboard',
            title: '新增'

          },
          component: () => import('@/view/xi_tong_guan_li/jiao_se_guan_li/xin_zeng.vue')
        }, {
          path: 'xiu_gai_jue_se_ming',
          name: 'xiu_gai_jue_se_ming',
          meta: {
            icon: 'md-clipboard',
            title: '修改角色名'

          },
          component: () => import('@/view/xi_tong_guan_li/jiao_se_guan_li/xiu_gai_jiao_se_ming.vue')
        }, {
          path: 'shou_quan',
          name: 'shou_quan',
          meta: {
            icon: 'md-clipboard',
            title: '授权'

          },
          component: () => import('@/view/xi_tong_guan_li/jiao_se_guan_li/shou_quan.vue')
        }, {
          path: 'shng_chu',
          name: 'shng_chu',
          meta: {
            icon: 'md-clipboard',
            title: '删除'

          },
          component: () => import('@/view/xi_tong_guan_li/jiao_se_guan_li/shan_chu.vue')
        },]
      },
       {
        path: 'cai_dan_guan_li',
        name: 'cai_dan_guan_li',
        meta: {
          icon: 'ios-document',
          title: '菜单管理'

        },
        component: parentView,
        children: [{
          path: 'cai_dan_guan_li_lie_biao',
          name: 'cai_dan_guan_li_lie_biao',
          meta: {
            icon: 'ios-document',
            title: '菜单管理列表'

          },
          component: () => import('@/view/xi_tong_guan_li/cai_dan_guan_li/tian_jia_zi_fen_lei_biao.vue'),

        }, {
          path: 'c_xing_zeng',
          name: 'c_xing_zeng',
          meta: {
            icon: 'ios-document',
            title: '新增'

          },
          component: () => import('@/view/xi_tong_guan_li/cai_dan_guan_li/xin_zeng.vue'),

        }, {
          path: 'c_bian_ji',
          name: 'c_bian_ji',
          meta: {
            icon: 'ios-document',
            title: '编辑'

          },
          component: () => import('@/view/xi_tong_guan_li/cai_dan_guan_li/bian_ji.vue'),

        }, {
          path: 'tian_jia_zi_fen_lei',
          name: 'tian_jia_zi_fen_lei',
          meta: {
            icon: 'ios-document',
            title: '添加子分类'

          },
          component: () => import('@/view/xi_tong_guan_li/cai_dan_guan_li/tian_jia_zi_fen_lei_biao.vue'),

        }]
      },

      // {
      //   path: 'xiao_xi_guan_li',
      //   name: 'xiao_xi_guan_li',
      //   meta: {
      //     icon: 'md-clipboard',
      //     title: '消息管理'

      //   },
      //   component: () => import('@/view/update/update-paste.vue')
      // }, {
      //   path: 'ban_ben_guan_li',
      //   name: 'ban_ben_guan_li',
      //   meta: {
      //     icon: 'md-clipboard',
      //     title: '版本管理'

      //   },
      //   component: () => import('@/view/update/update-paste.vue')
      // }
    ]
  },
  // {
  //   path: '/gong_jv_guan_li',
  //   name: 'gong_jv_guan_li',

  //   meta: {
  //     icon: 'md-cloud-upload',
  //     title: '工具管理'

  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'da_ka_jia_tang',
  //       name: 'da_ka_jia_tang',
  //       meta: {
  //         icon: 'ios-document',
  //         title: '大咖讲堂'

  //       },
  //       component: () => import('@/view/update/update-table.vue')
  //     },
  //     {
  //       path: 'ti_wen_wei_guan',
  //       name: 'ti_wen_wei_guan',
  //       meta: {
  //         icon: 'md-clipboard',
  //         title: '提问围观'

  //       },
  //       component: () => import('@/view/update/update-paste.vue')
  //     }, {
  //       path: 'zhi_fu_ding_dan',
  //       name: 'zhi_fu_ding_dan',
  //       meta: {
  //         icon: 'md-clipboard',
  //         title: '支付订单'

  //       },
  //       component: () => import('@/view/update/update-paste.vue')
  //     }
  //   ]
  // },

  {
    path: '/components',
    name: 'components',
    meta: {
      icon: 'logo-buffer',
      title: '组件'
    },
    component: Main,
    children: [
      {
        path: 'tree_select_page',
        name: 'tree_select_page',
        meta: {
          icon: 'md-arrow-dropdown-circle',
          title: '树状下拉选择器'
        },
        component: () => import('@/view/components/tree-select/index.vue')
      },
      {
        path: 'count_to_page',
        name: 'count_to_page',
        meta: {
          icon: 'md-trending-up',
          title: '数字渐变'
        },
        component: () => import('@/view/components/count-to/count-to.vue')
      },
      {
        path: 'drag_list_page',
        name: 'drag_list_page',
        meta: {
          icon: 'ios-infinite',
          title: '拖拽列表'
        },
        component: () => import('@/view/components/drag-list/drag-list.vue')
      },
      {
        path: 'drag_drawer_page',
        name: 'drag_drawer_page',
        meta: {
          icon: 'md-list',
          title: '可拖拽抽屉'
        },
        component: () => import('@/view/components/drag-drawer')
      },
      {
        path: 'org_tree_page',
        name: 'org_tree_page',
        meta: {
          icon: 'ios-people',
          title: '组织结构树'
        },
        component: () => import('@/view/components/org-tree')
      },
      {
        path: 'tree_table_page',
        name: 'tree_table_page',
        meta: {
          icon: 'md-git-branch',
          title: '树状表格'
        },
        component: () => import('@/view/components/tree-table/index.vue')
      },
      {
        path: 'cropper_page',
        name: 'cropper_page',
        meta: {
          icon: 'md-crop',
          title: '图片裁剪'
        },
        component: () => import('@/view/components/cropper/cropper.vue')
      },
      {
        path: 'tables_page',
        name: 'tables_page',
        meta: {
          icon: 'md-grid',
          title: '多功能表格'
        },
        component: () => import('@/view/components/tables/tables.vue')
      },
      {
        path: 'split_pane_page',
        name: 'split_pane_page',
        meta: {
          icon: 'md-pause',
          title: '分割窗口'
        },
        component: () => import('@/view/components/split-pane/split-pane.vue')
      },
      {
        path: 'markdown_page',
        name: 'markdown_page',
        meta: {
          icon: 'logo-markdown',
          title: 'Markdown编辑器'
        },
        component: () => import('@/view/components/markdown/markdown.vue')
      },
      {
        path: 'editor_page',
        name: 'editor_page',
        meta: {
          icon: 'ios-create',
          title: '富文本编辑器'
        },
        component: () => import('@/view/components/editor/editor.vue')
      },
      {
        path: 'icons_page',
        name: 'icons_page',
        meta: {
          icon: '_bear',
          title: '自定义图标'
        },
        component: () => import('@/view/components/icons/icons.vue')
      }
    ]
  },
  {
    path: '/update',
    name: 'update',
    meta: {
      icon: 'md-cloud-upload',
      title: '数据上传'
    },
    component: Main,
    children: [
      {
        path: 'update_table_page',
        name: 'update_table_page',
        meta: {
          icon: 'ios-document',
          title: '上传Csv'
        },
        component: () => import('@/view/update/update-table.vue')
      },
      {
        path: 'update_paste_page',
        name: 'update_paste_page',
        meta: {
          icon: 'md-clipboard',
          title: '粘贴表格数据'
        },
        component: () => import('@/view/update/update-paste.vue')
      }
    ]
  },
  {
    path: '/excel',
    name: 'excel',
    meta: {
      icon: 'ios-stats',
      title: 'EXCEL导入导出'
    },
    component: Main,
    children: [
      {
        path: 'upload-excel',
        name: 'upload-excel',
        meta: {
          icon: 'md-add',
          title: '导入EXCEL'
        },
        component: () => import('@/view/excel/upload-excel.vue')
      },
      {
        path: 'export-excel',
        name: 'export-excel',
        meta: {
          icon: 'md-download',
          title: '导出EXCEL'
        },
        component: () => import('@/view/excel/export-excel.vue')
      }
    ]
  },

  {
    path: '/directive',
    name: 'directive',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'directive_page',
        name: 'directive_page',
        meta: {
          icon: 'ios-navigate',
          title: '指令'
        },
        component: () => import('@/view/directive/directive.vue')
      }
    ]
  },
  {
    path: '/multilevel',
    name: 'multilevel',
    meta: {
      icon: 'md-menu',
      title: '多级菜单'
    },
    component: Main,
    children: [
      {
        path: 'level_2_1',
        name: 'level_2_1',
        meta: {
          icon: 'md-funnel',
          title: '二级-1'
        },
        component: () => import('@/view/multilevel/level-2-1.vue')
      },
      {
        path: 'level_2_2',
        name: 'level_2_2',
        meta: {
          access: ['super_admin'],
          icon: 'md-funnel',
          showAlways: true,
          title: '二级-2'
        },
        component: parentView,
        children: [
          {
            path: 'level_2_2_1',
            name: 'level_2_2_1',
            meta: {
              icon: 'md-funnel',
              title: '三级'
            },
            component: () => import('@/view/multilevel/level-2-2/level-2-2-1.vue')
          },
          {
            path: 'level_2_2_2',
            name: 'level_2_2_2',
            meta: {
              icon: 'md-funnel',
              title: '三级'
            },
            component: () => import('@/view/multilevel/level-2-2/level-2-2-2.vue')
          }
        ]
      },
      {
        path: 'level_2_3',
        name: 'level_2_3',
        meta: {
          icon: 'md-funnel',
          title: '二级-3'
        },
        component: () => import('@/view/multilevel/level-2-3.vue')
      }
    ]
  },
  {
    path: '/argu',
    name: 'argu',
    meta: {
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'params/:id',
        name: 'params',
        meta: {
          icon: 'md-flower',
          title: route => `{{ params }}-${route.params.id}`,
          notCache: true,
          beforeCloseName: 'before_close_normal'
        },
        component: () => import('@/view/argu-page/params.vue')
      },
      {
        path: 'query',
        name: 'query',
        meta: {
          icon: 'md-flower',
          title: route => `{{ query }}-${route.query.id}`,
          notCache: true
        },
        component: () => import('@/view/argu-page/query.vue')
      }
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
  },
  {
    path: '',
    name: 'doc',
    meta: {
      title: '文档',
      href: 'https://lison16.github.io/iview-admin-doc/#/',
      icon: 'ios-book'
    }
  },
  {
    path: '/join',
    name: 'join',
    component: Main,
    meta: {
      hideInBread: true
    },
    children: [
      {
        path: 'join_page',
        name: 'join_page',
        meta: {
          icon: '_qq',
          title: 'QQ群'
        },
        component: () => import('@/view/join-page.vue')
      }
    ]
  },
  {
    path: '/message',
    name: 'message',
    component: Main,
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    children: [
      {
        path: 'message_page',
        name: 'message_page',
        meta: {
          icon: 'md-notifications',
          title: '消息中心'
        },
        component: () => import('@/view/single-page/message/index.vue')
      }
    ]
  },
  {
    path: '/tools_methods',
    name: 'tools_methods',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'tools_methods_page',
        name: 'tools_methods_page',
        meta: {
          icon: 'ios-hammer',
          title: '工具方法',
          beforeCloseName: 'before_close_normal'
        },
        component: () => import('@/view/tools-methods/tools-methods.vue')
      }
    ]
  },
  {
    path: '/i18n',
    name: 'i18n',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'i18n_page',
        name: 'i18n_page',
        meta: {
          icon: 'md-planet',
          title: 'i18n - {{ i18n_page }}'
        },
        component: () => import('@/view/i18n/i18n-page.vue')
      }
    ]
  },
  {
    path: '/error_store',
    name: 'error_store',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'error_store_page',
        name: 'error_store_page',
        meta: {
          icon: 'ios-bug',
          title: '错误收集'
        },
        component: () => import('@/view/error-store/error-store.vue')
      }
    ]
  },
  {
    path: '/error_logger',
    name: 'error_logger',
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'error_logger_page',
        name: 'error_logger_page',
        meta: {
          icon: 'ios-bug',
          title: '错误收集'
        },
        component: () => import('@/view/single-page/error-logger.vue')
      }
    ]
  }
]

// 框架自带的
// export default [
//   {
//     path: '/login',
//     name: 'login',
//     meta: {
//       title: 'Login - 登录',
//       hideInMenu: true
//     },
//     component: () => import('@/view/login/login.vue')
//   },
//   {
//     path: '/',
//     name: '_home',
//     redirect: '/home',
//     component: Main,
//     meta: {
//       hideInMenu: true,
//       notCache: true
//     },
//     children: [
//       {
//         path: '/home',
//         name: 'home',
//         meta: {
//           hideInMenu: true,
//           title: '首页',
//           notCache: true,
//           icon: 'md-home'
//         },
//         component: () => import('@/view/single-page/home')
//       }
//     ]
//   },
//   {
//     path: '',
//     name: 'doc',
//     meta: {
//       title: '文档',
//       href: 'https://lison16.github.io/iview-admin-doc/#/',
//       icon: 'ios-book'
//     }
//   },
//   {
//     path: '/join',
//     name: 'join',
//     component: Main,
//     meta: {
//       hideInBread: true
//     },
//     children: [
//       {
//         path: 'join_page',
//         name: 'join_page',
//         meta: {
//           icon: '_qq',
//           title: 'QQ群'
//         },
//         component: () => import('@/view/join-page.vue')
//       }
//     ]
//   },
//   {
//     path: '/message',
//     name: 'message',
//     component: Main,
//     meta: {
//       hideInBread: true,
//       hideInMenu: true
//     },
//     children: [
//       {
//         path: 'message_page',
//         name: 'message_page',
//         meta: {
//           icon: 'md-notifications',
//           title: '消息中心'
//         },
//         component: () => import('@/view/single-page/message/index.vue')
//       }
//     ]
//   },
//   {
//     path: '/components',
//     name: 'components',
//     meta: {
//       icon: 'logo-buffer',
//       title: '组件'
//     },
//     component: Main,
//     children: [
//       {
//         path: 'tree_select_page',
//         name: 'tree_select_page',
//         meta: {
//           icon: 'md-arrow-dropdown-circle',
//           title: '树状下拉选择器'
//         },
//         component: () => import('@/view/components/tree-select/index.vue')
//       },
//       {
//         path: 'count_to_page',
//         name: 'count_to_page',
//         meta: {
//           icon: 'md-trending-up',
//           title: '数字渐变'
//         },
//         component: () => import('@/view/components/count-to/count-to.vue')
//       },
//       {
//         path: 'drag_list_page',
//         name: 'drag_list_page',
//         meta: {
//           icon: 'ios-infinite',
//           title: '拖拽列表'
//         },
//         component: () => import('@/view/components/drag-list/drag-list.vue')
//       },
//       {
//         path: 'drag_drawer_page',
//         name: 'drag_drawer_page',
//         meta: {
//           icon: 'md-list',
//           title: '可拖拽抽屉'
//         },
//         component: () => import('@/view/components/drag-drawer')
//       },
//       {
//         path: 'org_tree_page',
//         name: 'org_tree_page',
//         meta: {
//           icon: 'ios-people',
//           title: '组织结构树'
//         },
//         component: () => import('@/view/components/org-tree')
//       },
//       {
//         path: 'tree_table_page',
//         name: 'tree_table_page',
//         meta: {
//           icon: 'md-git-branch',
//           title: '树状表格'
//         },
//         component: () => import('@/view/components/tree-table/index.vue')
//       },
//       {
//         path: 'cropper_page',
//         name: 'cropper_page',
//         meta: {
//           icon: 'md-crop',
//           title: '图片裁剪'
//         },
//         component: () => import('@/view/components/cropper/cropper.vue')
//       },
//       {
//         path: 'tables_page',
//         name: 'tables_page',
//         meta: {
//           icon: 'md-grid',
//           title: '多功能表格'
//         },
//         component: () => import('@/view/components/tables/tables.vue')
//       },
//       {
//         path: 'split_pane_page',
//         name: 'split_pane_page',
//         meta: {
//           icon: 'md-pause',
//           title: '分割窗口'
//         },
//         component: () => import('@/view/components/split-pane/split-pane.vue')
//       },
//       {
//         path: 'markdown_page',
//         name: 'markdown_page',
//         meta: {
//           icon: 'logo-markdown',
//           title: 'Markdown编辑器'
//         },
//         component: () => import('@/view/components/markdown/markdown.vue')
//       },
//       {
//         path: 'editor_page',
//         name: 'editor_page',
//         meta: {
//           icon: 'ios-create',
//           title: '富文本编辑器'
//         },
//         component: () => import('@/view/components/editor/editor.vue')
//       },
//       {
//         path: 'icons_page',
//         name: 'icons_page',
//         meta: {
//           icon: '_bear',
//           title: '自定义图标'
//         },
//         component: () => import('@/view/components/icons/icons.vue')
//       }
//     ]
//   },
//   {
//     path: '/update',
//     name: 'update',
//     meta: {
//       icon: 'md-cloud-upload',
//       title: '数据上传'
//     },
//     component: Main,
//     children: [
//       {
//         path: 'update_table_page',
//         name: 'update_table_page',
//         meta: {
//           icon: 'ios-document',
//           title: '上传Csv'
//         },
//         component: () => import('@/view/update/update-table.vue')
//       },
//       {
//         path: 'update_paste_page',
//         name: 'update_paste_page',
//         meta: {
//           icon: 'md-clipboard',
//           title: '粘贴表格数据'
//         },
//         component: () => import('@/view/update/update-paste.vue')
//       }
//     ]
//   },
//   {
//     path: '/excel',
//     name: 'excel',
//     meta: {
//       icon: 'ios-stats',
//       title: 'EXCEL导入导出'
//     },
//     component: Main,
//     children: [
//       {
//         path: 'upload-excel',
//         name: 'upload-excel',
//         meta: {
//           icon: 'md-add',
//           title: '导入EXCEL'
//         },
//         component: () => import('@/view/excel/upload-excel.vue')
//       },
//       {
//         path: 'export-excel',
//         name: 'export-excel',
//         meta: {
//           icon: 'md-download',
//           title: '导出EXCEL'
//         },
//         component: () => import('@/view/excel/export-excel.vue')
//       }
//     ]
//   },
//   {
//     path: '/tools_methods',
//     name: 'tools_methods',
//     meta: {
//       hideInBread: true
//     },
//     component: Main,
//     children: [
//       {
//         path: 'tools_methods_page',
//         name: 'tools_methods_page',
//         meta: {
//           icon: 'ios-hammer',
//           title: '工具方法',
//           beforeCloseName: 'before_close_normal'
//         },
//         component: () => import('@/view/tools-methods/tools-methods.vue')
//       }
//     ]
//   },
//   {
//     path: '/i18n',
//     name: 'i18n',
//     meta: {
//       hideInBread: true
//     },
//     component: Main,
//     children: [
//       {
//         path: 'i18n_page',
//         name: 'i18n_page',
//         meta: {
//           icon: 'md-planet',
//           title: 'i18n - {{ i18n_page }}'
//         },
//         component: () => import('@/view/i18n/i18n-page.vue')
//       }
//     ]
//   },
//   {
//     path: '/error_store',
//     name: 'error_store',
//     meta: {
//       hideInBread: true
//     },
//     component: Main,
//     children: [
//       {
//         path: 'error_store_page',
//         name: 'error_store_page',
//         meta: {
//           icon: 'ios-bug',
//           title: '错误收集'
//         },
//         component: () => import('@/view/error-store/error-store.vue')
//       }
//     ]
//   },
//   {
//     path: '/error_logger',
//     name: 'error_logger',
//     meta: {
//       hideInBread: true,
//       hideInMenu: true
//     },
//     component: Main,
//     children: [
//       {
//         path: 'error_logger_page',
//         name: 'error_logger_page',
//         meta: {
//           icon: 'ios-bug',
//           title: '错误收集'
//         },
//         component: () => import('@/view/single-page/error-logger.vue')
//       }
//     ]
//   },
//   {
//     path: '/directive',
//     name: 'directive',
//     meta: {
//       hideInBread: true
//     },
//     component: Main,
//     children: [
//       {
//         path: 'directive_page',
//         name: 'directive_page',
//         meta: {
//           icon: 'ios-navigate',
//           title: '指令'
//         },
//         component: () => import('@/view/directive/directive.vue')
//       }
//     ]
//   },
//   {
//     path: '/multilevel',
//     name: 'multilevel',
//     meta: {
//       icon: 'md-menu',
//       title: '多级菜单'
//     },
//     component: Main,
//     children: [
//       {
//         path: 'level_2_1',
//         name: 'level_2_1',
//         meta: {
//           icon: 'md-funnel',
//           title: '二级-1'
//         },
//         component: () => import('@/view/multilevel/level-2-1.vue')
//       },
//       {
//         path: 'level_2_2',
//         name: 'level_2_2',
//         meta: {
//           access: ['super_admin'],
//           icon: 'md-funnel',
//           showAlways: true,
//           title: '二级-2'
//         },
//         component: parentView,
//         children: [
//           {
//             path: 'level_2_2_1',
//             name: 'level_2_2_1',
//             meta: {
//               icon: 'md-funnel',
//               title: '三级'
//             },
//             component: () => import('@/view/multilevel/level-2-2/level-2-2-1.vue')
//           },
//           {
//             path: 'level_2_2_2',
//             name: 'level_2_2_2',
//             meta: {
//               icon: 'md-funnel',
//               title: '三级'
//             },
//             component: () => import('@/view/multilevel/level-2-2/level-2-2-2.vue')
//           }
//         ]
//       },
//       {
//         path: 'level_2_3',
//         name: 'level_2_3',
//         meta: {
//           icon: 'md-funnel',
//           title: '二级-3'
//         },
//         component: () => import('@/view/multilevel/level-2-3.vue')
//       }
//     ]
//   },
//   {
//     path: '/argu',
//     name: 'argu',
//     meta: {
//       hideInMenu: true
//     },
//     component: Main,
//     children: [
//       {
//         path: 'params/:id',
//         name: 'params',
//         meta: {
//           icon: 'md-flower',
//           title: route => `{{ params }}-${route.params.id}`,
//           notCache: true,
//           beforeCloseName: 'before_close_normal'
//         },
//         component: () => import('@/view/argu-page/params.vue')
//       },
//       {
//         path: 'query',
//         name: 'query',
//         meta: {
//           icon: 'md-flower',
//           title: route => `{{ query }}-${route.query.id}`,
//           notCache: true
//         },
//         component: () => import('@/view/argu-page/query.vue')
//       }
//     ]
//   },
//   {
//     path: '/401',
//     name: 'error_401',
//     meta: {
//       hideInMenu: true
//     },
//     component: () => import('@/view/error-page/401.vue')
//   },
//   {
//     path: '/500',
//     name: 'error_500',
//     meta: {
//       hideInMenu: true
//     },
//     component: () => import('@/view/error-page/500.vue')
//   },
//   {
//     path: '*',
//     name: 'error_404',
//     meta: {
//       hideInMenu: true
//     },
//     component: () => import('@/view/error-page/404.vue')
//   }
// ]

// {
//   path: 'ji_gou_guan_li',
//   name: 'ji_gou_guan_li',
//   meta: {
//     icon: 'ios-document',
//     title: '机构管理'

//   },
//   component: () => import('@/view/update/update-table.vue'),

//   children: [
//     {
//       path: 'xin_zeng_ji_gou',
//       name: 'xin_zeng_ji_gou',
//       meta: {
//         icon: 'md-funnel',
//         title: '新增机构'
//       },
//       component: () => import('@/view/multilevel/level-2-2/level-2-2-1.vue')
//     },
//     {
//       path: 'shan_chu_ji_gou',
//       name: 'shan_chu_ji_gou',
//       meta: {
//         icon: 'md-funnel',
//         title: '删除机构'
//       },
//       component: () => import('@/view/multilevel/level-2-2/level-2-2-2.vue')
//     }, {
//       path: 'bing_chang_guan_li',
//       name: 'bing_chang_guan_li',
//       meta: {
//         icon: 'md-funnel',
//         title: '冰场管理'
//       },
//       component: () => import('@/view/multilevel/level-2-2/level-2-2-2.vue'),
//       children: [{
//         path: 'xin_zeng_bing_chang',
//         name: 'xin_zeng_bing_chang',
//         meta: {
//           icon: 'md-funnel',
//           title: '新增冰场'
//         },
//         component: () => import('@/view/multilevel/level-2-2/level-2-2-2.vue')
//       }, {
//         path: 'shan_chu_bing_chang',
//         name: 'shan_chu_bing_chang',
//         meta: {
//           icon: 'md-funnel',
//           title: '删除冰场'
//         },
//         component: () => import('@/view/multilevel/level-2-2/level-2-2-2.vue')
//       }]
//     }
//   ]
// },
// {
//   path: 'xun_lian_ji_hua',
//   name: 'xun_lian_ji_hua',
//   meta: {
//     icon: 'md-clipboard',
//     title: '训练计划'

//   },
//   component: () => import('@/view/update/update-paste.vue'),
//   children: [{
//     path: 'xin_zeng_ji_hua',
//     name: 'xin_zeng_ji_hua',
//     meta: {
//       icon: 'md-funnel',
//       title: '新增计划'
//     },
//     component: () => import('@/view/multilevel/level-2-2/level-2-2-2.vue')
//   }, {
//     path: 'shan_chu_ji_hua',
//     name: 'shan_chu_ji_hua',
//     meta: {
//       icon: 'md-funnel',
//       title: '删除计划'
//     },
//     component: () => import('@/view/multilevel/level-2-2/level-2-2-2.vue')
//   }, {
//     path: 'mo_ban_ji_hua',
//     name: 'mo_ban_ji_hua',
//     meta: {
//       icon: 'md-funnel',
//       title: '模板计划',
//       showAlways: true
//     },
//     component: () => import('@/view/multilevel/level-2-2/level-2-2-2.vue'),
//     children: [{
//       path: 'fu_zhi_mo_ban',
//       name: 'fu_zhi_mo_ban',
//       meta: {
//         icon: 'md-funnel',
//         title: '复制模板'
//       },
//       component: () => import('@/view/multilevel/level-2-2/level-2-2-2.vue')
//     }]
//   }, {
//     path: 'ri_cheng_guan_li',
//     name: 'ri_cheng_guan_li',
//     meta: {
//       icon: 'md-funnel',
//       title: '日程管理'
//     },
//     component: () => import('@/view/multilevel/level-2-2/level-2-2-2.vue'),
//     children: [{
//       path: 'xin_zeng_ri_cheng',
//       name: 'xin_zeng_ri_cheng',
//       meta: {
//         icon: 'md-funnel',
//         title: '新增日程'
//       },
//       component: () => import('@/view/multilevel/level-2-2/level-2-2-2.vue')
//     }, {
//       path: 'shan_chu_ri_cheng',
//       name: 'shan_chu_ri_cheng',
//       meta: {
//         icon: 'md-funnel',
//         title: '删除日程'
//       },
//       component: () => import('@/view/multilevel/level-2-2/level-2-2-2.vue')
//     }]
//   }]
// },
