// 用户接口
export const USER_API = {
  CREATE: 'com/user/create',
  UPDATE: 'com/user/update',
  DELETE: 'com/user/delete',
  GET_DETAIL: 'com/user/getDetail',
  GET_LIST: 'com/user/getList',
  GET_INFO: 'com/user/getInfo',
  // SAVE:'com/user/save',
  LOGIN: 'com/user/login',
  LOGOUT: 'com/user/logout',
  SET_ROLE: 'com/user/setRole',
  UPDATE_PASSWORD: 'com/user/updatePassword',
  UPDATE_INFO: 'com/user/updateInfo'
}
// 菜单接口
export const MENU_API = {
  CREATE: 'com/module/create',
  UPDATE: 'com/module/update',
  DELETE: 'com/module/delete',
  GET_LIST: 'com/module/getList',
  GET_DETAIL: 'com/module/getDetail',
  DRAG: 'com/module/drag'
}

// 上传接口
export const UP_API = {
  UP_FILE: 'file/attachment/uploadFromUser',
  UP_FILE_BASE64: 'file/attachment/uploadByBase64',
  UP_GET_FILE_URL: 'file/attachment/getUrl',
  UP_GET_INFO: 'file/attachment/getPostObject'
}

// 附件类型接口
export const FILE_TYPE_API = {
  GET_LIST: '/file/attachmentType/getList',
  GET_DETAIL: '/file/attachmentType/getDetail',
  CREATE: '/file/attachmentType/create',
  UPDATE: '/file/attachmentType/update',
  DELETE: '/file/attachmentType/delete',
  TRUE_DELETE: '/file/attachmentType/trueDelete'
}

// 附件接口
export const FILE_API = {
  GET_LIST: 'file/attachment/getList',
  GET_DETAIL: 'file/attachment/getDetail',
  DELETE: 'file/attachment/delete',
  TRUE_DELETE: 'file/attachment/trueDelete',
  GET_USER_LIST: '/attachment/getUserByRecent'
}

// 用户附件接口
export const USER_FILE_API = {
  READ_LIST: 'file/attachment/getUserByRecent',
  GET_LIST: 'file/attachment/getUserByRecent',
  FILE_GET: 'file/attachment/getDetail',
  FILE_DELETE: 'file/attachment/deleteUser',
  FILE_DELETE_TRUE: 'file/attachment/trueDeleteUser'
}

// 角色接口
export const ROLE_API = {
  CREATE: 'com/role/create',
  UPDATE: 'com/role/update',
  DELETE: 'com/role/delete',
  GET_DETAIL: 'com/role/getDetail',
  GET_LIST: 'com/role/getList',
  SET_MODULE: 'com/role/setModule'
}

// CMS系统菜单接口
export const CMS_MENU_API = {
  CREATE: 'cms/catalog/create',
  UPDATE: 'cms/catalog/update',
  DELETE: 'cms/catalog/delete',
  GET_DETAIL: 'cms/catalog/get',
  GET_LIST: 'cms/catalog/getList',
  MENU_CONFIG: 'cms/catalog/config',
  DRAG: 'cms/catalog/drag',
  GET_TEACH_LIST: 'cms/catalog/getTeachList'
}

export const CMS_CONTENT_MENU_API = {
  GET_LIST: 'cms/catalog/getContentList',
  UPDATE: 'cms/catalog/update',
  DELETE: 'cms/catalog/delete',
  GET_DETAIL: 'cms/catalog/get',
  MENU_CONFIG: 'cms/catalog/config',
  DRAG: 'cms/catalog/drag'
}
export const CMS_ACTION_MENU_API = {
  GET_LIST: 'cms/catalog/getActionList'
}

export const CMS_EVENT_MENU_API = {
  GET_LIST: 'cms/catalog/getEventList',
  UPDATE: 'cms/catalog/update',
  DELETE: 'cms/catalog/delete',
  GET_DETAIL: 'cms/catalog/get',
  MENU_CONFIG: 'cms/catalog/config',
  DRAG: 'cms/catalog/drag'
}

export const CMS_LEVEL_MENU_API = {
  GET_LIST: 'cms/level/getList',
  CREATE: 'cms/level/create',
  UPDATE: 'cms/level/update',
  DELETE: 'cms/level/trueDelete',
  GET_DETAIL: 'cms/level/get'
}

