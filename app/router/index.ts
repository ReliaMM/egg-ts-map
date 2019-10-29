import { Application } from 'egg'

export default (app: Application) => {
  const { controller, router } = app

  router.get('/', controller.home.index)
  /**
   * 热力图
   */
  // 热力图-特约店铺-上传
  router.post('/heatMap/store/file/upload', controller.heatMap.store.index.upload)
  // 热力图-特约店铺-生成网页json
  router.get('/heatMap/store/getJSON', controller.heatMap.store.index.getJSON)
  // 热力图-特约店铺--生成文件
  router.get('/heatMap/store/createPath', controller.heatMap.store.index.createPath)
  // 热力图-特约店铺--生成文件并且下载压缩文件
  router.get('/heatMap/store/createPathDown', controller.heatMap.store.index.createPathDown)
  // 热力图-特约店铺-单独压缩下载
  router.get('/heatMap/store/compress', controller.heatMap.store.index.compress)
  // 热力图-特约店铺-下载模版文件
  router.get('/heatMap/store/downTemplateFile', controller.heatMap.store.index.downTemplateFile)

  // 热力图-位置信息-上传
  router.post('/heatMap/position/index/file/upload', controller.heatMap.position.index.upload)
  // 热力图-位置信息-生成网页json
  router.get('/heatMap/position/getJSON', controller.heatMap.position.index.getJSON)
  // 热力图-位置信息--生成文件
  router.get('/heatMap/position/createPath', controller.heatMap.position.index.createPath)
  // 热力图-位置信息-生成文件并且下载压缩文件
  router.get('/heatMap/position/createPathDown', controller.heatMap.position.index.createPathDown)
  // 热力图-位置信息-单独压缩下载
  router.get('/heatMap/position/compress', controller.heatMap.position.index.compress)
  // 热力图-位置信息-下载模版文件
  router.get('/heatMap/position/downTemplateFile', controller.heatMap.position.index.downTemplateFile)

  // 热力图-位置信息-normal-运营演示-上传文件
  router.post('/heatMap/position/normal/file/upload', controller.heatMap.position.normal.upload)
  // 热力图-位置信息-normal-运营演示-生成文件
  router.get('/heatMap/position/normal/createPath', controller.heatMap.position.normal.createPath)
  // 热力图-位置信息-normal-运营演示-单独压缩下载
  router.get('/heatMap/position/normal/compress', controller.heatMap.position.normal.compress)

  // 热力图-位置信息-default-生成网页json
  router.get('/heatMap/position/default/getJSON', controller.heatMap.position.defaultCity.getJSON)
  // 热力图-位置信息-default-运营演示-生成文件
  router.get('/heatMap/position/default/createPath', controller.heatMap.position.defaultCity.createPath)
  // 热力图-位置信息-default-运营演示-单独压缩下载
  router.get('/heatMap/position/default/compress', controller.heatMap.position.defaultCity.compress)
  /**
   * 路线派化
   */
   // 路线派化-上传
  router.post('/path/index/file/upload', controller.path.index.upload)
  // 路线派化-生成网页json
  router.get('/path/getJSON', controller.path.index.getJSON)
  // 路线派化-生成文件
  router.get('/path/createPath', controller.path.index.createPath)
  // 路线派化-压缩并下载文件
  router.get('/path/compress', controller.path.index.compress)
  // 路线派化-生成文件并且下载压缩文件
  router.get('/path/createPathDown', controller.path.index.createPathDown)
  // 路线派化-下载模版文件
  router.get('/path/downTemplateFile', controller.path.index.downTemplateFile)

  /**
   * 邮件发送
   */
  router.get('/share', controller.share.index.index)
  router.get('/api/email/sendEmail', controller.email.index.index)
  /**
   * 分享小屋
   */
  router.post('/api/share/add', controller.share.index.shareAdd)
  router.post('/api/share/delete', controller.share.index.shareDelete)
  router.post('/api/share/modify', controller.share.index.shareModify)
  router.get('/api/share/tableList', controller.share.index.shareList)
  router.post('/api/share/cardlist', controller.share.index.shareCardList)
  router.get('/api/currentUser', controller.share.index.user)
  router.post('/api/login/account', controller.share.index.account)
  /**
   * 技能小屋 - 类别管理
   */
  router.post('/api/bookmarks/type/add', controller.bookmarks.type.add)
  router.post('/api/bookmarks/type/delete', controller.bookmarks.type.delete)
  router.post('/api/bookmarks/type/modify', controller.bookmarks.type.modify)
  router.get('/api/bookmarks/type/tableList', controller.bookmarks.type.list)

  /**
   * 技能小屋 - 标签管理
   */
  router.post('/api/bookmarks/tag/add', controller.bookmarks.tag.add)
  router.post('/api/bookmarks/tag/delete', controller.bookmarks.tag.delete)
  router.post('/api/bookmarks/tag/modify', controller.bookmarks.tag.modify)
  router.get('/api/bookmarks/tag/tableList', controller.bookmarks.tag.list)

  /**
   * table工具
   */
  router.get('/table/user/getJSON', controller.table.index.getUserJSON)
  router.get('/table/dealer/getJSON', controller.table.index.getDealerJSON)
}
