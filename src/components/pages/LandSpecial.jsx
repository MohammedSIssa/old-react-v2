import Icon from "../Icon";
import SpecialPerson from "../SpecialPerson";

function LandSpecial() {
  return (
    <div className="relative flex min-h-[300px] flex-col items-center gap-4 pt-15 pb-20">
      <Icon iconName={"special"} />
      <div className="flex flex-col items-center text-center text-pretty">
        <h1 className="mb-15 text-2xl font-bold md:text-3xl lg:text-4xl [&_p]:mb-3">
          صفحة المحتوى الخاص
        </h1>
        <p>الجزء هاد كان هدية الـ11 شهر</p>
        <span className="gift md:hidden">
          <SpecialPerson size="100px" />
        </span>
        <span className="gift hidden md:block">
          <SpecialPerson size="120px" />
        </span>
        <p> المحتوى هنا محدش بيقدر يشوفو غير شخص واحد</p>
        <p>هان بكتب آخر التطورات بشكل شخصي اكتر</p>
      </div>
    </div>
  );
}

export default LandSpecial;
