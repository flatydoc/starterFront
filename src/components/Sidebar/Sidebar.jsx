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
          label: "Events",
          icon: "pi pi-database",
          command: () => navigate(`/events`),
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
