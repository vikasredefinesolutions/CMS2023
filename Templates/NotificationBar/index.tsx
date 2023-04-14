import NotificationBar_Type1 from './NotificationBar_Type1';
import NotificationBar_Type2 from './NotificationBar_Type2';

import { NextPage } from 'next';
import { _NotificationBarTemplates } from './NotificationBar';
// import NotificationBar_Type3 from './NotificationBar_Type3';
// import NotificationBar_Type4 from './NotificationBar_Type4';

const NotificationBarTemplates: _NotificationBarTemplates = {
  type1: NotificationBar_Type1,
  type2: NotificationBar_Type2,
  //   type3: NotificationBar_Type3,
  //   type4: NotificationBar_Type4,
};
const NotificationBar: NextPage = () => {
  const NotificationBarTemplate = NotificationBarTemplates['type1'];
  return <NotificationBarTemplate />;
};

export default NotificationBar;
