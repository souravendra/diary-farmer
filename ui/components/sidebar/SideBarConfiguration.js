const SideBarConfig = {
  FARM_OWNER: [
    {
      name: 'Dashboard',
      url: '/dashboard',
    },
    {
      name: 'Manage Tasks',
      url: '/tasks',
    },
  ],
  FARM_DOCTOR: [
    {
      name: 'View Tasks',
      url: '/tasks',
    },
  ],
  FARM_WORKER: [
    {
      name: 'View Tasks',
      url: '/tasks',
    },
  ],
};

const getSidebarConfig = (role) => {
  if (SideBarConfig[role]) {
    return SideBarConfig[role];
  }
  return SideBarConfig.FARM_WORKER;
};

export { getSidebarConfig };
