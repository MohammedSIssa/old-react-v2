import { NavLink } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-5">
      <h1 className="text-xl font-bold md:text-2xl">هذه الصفحة غير موجودة</h1>
      <NavLink className={"text-violet-300"} to={"/"}>
        الذهاب للصفحة الرئيسية
      </NavLink>
    </div>
  );
};

export default ErrorPage;
