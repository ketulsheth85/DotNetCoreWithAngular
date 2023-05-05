export interface UserData {
  userId: number;
  userName: string;
  userEmailId: string;
  lastName: string;
  firstName: string;
  fullName: string;
  companyId: number;
  companyName: string;
  colorCode: string;
  companyLogo: string;
  locationId: number;
  //locationName: string;
  employeeId: number;
  phoneNo: string;
  mobile: string;
  userLocation: string;
  department: string;
  roleId: number;
  roleName: string;
  op: number;
  isCompanyFlag: number;
}
export interface RoleData {
  roleId: number;
  roleName: string;
  isActive: string;
  isDelete: string;
}

export interface DynamicTheme {
  "--background": string;
  "--text-color": string;
}