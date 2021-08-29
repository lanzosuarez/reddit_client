import { FC } from "react";
import { List, ListItem, ListIcon, Flex, Box } from "@chakra-ui/react";
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
      as={NavLink}
      pos="relative"
      py="4"
      px="6"
      cursor="pointer"
      fontWeight="bold"
      bgColor={isMatch ? "#ff4500" : "none"} // if nav is active, set bgcolor to reddit primary color
      _hover={{
        bgColor: "#ff4500",
      }}
      transition="0.1s"
      to={to}
    >
      {!!icon && icon}
      {text}
    </ListItem>
  );
};

const Nav = () => (
  <Box as="nav">
    <Flex as={List} direction="row" borderBottom="1px solid">
      {navItems.map((navItem, i) => (
        <NavItem {...navItem} key={i} />
      ))}
    </Flex>
  </Box>
);

export default Nav;
