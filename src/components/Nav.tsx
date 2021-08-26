import { FC } from "react";
import { List, ListItem, ListIcon, Flex } from "@chakra-ui/react";
import { MdStarBorder, MdFiberNew } from "react-icons/md";
import { AiOutlineFire } from "react-icons/ai";
import { NavLink, useRouteMatch } from "react-router-dom";

interface NavItems {
  text: string;
  icon?: JSX.Element;
  to: string;
}

const navItems: NavItems[] = [
  {
    text: "Hot",
    icon: <ListIcon as={AiOutlineFire} color="orange.200" />,
    to: "/hot",
  },
  {
    text: "Top",
    icon: <ListIcon as={MdStarBorder} color="orange.200" />,
    to: "/top",
  },
  {
    text: "New",
    icon: <ListIcon as={MdFiberNew} color="orange.200" />,
    to: "/new",
  },
  {
    text: "Controversial",
    to: "/controversial",
  },
];

const NavItem: FC<NavItems> = ({ to, icon, text }) => {
  const isMatch = useRouteMatch({ path: to });
  return (
    <ListItem
      py="4"
      px="6"
      cursor="pointer"
      fontWeight="bold"
      bgColor={isMatch ? "#ff4500" : "none"}
    >
      {!!icon && icon}
      <NavLink to={to}>{text}</NavLink>
    </ListItem>
  );
};

const Nav = () => (
  <Flex
    as={List}
    direction="row"
    borderBottom="1px solid"
    sx={{
      __c: {
        _before: {
          content: "''",
          position: "absolute",
          h: "100%",
          w: 1,
          bgColor: "black",
        },
      },

      ".activeLink": {
        bgColor: "#ff4500",
      },
    }}
  >
    {navItems.map((navItem, i) => (
      <NavItem {...navItem} key={i} />
    ))}
  </Flex>
);

export default Nav;
