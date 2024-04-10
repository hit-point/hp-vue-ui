export interface TabListType {
  id: number;
  name: string;
  createBy: string;
}

export interface TabsListType {
  label: string;
  name: string;
}

export interface TabListPropsType {
  // 列表数据
  tabList: TabListType[];
  // 标签页数据
  tabsList: TabsListType[];
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

export interface TabListActionType {
  setProps: (prop: Partial<TabListPropsType>) => void;
}

export type RegisterFn = (instance: TabListActionType) => void;

export type UseTabListReturnType = [RegisterFn, TabListActionType];
