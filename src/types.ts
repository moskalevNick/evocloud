export type ActionType = {
  type?: string;
  payload?: any;
};

export type Theme = 'light' | 'dark';

export type State = {
  theme: Theme;
  isFullScreenCameraOpen: boolean;
  isRussian: boolean;
};

export type SimilarType = {
  base64image: string | null;
  clientId: string;
  face_id: string;
  id: string;
  image: SimilarImageType;
};

export type ClientType = {
  id: string;
  name: string;
  status: string;
  phone: string;
  averageBill?: number;
  face_id?: string[];
  billsAmount?: number;
  images?: ImageType[];
  visits?: VisitsType[];
  exises?: ExisType[];
  UserId?: string;
  similar?: SimilarType[];
  lastIdentified?: Date | null;
};

export type CreateClientType = {
  name: string;
  status: string;
  phone: string;
  face_id?: string[];
  averageBill?: number;
  billsAmount?: number;
  images?: ImageType[];
  visits?: VisitsType[];
  UserId?: string;
};

export type UpdateClientType = {
  id?: string;
  name: string;
  status: string;
  phone: string;
  averageBill?: number;
  face_id?: string[];
  billsAmount?: number;
  images?: ImageType[];
  visits?: VisitsType[];
  exises?: ExisType[];
  UserId?: string;
  similar?: SimilarType[];
};

export type ExisType = {
  id: string;
  date: Date | string;
  text: string;
  isPinned?: boolean;
  clientId?: string;
  visitId?: string;
};

export type EditExisType = {
  id: string;
  text?: string;
  isPinned?: boolean;
};

export type CreateExisType = {
  clientId: string;
  date: Date | string;
  text: string;
};

export type VisitsType = {
  id: string;
  date: Date;
  exisId: string[];
};
export type UpdateVisitType = {
  date: Date;
  exisId: string[];
};

export type ImageType = {
  id: string;
  path: string;
  publicUrl: string;
  clientId: string;
};

export type UserAvatarType = {
  id: string;
  path: string;
  publicUrl: string;
  userId?: string;
};

export type SimilarImageType = {
  id: string;
  path: string;
  publicUrl: string;
  similarId?: string;
};

export type CameraFrameType = {
  img_small: string;
  faces: [];
};

export type DatepickerDataType = {
  startDate: Date | string | null;
  endDate: Date | string | null;
};

export type RangeDataType = {
  min: number;
  max: number;
};

export type FiltersType = {
  date: DatepickerDataType;
  range: RangeDataType;
  status: string[];
  searchString: string;
};

export type clientFilterType = {
  searchString?: string;
  dateFrom?: string;
  dateTo?: string;
  billFrom?: number;
  billTo?: number;
  status?: string;
};

export type UserType = {
  group_id: string;
  login: string;
  email: string;
  name: string;
  phone: string;
  avatar: string;
  last_enter: string;
  company_name: string | null;
  company_address: string | null;
  id: number;
  place: string;
  about: string;
  comment: string;
  lat: string;
  lon: string;
  lang: string;
  admin_id: string;
  properties: any[] | null;
  isDark?: boolean;
  isRus?: boolean;
  devices?: DeviceType[];
};

export type createUserType = {
  id?: string;
  group_id: string;
  login: string;
  password: string;
  name: string;
  email?: string;
  phone?: string;
  company_name?: string;
  company_address?: string;
  comment?: string;
  lat?: string;
  lon?: string;
  lang?: string;
};

export type editSettingsType = {
  isDark?: boolean;
  isRus?: boolean;
};

export type UserGroupType = {
  id: number;
  name: string;
  roles: string;
};

export type DeviceType = {
  id: number;
  x_evo_device: string;
  local_ip: string;
  proshivka: string;
  last_connect_server: string;
  comment: string;
  status: string;
  data_add: string;
  id_user: string;
  telegram_chat_id: string;
  current_raw_state: string;
  name: string;
  properties: string;
  deleted: number;
};

export type CreateDeviceType = {
  x_evo_device?: string;
  local_ip?: string;
  proshivka?: string;
  last_connect_server?: string;
  comment?: string;
  status?: string;
  data_add?: string;
  id_user?: string;
  telegram_chat_id?: string;
  current_raw_state?: string;
  name?: string;
  properties?: string;
  deleted?: number;
};

export type WidgetType = {
  user_id: string;
  group_id: string;
  controller: DeviceType;
  type_uvh: number;
  comment: string;
  favorite: string;
  min: string;
  max: string;
  min2: string;
  max2: string;
  bar_prev_value: string;
  vuh_rgb_red: string;
  vuh_rgb_green: string;
  vuh_rgb_blue: string;
  rtsp_address: string;
  control_elements: any;
  hash: string;
  label_on: string;
  label_off: string;
  id: number;
  deleted: number;
  controller_id: string;
  properties: any;
  name: string;
  type: any;
  group: GroupWidgetsType;
};

export type GroupWidgetsType = {
  user_id: string;
  comment: string;
  control_elements: any;
  id: number;
  deleted: number;
  properties: any;
  name: string;
};
