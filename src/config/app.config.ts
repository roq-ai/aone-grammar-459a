interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Teacher'],
  customerRoles: [],
  tenantRoles: ['Teacher'],
  tenantName: 'Organization',
  applicationName: 'Aone Grammar',
  addOns: ['notifications', 'chat', 'file'],
};
