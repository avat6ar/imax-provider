import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

export default forwardRef(function TextArea(
  {
    className = "",
    isFocused = false,
    ...props
  }: TextareaHTMLAttributes<HTMLTextAreaElement> & { isFocused?: boolean },
  ref
) {
  const localRef = useRef<HTMLTextAreaElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => localRef.current?.focus(),
  }));

  useEffect(() => {
    if (isFocused) {
      localRef.current?.focus();
    }
  }, []);

  return (
    <textarea
      {...props}
      className={
        "px-4 py-3 bg-white rounded-xl font-['Cairo'] text-stone-800 text-sm focus:outline-none focus:ring-0 focus-visible:outline-none border border-zinc-100 focus:border-zinc-100 h-24 " +
        className
      }
      ref={localRef}
    ></textarea>
  );
});
