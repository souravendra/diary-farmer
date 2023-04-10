export const FARM_WORKER = (route) => {
  let unAccessibleRoutes = ['/tasks/[id]/edit', '/tasks/add', '/dashboard'];
  return !unAccessibleRoutes.includes(route);
};

export const FARM_OWNER = (route) => {
  let unAccessibleRoutes = []; //INFO: owner can access all routes
  return !unAccessibleRoutes.includes(route);
};

export const FARM_DOCTOR = (route) => {
  let unAccessibleRoutes = ['/tasks/[id]/edit', '/tasks/add'];
  return !unAccessibleRoutes.includes(route);
};
