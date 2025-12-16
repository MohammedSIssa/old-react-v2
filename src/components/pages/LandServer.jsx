import { useOutletContext } from "react-router-dom";
import Icon from "../Icon";

function LandServer() {
  const { type } = useOutletContext();
  if (type === "goal") {
    return (
      <div className="relative flex min-h-[300px] flex-col items-center gap-4 p-15 pb-20">
        <Icon iconName={"goals"} />
        <div className="text-center text-pretty">
          <h1 className="mb-8 text-2xl font-bold md:text-3xl lg:text-4xl [&_p]:mb-3">
            صفحة الأهداف
          </h1>
          <p>هنا بكتب أهداف كل ربع بالسنة</p>
          <p>الهدف هنا التركيز على أهدافي ومحاولة تحقيقها</p>
        </div>
      </div>
    );
  }
  if (type === "week") {
    return (
      <div className="relative flex h-[300px] flex-col items-center gap-4 p-15 pb-20">
        <Icon iconName={"weeks"} />
        <div className="text-center text-pretty">
          <h1 className="mb-8 text-2xl font-bold md:text-3xl lg:text-4xl [&_p]:mb-3">
            صفحة الأسابيع أو اليوميات
          </h1>
          <p>هنا بكتب آخر الأحداث اللي بتصير معي</p>
          <p>الرحلة موثقة هنا من أول يوم بسنة 2025</p>
        </div>
      </div>
    );
  }
}

export default LandServer;