// CMS文章接口
export const CMS_ARTICLE_API = {
  CREATE: 'cms/article/create',
  UPDATE: 'cms/article/update',
  DELETE: 'cms/article/delete',
  GET_DETAIL: 'cms/article/get',
  GET_LIST: 'cms/article/getList',
  AUDIT: 'cms/article/audit',
  COMMEND: 'cms/article/commend',
  MOVE: 'cms/article/adjustSort'
}

export const CMS_COURSE_MENU_API = {
  GET_LIST: 'cms/catalog/getCourseList',
  CREATE: 'cms/coursePacket/create',
  UPDATE: 'cms/coursePacket/update',
  DELETE: 'cms/coursePacket/trueDelete',
  GET_DETAIL: 'cms/coursePacket/get'
}

// CMS课程接口
export const CMS_COURSE_API = {
  CREATE: 'cms/course/create',
  UPDATE: 'cms/course/update',
  DELETE: 'cms/course/trueDelete',
  GET_DETAIL: 'cms/course/get',
  GET_LIST: 'cms/course/getList',
  GET_NAME: 'cms/course/getName',
  GET_COMMODITY: 'cms/course/getCourseByCommodity'

}

// CMS课程包接口
export const CMS_COURSE_PACKET_API = {
  CREATE: 'cms/coursePacket/create',
  UPDATE: 'cms/coursePacket/update',
  DELETE: 'cms/coursePacket/delete',
  GET_DETAIL: 'cms/coursePacket/get',
  GET_LIST: 'cms/coursePacket/getList',
  GET_NAME: 'cms/coursePacket/getName'
}

// CMS课节接口
export const CMS_COURSE_LESSON_API = {
  CREATE: 'cms/courseLesson/create',
  UPDATE: 'cms/courseLesson/update',
  DELETE: 'cms/courseLesson/trueDelete',
  GET_DETAIL: 'cms/courseLesson/get',
  GET_LIST: 'cms/courseLesson/getList',
  GET_COURSE_CONTENT: 'api/library/getCourseContent',
  GET_RULE_LIST: 'cms/courseLesson/getRuleList',
  GET_RULE: 'cms/courseLesson/getRule'
}

export const CMS_EVENT_API = {
  CREATE: 'cms/event/create',
  UPDATE: 'cms/event/update',
  DELETE: 'cms/event/trueDelete',
  GET_DETAIL: 'cms/event/get',
  GET_LIST: 'cms/event/getList'
}

export const CMS_RULE_API = {
  CREATE: 'cms/taskRule/create',
  UPDATE: 'cms/taskRule/update',
  DELETE: 'cms/taskRule/trueDelete',
  GET_DETAIL: 'cms/taskRule/get',
  GET_LIST: 'cms/taskRule/getList'
}

export const CMS_ACHIEVEMENT_API = {
  CREATE: 'cms/achievement/create',
  UPDATE: 'cms/achievement/update',
  DELETE: 'cms/achievement/trueDelete',
  GET_DETAIL: 'cms/achievement/get',
  GET_LIST: 'cms/achievement/getList',
  GET_ACHIEVEMENT_LIST: 'cms/achievement/getAchievementList'
}

// CMS课节接口
export const CMS_TEACH_ACTION_API = {
  CREATE: 'cms/teachAction/create',
  UPDATE: 'cms/teachAction/update',
  DELETE: 'cms/teachAction/delete',
  GET_DETAIL: 'cms/teachAction/get',
  GET_LIST: 'cms/teachAction/getList',
  MOVE: 'cms/teachAction/setMove'
}

export const BRAND_API = {
  CREATE: 'manage/brand/create',
  UPDATE: 'manage/brand/update',
  DELETE: 'manage/brand/del',
  GET_DETAIL: 'manage/brand/getDetail',
  GET_LIST: 'manage/brand/getList',
  GET_NAME: 'manage/brand/getBrandNames',
  GET_NAME_Id: 'manage/brand/getIdNames'
}

export const COURSE_ORDER_API = {
  CREATE: 'manage/courseOrder/create',
  UPDATE: 'manage/courseOrder/update',
  DELETE: 'manage/courseOrder/del',
  SCHEDULED_TEAM: 'manage/courseOrder/teamScheduled',
  SCHEDULED_COACH: 'manage/courseOrder/coachScheduled',
  GET_DETAIL: 'manage/courseOrder/getDetail',
  GET_LIST: 'manage/courseOrder/getList',
  REFUND: 'manage/courseOrder/refund'
}

export const PLAN_DAY_ORDER_API = {
  CREATE: 'manage/planDayOrder/create',
  UPDATE: 'manage/planDayOrder/update',
  DELETE: 'manage/PlanDayOrder/del',
  GET_DETAIL: 'manage/planDayOrder/getDetail',
  GET_LIST: 'manage/planDayOrder/getList'
}

