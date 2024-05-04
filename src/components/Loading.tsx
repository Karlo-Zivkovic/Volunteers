import { ClockLoader } from "react-spinners";

interface LoadingProps {
  size: number;
  color:string
}
export default function Loading({ size,color }: LoadingProps) {
  return (
    <div className="flex justify-center items-center h-full">
      <ClockLoader size={size} color={color} />
    </div>
  );
}
