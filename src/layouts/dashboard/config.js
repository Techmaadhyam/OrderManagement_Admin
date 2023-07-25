import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SvgIcon } from '@mui/material';
import HomeSmileIcon from 'src/icons/untitled-ui/duocolor/home-smile';
import LayoutAlt02Icon from 'src/icons/untitled-ui/duocolor/layout-alt-02';
import LogOut01Icon from 'src/icons/untitled-ui/duocolor/log-out-01';
import ReceiptCheckIcon from 'src/icons/untitled-ui/duocolor/receipt-check';
import ShoppingBag03Icon from 'src/icons/untitled-ui/duocolor/shopping-bag-03';
import ShoppingCart01Icon from 'src/icons/untitled-ui/duocolor/shopping-cart-01';
import Upload04Icon from 'src/icons/untitled-ui/duocolor/upload-04';
import Users03Icon from 'src/icons/untitled-ui/duocolor/users-03';
import { tokens } from 'src/locales/tokens';
import { paths } from 'src/paths';
import BuildCircleTwoToneIcon from '@mui/icons-material/BuildCircleTwoTone';
import InventoryTwoToneIcon from '@mui/icons-material/InventoryTwoTone';
import AssignmentTwoToneIcon from '@mui/icons-material/AssignmentTwoTone';
import GridViewTwoToneIcon from "@mui/icons-material/GridViewTwoTone";
import SupervisedUserCircleTwoToneIcon from "@mui/icons-material/SupervisedUserCircleTwoTone";
import BusinessTwoToneIcon from "@mui/icons-material/BusinessTwoTone";

