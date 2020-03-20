import Mock from 'mockjs'
import {
  param2Obj
} from '@/utils'

const List = []
const count = 100

for (let i = 0; i < 20; i++) {
  let data = {
    id: '1' + i,
    name: '企业' + i,
    managerId: '42343243212',
    version: '试用版v1.0',
    renewalDate: '2018-01-01',
    expirationDate: '2019-01-01',
    companyArea: '深圳市南山区',
    companyAddress: '华中科技大学产研基地A做',
    businessLicenseId: '1111111',
    legalRepresentative: 'henryxiao',
    companyPhone: '13800138000',
    mailbox: 'henry@qq.com',
    companySize: '9999',
    industry: '电子商务',
    remarks: '测试',
    auditState: '1',
    state: '1',
    balance: '1000000000.00',
    createTime: '2020-03-14'
  }
  List.push(data)
}

export default {
  list: () => {
    return {
      code: 10000,
      success: true,
      message: '查询成功',
      data: List
    }
  },
  sassDetail: () => {
    return {
      code: 10000,
      success: true,
      message: '查询成功',
      data: {
        id: '1',
        name: '企业',
        managerId: '42343243212',
        version: '试用版v1.0',
        renewalDate: '2018-01-01',
        expirationDate: '2019-01-01',
        companyArea: '深圳市南山区',
        companyAddress: '华中科技大学产研基地A做',
        businessLicenseId: '1111111',
        legalRepresentative: 'henryxiao',
        companyPhone: '13800138000',
        mailbox: 'henry@qq.com',
        companySize: '9999',
        industry: '电子商务',
        remarks: '测试',
        auditState: '1',
        state: '1',
        balance: '1000000000.00',
        createTime: '2020-03-14'
      }
    }
  }
}
