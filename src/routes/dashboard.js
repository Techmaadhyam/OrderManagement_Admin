import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';

//(do not delete)
const IndexPage = lazy(() => import('src/pages/dashboard/index'));

// Quotation (do not delete)
const QuotationCreatePage = lazy(() => import('src/pages/dashboard/quotation/create'));
const QuotationViewPage = lazy(() => import('src/pages/dashboard/quotation/view'));
const QuotationInvoicePage = lazy(() => import('src/pages/dashboard/quotation/invoice'));
const QuotationViewDetailPage = lazy(() => import('src/pages/dashboard/quotation/viewDetail'));
const QuotationEditPage = lazy(() => import('src/pages/dashboard/quotation/edit'));


// PurchaseOrder (do not delete)
const PurchaseOrderCreatePage = lazy(() => import('src/pages/dashboard/purchaseorder/create'));
const PurchaseOrderViewPage = lazy(() => import('src/pages/dashboard/purchaseorder/view'));
const PurchaseOrderInvoicePage = lazy(() => import('src/pages/dashboard/purchaseorder/invoice'));
const PurchaseOrderViewDetailPage = lazy(() => import('src/pages/dashboard/purchaseorder/viewDetail'));
const PurchaseOrderEdit = lazy(() => import('src/pages/dashboard/purchaseorder/edit'));
// Invoice (do not delete)
const InvoiceListPage = lazy(() => import('src/pages/dashboard/invoices/list'));
const InvoiceDetailPage = lazy(() => import('src/pages/dashboard/invoices/detail'));
const InvoiceViewPage = lazy(() => import('src/pages/dashboard/invoices/viewDetail'));

//inventory (do not delete)
const InventoryCreatePage = lazy(()=> import('src/pages/dashboard/inventory/create'))
const InventoryViewPage = lazy(()=> import('src/pages/dashboard/inventory/view'))
const InventoryDetailPage = lazy(()=> import('src/pages/dashboard/inventory/viewDetail'))

// Temporary User (do not delete)
const LogisticsDashboardPage = lazy(() => import('src/pages/dashboard/logistics/dashboard'));
const LogisticsFleetPage = lazy(() => import('src/pages/dashboard/logistics/view'));
const LogisticsViewDetailPage = lazy(() => import('src/pages/dashboard/logistics/viewDetail'));

// Orders (do not delete)
const OrderListPage = lazy(() => import('src/pages/dashboard/orders/create'));
const OrderViewPage = lazy(() => import('src/pages/dashboard/orders/view'));
const OrderInvoicePage = lazy(() => import('src/pages/dashboard/orders/invoice'));
const OrderViewDetailPage = lazy(() => import('src/pages//dashboard/orders/viewDetail'));
const OrderEditPage = lazy(() => import('src/pages//dashboard/orders/edit'));

// Products (do not delete)
const ProductListPage = lazy(() => import('src/pages/dashboard/products/list'));
const ProductCreatePage = lazy(() => import('src/pages/dashboard/products/create'));
const ProductViewPage = lazy(() => import('src/pages/dashboard/products/viewDetail'));

// Social (do not delete)
const SocialProfilePage = lazy(() => import('src/pages/dashboard/social/profile'));

// Other
const BlankPage = lazy(() => import('src/pages/dashboard/blank'));

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: (
      <DashboardLayout>
        <Suspense>
          <Outlet />
        </Suspense>
      </DashboardLayout>
    ),
    children: [
      {
        index: true,
        element: <IndexPage />
      },
      {
        path: 'quotation',
        children: [
          {
            index: true,
            element: <QuotationCreatePage />
          },
              {
                path: ':courseId',
                element: <QuotationViewPage />
              },
              {
                path: 'invoice',
                element: <QuotationInvoicePage/>
              },
              {
                path: 'viewDetail',
                element: <QuotationViewDetailPage/>
              },
              {
                path: 'edit',
                element: <QuotationEditPage/>
              }
        ]
      },
      {
        path: 'purchaseorder',
        children: [
          {
            index: true,
            element: <PurchaseOrderCreatePage />
          },
          {
            path: ':customerId',
            element: <PurchaseOrderViewPage />
          },
          {
            path: ':customerId/edit',
            element: <PurchaseOrderInvoicePage />
          },
          {
            path: 'viewDetail',
            element: <PurchaseOrderViewDetailPage/>
          },{
            path: 'edit',
            element: <PurchaseOrderEdit/>
          }
         
        ]
      },
      {
        path: 'invoices',
        children: [
          {
            index: true,
            element: <InvoiceListPage />
          },
          {
            path: ':invoiceId',
            element: <InvoiceDetailPage />
          },
          {
            path:'viewDetail',
            element: <InvoiceViewPage/>
          },
        ]
      },
      {
        path: 'logistics',
        children: [
          {
            index: true,
            element: <LogisticsDashboardPage />
          },
          {
            path: 'fleet',
            element: <LogisticsFleetPage />
          },
          {
            path:'viewDetail',
            element: <LogisticsViewDetailPage/>
          },
        ]
      },
      {
        path: 'orders',
        children: [
          {
            index: true,
            element: <OrderListPage />
          },
          {
            path: ':orderId',
            element: <OrderInvoicePage />
          },
          {
            path: 'details',
           
            element: <OrderViewPage />
          },
          {
            path:'viewDetail',
            element: <OrderViewDetailPage/>
          },
          {
            path:'edit',
            element: <OrderEditPage/>
          }
        ]
      },
      {
        path: 'inventory',
        children: [
          {
            
            path: 'view',
            element: <InventoryViewPage />
          },
          {
            path: 'create',
            element: <InventoryCreatePage />
          },
          {
            path: 'viewDetail',
            element: <InventoryDetailPage />
          }
        ]
      },
      {
        path: 'social',
        children: [
          {
            path: 'profile',
            element: <SocialProfilePage />
          }
        ]
      },
      {
        path: 'products',
        children: [
          {
            index: true,
            element: <ProductListPage />
          },
          {
            path: 'create',
            element: <ProductCreatePage />
          },
          {
            path: 'viewDetail',
            element: <ProductViewPage />
          }
        ]
      },
      {
        path: 'blank',
        element: <BlankPage />
      },
    ]
  }
];
