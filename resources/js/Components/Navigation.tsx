import { asset } from "@/lib/utils";
import { Link } from "@inertiajs/react";

const Navigation = () => {
  return (
    <nav>
      <div className="container">
        <div className="py-3 justify-between items-center flex w-full">
          <div className="flex gap-2.5 items-center">
            <h4 className="text-blue-600 text-3xl font-normal font-['Righteous']">
              IMAX
            </h4>
            <img src={asset("images/logo-nav.svg")} alt="" />
          </div>
          <ul className="flex gap-4 items-center">
            <li>
              <Link
                href={route("login")}
                className="text-stone-800 text-base font-normal font-['Cairo']"
              >
                تسجيل الدخول
              </Link>
            </li>
            <li>
              <Link
                href={route("home.contact")}
                className="text-stone-800 text-base font-normal font-['Cairo']"
              >
                تواصل معنا
              </Link>
            </li>
            <li>
              <Link
                href={route("home.terms")}
                className="text-stone-800 text-base font-normal font-['Cairo']"
              >
                شروط الخدمه
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
