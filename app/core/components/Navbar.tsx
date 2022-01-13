import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useDisclosure,
  Image
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon
} from "@chakra-ui/icons";
import { Routes, useMutation, useRouter } from "blitz";
import logout from "app/auth/mutations/logout";

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();
  const router = useRouter();
  const [logoutMutation] = useMutation(logout);

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text>Logo</Text>
          <Flex display={{ base: "none", md: "flex" }} align="center" ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <Button
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bg={"blue.400"}
            onClick={async () => {
              await logoutMutation();
              // Pushing to "/" makes the login show twice after logout
              // router.push("/");

              // Tried this as suggested in the gh issue but does not work either
              // router.push(Routes.Home()).finally(() => logoutMutation());
            }}
            _hover={{
              bg: "blue.300"
            }}
          >
            Logout
          </Button>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const NavItemChild = ({
  navItems
}: {
  navItems: NonNullable<INavItem["children"]>;
}) => {
  return (
    <PopoverContent
      border={0}
      boxShadow={"xl"}
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      rounded={"xl"}
      minW={"sm"}
    >
      <Stack>
        {navItems.map((child) => (
          <DesktopSubNav key={child.label} {...child} />
        ))}
      </Stack>
    </PopoverContent>
  );
};

const NavItem = ({ navItem }: { navItem: INavItem }) => {
  const router = useRouter();
  const isActive = navItem.children?.some(
    (child) => child.href === router.pathname
  );
  const activeColor = useColorModeValue("gray.900", "white");
  const notActiveColor = useColorModeValue("gray.600", "gray.200");
  return (
    <Box key={navItem.label}>
      <Popover trigger={"hover"} placement={"bottom-start"}>
        <PopoverTrigger>
          <Link
            p={2}
            href={navItem.href ?? "#"}
            fontSize={"sm"}
            fontWeight={500}
            color={isActive ? activeColor : notActiveColor}
            _hover={{
              textDecoration: "none",
              color: activeColor
            }}
          >
            {navItem.label}
          </Link>
        </PopoverTrigger>

        {navItem.children && <NavItemChild navItems={navItem.children} />}
      </Popover>
    </Box>
  );
};

const DesktopNav = () => {
  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <NavItem key={navItem.label} {...{ navItem }} />
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: INavItem) => {
  const router = useRouter();
  const isActive = router.pathname === href;
  const activeBgColor = useColorModeValue("blue.50", "gray.900");
  return (
    <Link
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      bg={isActive ? activeBgColor : undefined}
      _hover={{ bg: activeBgColor }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "blue.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={isActive ? "translateX(0)" : "translateX(-10px)"}
          opacity={isActive ? "100%" : 0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"blue.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: INavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none"
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface INavItem {
  label: string;
  subLabel?: string;
  children?: Array<INavItem>;
  href?: string;
}

const NAV_ITEMS: Array<INavItem> = [
  {
    label: "Monitors",
    children: [
      {
        label: "First",
        subLabel: "First Monitor",
        href: "/monitors/first"
      },
      {
        label: "Second",
        subLabel: "Second Monitor",
        href: "/monitors/second"
      }
    ]
  },
  {
    label: "Users",
    href: "/users"
  },
  {
    label: "Logs",
    href: "/logs"
  }
];
