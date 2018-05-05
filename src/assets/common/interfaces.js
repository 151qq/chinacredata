/**
 * Created by zhangbin on 2017/7/6.
 */
const platform = "/e2-platform-api/"
export default {
    interfaces: {
        "authentication": platform + "authentication.json",
        "getUserInfo": platform + "getUserInfo.json",
        "changePassword": platform + "changePassword.json",
        "headImage": platform + "headImage.json",
        "logout": platform + 'logout.json',
        "sendSmsCode": platform + 'sendSmsCode.json',
        "changePassword": platform + "changePassword.json",
        "resetPassword": platform + "resetPassword.json",

        uploadFile: platform + 'platformFile/uploadFile.json',

        /**
        * 企业 get
        */
        showAllEnterprise: platform + 'enterprise/showAllEnterprise.json',
        showEnterpriseInfo: platform + 'enterprise/showEnterpriseInfo.json',
        platformPubWechatInfo: platform + 'enterprise/platformPubWechatInfo.json',
        platfromEnterpriseWechatInfo: platform + 'enterprise/platfromEnterpriseWechatInfo.json',
        platfromWechatInfo: platform + 'enterprise/platfromWechatInfo.json',
        platformBaseInfoSave: platform + 'enterprise/platformBaseInfoSave.json',
        enterpriseBaseInfoSave: platform + 'enterprise/enterpriseBaseInfoSave.json',
        disOfEnterpriseInfo: platform + 'enterprise/disOfEnterpriseInfo.json',
        findDictionaryByType: platform + 'enterprise/findDictionaryByType.json',
        removeEnterpriseInfo: platform + 'enterprise/removeEnterpriseInfo.json',
        checkName: platform + 'enterprise/checkName.json',
        enterpriseQCCGet: platform + 'enterprise/enterpriseQCCGet.json',
        getValidateCode: platform + 'enterprise/getValidateCode.json',
        valiSmsPass: platform + 'enterprise/valiSmsPass.json',
        enterpriseWechatInfoSave: platform + 'enterprise/enterpriseWechatInfoSave.json',
        changeStatus: platform + 'enterprise/changeStatus.json',

        selectProductAndEvent: platform + 'productAndEvent/selectProductAndEvent.json',
        enterpriseOrderStart: platform + 'platform/enterpriseOrderStart.json',
        enterpriseOrderStop: platform + 'platform/enterpriseOrderStop.json',
        addUser: platform + 'enterprise/addUser.json',
        deleteUser: platform + 'enterprise/deleteUser.json',
        selectUserInfoOfPage: platform + 'enterprise/selectUserInfoOfPage.json',

        /**
        * 我的素材库 get
        */
        listPage: platform + 'material/listPage.json',
        materialFolderInsert: platform + 'material/save.json',
        materialFolderDelete: platform + 'material/delete.json',
        materialFolderUpdate: platform + 'material/update.json',
        materialCopy: platform + 'material/copy.json',
        materialMove: platform + 'material/move.json',

        /**
        * 物资资产
        */
        getCitys: '/static/api/common/city.json',
        saveCity: platform + 'city/save.json',
        haveCity: platform + 'city/list.json',
        saveCityzone: platform +'cityzone/save.json',
        findDictionaryByType: platform +'enterprise/findDictionaryByType',
        cityZoneList: platform + 'cityzone/list',
        cityZoneDel: platform + 'cityzone/delete',
        cityZoneUp: platform + 'cityzone/update',

        officeList: platform + 'office/list.json',
        officeSave: platform + 'office/save.json',
        officeUpdate: platform + 'office/update.json',
        officeMove: platform + 'office/move.json',
        officeInfo: platform + 'office/info.json',
        officeCover: platform + 'office/updateCover.json',

        propertyOwnerList: platform + 'propertyOwner/list.json',
        propertyOwnerSave: platform + 'propertyOwner/save.json',
        propertyOwnerUpdate: platform + 'propertyOwner/update.json',
        propertyOwnerDelete: platform + 'propertyOwner/delete.json',

        propertyTradeList: platform + 'propertyTrade/list.json',
        propertyTradeSave: platform + 'propertyTrade/save.json',
        propertyTradeUpdate: platform + 'propertyTrade/update.json',
        propertyTradeDelete: platform + 'propertyTrade/delete.json',

        propertyValueList: platform + 'propertyValue/list.json',
        propertyValueSave: platform + 'propertyValue/save.json',
        propertyValueUpdate: platform + 'propertyValue/update.json',
        propertyValueDelete: platform + 'propertyValue/delete.json',

        officeRentHistoryList: platform + 'officeRentHistory/list.json',
        officeRentHistorySave: platform + 'officeRentHistory/save.json',
        officeRentHistoryUpdate: platform + 'officeRentHistory/update.json',
        officeRentHistoryDelete: platform + 'officeRentHistory/delete.json',

        officeIncomeList: platform + 'officeIncome/list.json',
        officeIncomeSave: platform + 'officeIncome/save.json',
        officeIncomeUpdate: platform + 'officeIncome/update.json',
        officeIncomeDelete: platform + 'officeIncome/delete.json',

        officeCostList: platform + 'officeCost/list.json',
        officeCostSave: platform + 'officeCost/save.json',
        officeCostUpdate: platform + 'officeCost/update.json',
        officeCostDelete: platform + 'officeCost/delete.json',

        officeTenantInfoList: platform + 'officeTenantInfo/list.json',
        officeTenantInfoSave: platform + 'officeTenantInfo/save.json',
        officeTenantInfoUpdate: platform + 'officeTenantInfo/update.json',
        officeTenantInfoDelete: platform + 'officeTenantInfo/delete.json'
    }
}
