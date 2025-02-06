import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { asset } from "@/lib/utils";
import "../../../../css/pagination-custom.css";

export const Slider = () => {
  let image = asset("images/product-banner.webp");

  return (
    <section className="w-full">
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        pagination={{
          clickable: true,
          renderBullet: function (_, className) {
            return `<span class="${className}"></span>`;
          },
        }}
        modules={[Pagination]}
      >
        <SwiperSlide>
          <div className="relative rounded-xl z-[1] overflow-hidden">
            <img
              src={image}
              alt="image"
              className="absolute top-0 left-0 w-full h-full object-cover object-top -z-[1]"
            />
            <div className="grid grid-cols-2 py-28 px-6 bg-content w-full">
              <div className="w-full">
                <h2 className="text-blue-600 text-5xl font-bold font-['Cairo']">
                  اهزم الأعداء وأصبح البطل!
                </h2>
                <p className="text-white text-xl font-semibold font-['Cairo'] mt-4">
                  كن جزءًا من مجتمع اللاعبين المحترفين في لعبة الأكشن
                  والاستراتيجية المثيرة. حمل لعبتنا اليوم وابدأ رحلتك لتصبح
                  البطل الذي ينتظره الجميع.
                </p>
                <button className="mt-7 px-14 py-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg border border-blue-600">
                  <div className="text-white text-base font-semibold font-['Cairo']">
                    شراء
                  </div>
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative rounded-xl z-[1] overflow-hidden">
            <img
              src={image}
              alt="image"
              className="absolute top-0 left-0 w-full h-full object-cover object-top -z-[1]"
            />
            <div className="grid grid-cols-2 py-28 px-6 bg-content w-full">
              <div className="w-full">
                <h2 className="text-blue-600 text-5xl font-bold font-['Cairo']">
                  اهزم الأعداء وأصبح البطل!
                </h2>
                <p className="text-white text-xl font-semibold font-['Cairo'] mt-4">
                  كن جزءًا من مجتمع اللاعبين المحترفين في لعبة الأكشن
                  والاستراتيجية المثيرة. حمل لعبتنا اليوم وابدأ رحلتك لتصبح
                  البطل الذي ينتظره الجميع.
                </p>
                <button className="mt-7 px-14 py-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg border border-blue-600">
                  <div className="text-white text-base font-semibold font-['Cairo']">
                    شراء
                  </div>
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative rounded-xl z-[1] overflow-hidden">
            <img
              src={image}
              alt="image"
              className="absolute top-0 left-0 w-full h-full object-cover object-top -z-[1]"
            />
            <div className="grid grid-cols-2 py-28 px-6 bg-content w-full">
              <div className="w-full">
                <h2 className="text-blue-600 text-5xl font-bold font-['Cairo']">
                  اهزم الأعداء وأصبح البطل!
                </h2>
                <p className="text-white text-xl font-semibold font-['Cairo'] mt-4">
                  كن جزءًا من مجتمع اللاعبين المحترفين في لعبة الأكشن
                  والاستراتيجية المثيرة. حمل لعبتنا اليوم وابدأ رحلتك لتصبح
                  البطل الذي ينتظره الجميع.
                </p>
                <button className="mt-7 px-14 py-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg border border-blue-600">
                  <div className="text-white text-base font-semibold font-['Cairo']">
                    شراء
                  </div>
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative rounded-xl z-[1] overflow-hidden">
            <img
              src={image}
              alt="image"
              className="absolute top-0 left-0 w-full h-full object-cover object-top -z-[1]"
            />
            <div className="grid grid-cols-2 py-28 px-6 bg-content w-full">
              <div className="w-full">
                <h2 className="text-blue-600 text-5xl font-bold font-['Cairo']">
                  اهزم الأعداء وأصبح البطل!
                </h2>
                <p className="text-white text-xl font-semibold font-['Cairo'] mt-4">
                  كن جزءًا من مجتمع اللاعبين المحترفين في لعبة الأكشن
                  والاستراتيجية المثيرة. حمل لعبتنا اليوم وابدأ رحلتك لتصبح
                  البطل الذي ينتظره الجميع.
                </p>
                <button className="mt-7 px-14 py-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg border border-blue-600">
                  <div className="text-white text-base font-semibold font-['Cairo']">
                    شراء
                  </div>
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};
