import { useNavigate } from "react-router-dom";

import { Menu } from "primereact/menu";

export const Sidebar = () => {
  const navigate = useNavigate();

  const items = [
    {
      // label: "Cards",
      // expanded: true,
      items: [
        {
          label: "Tasks",
          icon: "pi pi-database",
          command: () => navigate(`/tasks`),
        },
      ],
    },
  ];

  return (
    <aside>
      <Menu model={items} />
    </aside>
  );
};
