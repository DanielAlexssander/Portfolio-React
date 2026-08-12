interface SpainIconProps {
  width?: string;
  height?: string;
}

const SpainIcon = ({ width = "24px", height = "24px" }: SpainIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect y="85.331" fill="#FFDA44" width="512" height="341.337"/>
      <rect y="85.331" fill="#D80027" width="512" height="113.775"/>
      <rect y="312.882" fill="#D80027" width="512" height="113.775"/>
    </svg>
  );
};

export default SpainIcon;
