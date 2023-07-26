import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Layout as DashboardLayout } from "src/layouts/dashboard";

//(do not delete)
const IndexPage = lazy(() => import("src/pages/dashboard/index"));

// Quotation (do not delete)

const QuotationServicePage = lazy(() =>
  import("src/pages/dashboard/quotation/serviceQuotation")
);
const QuotationViewPage = lazy(() =>
  import("src/pages/dashboard/quotation/view")
);
const QuotationViewDetailPage = lazy(() =>
  import("src/pages/dashboard/quotation/viewDetail")
);
const QuotationServiceEditPage = lazy(() =>
  import("src/pages/dashboard/quotation/editserviceQuotation")
);

// AMC (do not delete)
const AMCCreatePage = lazy(() =>
  import("src/pages/dashboard/services/AMC/create")
);
const AMCViewPage = lazy(() => import("src/pages/dashboard/services/AMC/view"));
const AMCViewDetailPage = lazy(() =>
  import("src/pages/dashboard/services/AMC/viewDetail")
);
const AMCOrderEdit = lazy(() =>
  import("src/pages/dashboard/services/AMC/edit")
);
//const WorkOrderDownload = lazy(() => import('src/pages/dashboard/services/workorder/downloadamc'));

// Temporary User (do not delete)
const LogisticsDashboardPage = lazy(() =>
  import("src/pages/dashboard/logistics/dashboard")
);

//add technician
const TechnicianCreatePage = lazy(() =>
  import("src/pages/dashboard/services/technician/dashboard")
);
const TechnicianViewPage = lazy(() =>
  import("src/pages/dashboard/services/technician/view")
);
const TechnicianViewDetailPage = lazy(() =>
  import("src/pages/dashboard/services/technician/viewDetail")
);

// Products (do not delete)
const ProductListPage = lazy(() => import("src/pages/dashboard/products/list"));
const ProductCreatePage = lazy(() =>
  import("src/pages/dashboard/products/create")
);
const ProductViewPage = lazy(() =>
  import("src/pages/dashboard/products/viewDetail")
);

// Social (do not delete)
const SocialProfilePage = lazy(() =>
  import("src/pages/dashboard/social/profile")
);
const SocialPasswordPage = lazy(() =>
  import("src/pages/dashboard/social/changePassword")
);

// Other
const BlankPage = lazy(() => import("src/pages/dashboard/blank"));

//registered users
const ActiveUsers = lazy(() =>
  import("src/pages/dashboard/registeredUsers/customer/active")
);
const InactiveUsers = lazy(() =>
  import("src/pages/dashboard/registeredUsers/customer/inactive")
);
const ActiveView = lazy(() =>
  import("src/pages/dashboard/registeredUsers/customer/activeView")
);
const InactiveView = lazy(() =>
  import("src/pages/dashboard/registeredUsers/customer/inactiveView")
);

//admin
const AdminCreate = lazy(() =>
  import("src/pages/dashboard/registeredUsers/admin/create")
);
const AdminView = lazy(() =>
  import("src/pages/dashboard/registeredUsers/admin/view")
);
const AdminViewDetail = lazy(() =>
  import("src/pages/dashboard/registeredUsers/admin/viewDetail")
);

//Application
////Custom Tab
const TabCreate = lazy(() =>
  import("src/pages/dashboard/application/CustomTab/create")
);
const TabView = lazy(() =>
  import("src/pages/dashboard/application/CustomTab/view")
);
const TabViewDetail = lazy(() =>
  import("src/pages/dashboard/application/CustomTab/viewDetail")
);

////Custom Field
const FieldCreate = lazy(() =>
  import("src/pages/dashboard/application/CustomFields/create")
);
const FieldView = lazy(() =>
  import("src/pages/dashboard/application/CustomFields/view")
);
const FieldViewDetail = lazy(() =>
  import("src/pages/dashboard/application/CustomFields/viewDetail")
);

////Schema
const SchemaCreate = lazy(() =>
  import("src/pages/dashboard/application/Schema/create")
);
const SchemaView = lazy(() =>
  import("src/pages/dashboard/application/Schema/view")
);
const SchemaViewDetail = lazy(() =>
  import("src/pages/dashboard/application/Schema/viewDetail")
);
//company
const CompanyView = lazy(() => import("src/pages/dashboard/company/view"));
const CompanyCreate = lazy(() => import("src/pages/dashboard/company/create"));
const CompanyViewDetail = lazy(() =>
  import("src/pages/dashboard/company/viewDetail")
);
const CompanyEdit = lazy(() => import("src/pages/dashboard/company/edit"));

