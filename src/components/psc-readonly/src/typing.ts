export interface PropRule {
  valField: string;
  ruleField: string[];
  msg: string;
  defVal: any;
}
export interface FileListType {
  uid?: string;
  name?: string;
  fileName: string;
  fileAddr?: string;
  fileId?: string;
}

export interface KeyToValType extends Partial<FileListType> {
  id?: string;
  key?: string;
  value?: string;
}

export interface ReadonlyProp {
  textVal: string | string[];
  keyToValList: Partial<KeyToValType>[];
  isFileDelete: boolean;
}
