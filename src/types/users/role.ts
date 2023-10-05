export enum Role {
  Admin = "Admin",
  Administrators = "Quản trị viên",
  Member = "Member",
}
export const roleDefaults = [
  {
    name: "Admin",
    value: Role.Admin,
  },
  {
    name: "member",
    value: Role.Member,
  },
  {
    name: "Quản trị viên",
    value: Role.Administrators,
  },
];