export const PLAN_YEAR_ORDER_API = {
  CREATE: 'manage/planYearOrder/create',
  UPDATE: 'manage/planYearOrder/update',
  DELETE: 'manage/planYearOrder/del',
  GET_DETAIL: 'manage/planYearOrder/getDetail',
  GET_LIST: 'manage/planYearOrder/getList',
  REFUND: 'manage/planYearOrder/refund'
}

export const RINK_API = {
  CREATE: 'manage/rink/create',
  CREATE_QRCODE: 'manage/rink/createQrCode',
  UPDATE: 'manage/rink/update',
  DELETE: 'manage/rink/del',
  GET_DETAIL: 'manage/rink/getDetail',
  GET_LIST: 'manage/rink/getList',
  GET_NAME: 'manage/rink/getRinkName',
  GET_NAME_Id: 'manage/rink/getIdNames'
}

export const RINK_COURSE_API = {
  GET_LIST: 'manage/rinkCourse/getList',
  GET_DETAIL: 'manage/rinkCourse/getDetail',
  CREATE_QRCODE: 'manage/rinkCourse/createQrCode'
}

export const COACH_API = {
  CREATE: 'manage/coach/create',
  CREATE_QRCODE: 'manage/coach/createQrCode',
  UPDATE: 'manage/coach/update',
  DELETE: 'manage/coach/del',
  GET_DETAIL: 'manage/coach/getDetail',
  GET_LIST: 'manage/coach/getList',
  GET_NAME: 'manage/coach/getName',
  UPDATE_ENABLE_STATUS: 'manage/coach/updateEnableStatus'
}

export const REGISTER_API = {
  GET_LIST: 'manage/register/getList',
  GET_DETAIL: 'manage/register/getDetail',
  UPDATE: 'manage/register/update'
}

export const STUDENT_API = {
  CREATE: 'manage/student/create',
  UPDATE: 'manage/student/update',
  DELETE: 'manage/student/del',
  GET_DETAIL: 'manage/student/getDetail',
  GET_LIST: 'manage/student/getList',
  GET_NAME: 'manage/student/getNames',
  UPDATE_ENABLE_STATUS: 'manage/student/updateEnableStatus'
}

export const SYS_LOG_API = {
  GET_LIST: 'com/sysLog/getList',
  GET_DETAIL: 'com/sysLog/getDetail'
}

export const USER_LOG_API = {
  GET_LIST: 'com/userLog/getList'
}

export const RINK_USER_API = {
  CREATE: 'manage/rinkUser/create',
  UPDATE: 'manage/rinkUser/update',
  DELETE: 'manage/rinkUser/del',
  GET_DETAIL: 'manage/rinkUser/getDetail',
  GET_LIST: 'manage/rinkUser/getList',
  GET_NAME: 'manage/rinkUser/getRoleName'
}

export const QUESTION_API = {
  CREATE: 'cms/question/create',
  UPDATE: 'cms/question/update',
  DELETE: 'cms/question/trueDelete',
  GET_DETAIL: 'cms/question/get',
  GET_LIST: 'cms/question/getList',
  GET_LEVEL_LIST: 'cms/level/getLevelList',
  GET_ALL_LEVEL_LIST: 'cms/level/getAllLevelList'
}

export const TEMPLATE_MENU_API = {
  CREATE: 'plan/template/create',
  UPDATE: 'plan/template/update',
  DELETE: 'plan/template/delete',
  GET_DETAIL: 'plan/template/get',
  GET_LIST: 'plan/template/getList'
}

export const TEMPLATE_API = {
  CREATE: 'plan/arrangementTemplate/create',
  UPDATE: 'plan/arrangementTemplate/update',
  DELETE: 'plan/arrangementTemplate/delete',
  GET_DETAIL: 'plan/arrangementTemplate/get',
  GET_LIST: 'plan/arrangementTemplate/getList',
  GET_CATALOG_LIST: 'plan/arrangementTemplate/getCourseList',
  GET_CATALOG_OPEN_LIST: 'plan/arrangementTemplate/getCatalogOpenList',
  GET_ACTION_LIST: 'plan/arrangementTemplate/getActionList'
}

export const TASK_TEMPLATE_API = {
  CREATE: 'plan/courseArrangementTemplate/create',
  UPDATE: 'plan/courseArrangementTemplate/update',
  DELETE: 'plan/courseArrangementTemplate/delete',
  GET_DETAIL: 'plan/courseArrangementTemplate/get',
  GET_LIST: 'plan/courseArrangementTemplate/getList',
  GET_ACTION_LIST: 'plan/arrangementTemplate/getActionList'
}

