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
const others: MenuItemType[] = [
  {
    label: "Settings",
    icon: "/settings-2-line.svg",
    href: "#",
  },
  {
    label: "Support",
    icon: "/headphone-line.svg",
    href: "#",
  },
];

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
        </div>

        {/* Bottom Section */}
        <div className={`mt-auto pb-6 ${isCollapsed ? "px-2" : "px-4"} space-y-4 transition-all duration-300`}>
          <div className="space-y-1">
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

          {!isCollapsed && (
            <div className="mt-4 p-4 rounded-[12px] bg-[url('/featured-card.svg')] text-white relative overflow-hidden group border border-[#C3BCFC]">
              {/* Decorative background circle */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              
              <div className="relative z-10 space-y-3">
                <div className="space-y-1">
                  <h4 className="text-[14px] mori-semibold">Upgrade to Premium</h4>
                  <p className="text-[11px] text-blue-100 leading-relaxed">
                    Unlock more credits and get the most out of Lightforth's tools.
                  </p>
                </div>
                
                <Button className="w-full h-[40px] rounded-full bg-white text-[#322FEB] hover:bg-gray-100 text-[12px] font-semibold flex items-center justify-center gap-2">
                   <Image src="/diamond.svg" width={16} height={16} alt="diamond" />
                   Upgrade Now
                </Button>
              </div>
            </div>
          )}
          
          {isCollapsed && (
             <div className="bg-[url('/featured-card-col.svg')] py-14 bg-no-repeat w-full flex justify-center ml-2">
              <Button variant="ghost" size="icon" className="h-10 rounded-xl text-[#322FEB]">
                <Image src="/diamond.svg" width={20} height={20} alt="diamond" />
             </Button>
             </div>
          )}
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
