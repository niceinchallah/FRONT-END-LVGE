
import { MdAccountCircle } from "react-icons/md"; 
import {  IconLayoutDashboard, IconLogin,   IconUserPlus,IconCar,IconCamera,IconMoneybag,IconPlus
,IconCash,IconBottle, IconTransitionRight,IconUser, IconUsers,IconFileAnalytics} from '@tabler/icons';


import { uniqueId } from 'lodash';

const Menuitems = [
  /*{
    navlabel: true,
    subheader: 'Home',
  },*/

  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/dashboard',
  },
  /*{
    navlabel: true,
    subheader: 'client',
  },*/
  
  /*{
    id: uniqueId(),
    title: 'Add client',
    icon: IconUserPlus,
    href: '/client/add_new_client',
  },*/
 /* {
    navlabel: true,
    subheader: 'Vehicles',
  },*/
  {
    id: uniqueId(),
    title: 'vehicles',
    icon: IconCar,
    href: '/ui/VEHICLES',
  },
  /*{
    id: uniqueId(),
    title: 'Detected by camera',
    icon: IconCamera,
    href: '/ui/shadow',
  },*/
  
  /*{
    navlabel: true,
    subheader: 'materials',
  },*/
  {
    id: uniqueId(),
    title: 'Materials',
    icon: IconBottle,
    href: '/mat/Mats',
  },
  {
    id: uniqueId(),
    title: 'Clients',
    icon: IconUser,
    href: '/client/Clients',
  },
  /*{
    id: uniqueId(),
    title: 'Add material',
    icon: IconPlus,
    href: '/mat/Add_mats',
  },*/
  {
    navlabel: true,
    subheader: 'income',
  },
  {
    id: uniqueId(),
    title: 'Earnings',
    icon: IconCash,
    href: '/income/Earnings',
  },
  {
    id: uniqueId(),
    title: 'Expenses',
    icon:  IconTransitionRight,
    href: '/income/Expenses',
  },
  {
    id: uniqueId(),
    title: 'Profit',
    icon: IconMoneybag,
    href: '/income/Profit',
  },
  
  {
    navlabel: true,
    subheader: 'Employee',
  },
  {
    id: uniqueId(),
    title: 'Employees',
    icon: IconUsers,
    href: '/Employee/Employees',
  },
  {
    navlabel: true,
    subheader: 'Facturation',
  },
  {
    id: uniqueId(),
    title: 'Facture',
    icon: IconFileAnalytics,
    href: '/FACTURE/Facture',
  },
  /*{
    id: uniqueId(),
    title: 'Add employee',
    icon: IconUserPlus ,
    href: '/Employee/Add_employee',
  },*/
  {
    navlabel: true,
    subheader: 'auth',
  },
  {
    id: uniqueId(),
    title: 'Login',
    icon: IconLogin,
    href: '/auth/login',
  },
  {
    id: uniqueId(),
    title: 'Account',
    icon: MdAccountCircle ,
    href: '/auth/Account',
  },
  {
    id: uniqueId(),
    title: 'Registre',
    icon: IconUserPlus ,
    href: '/auth/register',
  },

  
];

export default Menuitems;