export const BRAND_COURSE_PACKET_API = {
  CREATE: 'manage/brandCoursePacket/dredgeCoursePacket',
  UPDATE: 'manage/brandCoursePacket/update',
  DELETE: 'manage/brandCoursePacket/delete',
  GET_DETAIL: 'manage/brandCoursePacket/get',
  GET_LIST: 'manage/brandCoursePacket/getList',
  GET_ACTION_LIST: 'manage/brandCoursePacket/getActionList',
  GET_CATALOG_LIST: 'manage/brandCoursePacket/getCatalogList',
  GET_COURSE_LIST: 'manage/brandCoursePacket/getCourse'
}

export const BRAND_TEMPLATE_API = {
  CREATE: 'manage/brandTemplate/create',
  UPDATE: 'manage/brandTemplate/update',
  DELETE: 'manage/brandTemplate/delete',
  GET_DETAIL: 'manage/brandTemplate/get',
  GET_LIST: 'manage/brandTemplate/getList',
  GET_CATALOG_LIST: 'manage/brandTemplate/getCatalogList'
}

export const BRAND_COMMODITY_API = {
  CREATE: 'manage/brandCommodity/create',
  UPDATE: 'manage/brandCommodity/update',
  DELETE: 'manage/brandCommodity/delete',
  GET_DETAIL: 'manage/brandCommodity/get',
  GET_LIST: 'manage/brandCommodity/getList',
  GET_CATALOG_LIST: 'manage/brandCommodity/getCatalogList',
  GET_NAME: 'manage/brandCommodity/getCommodityName',
  CREATE_QRCODE: 'manage/brandCommodity/createQrCode',
  ADJUST_SORT: 'manage/brandCommodity/adjustSort'
}

export const PLAN_COURSE_PACKET_API = {
  CREATE: 'plan/coursePlan/create',
  UPDATE: 'plan/courseArrangementTemplate/update',
  DELETE: 'plan/courseArrangementTemplate/delete',
  GET_DETAIL: 'plan/courseArrangementTemplate/get',
  GET_LIST: 'plan/coursePlan/getList',
  GET_ACTION_LIST: 'plan/arrangementTemplate/getActionList'
}

export const COURSE_SCHEDULE_API = {
  GET_LIST: '/manage/courseSchedule/getList',
  GET_SCHEDULE_LIST: '/manage/courseSchedule/getScheduleList',
  GET_DETAIL: 'manage/courseSchedule/getDetail',
  GET_COURSE_NAME: 'manage/courseSchedule/getCourseName',
  UPDATE: '/manage/courseSchedule/update',
  CREATE: 'manage/courseSchedule/create',
  DELETE: 'manage/courseSchedule/del'
}

export const STUDENT_COURSE_API = {
  GET_LIST: '/manage/studentCourse/getList',
  GET_DETAIL: 'manage/studentCourse/get',
  UPDATE: '/manage/studentCourse/update',
  CREATE: 'manage/studentCourse/create',
  DELETE: 'manage/studentCourse/delete',
  GET_GET_DETAIL: 'manage/studentCourse/getDetail',
  GET_CHANGE: 'manage/studentCourse/getChange'
}

export const COACH_SCHEDULE_API = {
  GET_LIST: '/manage/coachSchedule/getList',
  EXPORT: '/manage/coachSchedule/export'
}

export const STUDENT_SCHEDULE_API = {
  GET_LIST: '/manage/studentSchedule/getList'
}

export const FUND_RECORD_API = {
  GET_LIST: '/finance/record/getList',
  EXPORT: '/finance/record/export'
}

export const FUND_RECORD_COUNT_API = {
  GET_LIST: '/finance/record/getFinanceList',
  EXPORT: '/finance/record/exportFinanceList'
}

export const ABOUT_API = {
  CREATE: '/manage/about/create',
  UPDATE: '/manage/about/update',
  GET_DETAIL: 'manage/about/getDetail'
}

export const RECOMMEND_API = {
  CREATE: '/manage/recommend/create',
  UPDATE: '/manage/recommend/update',
  GET_DETAIL: 'manage/recommend/getDetail',
  GET_LIST: '/manage/recommend/getList',
  GET_SOURCE: '/manage/recommend/getSourceList',
  DELETE: 'manage/recommend/del',
  SET_MODULE_TITLE: 'manage/recommend/setModuleTitle',
  GET_MODULE_TITLE: 'manage/recommend/getModuleTitle'
}

