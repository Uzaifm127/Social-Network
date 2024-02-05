import { GoGear } from "react-icons/go";
import { Link } from "react-router-dom";
import { TbHomeRibbon } from "react-icons/tb";
import { MdOutlineDarkMode } from "react-icons/md";
import Logout from "./Logout";
import { useDispatch, useSelector } from "react-redux";

const navLinksClass = `flex items-center w-full p-3 cursor-pointer hover:bg-slate-300 rounded-lg transition duration-250`;

const navIconsClass = `text-3xl mr-5`;

const MoreAlert = () => {
  const { me } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  return (
    <ul
      className={`fixed left-[1%] bottom-[20%] w-1/5 text-white bg-gray-600 rounded-lg p-4`}
    >
      <li onClick={() => dispatch({ type: "moreAlertToggle", payload: false })}>
        <Link to={`/accounts/edit`} className={navLinksClass}>
          <GoGear className={navIconsClass} />
          Setting
        </Link>
      </li>

      <li onClick={() => dispatch({ type: "moreAlertToggle", payload: false })}>
        <Link to={`/${me.username}/saved`} className={navLinksClass}>
          <TbHomeRibbon className={navIconsClass} />
          Saved
        </Link>
      </li>

      <li onClick={() => dispatch({ type: "moreAlertToggle", payload: false })}>
        <Link to={`/`} className={navLinksClass}>
          <MdOutlineDarkMode className={navIconsClass} />
          Switch Appearance
        </Link>
      </li>

      <li>
        <Logout />
      </li>
    </ul>
  );
};

export default MoreAlert;
