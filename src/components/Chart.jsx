export default function Chart({ size = "200px" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 48 48"
    >
      <path fill="#3f51b5" d="M42 37H6V25l10-15l14 7L42 6z" />
      <path fill="#00bcd4" d="M42 42H6V32l10-8l14 2l12-9z" />
    </svg>
  );
}
