import styles from "./ReportSolution.module.css";

const descriptions = {
  platform: "A tent and bags sit on a raised timber deck supported by posts above wet ground. Steps provide access. The platform keeps camping gear off the ground but provides no emergency supplies or communication.",
  checkpoints: "An illustrative campground map shows three small emergency stations spread along a route. Each station provides basic supplies, safety information and a radio. Locations are conceptual and require approval; Rangers must restock each station.",
};

function Station({ x, y }: { x: number; y: number }) {
  return <g transform={`translate(${x} ${y})`} stroke="#344637" strokeWidth="2.5" strokeLinejoin="round">
    <circle r="31" fill="#e0e8d4" stroke="none" />
    <path d="M-15-15h30v34h-30z" fill="#fffdf5" />
    <path d="m-21-15 21-13 21 13Z" fill="#8fa478" />
    <path d="M0-7v17m-8-9H8" stroke="#65815a" strokeWidth="4" />
    <path d="M-11 19v10m22-10v10" />
  </g>;
}

export function ReportOptionDiagram({ option }: { option: "platform" | "checkpoints" }) {
  const platform = option === "platform";
  return <svg className={styles.optionDiagram} viewBox="0 0 525 600" role="img" aria-label={descriptions[option]} xmlns="http://www.w3.org/2000/svg">
    <rect width="525" height="600" fill="#f4f3eb" />
    <g fill="#27382b" fontFamily="sans-serif">
      <text x="32" y="44" fontSize="14" letterSpacing="2">{platform ? "3.2 / CAMP ABOVE WET GROUND" : "3.3 / SUPPORT IN SEVERAL PLACES"}</text>
      <text x="32" y="83" fontSize="27" fontWeight="600">{platform ? "Elevated tent-site platform" : "Emergency checkpoints"}</text>
      {platform ? <>
        <text x="32" y="115" fontSize="18" fill="#596451">Keep tents and gear off the ground.</text>
        <ellipse cx="265" cy="418" rx="220" ry="41" fill="#d8e3e4" />
        <g fill="none" stroke="#8daeb2" strokeWidth="2" strokeLinecap="round">
          <path d="M62 425h64m12 13h51m149-10h52m-99 21h66M61 403h49m295 7h52" />
          <path d="m94 172-8 20m51-33-8 20m288-6-8 20m36 3-8 20" />
        </g>
        <g stroke="#4d5842" strokeWidth="2.5" strokeLinejoin="round">
          <path d="M108 341v81h15v-81m250-24v95h15v-95m-80 51v77h15v-77m-144-92v87h15v-87" fill="#b3b89a" />
          <path d="m85 316 224 32 101-49-226-28Z" fill="#ddcfad" />
          <path d="m85 316 224 32v18L85 334Zm224 32 101-49v18l-101 49Z" fill="#b6a67f" />
          <path d="m121 309 222 33m-180-45 218 26m-175-38 214 25" stroke="#b6a67f" strokeWidth="1.5" />
          <path d="m133 306 82-130 81 148Z" fill="#a4b88d" />
          <path d="m215 176 95 10 76 109-90 29Z" fill="#c3d0ab" />
          <path d="m164 310 51-98 50 112Z" fill="#405b43" />
          <path d="m215 212 2 105 48 7Z" fill="#e4e6cf" />
          <path d="m311 366 43 7v16h25v17h25v17h-48v-17h-25v-17h-20Z" fill="#ddcfad" />
          <rect x="101" y="282" width="28" height="28" rx="5" fill="#c09d72" />
          <path d="M108 282v-7h14v7" fill="none" />
        </g>
        <g fill="none" stroke="#647453" strokeWidth="1.5">
          <path d="M307 206h65v-44h73M91 351H48v-96h56M402 414h48v-57" />
        </g>
        <g fontSize="18">
          <text x="330" y="151">Tent + dry gear</text>
          <text x="32" y="242">Raised deck</text>
          <text x="397" y="346">Steps</text>
          <text x="32" y="477" fill="#52686b">Wet ground below the platform</text>
        </g>
      </> : <>
        <text x="32" y="115" fontSize="18" fill="#596451">Small stations spread around Warokutal.</text>
        <rect x="32" y="143" width="461" height="237" rx="18" fill="#e8ebdd" />
        <path d="M60 169c119 100 204-7 177 72s104 8 229 111" fill="none" stroke="#d1c3a4" strokeWidth="23" strokeLinecap="round" />
        <path d="M60 169c119 100 204-7 177 72s104 8 229 111" fill="none" stroke="#fffdf5" strokeWidth="2" strokeDasharray="5 8" />
        <g fill="#c1cead">
          <circle cx="73" cy="305" r="20" /><circle cx="103" cy="332" r="14" />
          <circle cx="419" cy="185" r="23" /><circle cx="453" cy="210" r="16" />
        </g>
        <Station x={127} y={207} /><Station x={262} y={246} /><Station x={397} y={308} />
        <g fontSize="17" textAnchor="middle">
          <text x="127" y="264">Station 1</text><text x="262" y="304">Station 2</text><text x="397" y="363">Station 3</text>
        </g>
        <text x="32" y="417" fontSize="19" fontWeight="600">Each station contains</text>
        <g stroke="#4d6545" strokeWidth="2.5" strokeLinejoin="round">
          <rect x="68" y="440" width="37" height="31" rx="4" fill="#ddcfad" />
          <path d="M80 440v-6h13v6m-6 10v12m-6-6h12" fill="none" />
          <rect x="245" y="437" width="33" height="37" rx="3" fill="#fffdf5" />
          <path d="M252 446h19m-19 9h19m-19 9h13" />
          <rect x="411" y="442" width="25" height="32" rx="4" fill="#b9c9a4" />
          <path d="M429 442v-14m-12 23h13m-13 7h13m-13 7h5" />
        </g>
        <g fontSize="17" textAnchor="middle">
          <text x="86" y="501">Basic supplies</text><text x="262" y="501">Safety information</text><text x="424" y="501">Radio</text>
        </g>
      </>}
      <path d="M32 525h461" stroke="#d3d7c8" />
      <text x="32" y="552" fontSize="16">{platform ? "Camping support only; no emergency equipment." : "Each site needs approval and Ranger restocking."}</text>
      <text x="32" y="578" fontSize="14" fill="#596451">{platform ? "Concept illustration · not to scale" : "Illustrative layout · locations subject to approval"}</text>
    </g>
  </svg>;
}
