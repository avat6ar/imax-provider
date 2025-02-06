import { asset, cn } from "@/lib/utils";
import { Link, usePage } from "@inertiajs/react";
import { LucideLayoutDashboard } from "lucide-react";
import { AiOutlineProduct } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { HiOutlinePlus } from "react-icons/hi";
import { IoSettingsOutline, IoWalletOutline } from "react-icons/io5";
import {
  LuBarChart,
  LuBarChart3,
  LuBarChartBig,
  LuBarChartHorizontalBig,
  LuDiamond,
  LuLayoutDashboard,
  LuTicket,
} from "react-icons/lu";
import { MdProductionQuantityLimits } from "react-icons/md";
import { RiQuestionAnswerLine } from "react-icons/ri";
import { SlEarphonesAlt } from "react-icons/sl";

export const SideBar = () => {
  const { url } = usePage();
  const { props }: any = usePage();

  const isActive = (routeName: string) => {
    const currentPath = url;
    const routePath = new URL(route(routeName)).pathname;

    return currentPath.startsWith(routePath);
  };

  return (
    <div className="px-4 py-6 bg-white min-h-screen flex flex-col justify-between">
      <div className="space-y-7">
        <div className="flex gap-2.5 items-center">
          <img src={asset("images/logo-nav.svg")} alt="logo" />
          <h4 className="text-stone-800 text-3xl font-medium font-['Righteous']">
            IMAX
          </h4>
        </div>
        <div className="space-y-4">
          <ul className="flex flex-col gap-2">
            <li
              className={cn(
                "p-3",
                isActive("dashboard") && "bg-indigo-50 rounded-xl"
              )}
            >
              <Link
                href={route("dashboard")}
                className="w-full flex gap-3 items-center"
              >
                <LuLayoutDashboard
                  className={cn(
                    "text-2xl",
                    isActive("dashboard") ? "text-blue-600" : "text-neutral-500"
                  )}
                />
                <span
                  className={cn(
                    "text-neutral-500 text-lg font-medium font-['Cairo']",
                    isActive("dashboard") ? "text-blue-600" : "text-neutral-500"
                  )}
                >
                  الرئيسية
                </span>
              </Link>
            </li>
            <li
              className={cn(
                "p-3",
                isActive("products.index") && "bg-indigo-50 rounded-xl"
              )}
            >
              <Link
                href={route("products.index")}
                className="w-full flex gap-3 items-center"
              >
                <AiOutlineProduct
                  className={cn(
                    "text-2xl",
                    isActive("products.index")
                      ? "text-blue-600"
                      : "text-neutral-500"
                  )}
                />
                <span
                  className={cn(
                    "text-neutral-500 text-lg font-medium font-['Cairo']",
                    isActive("products.index")
                      ? "text-blue-600"
                      : "text-neutral-500"
                  )}
                >
                  المنتجات
                </span>
              </Link>
            </li>
            <li
              className={cn(
                "p-3",
                isActive("orders.index") && "bg-indigo-50 rounded-xl"
              )}
            >
              <Link
                href={route("orders.index")}
                className="w-full flex gap-3 items-center"
              >
                <MdProductionQuantityLimits
                  className={cn(
                    "text-2xl",
                    isActive("orders.index")
                      ? "text-blue-600"
                      : "text-neutral-500"
                  )}
                />
                <span
                  className={cn(
                    "text-neutral-500 text-lg font-medium font-['Cairo']",
                    isActive("orders.index")
                      ? "text-blue-600"
                      : "text-neutral-500"
                  )}
                >
                  الطلبات
                </span>
              </Link>
            </li>
            <li
              className={cn(
                "p-3",
                isActive("tickets.index") && "bg-indigo-50 rounded-xl"
              )}
            >
              <Link
                href={route("tickets.index")}
                className="w-full flex gap-3 items-center"
              >
                <LuTicket
                  className={cn(
                    "text-2xl",
                    isActive("tickets.index")
                      ? "text-blue-600"
                      : "text-neutral-500"
                  )}
                />
                <span
                  className={cn(
                    "text-neutral-500 text-lg font-medium font-['Cairo']",
                    isActive("tickets.index")
                      ? "text-blue-600"
                      : "text-neutral-500"
                  )}
                >
                  التذاكر
                </span>
              </Link>
            </li>
            <li
              className={cn(
                "p-3",
                isActive("wallet.index") && "bg-indigo-50 rounded-xl"
              )}
            >
              <Link
                href={route("wallet.index")}
                className="w-full flex gap-3 items-center"
              >
                <IoWalletOutline
                  className={cn(
                    "text-2xl",
                    isActive("wallet.index")
                      ? "text-blue-600"
                      : "text-neutral-500"
                  )}
                />
                <span
                  className={cn(
                    "text-neutral-500 text-lg font-medium font-['Cairo']",
                    isActive("wallet.index")
                      ? "text-blue-600"
                      : "text-neutral-500"
                  )}
                >
                  اضافه اموال
                </span>
              </Link>
            </li>
            <li className="p-3">
              <a href="#" className="w-full flex gap-3 items-center">
                <RiQuestionAnswerLine className="text-neutral-500 text-2xl" />
                <span className="text-neutral-500 text-lg font-medium font-['Cairo']">
                  الاسئله الشائعه
                </span>
              </a>
            </li>
          </ul>
          {props.auth.user.is_admin ? (
            <div className="space-y-2">
              <h3 className="text-neutral-800 text-xl font-['Cairo'] font-semibold">
                الادمن
              </h3>
              <ul className="flex flex-col gap-2">
                <li
                  className={cn(
                    "p-3",
                    isActive("admin.index") && "bg-indigo-50 rounded-xl"
                  )}
                >
                  <Link
                    href={route("admin.index")}
                    className="w-full flex gap-3 items-center"
                  >
                    <LuDiamond
                      className={cn(
                        "text-2xl",
                        isActive("admin.index")
                          ? "text-blue-600"
                          : "text-neutral-500"
                      )}
                    />
                    <span
                      className={cn(
                        "text-neutral-500 text-lg font-medium font-['Cairo']",
                        isActive("admin.index")
                          ? "text-blue-600"
                          : "text-neutral-500"
                      )}
                    >
                      لوحة المعلومات
                    </span>
                  </Link>
                </li>
                <li
                  className={cn(
                    "p-3",
                    isActive("admin.categories.index") &&
                      "bg-indigo-50 rounded-xl"
                  )}
                >
                  <Link
                    href={route("admin.categories.index")}
                    className="w-full flex gap-3 items-center"
                  >
                    <LuDiamond
                      className={cn(
                        "text-2xl",
                        isActive("admin.categories.index")
                          ? "text-blue-600"
                          : "text-neutral-500"
                      )}
                    />
                    <span
                      className={cn(
                        "text-neutral-500 text-lg font-medium font-['Cairo']",
                        isActive("admin.categories.index")
                          ? "text-blue-600"
                          : "text-neutral-500"
                      )}
                    >
                      الاقسام
                    </span>
                  </Link>
                </li>
                <li
                  className={cn(
                    "p-3",
                    isActive("admin.products.index") &&
                      "bg-indigo-50 rounded-xl"
                  )}
                >
                  <Link
                    href={route("admin.products.index")}
                    className="w-full flex gap-3 items-center"
                  >
                    <LuDiamond
                      className={cn(
                        "text-2xl",
                        isActive("admin.products.index")
                          ? "text-blue-600"
                          : "text-neutral-500"
                      )}
                    />
                    <span
                      className={cn(
                        "text-neutral-500 text-lg font-medium font-['Cairo']",
                        isActive("admin.products.index")
                          ? "text-blue-600"
                          : "text-neutral-500"
                      )}
                    >
                      المنتجات
                    </span>
                  </Link>
                </li>
                <li
                  className={cn(
                    "p-3",
                    isActive("admin.orders.index") && "bg-indigo-50 rounded-xl"
                  )}
                >
                  <Link
                    href={route("admin.orders.index")}
                    className="w-full flex gap-3 items-center"
                  >
                    <LuDiamond
                      className={cn(
                        "text-2xl",
                        isActive("admin.orders.index")
                          ? "text-blue-600"
                          : "text-neutral-500"
                      )}
                    />
                    <span
                      className={cn(
                        "text-neutral-500 text-lg font-medium font-['Cairo']",
                        isActive("admin.orders.index")
                          ? "text-blue-600"
                          : "text-neutral-500"
                      )}
                    >
                      الطلبات
                    </span>
                  </Link>
                </li>
                <li
                  className={cn(
                    "p-3",
                    isActive("admin.regions.index") && "bg-indigo-50 rounded-xl"
                  )}
                >
                  <Link
                    href={route("admin.regions.index")}
                    className="w-full flex gap-3 items-center"
                  >
                    <LuDiamond
                      className={cn(
                        "text-2xl",
                        isActive("admin.regions.index")
                          ? "text-blue-600"
                          : "text-neutral-500"
                      )}
                    />
                    <span
                      className={cn(
                        "text-neutral-500 text-lg font-medium font-['Cairo']",
                        isActive("admin.regions.index")
                          ? "text-blue-600"
                          : "text-neutral-500"
                      )}
                    >
                      Regions
                    </span>
                  </Link>
                </li>
                <li
                  className={cn(
                    "p-3",
                    isActive("admin.users.index") && "bg-indigo-50 rounded-xl"
                  )}
                >
                  <Link
                    href={route("admin.users.index")}
                    className="w-full flex gap-3 items-center"
                  >
                    <LuDiamond
                      className={cn(
                        "text-2xl",
                        isActive("admin.users.index")
                          ? "text-blue-600"
                          : "text-neutral-500"
                      )}
                    />
                    <span
                      className={cn(
                        "text-neutral-500 text-lg font-medium font-['Cairo']",
                        isActive("admin.users.index")
                          ? "text-blue-600"
                          : "text-neutral-500"
                      )}
                    >
                      المستخدمين
                    </span>
                  </Link>
                </li>
                <li
                  className={cn(
                    "p-3",
                    isActive("admin.code-products.index") &&
                      "bg-indigo-50 rounded-xl"
                  )}
                >
                  <Link
                    href={route("admin.code-products.index")}
                    className="w-full flex gap-3 items-center"
                  >
                    <LuDiamond
                      className={cn(
                        "text-2xl",
                        isActive("admin.code-products.index")
                          ? "text-blue-600"
                          : "text-neutral-500"
                      )}
                    />
                    <span
                      className={cn(
                        "text-neutral-500 text-lg font-medium font-['Cairo']",
                        isActive("admin.code-products.index")
                          ? "text-blue-600"
                          : "text-neutral-500"
                      )}
                    >
                      اكواد المنتجات
                    </span>
                  </Link>
                </li>
                <li
                  className={cn(
                    "p-3",
                    isActive("admin.currencies.index") &&
                      "bg-indigo-50 rounded-xl"
                  )}
                >
                  <Link
                    href={route("admin.currencies.index")}
                    className="w-full flex gap-3 items-center"
                  >
                    <LuDiamond
                      className={cn(
                        "text-2xl",
                        isActive("admin.currencies.index")
                          ? "text-blue-600"
                          : "text-neutral-500"
                      )}
                    />
                    <span
                      className={cn(
                        "text-neutral-500 text-lg font-medium font-['Cairo']",
                        isActive("admin.currencies.index")
                          ? "text-blue-600"
                          : "text-neutral-500"
                      )}
                    >
                      العملات
                    </span>
                  </Link>
                </li>
                <li
                  className={cn(
                    "p-3",
                    isActive("admin.tickets.index") && "bg-indigo-50 rounded-xl"
                  )}
                >
                  <Link
                    href={route("admin.tickets.index")}
                    className="w-full flex gap-3 items-center"
                  >
                    <LuDiamond
                      className={cn(
                        "text-2xl",
                        isActive("admin.tickets.index")
                          ? "text-blue-600"
                          : "text-neutral-500"
                      )}
                    />
                    <span
                      className={cn(
                        "text-neutral-500 text-lg font-medium font-['Cairo']",
                        isActive("admin.tickets.index")
                          ? "text-blue-600"
                          : "text-neutral-500"
                      )}
                    >
                      التذاكر
                    </span>
                  </Link>
                </li>
                <li
                  className={cn(
                    "p-3",
                    isActive("admin.product-fields.index") &&
                      "bg-indigo-50 rounded-xl"
                  )}
                >
                  <Link
                    href={route("admin.product-fields.index")}
                    className="w-full flex gap-3 items-center"
                  >
                    <LuDiamond
                      className={cn(
                        "text-2xl",
                        isActive("admin.product-fields.index")
                          ? "text-blue-600"
                          : "text-neutral-500"
                      )}
                    />
                    <span
                      className={cn(
                        "text-neutral-500 text-lg font-medium font-['Cairo']",
                        isActive("admin.product-fields.index")
                          ? "text-blue-600"
                          : "text-neutral-500"
                      )}
                    >
                      حقول المنتج
                    </span>
                  </Link>
                </li>
                <li
                  className={cn(
                    "p-3",
                    isActive("admin.wallets.index") && "bg-indigo-50 rounded-xl"
                  )}
                >
                  <Link
                    href={route("admin.wallets.index")}
                    className="w-full flex gap-3 items-center"
                  >
                    <LuDiamond
                      className={cn(
                        "text-2xl",
                        isActive("admin.wallets.index")
                          ? "text-blue-600"
                          : "text-neutral-500"
                      )}
                    />
                    <span
                      className={cn(
                        "text-neutral-500 text-lg font-medium font-['Cairo']",
                        isActive("admin.wallets.index")
                          ? "text-blue-600"
                          : "text-neutral-500"
                      )}
                    >
                      Wallet
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <ul className="flex flex-col gap-2">
        <li
          className={cn(
            "p-3",
            isActive("settings") && "bg-indigo-50 rounded-xl"
          )}
        >
          <Link
            href={route("settings")}
            className="w-full flex gap-3 items-center"
          >
            <IoSettingsOutline
              className={cn(
                "text-2xl",
                isActive("settings") ? "text-blue-600" : "text-neutral-500"
              )}
            />
            <span
              className={cn(
                "text-neutral-500 text-lg font-medium font-['Cairo']",
                isActive("settings") ? "text-blue-600" : "text-neutral-500"
              )}
            >
              الاعدادات
            </span>
          </Link>
        </li>
        <li className="p-3 bg-indigo-50 rounded-xl">
          <span className="w-full flex gap-3 items-center">
            <div className="bg-blue-600 p-2 rounded-full">
              <FaRegUser className="text-white text-2xl" />
            </div>
            <div className="block">
              <span className="text-blue-600 text-base font-medium font-['Cairo']">
                {props.auth.user.name}
              </span>
              <div className="text-blue-600 text-base font-medium font-['Cairo']">
                {props.auth.user.email}
              </div>
            </div>
          </span>
        </li>
      </ul>
    </div>
  );
};
