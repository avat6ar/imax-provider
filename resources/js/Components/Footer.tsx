import { asset } from "@/lib/utils";

const Footer = () => {
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
              <span className="text-stone-800 text-base font-normal font-['Cairo']">
                الخدمات
              </span>
            </li>
            <li>
              <span className="text-stone-800 text-base font-normal font-['Cairo']">
                شروط الخدمه
              </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Footer;
