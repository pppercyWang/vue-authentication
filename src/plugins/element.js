import Vue from 'vue'
import './element-style.scss'
import 'element-ui/lib/theme-chalk/index.css'
import {
  Button,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Table,
  TableColumn,
  Message,
  Loading,
  Input,
  Radio,
  RadioGroup,
  RadioButton,
  Popover,
  MessageBox,
  Container,
  Aside,
  Main,
  Pagination,
  Scrollbar,
  Select,
  Option,
  OptionGroup,
  Icon,
  DatePicker,
  TimeSelect,
  TimePicker,
  Dialog,
  FormItem,
  Col,
  Row,
  Form
} from 'element-ui'
Vue.use(Form)
Vue.use(Col)
Vue.use(Row)
Vue.use(FormItem)
Vue.use(Button)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Input)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton).use(Icon)
Vue.use(DatePicker)
Vue.use(Popover).use(Container).use(Aside).use(Main).use(Pagination).use(Scrollbar).use(Select).use(Option).use(OptionGroup)
Vue.use(TimeSelect)
Vue.use(TimePicker)
Vue.use(Dialog)
Vue.use(Loading.directive)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
