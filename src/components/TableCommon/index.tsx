/* eslint-disable react/forbid-prop-types */
/* eslint-disable spaced-comment */

import './index.css';

import type { TableProps } from 'antd';
import { ConfigProvider, Table } from 'antd';
import type { ColumnGroupType, ColumnType } from 'antd/es/table';
import type { SELECTION_COLUMN } from 'antd/es/table/hooks/useSelection';
import type { Dayjs } from 'dayjs';
import PropTypes from 'prop-types';
import type { EXPAND_COLUMN } from 'rc-table';
import React, { useEffect, useState } from 'react';
import { Resizable } from 'react-resizable';

import typesColumn from './constants';
// import { formatIsoDateToNumber } from '../../utils/common';

export interface ItemFilter {
  text: string;
  value: string | number;
}

export interface Column {
  name: React.ReactNode;
  field: string;
  width?: number | string;
  type?: string;
  isSort?: boolean;
  align?: 'left' | 'right' | 'center';
  ellipsis?: boolean;
  fixed?: 'left' | 'right';
  filters?: ItemFilter[];
  onFilter?: any;
  onCell?: any;
  newListColumn?: any;
  filterMode?: 'menu' | 'tree';
  editable?: boolean;
  isRequired?: boolean;
  maxLength?: number;
  maxDate?: Dayjs;
  hidden?: boolean;
  inputType?: string;
  typeRegex?: string;
  children?: any;
  fieldSummary?: string;
  className?: string;
  isKRX_Show?: boolean;
  isKRX_Hidden?: boolean;
}

export interface ColumnGroup extends Omit<Column, 'field'> {
  field?: string;
  children: Columns[];
}

export type Columns = Column | ColumnGroup;

interface AppProps {
  columns: Array<Columns | typeof SELECTION_COLUMN | typeof EXPAND_COLUMN>;
  data: any[];
  primaryKey: string;
  parseFunction: (
    record: any,
    field: Column,
    recordIndex: number,
  ) => React.ReactNode;
  sortFunction?: (
    item1: any,
    item2: any,
    config: Column,
    defaultSort?: (item1: any, item2: any, config: Column) => 1 | -1 | 0,
  ) => void;
  headerTable?: () => React.ReactNode;
  footerTable?: () => React.ReactNode;
  classNameTable?: string;
  isShowPaging?: boolean;
  onChangePage?: (page: number, pageSize: number) => void;
  onSort?: (sorter: any) => void;
  defaultPage?: number;
  currentPage?: number;
  totalDisplay?: number;
  totalCountData?: number;
  iterablePaging?: Object;
  isShowCheckbox?: boolean;
  checkBoxType?: 'checkbox' | 'radio';
  onSelect?: (
    selectedRowKeys: any[],
    selectedRows: any[],
    type?: String,
  ) => void;
  defaultSelected?: any[];
  iterableSelection?: Object;
  isRemoveSelected?: boolean;
  isCheckedAll?: boolean;
  checkItemHasSelect?: (item: any) => boolean;
  renderSubItem?: (
    record: any,
    index: number,
    indent: number,
    expanded: boolean,
  ) => React.ReactNode;
  iterableExpand?: Object;
  showHeader?: boolean;
  expandCondition?: (record: any) => boolean;
  scrollToProps?: Object;
  iterableProps?: Object;
  bordered?: boolean;
  onChangeDefault?: any;
  selected?: any[];
  locale?: any;
  virtual?: boolean;
  isShowSizeChanger?: boolean;
  components?: Object;
  onRow?: (record: any, rowIndex: any) => Object;
  fullHeight?: boolean;
  summary?: (pageData: any) => React.ReactNode;
  rowClassName?: (record: any, index?: number) => string;
}

const ResizableTitle = (props: any) => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      handle={
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <span
          className="react-resizable-handle"
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      }
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
};

