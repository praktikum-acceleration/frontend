import Vue from 'vue'

const components = {
  Offer: () => import('../../components/Offer.vue' /* webpackChunkName: "components/offer" */).then(c => c.default || c),
  Reply: () => import('../../components/Reply.vue' /* webpackChunkName: "components/reply" */).then(c => c.default || c),
  ReplyForm: () => import('../../components/ReplyForm.vue' /* webpackChunkName: "components/reply-form" */).then(c => c.default || c),
  ReplyList: () => import('../../components/ReplyList.vue' /* webpackChunkName: "components/reply-list" */).then(c => c.default || c),
  ChartsFunnelChart: () => import('../../components/charts/FunnelChart.vue' /* webpackChunkName: "components/charts-funnel-chart" */).then(c => c.default || c),
  ChartsLineChart: () => import('../../components/charts/LineChart.js' /* webpackChunkName: "components/charts-line-chart" */).then(c => c.default || c),
  ChartsPieChart: () => import('../../components/charts/PieChart.js' /* webpackChunkName: "components/charts-pie-chart" */).then(c => c.default || c),
  ChartsUserLine: () => import('../../components/charts/UserLine.vue' /* webpackChunkName: "components/charts-user-line" */).then(c => c.default || c),
  ChartsUserPie: () => import('../../components/charts/UserPie.vue' /* webpackChunkName: "components/charts-user-pie" */).then(c => c.default || c),
  TableCell: () => import('../../components/table/TableCell.vue' /* webpackChunkName: "components/table-cell" */).then(c => c.default || c),
  TableDate: () => import('../../components/table/TableDate.vue' /* webpackChunkName: "components/table-date" */).then(c => c.default || c),
  TableLink: () => import('../../components/table/TableLink.vue' /* webpackChunkName: "components/table-link" */).then(c => c.default || c),
  TableRow: () => import('../../components/table/TableRow.vue' /* webpackChunkName: "components/table-row" */).then(c => c.default || c),
  TableTable: () => import('../../components/table/TableTable.vue' /* webpackChunkName: "components/table-table" */).then(c => c.default || c),
  LayoutContainer: () => import('../../components/layout/Container.vue' /* webpackChunkName: "components/layout-container" */).then(c => c.default || c),
  LayoutPopup: () => import('../../components/layout/Popup.vue' /* webpackChunkName: "components/layout-popup" */).then(c => c.default || c),
  UiArrow: () => import('../../components/ui/Arrow.vue' /* webpackChunkName: "components/ui-arrow" */).then(c => c.default || c),
  UiBtn: () => import('../../components/ui/Btn.vue' /* webpackChunkName: "components/ui-btn" */).then(c => c.default || c),
  UiDropdown: () => import('../../components/ui/Dropdown.vue' /* webpackChunkName: "components/ui-dropdown" */).then(c => c.default || c),
  UiInp: () => import('../../components/ui/Inp.vue' /* webpackChunkName: "components/ui-inp" */).then(c => c.default || c),
  UiRadio: () => import('../../components/ui/Radio.vue' /* webpackChunkName: "components/ui-radio" */).then(c => c.default || c),
  UiTextAr: () => import('../../components/ui/TextAr.vue' /* webpackChunkName: "components/ui-text-ar" */).then(c => c.default || c)
}

for (const name in components) {
  Vue.component(name, components[name])
  Vue.component('Lazy' + name, components[name])
}
