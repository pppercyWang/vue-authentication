[{
    path: 'list',
    name: 'order-list',
    component: OrderList,
    meta: {
        name: '订单列表'
    }
},
{
    path: 'product',
    name: 'product-manage',
    component: ProductManage,
    meta: {
        name: '生产管理'
    },
    children: [
        {
            path: 'list',
            name: 'product-list',
            component: ProductionList,
            meta: {
                name: '生产列表'
            }
        },
        {
            path: 'review',
            name: 'review-manage',
            component: ReviewManage,
            meta: {
                name: '审核管理'
            }
        }
    ]
},
{
    path: 'returnGoods',
    name: 'return-goods',
    component: ReturnGoods,
    meta: {
        name: '退货管理'
    }
}
]