//addUser
const UserCreate = lazy(() => import("src/pages/dashboard/appUser/create"));
const UserEdit = lazy(() => import("src/pages/dashboard/appUser/edit"));
const UserView = lazy(() => import("src/pages/dashboard/appUser/view"));
const ProfileCreate = lazy(() =>
  import("src/pages/dashboard/appUser/profile/create")
);
const ProfileView = lazy(() =>
  import("src/pages/dashboard/appUser/profile/view")
);
const UserViewDetail = lazy(() =>
  import("src/pages/dashboard/appUser/viewDetail")
);

export const dashboardRoutes = [
  {
    path: "dashboard",
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
        element: <IndexPage />,
      },

      {
        path: "quotation",
        children: [
          {
            path: "service",
            element: <QuotationServicePage />,
          },
          {
            path: ":courseId",
            element: <QuotationViewPage />,
          },
          // {
          //   path: 'invoice',
          //   element: <QuotationInvoicePage/>
          // },
          {
            path: "viewDetail",
            element: <QuotationViewDetailPage />,
          },
          {
            path: "editService",
            element: <QuotationServiceEditPage />,
          },
        ],
      },

      {
        path: "logistics",
        children: [
          {
            index: true,
            element: <LogisticsDashboardPage />,
          },
          {
            path: "active",
            element: <ActiveUsers />,
          },
          {
            path: "inactive",
            element: <InactiveUsers />,
          },
          {
            path: "activeView",
            element: <ActiveView />,
          },
          {
            path: "inactiveView",
            element: <InactiveView />,
          },
          {
            path: "adminCreate",
            element: <AdminCreate />,
          },
          {
            path: "adminView",
            element: <AdminView />,
          },
          {
            path: "adminViewDetail",
            element: <AdminViewDetail />,
          },
        ],
      },

      {
        path: "services",
        children: [
          {
            path: "amc",
            element: <AMCCreatePage />,
          },
          {
            path: "amcview",
            element: <AMCViewPage />,
          },
          {
            path: "amcDetail",
            element: <AMCViewDetailPage />,
          },
          {
            path: "amcedit",
            element: <AMCOrderEdit />,
          },

          {
            path: "technician",
            element: <TechnicianCreatePage />,
          },
          {
            path: "technicianview",
            element: <TechnicianViewPage />,
          },
          {
            path: "technicianDetail",
            element: <TechnicianViewDetailPage />,
          },
        ],
      },

      {
        path: "social",
        children: [
          {
            path: "profile",
            element: <SocialProfilePage />,
          },
          {
            path: "password",
            element: <SocialPasswordPage />,
          },
        ],
      },
      {
        path: "products",
        children: [
          {
            index: true,
            element: <ProductListPage />,
          },
          {
            path: "create",
            element: <ProductCreatePage />,
          },
          {
            path: "viewDetail/:id",
            element: <ProductViewPage />,
          },
        ],
      },
      {
        path: "application",
        children: [
          {
            // index: true,
            path: "tab/view",
            element: <TabView />,
          },
          {
            path: "tab/create",
            element: <TabCreate />,
          },
          {
            path: "tab/detail",
            element: <TabViewDetail />,
          },
          {
            path: "Field/create",
            element: <FieldCreate />,
          },
          {
            path: "Field/view",
            element: <FieldView />,
          },
          {
            path: "Field/detail",
            element: <FieldViewDetail />,
          },
          {
            path: "Schema/create",
            element: <SchemaCreate />,
          },
          {
            path: "Schema/view",
            element: <SchemaView />,
          },
          {
            path: "Schema/detail",
            element: <SchemaViewDetail />,
          },
        ],
      },
      {
        path: "company",
        children: [
          {
            index: true,
            element: <CompanyCreate />,
          },
          {
            path: "view",
            element: <CompanyView />,
          },
          {
            path: "viewDetail",
            element: <CompanyViewDetail />,
          },
          {
            path: "edit",
            element: <CompanyEdit />,
          },
        ],
      },
      {
        path: "appUser",
        children: [
          {
            index: true,
            element: <UserCreate />,
          },
          {
            path: "view",
            element: <UserView />,
          },
          {
            path: "viewDetail",
            element: <UserViewDetail />,
          },
          {
            path: "edit",
            element: <UserEdit />,
          },
          {
            path: "profileCreate",
            element: <ProfileCreate />,
          },
          {
            path: "profileView",
            element: <ProfileView />,
          },
        ],
      },
      {
        path: "blank",
        element: <BlankPage />,
      },
    ],
  },
];
