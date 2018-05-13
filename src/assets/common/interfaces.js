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
        disOfEnterpriseInfo: platform + 'enterprise/disOfEnterpriseInfo.json',
        findDictionaryByType: platform + 'enterprise/findDictionaryByType.json',

        /**
        * 企业 get
        */
        enterpriseList: platform + 'enterprise/list.json',
        enterpriseListByKeyname: platform + 'enterprise/listByKeyname.json',
        showEnterpriseInfo: platform + 'enterprise/Enterprisedetails.json',
        removeEnterpriseInfo: platform + 'enterprise/deleteEnterpriseInfo.json',
        checkName: platform + 'enterprise/checkName.json',
        enterpriseQCCGet: platform + 'enterprise/enterpriseQCCGet.json',
        getValidateCode: platform + 'enterprise/getValidateCode.json',
        valiSmsPass: platform + 'enterprise/valiSmsPass.json',
        enterpriseWechatInfoSave: platform + 'enterprise/insertOrUpdate.json',

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

        mallInfoList: platform + 'mallInfo/list.json',
        mallInfoSave: platform + 'mallInfo/save.json',
        mallInfoUpdate: platform + 'mallInfo/update.json',
        mallInfoMove: platform + 'mallInfo/move.json',
        mallInfo: platform + 'mallInfo/info.json',
        mallInfoCover: platform + 'mallInfo/updateCover.json',

        securityAsset: platform + 'securityAsset/propertyList.json',

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
        officeTenantInfoDelete: platform + 'officeTenantInfo/delete.json',

        mallRentHistoryList: platform + 'mallrenthistory/list.json',
        mallRentHistorySave: platform + 'mallrenthistory/save.json',
        mallRentHistoryUpdate: platform + 'mallrenthistory/update.json',
        mallRentHistoryDelete: platform + 'mallrenthistory/delete.json',

        mallIncomeList: platform + 'mallIncome/list.json',
        mallIncomeSave: platform + 'mallIncome/save.json',
        mallIncomeUpdate: platform + 'mallIncome/update.json',
        mallIncomeDelete: platform + 'mallIncome/delete.json',

        mallCostList: platform + 'mallCost/list.json',
        mallCostSave: platform + 'mallCost/save.json',
        mallCostUpdate: platform + 'mallCost/update.json',
        mallCostDelete: platform + 'mallCost/delete.json',

        mallTenantInfoList: platform + 'mallTenantInfo/list.json',
        mallTenantInfoSave: platform + 'mallTenantInfo/save.json',
        mallTenantInfoUpdate: platform + 'mallTenantInfo/update.json',
        mallTenantInfoDelete: platform + 'mallTenantInfo/delete.json',

        exchangeInfoList: platform + 'exchangeInfo/list.json',
        exchangeInfoSave: platform + 'exchangeInfo/save.json',
        exchangeInfoUpdate: platform + 'exchangeInfo/update.json',
        exchangeInfoDelete: platform + 'exchangeInfo/delete.json',

        assetManagementProductInfo: platform + 'assetProductInfo/info.json',
        assetManagementProductInfoList: platform + 'assetProductInfo/list.json',
        assetManagementProductInfoSave: platform + 'assetProductInfo/save.json',
        assetManagementProductInfoUpdate: platform + 'assetProductInfo/update.json',
        assetManagementProductInfoDelete: platform + 'assetProductInfo/delete.json',

        foreignReitsInfo: platform + 'foreignReitsInfo/info.json',
        foreignReitsInfoList: platform + 'foreignReitsInfo/list.json',
        foreignReitsInfoSave: platform + 'foreignReitsInfo/save.json',
        foreignReitsInfoUpdate: platform + 'foreignReitsInfo/update.json',
        foreignReitsInfoDelete: platform + 'foreignReitsInfo/delete.json',

        securityShareholderList: platform + 'securityShareholder/list.json',
        securityShareholderSave: platform + 'securityShareholder/save.json',
        securityShareholderUpdate: platform + 'securityShareholder/update.json',
        securityShareholderDelete: platform + 'securityShareholder/delete.json',

        securityAssetList: platform + 'securityAsset/list.json',
        securityAssetSave: platform + 'securityAsset/save.json',
        securityAssetUpdate: platform + 'securityAsset/update.json',
        securityAssetDelete: platform + 'securityAsset/delete.json',

        assetManagementProductLevelList: platform + 'assetProductLevel/list.json',
        assetManagementProductLevelSave: platform + 'assetProductLevel/save.json',
        assetManagementProductLevelUpdate: platform + 'assetProductLevel/update.json',
        assetManagementProductLevelDelete: platform + 'assetProductLevel/delete.json',

        poroductCashFlowInfo: platform + 'assetProductLevelYearProfit/poroductCashFlowInfo.json',
        assetProductLevelYearProfitList: platform + 'assetProductLevelYearProfit/assetCashFlowList.json',
        assetProductLevelYearProfitUpdate: platform + 'assetProductLevelYearProfit/updateTotalProfitList.json',
        validateAssetProfit: platform + 'assetProductLevelYearProfit/validateAssetProfit.json'
        
    }
}
