import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SubMenu from "./SubMenu";
import { useAuthContext } from "@/context/AuthContext";
import { ProfileData, useProfile } from "@/hooks/useProfile";

const NameCard = ({ 
  isCollapsed = false,
  profileData
}: { 
  isCollapsed?: boolean;
  profileData?: ProfileData;
}) => {
  const { logout } = useAuthContext();
  const { data: fetchedProfile } = useProfile();
  
  const userProfile = profileData || fetchedProfile;

  return (
    <div
      className={`flex ${isCollapsed ? "justify-center" : "justify-between"} items-center gap-3 transition-all duration-300`}
    >
      
      {!isCollapsed && (
        <>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 focus:outline-none">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-200">
                    <Image
                      src={userProfile?.avatar || "/apex.svg"}
                      fill
                      className="object-cover"
                      alt="profile"
                    />
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[275px]" align="start">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>
                    <div className="text-[#95969A] text-[12px] uppercase">
                      menu
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuItem>
                    <SubMenu
                      logout=""
                      href="/"
                      icon="account-icon.svg"
                      label="Account"
                    />
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <SubMenu
                      logout=""
                      href="/"
                      icon="ambassador-icon.svg"
                      label="Ambassador Program"
                    />
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <SubMenu
                      logout=""
                      href="/"
                      icon="subscription-icon.svg"
                      label="Plans & Subscriptions"
                    />
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <SubMenu
                      logout=""
                      href="/"
                      icon="biling-icon.svg"
                      label="Billings"
                    />
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <SubMenu
                      logout=""
                      href="/"
                      icon="settings-icon.svg"
                      label="Settings"
                    />
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <SubMenu
                      logout=""
                      href="/"
                      icon="community-icon.svg"
                      label="Join Community"
                    />
                    <DropdownMenuShortcut>
                      <Image
                        src="/external-link.svg"
                        width={20}
                        height={20}
                        alt="external link"
                      />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>
                    <SubMenu
                      logout="text-[#FB3748]"
                      href="#"
                      icon="logout-icon.svg"
                      label="Logout"
                    />
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      )}
    </div>
  );
};

export default NameCard;
