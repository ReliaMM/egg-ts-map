import { Controller, Context } from 'egg'
import * as xlsx from 'xlsx'
import { getView } from '../../../view/heatMap/store/store'
import { getViewAmap } from '../../../view/heatMap/store/store-amap'
import { HeatMapStoreSheet } from '../../../interfaces'
const PAGE_TAG: string = 'heatMap'
const TYPE: string = 'store'
export default class HeatMapStoreController extends Controller {
  public async upload (ctx: Context) {
    const { service } = this
    await service.file.uploadFileMultiple({ ctx, folderName: PAGE_TAG, type: TYPE }) // 文件转存处理
    ctx.body = {
      code: 200,
      success: true,
      rows: '上传成功',
    }
    ctx.status = 200
  }
  /**
   * 生成文件
   */
  public async createPath(ctx: Context) {
    const { service } = this
    const { type = '' } = ctx.query
    const data = await service.excel.getExcelsData({ folderName: PAGE_TAG, type: TYPE, handlerFormat: this.formatData }) // 获取PAGE_TAG文件夹下，所有Excel格式化后数据
    await service.fileAsync.writeFilesHTML({ data, folderName: PAGE_TAG, type: TYPE, templateView: type === 'amap' ? getViewAmap : getView }) // 生成对应html文件
    await service.fileAsync.writeFilesJS({ data, folderName: PAGE_TAG, type: TYPE }) // 生成js文件
    ctx.body = 'success'
    ctx.status = 200
  }
  /**
   * 生成文件并且下载压缩文件 @TODO 出错
   */
  public async createPathDown(ctx: Context) {
    const { service } = this
    const { type = '' } = ctx.query
    const data = await service.excel.getExcelsData({ folderName: PAGE_TAG, type: TYPE, handlerFormat: this.formatData }) // 获取PAGE_TAG文件夹下，所有Excel格式化后数据
    console.log('--------write---html----begin-----')
    await service.fileAsync.writeFilesHTML({ data, folderName: PAGE_TAG, type: TYPE, templateView: type === 'amap' ? getViewAmap : getView }) // 生成对应html文件
    console.log('--------write---js----begin-----')
    await service.fileAsync.writeFilesJS({ data, folderName: PAGE_TAG, type: TYPE }) // 生成js文件
    ctx.body = 'test'
    ctx.status = 200
  }
  /**
   * 压缩文件
   */
  public async compress(ctx: Context) {
    const { service } = this
    const content = await service.file.compressDir({ ctx, folderName: PAGE_TAG, type: TYPE, isDel: true }) // 压缩文件后将文件返回给服务器,并删除目标文件和压缩文件
    ctx.body = content
    ctx.status = 200
  }
  /**
   * 生成网页json
   */
  public async getJSON(ctx: Context) {
    const { service } = this
    const data = await service.excel.getExcelsData({ folderName: PAGE_TAG, type: TYPE, handlerFormat: this.formatData }) // 获取PAGE_TAG文件夹下，所有Excel格式化后数据const rows = await this.service.excel.getExcelsData({ folderName: PAGE_TAG, handlerFormat: this.formatData });
    ctx.body = {
      code: 200,
      data,
      success: true,
    }
    ctx.status = 200
  }
  /**
   * 下载示例模版文件
   */
  public async downTemplateFile(ctx: Context) {
    const fileName: string = '多特约店多客户类型多Sheet.zip'
    const content = await this.service.file.readTemplateFile({ ctx, folderName: PAGE_TAG, fileName })
    ctx.body = content
    ctx.status = 200
  }
  private formatData({ sheets, sheetsName, fileName }) {
    const [ DIANPU, LEVEL ] = [ '特约店简称', '客户类型' ]
    const positions: HeatMapStoreSheet.Data = sheets.map((sheet: xlsx.WorkSheet, index: string | number) => {
      if (sheet) {
        console.log(`-----------write sheet-----------${index}`)
        const sheetJSON: HeatMapStoreSheet.Column[] = xlsx.utils.sheet_to_json(sheet)
        const heatMap = {}
        sheetJSON.forEach(item => {
          const { lon, lat, [DIANPU]: dianpu, [LEVEL] : level } = item
          heatMap[dianpu] = heatMap[dianpu] || {}
          const arr = heatMap[dianpu][level] = heatMap[dianpu][level] || []
          if (lon && lat) {
            arr.push([ lon, lat, 1 ])
          }
        })
        return Object.assign({
          radius: 20,
          city: sheetsName[index],
          fileName,
          heatMap,
        })
      }
    })
    return positions
  }
}
