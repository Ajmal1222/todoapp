import React from "react";

const Input = ({
  label,
  type="text",
  className="",
  ...props
}, ref)=>{
return<>
<div>
  {label && <label className="inline-block">{label}</label>}
  <input type={type}  
  className={`px-3 py-2 rounded-lg bg-white text-black outline-noe focus:bg-gray-50 duration-200 border-gray-200 w-full ${className}`}
  ref={ref}
  {...props}
  
  />
</div>
</>
}
export default React.forwardRef(Input);