import EmptyLayout from './EmptyLayout';
import Layout from './Layout';
const LayoutConfig = [
  {
    path: '/tasks',
    layout: Layout,
  },
  {
    path: '/dashboard',
    layout: Layout,
  },
  {
    path: '',
    layout: EmptyLayout,
  },
];

const getLayout = (path) => {
  let config = LayoutConfig.find((config) => path.includes(config.path));
  if (config) return config.layout;
  else return EmptyLayout;
};

export { getLayout };