const TableCommon = (props: AppProps) => {
  const {
    columns, //type of array - required -- cấu hình của các cột
    data, //type of array - required -- data của bảng
    primaryKey, // key chính của data
    parseFunction, //type of function -- function để parse / tùy chỉnh hiển thị data
    sortFunction, // function custom sort
    headerTable, // action ở phí dưới table
    footerTable, // action ở phí dưới table
    classNameTable, // class để style cho table
    isShowPaging, // check có hiển thị paging hay không
    onChangePage, // xử lý mỗi khi thay đổi page return về page được chọn\
    onSort, // xử lý khi thay đổi sort , dùng trong trường hợp call api
    defaultPage, // page default hiển thị
    currentPage, // page hiện tại
    totalDisplay, // tổng số bản ghi trên 1 trang
    totalCountData, // tổng tất cả bản ghi
    iterablePaging, // các config còn lại của paging ant design //  https://ant.design/components/table
    isShowCheckbox, //type og bool -- điều kiện hiển thị nút select
    checkBoxType, // loại select checkbox || radio
    onSelect, // gọi khi chọn bản ghi
    // defaultSelected,
    iterableSelection, // các config còn lại của selection ant design //  https://ant.design/components/table
    // isRemoveSelected, // nếu === true sẽ remove selected
    // isCheckedAll, // check có phải là chọn tất cả không  --- boolean
    checkItemHasSelect, //  check với mỗi item thì có được chọn hay không --- bool
    renderSubItem, // render sub table
    iterableExpand, // các config còn lại của paging trong antd
    expandCondition, // check điều kiện để expand

    onChangeDefault, //onChange mặc định của table antd
    // isSubItem, // check bảng có sub table hay không
    selected,
    locale, // The i18n text including filter, sort, empty text, etc
    virtual, // Check xem bảng có hiển thị virtual hay không
    scrollToProps, // scroll table
    isShowSizeChanger, // show change size
    components,
    bordered,
    fullHeight,
    summary,
    rowClassName, // class cho row
    ...iterableProps
  } = props;

  // const [selected, setSelected] = useState<any>([]);

  // useEffect(() => {
  //   if (defaultSelected && defaultSelected.length > 0) {
  //     const newSelected = defaultSelected.map((item, index) => ({
  //       ...item,
  //       key: primaryKey && item[primaryKey] ? item[primaryKey] : `${index}`,
  //     }));
  //     setSelected(newSelected);
  //   }
  // }, []);

  // useEffect(() => {
  // if (isRemoveSelected) {
  // setSelected([]);
  // }
  // }, [isRemoveSelected]);

  // thêm key vào mỗi item để phù hợp với dataSource

  const [columnsTable, setColumnsTable] = useState<
    Array<Columns | typeof SELECTION_COLUMN | typeof EXPAND_COLUMN>
  >([]);

  useEffect(() => {
    setColumnsTable(columns);
  }, [columns]);

  // useEffect(() => {
  //   if (fullHeight) {
  //     require('./height.css');
  //   }
  // }, [fullHeight]);

  const getLocale = () => {
    return {
      ...locale,
      emptyText: 'Không có dữ liệu',
      filterReset: 'Đặt lại',
      filterTitle: 'Lọc',
      filterConfirm: 'Xác nhận',
      selectAll: 'Chọn tất cả',
      selectionAll: 'Chọn tất cả dữ liệu',
      filterCheckall: 'Chọn tất cả',
      sortTitle: 'Sắp xếp',
      expand: 'Mở rộng',
      collapse: 'Thu gọn',
      triggerDesc: 'Giảm dần',
      triggerAsc: 'Tăng dần',
      cancelSort: 'Tắt sắp xếp',
    };
  };

  const getData = (): any[] => {
    if (Array.isArray(data)) {
      return data.map((item, index) => ({
        ...item,
        key: primaryKey && item[primaryKey] ? item[primaryKey] : `${index}`,
      }));
    }
    return [];
  };

  // useEffect(() => {
  //   if (isCheckedAll) {
  //     setSelected(getData());
  //   }
  // }, [isCheckedAll]);

  const handleChangePage = (page: number, pageSize: number): void => {
    // if (page === currentPage || !onChangePage) {
    //   return;
    // }
    if (!onChangePage) {
      return;
    }
    onChangePage(page, pageSize);
  };

  const compareFloat = (a: number | string, b: number | string) => {
    if (Number(b) < Number(a)) return -1;
    if (Number(b) > Number(a)) return 1;
    return 0;
  };

  const descendingComparator = (item1: any, item2: any, config: Column) => {
    if (config.type && config.type === typesColumn.number) {
      return compareFloat(item1[config.field], item2[config.field]);
    }
    if (item2[config.field] < item1[config.field]) {
      return -1;
    }
    if (item2[config.field] > item1[config.field]) {
      return 1;
    }
    return 0;
  };

  const getSortConfig = (item: Column): Object => {
    // nếu có onSort thì sẽ sort ở api
    if (item?.isSort && !sortFunction && !onSort) {
      return {
        sortDirections: ['ascend', 'descend'],
        showSorterTooltip: false,
        sorter: (a: any, b: any) => descendingComparator(a, b, item),
      };
    }
    if (item.isSort && sortFunction && !onSort) {
      return {
        sortDirections: ['ascend', 'descend'], // default sort
        showSorterTooltip: false,
        sorter: (a: any, b: any) =>
          sortFunction(a, b, item, (item1: any, item2: any, config: Column) =>
            descendingComparator(item1, item2, config),
          ),
      };
    }
    return {};
  };

  const handleResize =
    (indexCol: number) =>
    (_: any, { size }: any) => {
      setColumnsTable((prevColumns) => {
        const nextColumns = [...prevColumns];
        nextColumns[indexCol] = { ...nextColumns[indexCol], width: size.width };
        return nextColumns;
      });
    };

  const forChild = (
    item: Columns,
    indexCol: number,
  ): ColumnGroupType<any> | ColumnType<any> => {
    const objClone = item as ColumnGroup;
    if (objClone.children) {
      return {
        ...item,
        title: objClone.name,
        ellipsis: true,
        children: objClone.children.map((value, index) =>
          forChild(value, index),
        ),
        render: (_text: string, record: any, _index: number) => {
          // if (parseFunction) {
          //   return parseFunction(
          //     record,
          //     item,
          //     isShowPaging && currentPage && totalDisplay
          //       ? (currentPage - 1) * totalDisplay + index
          //       : index,
          //   );
          // }
          return <span>{record[objClone.field as string]}</span>;
        },
      };
    }
    const itemClone = item as Column;
    return {
      ...itemClone,
      title: itemClone.isRequired ? (
        <span>
          {itemClone.name}{' '}
          <span className="text-c-danger">
            <b>*</b>
          </span>
        </span>
      ) : (
        itemClone.name
      ),
      dataIndex: itemClone.field,
      key: itemClone.field,
      width: itemClone.width,
      ellipsis: true,
      render: (text: string, record: any, index: number) => {
        if (parseFunction) {
          return parseFunction(
            record,
            itemClone,
            isShowPaging && currentPage && totalDisplay
              ? (currentPage - 1) * totalDisplay + index
              : index,
          );
        }
        return <span>{text}</span>;
      },
      onHeaderCell: (column: any) =>
        ({
          width: column?.width,
          onResize: handleResize(indexCol),
        }) as any,
      ...getSortConfig(itemClone),
    };
  };

  // convert config hiện tại sang config table antd
  const getColumns = (): TableProps['columns'] =>
    columnsTable.map((item, index) => {
      if (!Object.keys(item).length) {
        return item;
      }
      const itemClone = item as Column;
      return forChild(itemClone, index);
    });

  // loại bỏ key trước khi gửi lại
  const removeKeyInData = (dataSelected: any[]): any[] =>
    dataSelected.map((item) => {
      // eslint-disable-next-line unused-imports/no-unused-vars
      const { key, ...newData } = item;
      return newData;
    });

  // config của select box
  const getSelectConfig = (): TableProps['rowSelection'] => {
    if (isShowCheckbox) {
      return {
        ...iterableSelection,
        type: checkBoxType,
        onChange: (selectedRowKeys: any[], selectedRows: any[], info: any) => {
          // setSelected(selectedRows);
          if (onSelect) {
            onSelect(
              selectedRowKeys,
              removeKeyInData(selectedRows),
              info?.type,
            );
          }
        },
        renderCell: (_checked, record, _index, originNode) => {
          if (checkItemHasSelect && checkItemHasSelect(record)) {
            return '';
          }
          return originNode;
        },
        selectedRowKeys: selected,
        checkStrictly: false,
        getCheckboxProps: (record: any) => ({
          disabled: checkItemHasSelect ? checkItemHasSelect(record) : false,
          name: record.account,
        }),
      };
    }
    return undefined;
  };

  // config của phân trang
  const getPaginationConfig = (): TableProps['pagination'] => {
    if (isShowPaging) {
      return {
        ...iterablePaging,
        current: currentPage,
        defaultCurrent: defaultPage,
        showSizeChanger: isShowSizeChanger,
        pageSize: totalDisplay,
        pageSizeOptions: [10, 20, 50, 100],
        total: totalCountData,
        onChange: (page: number, pageSize: number) =>
          handleChangePage(page, pageSize),
        locale: {
          items_per_page: '/trang',
          page_size: 'Số / trang',
        },
        showTotal: (_total, range) => {
          const recordsOnCurrentPage = range[1] - range[0] + 1;
          return `${recordsOnCurrentPage} bản ghi`;
        },
      };
    }
    return false;
  };

  // example data https://ant.design/components/table/#components-table-demo-tree-data
  const getExpandableConfig = (): TableProps['expandable'] => ({
    ...iterableExpand,
    expandedRowRender: renderSubItem
      ? (record: any, index: number, indent: number, expanded: boolean) =>
          renderSubItem(record, index, indent, expanded)
      : undefined,
    rowExpandable: expandCondition
      ? (record: any) => expandCondition(record)
      : undefined,
  });

  const handleChangeSortFilter: TableProps['onChange'] = (_, __, sorter) =>
    onSort ? onSort(sorter) : {};

  const componentsProps = {
    header: {
      cell: ResizableTitle,
    },
    ...components,
  };

  const getRowClassName = (record: any, index: number) => {
    if (rowClassName && rowClassName(record, index)) {
      return index % 2 === 0
        ? `even-row ${rowClassName(record, index)}`
        : `odd-row ${rowClassName(record, index)}`;
    }
    return index % 2 === 0 ? 'even-row' : 'odd-row';
  };

  return (
    <div className={`root max-h-screen ${fullHeight ? 'full-height' : ''}`}>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              colorBgContainer: 'inherit',
              headerBg: '#fff',
              rowHoverBg: '#f8f8f8',
              headerSortHoverBg: 'inherit',
              headerSortActiveBg: '#fff',
              bodySortBg: 'inherit',
              footerBg: '#fff',
            },
          },
        }}
      >
        <Table
          columns={getColumns()}
          dataSource={getData()}
          rowSelection={getSelectConfig()}
          pagination={getPaginationConfig()}
          title={headerTable ? () => headerTable() : undefined}
          footer={footerTable ? () => footerTable() : undefined}
          expandable={getExpandableConfig()}
          rowKey={primaryKey}
          className={classNameTable}
          onChange={onChangeDefault ?? handleChangeSortFilter} //onChangeDefault mặc định onChange của antd
          locale={getLocale()}
          virtual={virtual}
          scroll={scrollToProps}
          components={componentsProps}
          bordered={bordered}
          rowClassName={getRowClassName}
          {...iterableProps}
          summary={summary ? (pageData) => summary(pageData) : undefined}
          // bordered
        />
      </ConfigProvider>
    </div>
  );
};

