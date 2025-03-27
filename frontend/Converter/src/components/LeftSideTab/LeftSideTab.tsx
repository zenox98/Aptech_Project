import { Link, NavLink } from "react-router";
import Logo from "../../assets/images/book.png";

interface NavOptsProps {
  to: string;
  NavTitle: string;
}

const ListOfNavOpts: NavOptsProps[] = [
  {
    to: "/",
    NavTitle: "List Of Entries",
  },
  {
    to: "/createEntry",
    NavTitle: "Stared",
  },
];

const NavOpts = (props: NavOptsProps) => {
  const { to, NavTitle }: NavOptsProps = props;

  return (
    <NavLink to={to} className={({isActive}) => `w-full h-auto pl-8 py-4 ${isActive ? 'text-sky-400' : 'text-green-400'} hover:rounded-xl hover:bg-gray-600 hover:text-green-200 `}>
      {NavTitle}
    </NavLink>
  );
};

export default function LeftSideTab() {
  return (
    <div className="bg-gray-700 w-full h-full px-2 flex flex-wrap flex-col items-center">
      {/* Logo Section */}
      <div className="border-b border-b-gray-400 w-full h-auto py-6 flex flex-wrap justify-center items-center">
        {/*Logo*/}
        <div className="w-auto h-auto flex flex-wrap justify-center items-center">
          <img src={Logo} alt="logo" className="size-16" />
        </div>

        <div className="ml-3 w-28 h-auto flex flex-wrap justify-center items-center">
          <h1 className="text-3xl text-green-400">Data Entry</h1>
        </div>
      </div>

      {/* Create Entry Button */}
      <div className="border-b border-b-gray-400 w-full h-auto py-4 px-3 flex flex-wrap justify-center items-center">
        <Link
          to="/createEntry"
          className="px-2 text-xl hover:text-green-950 hover:bg-green-400 text-green-400 py-1 border-2 border-green-400 rounded-xl"
        >
          Create Entry
        </Link>
      </div>

      {/* Nav Section */}
      <nav className="border-b border-b-gray-400 w-full h-auto py-3 flex flex-wrap items-center">
        {ListOfNavOpts.map((item, index) => (
          <NavOpts key={index} to={item.to} NavTitle={item.NavTitle} />
        ))}
      </nav>
    </div>
  );
}
