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
        component: () => import('@/view/update/update-table.vue')
      },
      {
        path: 'xiu_gai_mi_ma',
        name: 'xiu_gai_mi_ma',
        meta: {
          icon: 'md-clipboard',
          title: '修改密码'

        },
        component: () => import('@/view/update/update-paste.vue')
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
        path: 'ji_gou_guan_li',
        name: 'ji_gou_guan_li',
        meta: {
          icon: 'ios-document',
          title: '机构管理'

        },
        component: () => import('@/view/update/update-table.vue'),

        children: [
          {
            path: 'xin_zeng_ji_gou',
            name: 'xin_zeng_ji_gou',
            meta: {
              icon: 'md-funnel',
              title: '新增机构'
            },
            component: () => import('@/view/multilevel/level-2-2/level-2-2-1.vue')
          },
          {
            path: 'shan_chu_ji_gou',
            name: 'shan_chu_ji_gou',
            meta: {
              icon: 'md-funnel',
              title: '删除机构'
            },
            component: () => import('@/view/multilevel/level-2-2/level-2-2-2.vue')
          }, {
            path: 'bing_chang_guan_li',
            name: 'bing_chang_guan_li',
            meta: {
              icon: 'md-funnel',
              title: '冰场管理'
            },
            component: () => import('@/view/multilevel/level-2-2/level-2-2-2.vue'),
            children: [{
              path: 'xin_zeng_bing_chang',
              name: 'xin_zeng_bing_chang',
              meta: {
                icon: 'md-funnel',
                title: '新增冰场'
              },
              component: () => import('@/view/multilevel/level-2-2/level-2-2-2.vue')
            }, {
              path: 'shan_chu_bing_chang',
              name: 'shan_chu_bing_chang',
              meta: {
                icon: 'md-funnel',
                title: '删除冰场'
              },
              component: () => import('@/view/multilevel/level-2-2/level-2-2-2.vue')
            }]
          }
        ]
      },
      {
        path: 'xun_lian_ji_hua',
        name: 'xun_lian_ji_hua',
        meta: {
          icon: 'md-clipboard',
          title: '训练计划'

        },
        component: () => import('@/view/update/update-paste.vue'),
        children: [{
          path: 'xin_zeng_ji_hua',
          name: 'xin_zeng_ji_hua',
          meta: {
            icon: 'md-funnel',
            title: '新增计划'
          },
          component: () => import('@/view/multilevel/level-2-2/level-2-2-2.vue')
        }, {
          path: 'shan_chu_ji_hua',
          name: 'shan_chu_ji_hua',
          meta: {
            icon: 'md-funnel',
            title: '删除计划'
          },
          component: () => import('@/view/multilevel/level-2-2/level-2-2-2.vue')
        }, {
          path: 'mo_ban_ji_hua',
          name: 'mo_ban_ji_hua',
          meta: {
            icon: 'md-funnel',
            title: '模板计划',
            showAlways: true
          },
          component: () => import('@/view/multilevel/level-2-2/level-2-2-2.vue'),
          children: [{
            path: 'fu_zhi_mo_ban',
            name: 'fu_zhi_mo_ban',
            meta: {
              icon: 'md-funnel',
              title: '复制模板'
            },
            component: () => import('@/view/multilevel/level-2-2/level-2-2-2.vue')
          }]
        }, {
          path: 'ri_cheng_guan_li',
          name: 'ri_cheng_guan_li',
          meta: {
            icon: 'md-funnel',
            title: '日程管理'
          },
          component: () => import('@/view/multilevel/level-2-2/level-2-2-2.vue'),
          children: [{
            path: 'xin_zeng_ri_cheng',
            name: 'xin_zeng_ri_cheng',
            meta: {
              icon: 'md-funnel',
              title: '新增日程'
            },
            component: () => import('@/view/multilevel/level-2-2/level-2-2-2.vue')
          }, {
            path: 'shan_chu_ri_cheng',
            name: 'shan_chu_ri_cheng',
            meta: {
              icon: 'md-funnel',
              title: '删除日程'
            },
            component: () => import('@/view/multilevel/level-2-2/level-2-2-2.vue')
          }]
        }]
      }, {
        path: 'ke_bao_guan_li',
        name: 'ke_bao_guan_li',
        meta: {
          icon: 'md-clipboard',
          title: '课包管理',
          showAlways: true
        },
        component: () => import('@/view/update/update-paste.vue'),
        children: [{
          path: 'xin_zeng_ke_bao',
          name: 'xin_zeng_ke_bao',
          meta: {
            icon: 'md-clipboard',
            title: '新增课包'

          },
          component: () => import('@/view/update/update-paste.vue')
        }]
      }, {
        path: 'ke_cheng_ding_dan',
        name: 'ke_cheng_ding_dan',
        meta: {
          icon: 'md-clipboard',
          title: '课程订单'

        },
        component: () => import('@/view/update/update-paste.vue'),
        children: [{
          path: 'ding_dan_xiang_qing',
          name: 'ding_dan_xiang_qing',
          meta: {
            icon: 'md-clipboard',
            title: '订单详情'

          },
          component: () => import('@/view/update/update-paste.vue')
        }, {
          path: 'shen_qing_tui_kuan',
          name: 'shen_qing_tui_kuan',
          meta: {
            icon: 'md-clipboard',
            title: '申请退款'

          },
          component: () => import('@/view/update/update-paste.vue')
        }]
      }, {
        path: 'chong_zhi_ding_dan',
        name: 'chong_zhi_ding_dan',
        meta: {
          icon: 'md-clipboard',
          title: '充值订单'

        },
        component: () => import('@/view/update/update-paste.vue')
      }, {
        path: 'xu_ni_ding_dan',
        name: 'xu_ni_ding_dan',
        meta: {
          icon: 'md-clipboard',
          title: '虚拟订单'

        },
        component: () => import('@/view/update/update-paste.vue')
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
          title: '用户管理',
          showAlways: true
        },
        component: () => import('@/view/update/update-table.vue'),
        children: [{
          path: 'yong_hu_xiang_qing',
          name: 'yong_hu_xiang_qing',
          meta: {
            icon: 'ios-document',
            title: '用户详情'

          },
          component: () => import('@/view/update/update-table.vue')
        }]
      },
      {
        path: 'xue_yuan_guan_li',
        name: 'xue_yuan_guan_li',
        meta: {
          icon: 'md-clipboard',
          title: '学员管理',
          showAlways: true
        },
        component: () => import('@/view/update/update-paste.vue'),
        children: [{
          path: 'xue_yuan_xiang_qing',
          name: 'xue_yuan_xiang_qing',
          meta: {
            icon: 'ios-document',
            title: '学员详情'

          },
          component: () => import('@/view/update/update-table.vue')
        }]
      }, {
        path: 'ban_zhuan_ye_jiao_lain',
        name: 'ban_zhuan_ye_jiao_lain',
        meta: {
          icon: 'ios-document',
          title: '半专业教练',
          showAlways: true
        },
        component: () => import('@/view/update/update-table.vue'),
        children: [{
          path: 'ban_zhuan_ye_jiao_lian_xiang_qing',
          name: 'ban_zhuan_ye_jiao_lian_xiang_qing',
          meta: {
            icon: 'ios-document',
            title: '教练详情'

          },
          component: () => import('@/view/update/update-table.vue')
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
        component: () => import('@/view/update/update-paste.vue'),
        children: [{
          path: 'zhuan_ye_jiao_liang_xiang_qing',
          name: 'zhuan_ye_jiao_liang_xiang_qing',
          meta: {
            icon: 'ios-document',
            title: '教练详情'

          },
          component: () => import('@/view/update/update-table.vue')
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
    component: Main
    // children: [
    //   {
    //     path: 'ge_ren_zhong_xin',
    //     name: 'ge_ren_zhong_xin',
    //     meta: {
    //       icon: 'ios-document',
    //       title: '个人中心',

    //     },
    //     component: () => import('@/view/update/update-table.vue')
    //   },
    //   {
    //     path: 'xiu_gai_mi_ma',
    //     name: 'xiu_gai_mi_ma',
    //     meta: {
    //       icon: 'md-clipboard',
    //       title: '修改密码',

    //     },
    //     component: () => import('@/view/update/update-paste.vue')
    //   }
    // ]
  }, {
    path: '/nei_rong_guan_li',
    name: 'nei_rong_guan_li',

    meta: {
      icon: 'md-cloud-upload',
      title: '内容管理'

    },
    component: Main
    // children: [
    //   {
    //     path: 'ge_ren_zhong_xin',
    //     name: 'ge_ren_zhong_xin',
    //     meta: {
    //       icon: 'ios-document',
    //       title: '个人中心',

    //     },
    //     component: () => import('@/view/update/update-table.vue')
    //   },
    //   {
    //     path: 'xiu_gai_mi_ma',
    //     name: 'xiu_gai_mi_ma',
    //     meta: {
    //       icon: 'md-clipboard',
    //       title: '修改密码',

    //     },
    //     component: () => import('@/view/update/update-paste.vue')
    //   }
    // ]
  },
  {
    path: '/gong_jv_guan_li',
    name: 'gong_jv_guan_li',

    meta: {
      icon: 'md-cloud-upload',
      title: '工具管理'

    },
    component: Main
    // children: [
    //   {
    //     path: 'ge_ren_zhong_xin',
    //     name: 'ge_ren_zhong_xin',
    //     meta: {
    //       icon: 'ios-document',
    //       title: '个人中心',

    //     },
    //     component: () => import('@/view/update/update-table.vue')
    //   },
    //   {
    //     path: 'xiu_gai_mi_ma',
    //     name: 'xiu_gai_mi_ma',
    //     meta: {
    //       icon: 'md-clipboard',
    //       title: '修改密码',

    //     },
    //     component: () => import('@/view/update/update-paste.vue')
    //   }
    // ]
  }, {
    path: '/cai_wu_guan_li',
    name: 'cai_wu_guan_li',

    meta: {
      icon: 'md-cloud-upload',
      title: '财务管理'

    },
    component: Main
    // children: [
    //   {
    //     path: 'ge_ren_zhong_xin',
    //     name: 'ge_ren_zhong_xin',
    //     meta: {
    //       icon: 'ios-document',
    //       title: '个人中心',

    //     },
    //     component: () => import('@/view/update/update-table.vue')
    //   },
    //   {
    //     path: 'xiu_gai_mi_ma',
    //     name: 'xiu_gai_mi_ma',
    //     meta: {
    //       icon: 'md-clipboard',
    //       title: '修改密码',

    //     },
    //     component: () => import('@/view/update/update-paste.vue')
    //   }
    // ]
  }, {
    path: '/xi_tong_guan_li',
    name: 'xi_tong_guan_li',

    meta: {
      icon: 'md-cloud-upload',
      title: '系统管理'

    },
    component: Main
    // children: [
    //   {
    //     path: 'ge_ren_zhong_xin',
    //     name: 'ge_ren_zhong_xin',
    //     meta: {
    //       icon: 'ios-document',
    //       title: '个人中心',

    //     },
    //     component: () => import('@/view/update/update-table.vue')
    //   },
    //   {
    //     path: 'xiu_gai_mi_ma',
    //     name: 'xiu_gai_mi_ma',
    //     meta: {
    //       icon: 'md-clipboard',
    //       title: '修改密码',

    //     },
    //     component: () => import('@/view/update/update-paste.vue')
    //   }
    // ]
  },

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
  }
  // {
  //   path: '',
  //   name: 'doc',
  //   meta: {
  //     title: '文档',
  //     href: 'https://lison16.github.io/iview-admin-doc/#/',
  //     icon: 'ios-book'
  //   }
  // },
  // {
  //   path: '/join',
  //   name: 'join',
  //   component: Main,
  //   meta: {
  //     hideInBread: true
  //   },
  //   children: [
  //     {
  //       path: 'join_page',
  //       name: 'join_page',
  //       meta: {
  //         icon: '_qq',
  //         title: 'QQ群'
  //       },
  //       component: () => import('@/view/join-page.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/message',
  //   name: 'message',
  //   component: Main,
  //   meta: {
  //     hideInBread: true,
  //     hideInMenu: true
  //   },
  //   children: [
  //     {
  //       path: 'message_page',
  //       name: 'message_page',
  //       meta: {
  //         icon: 'md-notifications',
  //         title: '消息中心'
  //       },
  //       component: () => import('@/view/single-page/message/index.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/tools_methods',
  //   name: 'tools_methods',
  //   meta: {
  //     hideInBread: true
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'tools_methods_page',
  //       name: 'tools_methods_page',
  //       meta: {
  //         icon: 'ios-hammer',
  //         title: '工具方法',
  //         beforeCloseName: 'before_close_normal'
  //       },
  //       component: () => import('@/view/tools-methods/tools-methods.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/i18n',
  //   name: 'i18n',
  //   meta: {
  //     hideInBread: true
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'i18n_page',
  //       name: 'i18n_page',
  //       meta: {
  //         icon: 'md-planet',
  //         title: 'i18n - {{ i18n_page }}'
  //       },
  //       component: () => import('@/view/i18n/i18n-page.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/error_store',
  //   name: 'error_store',
  //   meta: {
  //     hideInBread: true
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'error_store_page',
  //       name: 'error_store_page',
  //       meta: {
  //         icon: 'ios-bug',
  //         title: '错误收集'
  //       },
  //       component: () => import('@/view/error-store/error-store.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/error_logger',
  //   name: 'error_logger',
  //   meta: {
  //     hideInBread: true,
  //     hideInMenu: true
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'error_logger_page',
  //       name: 'error_logger_page',
  //       meta: {
  //         icon: 'ios-bug',
  //         title: '错误收集'
  //       },
  //       component: () => import('@/view/single-page/error-logger.vue')
  //     }
  //   ]
  // },
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
