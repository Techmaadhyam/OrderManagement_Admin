import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout as DashboardLayout } from 'src/layouts/dashboard';

const IndexPage = lazy(() => import('src/pages/dashboard/index'));

// Quotation
const QuotationCreatePage = lazy(() => import('src/pages/dashboard/quotation/create'));
const QuotationViewPage = lazy(() => import('src/pages/dashboard/quotation/view'));
const QuotationInvoicePage = lazy(() => import('src/pages/dashboard/quotation/invoice'));
const QuotationViewDetailPage = lazy(() => import('src/pages/dashboard/quotation/viewDetail'));
const QuotationEditPage = lazy(() => import('src/pages/dashboard/quotation/edit'));


// Blog
const BlogPostListPage = lazy(() => import('src/pages/dashboard/blog/list'));
const BlogPostDetailPage = lazy(() => import('src/pages/dashboard/blog/detail'));
const BlogPostCreatePage = lazy(() => import('src/pages/dashboard/blog/create'));

// PurchaseOrder
const PurchaseOrderCreatePage = lazy(() => import('src/pages/dashboard/purchaseorder/create'));
const PurchaseOrderViewPage = lazy(() => import('src/pages/dashboard/purchaseorder/view'));
const PurchaseOrderInvoicePage = lazy(() => import('src/pages/dashboard/purchaseorder/invoice'));
const PurchaseOrderViewDetailPage = lazy(() => import('src/pages/dashboard/purchaseorder/viewDetail'));
const PurchaseOrderEdit = lazy(() => import('src/pages/dashboard/purchaseorder/edit'));
// Invoice
const InvoiceListPage = lazy(() => import('src/pages/dashboard/invoices/list'));
const InvoiceDetailPage = lazy(() => import('src/pages/dashboard/invoices/detail'));
const InvoiceViewPage = lazy(() => import('src/pages/dashboard/invoices/viewDetail'));

// Jobs
const JobBrowsePage = lazy(() => import('src/pages/dashboard/jobs/browse'));
const JobCreatePage = lazy(() => import('src/pages/dashboard/jobs/create'));
const CompanyDetailPage = lazy(() => import('src/pages/dashboard/jobs/companies/detail'));

//inventory
const InventoryCreatePage = lazy(()=> import('src/pages/dashboard/inventory/create'))
const InventoryViewPage = lazy(()=> import('src/pages/dashboard/inventory/view'))
const InventoryDetailPage = lazy(()=> import('src/pages/dashboard/inventory/viewDetail'))

// Logistics
const LogisticsDashboardPage = lazy(() => import('src/pages/dashboard/logistics/dashboard'));
const LogisticsFleetPage = lazy(() => import('src/pages/dashboard/logistics/view'));
const LogisticsViewDetailPage = lazy(() => import('src/pages/dashboard/logistics/viewDetail'));

// Orders
const OrderListPage = lazy(() => import('src/pages/dashboard/orders/create'));
const OrderViewPage = lazy(() => import('src/pages/dashboard/orders/view'));
const OrderInvoicePage = lazy(() => import('src/pages/dashboard/orders/invoice'));
const OrderViewDetailPage = lazy(() => import('src/pages//dashboard/orders/viewDetail'));
const OrderEditPage = lazy(() => import('src/pages//dashboard/orders/edit'));

// Products
const ProductListPage = lazy(() => import('src/pages/dashboard/products/list'));
const ProductCreatePage = lazy(() => import('src/pages/dashboard/products/create'));
const ProductViewPage = lazy(() => import('src/pages/dashboard/products/viewDetail'));

// Social
const SocialFeedPage = lazy(() => import('src/pages/dashboard/social/feed'));
const SocialProfilePage = lazy(() => import('src/pages/dashboard/social/profile'));

// Other
const AccountPage = lazy(() => import('src/pages/dashboard/account'));
const AnalyticsPage = lazy(() => import('src/pages/dashboard/analytics'));
const BlankPage = lazy(() => import('src/pages/dashboard/blank'));
const CalendarPage = lazy(() => import('src/pages/dashboard/calendar'));
const ChatPage = lazy(() => import('src/pages/dashboard/chat'));
const CryptoPage = lazy(() => import('src/pages/dashboard/crypto'));
const EcommercePage = lazy(() => import('src/pages/dashboard/ecommerce'));
const FileManagerPage = lazy(() => import('src/pages/dashboard/file-manager'));
const KanbanPage = lazy(() => import('src/pages/dashboard/kanban'));
const MailPage = lazy(() => import('src/pages/dashboard/mail'));

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
        path: 'blog',
        children: [
          {
            index: true,
            element: <BlogPostListPage />
          },
          {
            path: 'create',
            element: <BlogPostCreatePage />
          },
          {
            path: ':postId',
            element: <BlogPostDetailPage />
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
        path: 'jobs',
        children: [
          {
            index: true,
            element: <JobBrowsePage />
          },
          {
            path: 'create',
            element: <JobCreatePage />
          },
          {
            path: 'companies',
            children: [
              {
                path: ':companyId',
                element: <CompanyDetailPage />
              }
            ]
          }
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
        path: 'social',
        children: [
          {
            path: 'feed',
            element: <SocialFeedPage />
          },
          {
            path: 'profile',
            element: <SocialProfilePage />
          }
        ]
      },
      {
        path: 'account',
        element: <AccountPage />
      },
      {
        path: 'analytics',
        element: <AnalyticsPage />
      },
      {
        path: 'blank',
        element: <BlankPage />
      },
      {
        path: 'calendar',
        element: <CalendarPage />
      },
      {
        path: 'chat',
        element: <ChatPage />
      },
      {
        path: 'crypto',
        element: <CryptoPage />
      },
      {
        path: 'ecommerce',
        element: <EcommercePage />
      },
      {
        path: 'file-manager',
        element: <FileManagerPage />
      },
      {
        path: 'kanban',
        element: <KanbanPage />
      },
      {
        path: 'mail',
        element: <MailPage />
      }
    ]
  }
];