export const useSections = () => {
  const { t } = useTranslation();

  return useMemo(() => {
    return [
      // {
      //   items: [
      //     {
      //       title: t(tokens.nav.overview),
      //       path: paths.dashboard.index,
      //       icon: (
      //         <SvgIcon fontSize="small">
      //           <HomeSmileIcon />
      //         </SvgIcon>
      //       )
      //     },
      //     {
      {
        items: [
          {
            title: t(tokens.nav.overview),
            path: paths.dashboard.index,
            icon: (
              <SvgIcon fontSize="small">
                <HomeSmileIcon />
              </SvgIcon>
            ),
          },
          {
            title: t(tokens.nav.products),
            path: paths.dashboard.products.index,
            icon: (
              <SvgIcon fontSize="small">
                <Upload04Icon />
              </SvgIcon>
            ),
            items: [
              {
                title: t(tokens.nav.view),
                path: paths.dashboard.products.view,
              },
              {
                title: t(tokens.nav.create),
                path: paths.dashboard.products.create,
              },
            ],
          },
          // {
          //   title: t(tokens.nav.warehouse),
          //   path: paths.dashboard.invoices.index,
          //   icon: (
          //     <SvgIcon fontSize="small">
          //       <ReceiptCheckIcon />
          //     </SvgIcon>
          //   ),
          //   items: [
          //     {
          //       title: t(tokens.nav.view),
          //       path: paths.dashboard.invoices.details,
          //     },
          //     {
          //       title: t(tokens.nav.create),
          //       path: paths.dashboard.invoices.index,
          //     },
          //   ],
          // },
          // {
          //   title: t(tokens.nav.inventory),
          //   path: paths.dashboard.inventory.index,
          //   icon: (
          //     <SvgIcon fontSize="small">
          //       <ShoppingBag03Icon />
          //     </SvgIcon>
          //   ),
          //   items: [
          //     {
          //       title: t(tokens.nav.view),
          //       path: paths.dashboard.inventory.view,
          //     },
          //     {
          //       title: t(tokens.nav.create),
          //       path: paths.dashboard.inventory.create,
          //     },
          //   ],
          // },

          {
            title: t(tokens.nav.user),
            path: paths.dashboard.logistics.index,
            icon: (
              <SvgIcon fontSize="small">
                <Users03Icon />
                {/* <Truck01Icon /> */}
              </SvgIcon>
            ),
            items: [
              {
                title: t(tokens.nav.view),
                items: [
                  {
                    title: t(tokens.nav.isActive),
                    path: paths.dashboard.logistics.active,
                  },
                  {
                    title: t(tokens.nav.isInactive),
                    path: paths.dashboard.logistics.inactive,
                  },
                ],
              },
              {
                title: t(tokens.nav.create),
                path: paths.dashboard.logistics.index,
              },
              {
                title: t(tokens.nav.adminCreate),
                items: [
                  {
                    title: t(tokens.nav.view),
                    path: paths.dashboard.logistics.adminView,
                  },
                  {
                    title: t(tokens.nav.create),
                    path: paths.dashboard.logistics.adminCreate,
                  },
                ],
              },
            ],
          },

          {
            title: t(tokens.nav.quotation),
            path: paths.dashboard.quotation.index,
            icon: (
              <SvgIcon fontSize="small">
                <LayoutAlt02Icon />
              </SvgIcon>
            ),
            items: [
              {
                title: t(tokens.nav.view),
                path: paths.dashboard.quotation.view,
              },
              {
                title: t(tokens.nav.create),
                path: paths.dashboard.quotation.service,
              },

              // {
              //   title: t(tokens.nav.downloadQuotation),
              //   path: paths.dashboard.quotation.invoice
              // }
            ],
          },
          // {
          //   title: t(tokens.nav.orderList),
          //   icon: (
          //     <SvgIcon fontSize="small">
          //       <InventoryTwoToneIcon />
          //     </SvgIcon>
          //   ),
          //   path: paths.dashboard.orders.index,
          //   items: [
          //     {
          //       title: t(tokens.nav.create),
          //       path: paths.dashboard.orders.index,
          //     },
          //     {
          //       title: t(tokens.nav.invoices),
          //       path: paths.dashboard.orders.details,
          //     },
          //     // {
          //     //   title: t(tokens.nav.invoice),
          //     //   path: paths.dashboard.orders.invoice
          //     // },
          //   ],
          // },
          // {
          //   title: t(tokens.nav.purchaseorder),
          //   path: paths.dashboard.purchaseorder.index,
          //   icon: (
          //     <SvgIcon fontSize="small">
          //       <ShoppingCart01Icon />
          //       {/* <Users03Icon /> */}
          //     </SvgIcon>
          //   ),
          //   items: [
          //     {
          //       title: t(tokens.nav.view),
          //       path: paths.dashboard.purchaseorder.view,
          //     },
          //     {
          //       title: t(tokens.nav.create),
          //       path: paths.dashboard.purchaseorder.create,
          //     },

          //     // {
          //     //   title: t(tokens.nav.invoice),
          //     //   path: paths.dashboard.purchaseorder.invoice
          //     // },
          //   ],
          // },
          {
            title: t(tokens.nav.services),
            path: paths.dashboard.services.index,
            icon: (
              <SvgIcon fontSize="small">
                <BuildCircleTwoToneIcon />
                {/* <Truck01Icon /> */}
              </SvgIcon>
            ),
            items: [
              {
                title: t(tokens.nav.view),
                path: paths.dashboard.services.AMCview,
              },
              {
                title: t(tokens.nav.create),
                path: paths.dashboard.services.createAMC,
              },

              {
                title: t(tokens.nav.technician),

                items: [
                  {
                    title: t(tokens.nav.view),
                    path: paths.dashboard.services.technicianview,
                  },
                  {
                    title: t(tokens.nav.create),
                    path: paths.dashboard.services.createTechnician,
                  },
                ],
              },
            ],
          },
          {
            title: t(tokens.nav.application),
            path: paths.dashboard.application.index,

            icon: (
              <SvgIcon fontSize="small">
                <GridViewTwoToneIcon />
              </SvgIcon>
            ),
            items: [
              {
                title: t(tokens.nav.customTab),
                // path: paths.dashboard.services.createTechnician,
                items: [
                  {
                    title: t(tokens.nav.view),
                    // path: paths.dashboard.application.index,
                    path: paths.dashboard.application.tabView,
                  },
                  {
                    title: t(tokens.nav.create),
                    path: paths.dashboard.application.tabCreate,
                  },
                ],
              },
              {
                title: t(tokens.nav.customFields),
                //path: paths.dashboard.services.createTechnician,
                items: [
                  {
                    title: t(tokens.nav.view),
                    path: paths.dashboard.application.FieldView,
                  },
                  {
                    title: t(tokens.nav.create),
                    path: paths.dashboard.application.FieldCreate,
                  },
                ],
              },
              {
                title: t(tokens.nav.schema),
                //path: paths.dashboard.services.createTechnician,
                items: [
                  {
                    title: t(tokens.nav.view),
                    path: paths.dashboard.application.schemaView,
                  },
                  {
                    title: t(tokens.nav.create),
                    path: paths.dashboard.application.schemaCreate,
                  },
                ],
              },
            ],
          },
          {
            title: t(tokens.nav.company),
            path: paths.dashboard.company.index,

            icon: (
              <SvgIcon fontSize="small">
                <BusinessTwoToneIcon />
              </SvgIcon>
            ),
            items: [
              {
                title: t(tokens.nav.view),
                path: paths.dashboard.company.view,
              },
              {
                title: t(tokens.nav.create),
                path: paths.dashboard.company.index,
              },
            ],
          },
          {
            title: t(tokens.nav.appUser),
            path: paths.dashboard.appUser.index,
            icon: (
              <SvgIcon fontSize="small">
                <SupervisedUserCircleTwoToneIcon />
              </SvgIcon>
            ),
            items: [
              {
                title: t(tokens.nav.view),
                path: paths.dashboard.appUser.view,
              },
              {
                title: t(tokens.nav.create),
                path: paths.dashboard.appUser.index,
              },
              {
                title: t(tokens.nav.profile),
                //path: paths.dashboard.services.createAMC,
                items: [
                  {
                    title: t(tokens.nav.view),
                    path: paths.dashboard.appUser.viewProfile,
                  },
                  {
                    title: t(tokens.nav.create),
                    path: paths.dashboard.appUser.createProfile,
                  },
                ],
              },
            ],
          },
        ],
      },
      // {
      //   subheader: t(tokens.nav.pages),
      //   items: [
      //     {
      //       title: t(tokens.nav.auth),
      //       icon: (
      //         <SvgIcon fontSize="small">
      //           <Lock01Icon />
      //         </SvgIcon>
      //       ),
      //       items: [
      //         {
      //           title: t(tokens.nav.login),
      //           items: [
      //             {
      //               title: 'Classic',
      //               path: paths.authDemo.login.classic
      //             },
      //             {
      //               title: 'Modern',
      //               path: paths.authDemo.login.modern
      //             }
      //           ]
      //         },
      //         {
      //           title: t(tokens.nav.register),
      //           items: [
      //             {
      //               title: 'Classic',
      //               path: paths.authDemo.register.classic
      //             },
      //             {
      //               title: 'Modern',
      //               path: paths.authDemo.register.modern
      //             }
      //           ]
      //         },
      //         {
      //           title: t(tokens.nav.forgotPassword),
      //           items: [
      //             {
      //               title: 'Classic',
      //               path: paths.authDemo.forgotPassword.classic
      //             },
      //             {
      //               title: 'Modern',
      //               path: paths.authDemo.forgotPassword.modern
      //             }
      //           ]
      //         },
      //         {
      //           title: t(tokens.nav.resetPassword),
      //           items: [
      //             {
      //               title: 'Classic',
      //               path: paths.authDemo.resetPassword.classic
      //             },
      //             {
      //               title: 'Modern',
      //               path: paths.authDemo.resetPassword.modern
      //             }
      //           ]
      //         },
      //         {
      //           title: t(tokens.nav.verifyCode),
      //           items: [
      //             {
      //               title: 'Classic',
      //               path: paths.authDemo.verifyCode.classic
      //             },
      //             {
      //               title: 'Modern',
      //               path: paths.authDemo.verifyCode.modern
      //             }
      //           ]
      //         }
      //       ]
      //     },
      //     {
      //       title: t(tokens.nav.pricing),
      //       path: paths.pricing,
      //       icon: (
      //         <SvgIcon fontSize="small">
      //           <CreditCard01Icon />
      //         </SvgIcon>
      //       )
      //     },
      {
        title: t(tokens.nav.checkout),
        path: paths.checkout,
        icon: (
          <SvgIcon fontSize="small">
            <LogOut01Icon />
          </SvgIcon>
        ),
      },
      //     {
      //       title: t(tokens.nav.contact),
      //       path: paths.contact,
      //       icon: (
      //         <SvgIcon fontSize="small">
      //           <Mail04Icon />
      //         </SvgIcon>
      //       )
      //     },
      //     {
      //       title: t(tokens.nav.error),
      //       icon: (
      //         <SvgIcon fontSize="small">
      //           <XSquareIcon />
      //         </SvgIcon>
      //       ),
      //       items: [
      //         {
      //           title: '401',
      //           path: paths['401']
      //         },
      //         {
      //           title: '404',
      //           path: paths['404']
      //         },
      //         {
      //           title: '500',
      //           path: paths['500']
      //         }
      //       ]
      //     }
      //   ]
      // },
      // {
      //   subheader: 'Misc',
      //   items: [
      //     {
      //       title: 'Level 0',
      //       icon: (
      //         <SvgIcon fontSize="small">
      //           <AlignLeft02Icon />
      //         </SvgIcon>
      //       ),
      //       items: [
      //         {
      //           title: 'Level 1a',
      //           items: [
      //             {
      //               title: 'Level 2a',
      //               items: [
      //                 {
      //                   title: 'Level 3a'
      //                 },
      //                 {
      //                   title: 'Level 3b',
      //                   disabled: true
      //                 }
      //               ]
      //             },
      //             {
      //               title: 'Level 2b'
      //             }
      //           ]
      //         },
      //         {
      //           title: 'Level 1b'
      //         }
      //       ]
      //     },
      //     {
      //       title: 'Disabled',
      //       disabled: true,
      //       icon: (
      //         <SvgIcon fontSize="small">
      //           <XSquareIcon />
      //         </SvgIcon>
      //       )
      //     },
      //     {
      //       title: 'Label',
      //       icon: (
      //         <SvgIcon fontSize="small">
      //           <File01Icon />
      //         </SvgIcon>
      //       ),
      //       label: (
      //         <Chip
      //           color="primary"
      //           label="New"
      //           size="small"
      //         />
      //       )
      //     },
      //     {
      //       title: 'Blank',
      //       path: paths.dashboard.blank,
      //       icon: (
      //         <SvgIcon fontSize="small">
      //           <File01Icon />
      //         </SvgIcon>
      //       )
      //     },
      //     {
      //       title: 'External Link',
      //       path: 'https://devias.io',
      //       external: true,
      //       icon: (
      //         <SvgIcon fontSize="small">
      //           <File01Icon />
      //         </SvgIcon>
      //       )
      //     }
      //   ]
      // }
    ];
  }, [t]);
};
