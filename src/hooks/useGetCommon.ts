import { useQuery } from '@tanstack/react-query';

// eslint-disable-next-line import/no-cycle
import { getRequest, postRequest } from '@/utils/common';
import { URL_SERVICE } from '@/utils/constants';

interface QueryParams {
  type: string;
  level?: null | number;
  config?: any;
  params?: any;
  // onSuccessCallback?: (params: ApiListResponse<CommonList>) => void;
  // onErrorCallback?: (error: Error) => void;
}
export const getList = (url: string): Promise<any> => {
  return getRequest(url);
};

export const useGetCommon = ({
  type,
  config,
  params,
  // onSuccessCallback,
  // onErrorCallback,
}: QueryParams) => {
  const configRequest = {
    retry: 1,
    cacheTime: 1 * 24 * 60 * 60 * 1000, // 1 ngày
    staleTime: 1 * 24 * 60 * 60 * 1000, // 1 ngày
    ...config,
  };

  let url = '';

  switch (type) {
    case 'GET_ME':
      url = `${URL_SERVICE.IDENTITY}/api/v1/users/me`;
      break;
    case 'CONFIG': // Cấu hình người dùng
      url = `${URL_SERVICE.IDENTITY}/api/v1/users/getConfig/${params}`;
      break;
    case 'ALL_PERMISSION':
      url = `${URL_SERVICE.IDENTITY}/api/v1/perm/all`;
      break;
    case 'TRADING_CODE_STATUS':
      url = `${URL_SERVICE.TRADING}/api/v1/Account/TradingCodes/trading_code_status`;
      break;
    case 'SEC_TYPE':
      url = `${URL_SERVICE.CORE}/api/v1/parameters?paramType=SecType&deleted=false&pageSize=1000`;
      break;
    case 'CUSTODIAN':
      url = `${URL_SERVICE.CORE}/api/v1/parameters?paramType=Custodian&deleted=false&pageSize=1000`;
      break;
    case 'CUSTODIAN_CUS_TYPE':
      url = `${URL_SERVICE.CORE}/api/v1/parameters?paramType=CustodianCusType&deleted=false&pageSize=1000`;
      break;
    case 'BRANCHES':
      url = `${URL_SERVICE.CORE}/api/branches/v1?deleted=false&pageSize=1000`;
      break;
    case 'PROVINCE':
      url = `${URL_SERVICE.CORE}/api/v1/province?currentPage=0&pageSize=1000&conjunction=AND&deleted=false`;
      break;
    case 'NATIONALITY':
      url = `${URL_SERVICE.CORE}/api/v1/nationality?currentPage=0&pageSize=1000&conjunction=AND&deleted=false`;
      break;
    case 'INDIVIDUAL_CONTACT_TYPE':
      url = `${URL_SERVICE.TRADING}/api/v1/Account/TradingCodes/individual_contact_type`;
      break;
    case 'NONFUND_CONTACT_TYPE':
      url = `${URL_SERVICE.TRADING}/api/v1/Account/TradingCodes/nonfund_contact_type`;
      break;
    case 'CURRENCY':
      url = `${URL_SERVICE.CORE}/api/currencies/v1?currentPage=0&pageSize=1000&orderBy=&conjunction=&keyword=&deleted=false`;
      break;
    case 'SECURITIES':
      url = `${URL_SERVICE.CORE}/api/v1/objects/master/securities`;
      break;
    case 'CUSTODIANS':
      url = `${URL_SERVICE.CORE}/api/v1/objects/master/custodians`;
      break;
    case 'SECURITIES_BUSINESS': // Nghiệp vụ kinh doanh chứng khoán
      url = `${URL_SERVICE.CORE}/api/v1/parameters?paramType=SecuritiesBusiness&deleted=false&pageSize=1000`;
      break;
    case 'IDENTITY_TYPE': // Loại chứng thư
      url = `${URL_SERVICE.CORE}/api/v1/parameters?paramType=IdentityType&deleted=false&pageSize=1000`;
      break;
    case 'SHAREHOLDER_TYPE': // Loại hình cổ đông
      url = `${URL_SERVICE.CORE}/api/v1/parameters?paramType=ShareHolderType&deleted=false&pageSize=1000`;
      break;
    case 'TYPE_DT': // Loại đối tượng
      url = `${URL_SERVICE.CORE}/api/v1/parameters?paramType=TypeDT&deleted=false&pageSize=1000`;
      break;
    case 'BUSINESS_TYPE': // Loại hình doanh nghiệp
      url = `${URL_SERVICE.CORE}/api/v1/parameters?paramType=BusinessType&deleted=false&pageSize=1000`;
      break;
    case 'BICCODE_TYPE': // BICCODEType
      url = `${URL_SERVICE.CORE}/api/v1/biccode-custody?currentPage=0&pageSize=10000&conjunction=AND&paramType=BICCODE&deleted=false`;
      break;
    case 'BROKER_MARKET_TYPE': // BrokerMarket
      url = `${URL_SERVICE.CORE}/api/v1/parameters?paramType=BrokerMarket&deleted=false&pageSize=1000`;
      break;
    case 'CLEARING_MEMBER_TYPE': // Thành viên bù trừ
      url = `${URL_SERVICE.CORE}/api/v1/parameters?paramType=ClearingMemberType&deleted=false&pageSize=1000`;
      break;
    case 'REQUEST_TYPE': // Lấy ra loại yêu cầu
      url = `${URL_SERVICE.TRADING}/api/v1/Account/TradingCodes/request_type`;
      break;
    case 'TRADING_CODE_STATUS_UPDATE': // lấy status trading code giao dịch cập nhật
      url = `${URL_SERVICE.TRADING}/api/v1/Account/TradingCodes/trade_status`;
      break;
    case 'INVEST_TYPE': // lấy loại hình tổ chức
      url = `${URL_SERVICE.TRADING}/api/v1/Account/TradingCodes/invest_type`;
      break;
    case 'RELATION_HOLDING_COMPANY': // lấy mqh với công ty mẹ
      url = `${URL_SERVICE.TRADING}/api/v1/Account/TradingCodes/relation_holding_company`;
      break;
    case 'SUB_FUND_TYPE': // lấy loại hình đầu tư quỹ
      url = `${URL_SERVICE.TRADING}/api/v1/Account/TradingCodes/sub_fund_type`;
      break;
    case 'SUB_FUND_TYPE_PARAM': // Quỹ đầu tư
      url = `${URL_SERVICE.CORE}/api/v1/parameters?paramType=SubFundType&deleted=false&pageSize=1000`;
      break;
    case 'RELATION_EXISTED_TC': // lấy mqh với tổ chức được cấp TC
      url = `${URL_SERVICE.TRADING}/api/v1/Account/TradingCodes/relation_existed_tc`;
      break;
    case 'SUB_NON_FUND_TYPE': // lấy loại hình đầu tư quỹ
      url = `${URL_SERVICE.TRADING}/api/v1/Account/TradingCodes/sub_non_fund_type`;
      break;
    case 'DOC_TYPE': // Loại hồ sơ khách hàng
      url = `${URL_SERVICE.CORE}/api/v1/parameters?paramType=DocType&deleted=false&pageSize=1000`;
      break;
    case 'CUS_TYPE': // lấy loại khách hàng
      url = `${URL_SERVICE.TRADING}/api/v1/Account/TradingCodes/cus_type`;
      break;
    case 'SETTLEMENT_PLACE': // Miền thanh toán
      url = `${URL_SERVICE.CORE}/api/v1/parameters?paramType=SettlementPlace&deleted=false&pageSize=1000`;
      break;
    case 'EXCHANGE': // Sàn giao dịch
      url = `${URL_SERVICE.CORE}/api/v1/exchange?deleted=false&pageSize=1000`;
      break;
    case 'BROKER_COMPANY': // Danh sách công ty chứng khoán được phép đặt lệnh
      url = `${URL_SERVICE.CORE}/api/v1/objects/master?objType=4&brokerVCBStatus=1&pageSize=1000`;
      break;
    case 'BALANCE_PERIOD': // Chu kỳ gửi số dư
      url = `${URL_SERVICE.CORE}/api/v1/parameters?currentPage=0&pageSize=1000&conjunction=AND&paramType=BalancePeriod&deleted=false`;
      break;
    case 'SECTOR_TYPE': // Lĩnh vực hoạt động
      url = `${URL_SERVICE.CORE}/api/v1/parameters?paramType=Sector&deleted=false&pageSize=1000`;
      break;
    case 'PROINVESTOR': // Tiêu chí đăng ký NĐT chuyên nghiệp
      url = `${URL_SERVICE.CORE}/api/v1/parameters?paramType=ProInvestor&deleted=false&pageSize=1000`;
      break;
    case 'CBOND_TRADE_TYPE': // Lấy loại giao dịch CBONDS
      url = `${URL_SERVICE.TRADING}/api/v1/Account/CBondAccount/trade_type`;
      break;
    case 'CBOND_TRADE_STATUS': // Lấy trạng thái giao dịch CBONDS
      url = `${URL_SERVICE.TRADING}/api/v1/Account/CBondAccount/trade_status`;
      break;
    case 'CBOND_VSD_STATUS': // Lấy trạng thái vsd
      url = `${URL_SERVICE.TRADING}/api/v1/Account/CBondAccount/vsd_status`;
      break;
    case 'CBOND_ACTIVE_STATUS': // Lấy trạng thái hoạt động CBONDS
      url = `${URL_SERVICE.TRADING}/api/v1/Account/CBondAccount/active_status`;
      break;
    case 'CARD_TYPE': // Lấy loại chứng thư
      url = `${URL_SERVICE.TRADING}/api/v1/Account/TradingCodes/card_type`;
      break;
    case 'VSD_STATUS': // Trạng thái được phép gửi điện VSD
      url = `${URL_SERVICE.CORE}/api/VsdStatus`;
      break;
    case 'TRADING_MEMBER': // Thành viên giao dịch theo tham số
      url = `${URL_SERVICE.CORE}/api/v1/parameters?currentPage=0&pageSize=10000&conjunction=AND&paramType=TradingMember&deleted=false`;
      break;
    case 'SECURITIES_STATUS': // Trạng thái chứng khoán theo điện VSD
      url = `${URL_SERVICE.CORE}/api/v1/parameters?currentPage=0&pageSize=10000&conjunction=AND&paramType=SecuritiesStatus&deleted=false`;
      break;
    case 'LISTED_SEC': // Tình trạng niêm yết mua chứng khoán
      url = `${URL_SERVICE.CORE}/api/v1/parameters?currentPage=0&pageSize=10000&conjunction=AND&paramType=ListedSec&deleted=false`;
      break;
    case 'BOND_TYPE': // Loại trái phiếu
      url = `${URL_SERVICE.CORE}/api/v1/parameters?currentPage=0&pageSize=10000&conjunction=AND&paramType=BondCode&deleted=false`;
      break;
    case 'TDClose': // Lý do đóng
      url = `${URL_SERVICE.CORE}/api/v1/parameters?currentPage=0&pageSize=9999&paramType=TDClose&deleted=false`;
      break;
    case 'BACK_DATE': // Thời gian back date
      url = `${URL_SERVICE.CORE}/api/v1/backdate-time?currentPage=0&pageSize=20&conjunction=AND&paramType=BackDate&deleted=false`;
      break;
    case 'SEC_TYPE_VSD': // Loại chứng khoán điện VSD
      url = `${URL_SERVICE.CORE}/api/v1/parameters?currentPage=0&pageSize=9999&paramType=SecTypeVSD&deleted=false`;
      break;
    case 'BUSINESS': // Mã ngành
      url = `${URL_SERVICE.CORE}/api/v1/parameters?currentPage=0&pageSize=9999&paramType=Branch&deleted=false`;
      break;
    case 'TDSuspend': // Lý do đình chỉ
      url = `${URL_SERVICE.CORE}/api/v1/parameters?currentPage=0&pageSize=9999&paramType=TDSuspend&deleted=false`;
      break;
    case 'SUB_ACC_GROUP': // Nhóm tiểu khoản
      url = `${URL_SERVICE.CORE}/api/v1/parameters?currentPage=0&pageSize=9999&paramType=GroupSubAcc&deleted=false`;
      break;
    case 'TRANFER_PURPOSE': // Mục đích chuyển khoản chứng khoán
      url = `${URL_SERVICE.CORE}/api/v1/transferPurpose?currentPage=0&pageSize=9999&paramType=Purpose&deleted=false`;
      break;
    case 'P_MANAGER': // Cán bộ quản lý danh mục (cho nhóm tiểu khoản của TKLK)
      url = `${URL_SERVICE.CORE}/api/v1/objects/getCustomerContact/${params}`;
      break;
    case 'DERI_TYPE': // Loại chứng khoán phái sinh
      url = `${URL_SERVICE.CORE}/api/v1/parameters?currentPage=0&pageSize=9999&conjunction=AND&paramType=DeriType&deleted=false`;
      break;
    case 'FUND_TYPE': // Loại chứng khoán phái sinh
      url = `${URL_SERVICE.CORE}/api/v1/parameters?currentPage=0&pageSize=9999&conjunction=AND&paramType=FundType&deleted=false`;
      break;
    case 'CA_TYPE': // Loại quyền
      url = `${URL_SERVICE.CORE}/api/v1/access-type?currentPage=0&pageSize=20&conjunction=AND&paramType=CAType&deleted=false`;
      break;
    case 'BALANCE': // Số dư chứng khoán
      url = `${URL_SERVICE.CORE}/api/v1/balance?type=Balance`;
      break;
    case 'CA_BALANCE': // Số dư quyền
      url = `${URL_SERVICE.CORE}/api/v1/balance?type=caBalance`;
      break;
    case 'ROUDING': // Loại làm tròn
      url = `${URL_SERVICE.CORE}/api/v1/rounding?currentPage=0&pageSize=20&conjunction=AND&paramType=Rouding&deleted=false`;
      break;
    case 'CA_TOLERANCE': // Biên độ điều chỉnh THQ
      url = `${URL_SERVICE.CORE}/api/v1/ca-tolerance?currentPage=0&pageSize=20&conjunction=AND&paramType=CATolerance&deleted=false`;
      break;
    case 'SERVICE_SECURITIES': // DS DỊCH VỤ CHỨNG KHOÁN
      url = `${URL_SERVICE.CORE}/api/v1/parameters?currentPage=0&pageSize=999&conjunction=AND&paramType=ServiceSecurities&deleted=false`;
      break;
    case 'REPORT_GROUP': // Nhóm báo cáo
      url = `${URL_SERVICE.CORE}/api/v1/parameters?currentPage=0&pageSize=10000&conjunction=AND&paramType=ReportGroup&deleted=false`;
      break;
    case 'FEE_BASIS': // Căn cứ tính phí
      url = `${URL_SERVICE.CORE}/api/v1/parameters?currentPage=0&pageSize=10000&conjunction=AND&paramType=FeeBasis&deleted=false`;
      break;
    case 'FEE_PACKAGE_CUST_TYPE': // Quỹ đầu tư
      url = `${URL_SERVICE.CORE}/api/v1/parameters/all/FeePackageCustType`;
      break;
    case 'CURRENCY_TYPE': // Loại tiền
      url = `${URL_SERVICE.CORE}/api/currencies/v1?currentPage=0&pageSize=20000&conjunction=AND&paramType=Currencies&deleted=false`;
      break;
    case 'STATUS_DEPOSIT_VSD': // Được phép lưu ký tại VSD
      url = `${URL_SERVICE.CORE}/api/v1/statusDepositVSD?currentPage=0&pageSize=20000&conjunction=AND&paramType=StatusDepositVSD&deleted=false`;
      break;
    case 'PAYMENT_CYCLE': // Chu kỳ thanh toán
      url = `${URL_SERVICE.CORE}/api/PaymentCycles?currentPage=0&pageSize=20&conjunction=AND&paramType=PaymentCycle&deleted=false`;
      break;
    case 'STOCK_TYPE': // LOẠI CỔ PHIẾU
      url = `${URL_SERVICE.CORE}/api/v1/parameter-stock/getAll`;
      break;
    default:
      break;
  }

  const QUERY_KEY = [url, type];
  const data = useQuery<any>({
    queryKey: QUERY_KEY,
    queryFn: () => getList(url),
    ...configRequest,
  });
  return data;
};

export const useGetCategoryCommon = ({ type, level }: QueryParams) => {
  const configRequest = {
    retry: 1,
    cacheTime: 5 * 24 * 60 * 60 * 1000, // 5 ngày
    staleTime: 5 * 24 * 60 * 60 * 1000, // 5 ngày
  };
  let url = '';
  switch (type) {
    case 'SKILL':
    case 'TITLE':
      url = 'category/advance-search';
      break;

    default:
      url = '';
      break;
  }
  const QUERY_KEY = [url, type, level];
  const data = useQuery<any>({
    queryKey: QUERY_KEY,
    queryFn: () =>
      postRequest(url, {
        type: type || '',
        level: level || 1,
        page: 0,
        size: 9999,
      }),
    ...configRequest,
  });
  return data;
};
