import React, { ReactNode, useMemo } from "react";
import Logout from "@components/Logout";
import { GoGear } from "react-icons/go";
import { TbHomeRibbon } from "react-icons/tb";
import { MdOutlineDarkMode } from "react-icons/md";
import { useAppSelector } from "@hooks/hooks";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MoreAlert: React.FC<{ dropDownTrigger: ReactNode }> = ({
  dropDownTrigger,
}) => {
  const navLinksClass = useMemo(() => {
    return `flex items-center w-full`;
  }, []);

  const navIconsClass = useMemo(() => `text-3xl mr-3`, []);

  const { me } = useAppSelector((state) => state.user);

  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{dropDownTrigger}</DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col">
        <DropdownMenuItem
          onClick={() => navigate(`/accounts/edit`)}
          className="focus:bg-primary/70 focus:text-white transition rounded-lg duration-200 cursor-pointer"
        >
          <li className="list-none">
            <div className={navLinksClass}>
              <GoGear className={navIconsClass} />
              Setting
            </div>
          </li>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => navigate(`/${me?.username}/saved`)}
          className="focus:bg-primary/70 focus:text-white transition rounded-lg duration-200 cursor-pointer"
        >
          <li className="list-none">
            <div className={navLinksClass}>
              <TbHomeRibbon className={navIconsClass} />
              Saved
            </div>
          </li>
        </DropdownMenuItem>

        <DropdownMenuItem className="focus:bg-primary/70 focus:text-white transition rounded-lg duration-200 cursor-pointer">
          <li className="list-none">
            <div className={navLinksClass}>
              <MdOutlineDarkMode className={navIconsClass} />
              Switch Appearance
            </div>
          </li>
        </DropdownMenuItem>
        <DropdownMenuItem className="focus:bg-primary/70 focus:text-white transition rounded-lg duration-200 cursor-pointer">
          <li className="list-none">
            <Logout />
          </li>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    // <ul
    //   className={`fixed left-[1%] bottom-[20%] w-1/5 text-white bg-gray-600 rounded-lg p-4`}
    // >
    // <li onClick={() => dispatch(setMoreAlert(false))}>
    //   <Link to={`/accounts/edit`} className={navLinksClass}>
    //     <GoGear className={navIconsClass} />
    //     Setting
    //   </Link>
    // </li>

    // <li onClick={() => dispatch(setMoreAlert(false))}>
    //   <Link to={`/${me.username}/saved`} className={navLinksClass}>
    //     <TbHomeRibbon className={navIconsClass} />
    //     Saved
    //   </Link>
    // </li>

    // <li onClick={() => dispatch(setMoreAlert(false))}>
    //   <Link to={`/`} className={navLinksClass}>
    //     <MdOutlineDarkMode className={navIconsClass} />
    //     Switch Appearance
    //   </Link>
    // </li>

    // <li>
    //   <Logout />
    // </li>
    // </ul>
  );
};

export default MoreAlert;
