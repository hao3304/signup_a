import layout from "@/layout";
export default [
  {
    path: "/",
    component: layout.single,
    children: [
      {
        path: "",
        name: "Home",
        meta: {
          title: "报名管理"
        },
        component: () => import("@/views/user")
      }
    ]
  }
];
