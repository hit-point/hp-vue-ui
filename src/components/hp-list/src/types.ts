export interface ListType {
  id: number;
  name: string;
  createBy: string;
}

export interface ListTabsType {
  label: string;
  name: string;
}

export interface ListPropsType {
  // 列表数据
  list: ListType[];
  // 标签页数据
  listTabs: ListTabsType[];
  // 标签激活项
  activeName: string;
  // 列表选中项
  listActiveIdx: number;
  // 当前页码
  page: number;
  // 每页显示条目个数
  pageSize: number;
  // 数据总数
  total: number;
  // 底部按钮文字
  bomBtnTxt: string;
  // 是否展示底部按钮
  isShowBomBtn: boolean;
  // 加载状态
  loading: boolean;
  // 是否禁用
  isDisable: boolean;
}

export interface ListActionType {
  setProps: (prop: Partial<ListPropsType>) => void;
}

export type RegisterFn = (instance: ListActionType) => void;

export type UseListReturnType = [RegisterFn, ListActionType];
