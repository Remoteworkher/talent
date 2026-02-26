"use client";
import React, { useState } from "react";
import NameCard from "../reusables/NameCard";
import MenuItem from "../reusables/MenuItem";
import { Button } from "../ui/button";
import Image from "next/image";

type MenuItemType = {
  label: string;
  icon: string;
  href: string;
  soon?: boolean;
};

const mainMenu: MenuItemType[] = [
  {
    label: "Home",
    icon: "/home-icon.svg",
    href: "/",
  },
];
const career: MenuItemType[] = [
  {
    label: "Career Tools",
    icon: "/career-tools-icon.svg",
    href: "/career-tools",
  },
  {
    label: "Courses",
    icon: "/courses-icon.svg",
    href: "#",
  },
];
const community: MenuItemType[] = [
  {
    label: "Events",
    icon: "/events-icon.svg",
    href: "/events",
  },
  {
    label: "Partner Match",
    icon: "/community-icon.svg",
    href: "#",
  },
];
const resources: MenuItemType[] = [
  {
    label: "Perks",
    icon: "/perks-icon.svg",
    href: "#",
  },
  {
    label: "Resources",
    icon: "/resources-icon.svg",
    href: "/resources",
  },
  {
    label: "Challenges",
    icon: "/challenge-icon.svg",
    href: "#",
  },
];
const others: MenuItemType[] = [];

const MenuSidebar = ({
  onCollapseChange,
}: {
  onCollapseChange?: (collapsed: boolean) => void;
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggleCollapse = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    onCollapseChange?.(newCollapsedState);
  };

  return (
    <div className="border-r border-[#E8E8E8] h-screen flex flex-col relative transition-all duration-300 w-full">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div
          className={`${isCollapsed ? "px-2" : "px-4 pb-4 pt-2"} transition-all duration-300`}
        >
          <NameCard isCollapsed={isCollapsed} />
        </div>
        <div
          className={`flex-1 overflow-y-auto ${isCollapsed ? "px-2 pt-2" : "pr-4"} pb-4 transition-all duration-300`}
        >
          {mainMenu.map((item) => (
            <MenuItem
              key={item.label}
              label={item.label}
              icon={item.icon}
              href={item.href}
              isCollapsed={isCollapsed}
            />
          ))}
          {career.map((item) => (
            <MenuItem
              key={item.label}
              label={item.label}
              icon={item.icon}
              href={item.href}
              soon={item.soon}
              isCollapsed={isCollapsed}
            />
          ))}
          {community.map((item) => (
            <MenuItem
              key={item.label}
              label={item.label}
              icon={item.icon}
              href={item.href}
              soon={item.soon}
              isCollapsed={isCollapsed}
            />
          ))}
          {resources.map((item) => (
            <MenuItem
              key={item.label}
              label={item.label}
              icon={item.icon}
              href={item.href}
              soon={item.soon}
              isCollapsed={isCollapsed}
            />
          ))}
          {others.map((item) => (
            <MenuItem
              key={item.label}
              label={item.label}
              icon={item.icon}
              href={item.href}
              soon={item.soon}
              isCollapsed={isCollapsed}
            />
          ))}
        </div>
      </div>
      <div className="absolute right-1 top-[30%] z-10">
        <Button
          variant="outline"
          className="px-1 py-1 h-[30px] bg-white shadow-sm"
          onClick={handleToggleCollapse}
        >
          <Image
            src={`/compact.svg`}
            width={3}
            height={11}
            alt="compact"
            style={{
              transform: isCollapsed ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s",
            }}
          />
        </Button>
      </div>
    </div>
  );
};

export default MenuSidebar;