export const STUDENT_COURSE_PACKET_API = {
  GET_LIST: '/finance/StudentCoursePacket/getList',
  EXPORT: 'finance/StudentCoursePacket/export',
  EXPORT_COUNT: 'finance/StudentCoursePacket/exportCount'
}

export const STUDENT_COURSE_PACKET_COUNT_API = {
  GET_LIST: '/finance/StudentCoursePacket/getCountList',
  RESOLVE: '/finance/StudentCoursePacket/resolve'
}

export const FINANCE_PLAN_DAY_ORDER_API = {
  GET_LIST: 'finance/planDayOrder/getList',
  RESOLVE: '/finance/planDayOrder/resolve',
  GET_DETAIL: '/finance/planDayOrder/get',
  EXPORT: '/finance/planDayOrder/export'
}

export const COACH_INCOME_API = {
  GET_LIST: 'finance/coachIncome/getList',
  EXPORT: 'finance/coachIncome/export'
}

export const COACH_SETTLEMENT_API = {
  GET_LIST: 'finance/coachIncome/getCoachAccount',
  EXPORT: 'finance/coachIncome/exportCount'
}

export const FINANCE_PLAN_DAY_ORDER_COUNT_API = {
  GET_LIST: 'finance/planDayOrder/getCountList',
  EXPORT_COUNT: 'finance/planDayOrder/exportCount'
}

export const FINANCE_PLAN_YEAR_ORDER__API = {
  GET_LIST: 'finance/planYearOrder/getList',
  EXPORT: 'finance/planYearOrder/export'
}

export const FINANCE_PLAN_YEAR_ORDER_COUNT_API = {
  GET_LIST: 'finance/planYearOrder/getCountList',
  EXPORT_COUNT: 'finance/planYearOrder/exportCount'
}

export const EXTRACT_CASH_API = {
  GET_LIST: 'finance/extractCash/getList',
  GET_DETAIL: 'finance/extractCash/getDetail',
  UPDATE: 'finance/extractCash/update',
  EXPORT: 'finance/extractCash/export',
  EXPORT_COUNT: 'finance/extractCash/exportCount'
}

export const HOT_SEARCH_API = {
  CREATE: 'manage/hotSearch/create',
  UPDATE: 'manage/hotSearch/update',
  GET_DETAIL: 'manage/hotSearch/getDetail'
}

export const HOME_API = {
  GET_DATA: '/home/homePage/getData',
  GET_SECTOR: '/home/homePage/getSector',
  GET_TABLE: '/home/homePage/getTable',
  GET_EXAMPLE: '/home/homePage/getExample'
}

export const FEEDBACK_API = {
  GET_LIST: 'manage/feedback/getList',
  GET_DETAIL: 'manage/feedback/getDetail',
  UPDATE: 'manage/feedback/update'
}

export const REPORT_API = {
  GET_LIST: 'finance/report/getList',
  EXPORT: 'finance/report/export'
}

export const MESSAGE_API = {
  CREATE: 'manage/message/create',
  UPDATE: 'manage/message/update',
  GET_LIST: 'manage/message/getList',
  GET_DETAIL: 'manage/message/getDetail',
  DELETE: 'manage/message/del'
}

export const HIGHLIGHT_API = {
  GET_LIST: 'manage/highlight/getList',
  DELETE: 'manage/highlight/delete',
  CREATE: 'manage/highlight/create',
  UPDATE: 'manage/highlight/update',
  GET_DETAIL: 'manage/highlight/getDetail'
}

export const REPOSITORY_API = {
  GET_LIST: 'cms/repository/getList'
}

export const COPYARTICLE_API = {
  GET_LIST: 'cms/html/copy'
}

export const EDITION_API = {
  CREATE: 'manage/edition/create',
  UPDATE: 'manage/edition/update',
  DELETE: 'manage/edition/del',
  GET_DETAIL: 'manage/edition/getDetail',
  GET_LIST: 'manage/edition/getList',
  GET_LATEST_VERSION: 'manage/edition/getLatestVersion'
}

export const MEMBERSHIP_API = {
  CREATE: 'manage/membership/create',
  UPDATE: 'manage/membership/update',
  GET_DETAIL: 'manage/membership/getInfo'
}

export const MEMBERSHIP_ORDER_API = {
  GET_DETAIL: 'manage/membership/getDetail',
  GET_LIST: 'manage/membership/getList',
  REFUND: 'manage/membership/refund'
}