TableCommon.propTypes = {
  data: PropTypes.objectOf(PropTypes.array.isRequired),
  columns: PropTypes.objectOf(PropTypes.array.isRequired),
  iterablePaging: PropTypes.objectOf(PropTypes.object),
  iterableSelection: PropTypes.objectOf(PropTypes.object),
  iterableExpand: PropTypes.objectOf(PropTypes.object),
  defaultSelected: PropTypes.objectOf(PropTypes.array),
  expandCondition: PropTypes.func,
  parseFunction: PropTypes.func,
  sortFunction: PropTypes.func,
  isShowCheckbox: PropTypes.bool,
  isShowPaging: PropTypes.bool, //type og bool
  onChangePage: PropTypes.func, //type of function - required if isShowPaging = true
  onSort: PropTypes.func,
  onSelect: PropTypes.func,
  headerTable: PropTypes.func,
  footerTable: PropTypes.func,
  isRemoveSelected: PropTypes.bool,
  classNameTable: PropTypes.string,
  isCheckedAll: PropTypes.bool,
  // isSubItem: PropTypes.bool,
  // totalPage: PropTypes.number,
  totalCountData: PropTypes.number,
  totalDisplay: PropTypes.number,
  defaultPage: PropTypes.number,
  currentPage: PropTypes.number,
  checkItemHasSelect: PropTypes.func,
  checkBoxType: PropTypes.string,
  primaryKey: PropTypes.string,
  renderSubItem: PropTypes.func,
  onChangeDefault: PropTypes.func,
  virtual: PropTypes.bool,
  summary: PropTypes.func,
  // isSubItem: PropTypes.bool,
};

TableCommon.defaultProps = {
  columns: [], //type of array - required
  data: [], //type of array - required
  parseFunction: () => {}, //type of function
  isShowCheckbox: false, //type og bool
  // keySelect: 'id',          //type of string
  isShowPaging: false, //type og bool
  onChangePage: () => {}, //type of function - required if isShowPaging = true
  isCheckedAll: false,
  isRemoveSelected: false,
  virtual: false,
  // isSubItem: false,
  onSelect: () => {},
  classNameTable: '', // class để style cho table
  // totalPage: 1, // tong so trang
  totalCountData: 0,
  totalDisplay: 15,
  defaultPage: 1,
  currentPage: 1,
  checkBoxType: 'checkbox',
  bordered: false,
  summary: null,
};

export default TableCommon;
