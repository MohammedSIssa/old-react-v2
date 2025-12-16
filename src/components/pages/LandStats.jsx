import Icon from "../Icon";

function LandStats() {
  return (
    <div className="relative flex min-h-[300px] flex-col items-center gap-4 p-15 pb-20">
      <Icon iconName={"stats"} />
      <div className="text-center text-pretty">
        <h1 className="mb-8 text-2xl font-bold md:text-3xl lg:text-4xl [&_p]:mb-3">
          صفحة الاحصائيات
        </h1>
        <p>هنا بقيس التطور تاعي من عدة نواحي</p>
        <p>المحتوى هنا هدفه تتبع التطور بشكل أسهل</p>
      </div>
    </div>
  );
}

export default LandStats;
