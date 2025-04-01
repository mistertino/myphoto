export default function Loading() {
  return (
    <div className="fixed left-0 top-0 z-[1001] flex size-full w-full items-center justify-center bg-black opacity-30">
      <div className="flex flex-col justify-center">
        <i className="fa-duotone fa-spinner-third fa-spin text-6xl text-primary-color" />
      </div>
    </div>
  );
}
