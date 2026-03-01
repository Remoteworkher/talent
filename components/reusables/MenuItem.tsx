"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuItemProps {
  label: string;
  icon: string;
  href: string;
  showArrow?: boolean;
  soon?: boolean;
  isCollapsed?: boolean;
  onMenuItemClick?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
  label,
  icon,
  href,
  showArrow = true,
  soon = false,
  isCollapsed = false,
  onMenuItemClick,
}) => {
  const [hovered, setHovered] = useState(false);
  const pathname = usePathname();

  // Active if current route matches href or starts with href (for nested routes)
  const isActive =
    pathname === href || (href !== "/" && pathname.startsWith(href));
  // If soon is true, disable hover state
  const isHovered = soon ? false : hovered || isActive;

  return (
    <div className="flex justify-start items-center space-x-4 my-1">
      <Image
        src={"/side-hook.svg"}
        width={4}
        height={20}
        alt="sidehook"
        style={{
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.2s",
        }}
      />
      <Link
        href={href}
        className={`flex ${isCollapsed ? "justify-center" : "flex-1 justify-between"} items-center gap-3 py-3 ${isCollapsed ? "px-2" : "px-5"} cursor-pointer rounded-[8px] hover:bg-[#F6F3FF] ${
          soon ? "pointer-events-none" : ""
        } transition-all duration-300`}
        onMouseEnter={() => !soon && setHovered(true)}
        onMouseLeave={() => !soon && setHovered(false)}
        onClick={() => onMenuItemClick?.()}
        tabIndex={soon ? -1 : 0}
        aria-disabled={soon}
        style={{
          background: isActive ? "#F6F3FF" : undefined,
        }}
      >
        <div
          className={`flex justify-start items-center gap-3 ${isCollapsed ? "gap-0" : ""}`}
        >
          <Image
            src={icon}
            width={20}
            height={20}
            alt={label}
            style={{
              filter: isHovered
                ? "brightness(0) saturate(100%) invert(25%) sepia(89%) saturate(2816%) hue-rotate(244deg) brightness(95%) contrast(89%)"
                : "none",
              transition: "filter 0.2s",
            }}
          />
          {!isCollapsed && (
            <div
              className="text-[14px] leading-[20px]"
              style={{
                color: soon ? "#AAABAE" : isHovered ? "#5335E9" : "#6A6D71",
                transition: "color 0.2s",
              }}
            >
              {label}
            </div>
          )}
        </div>
        {!isCollapsed && soon && (
          <div className="text-[#D0257A] bg-[#FFF3F9] rounded-full text-[11px] px-2">
            SOON
          </div>
        )}
        {!isCollapsed && isHovered && showArrow && !soon && (
          <Image
            src={`/arrow-right.svg`}
            width={5.83}
            height={9.55}
            alt="arrow"
            style={{
              filter:
                "brightness(0) saturate(100%) invert(25%) sepia(89%) saturate(2816%) hue-rotate(244deg) brightness(95%) contrast(89%)",
              transition: "filter 0.2s",
            }}
          />
        )}
      </Link>
    </div>
  );
};

export default MenuItem;
