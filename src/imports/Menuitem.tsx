import svgPaths from "./svg-n78mtfgg5m";

function ImgSvg() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Img → SVG">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Img â SVG">
          <path d={svgPaths.p3d5a580} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p3d5a580} fill="var(--fill-0, black)" fillOpacity="0.01" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Montserrat:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white w-full">
        <p className="leading-[40px]">Dashboard</p>
      </div>
    </div>
  );
}

function Margin() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Margin">
      <div className="content-stretch flex flex-col items-start pl-[10px] relative w-full">
        <Container />
      </div>
    </div>
  );
}

export default function Menuitem() {
  return (
    <div className="bg-[#202f73] content-stretch flex items-center px-[16px] relative size-full" data-name="Menuitem">
      <ImgSvg />
      <Margin />
      <div className="absolute bottom-0 right-0 top-0 w-[4px]" data-name="VerticalBorder">
        <div aria-hidden="true" className="absolute border-[#e04d36] border-r-4 border-solid inset-0 pointer-events-none" />
      </div>
    </div>
  );
}