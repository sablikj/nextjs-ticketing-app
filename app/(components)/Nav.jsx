// (components) - folder is not included in the routing

import {
  faHome,
  faTicket,
  faUser,
  faUserGear,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const Nav = () => {
  return (
    <nav className="flex justify-between bg-nav p-4">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <FontAwesomeIcon icon={faHome} className="icon" />
        </Link>
        <Link href="/TicketPage/new">
          <FontAwesomeIcon icon={faTicket} className="icon" />
        </Link>
        <Link href="/CreateUser">
          <FontAwesomeIcon icon={faUserPlus} className="icon" />
        </Link>
        <Link href="/Public">
          <p className="text-white-100">Public</p>
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <Link href="/ClientMember">
          <FontAwesomeIcon icon={faUserGear} className="icon" />
        </Link>
        <Link href="/Member">
          <FontAwesomeIcon icon={faUser} className="icon" />
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
