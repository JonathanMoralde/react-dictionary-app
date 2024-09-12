import { Definition } from "@/app/app";
import React from "react";

type Props = { definition: Definition };

const CustomBullet = ({ definition }: Props) => {
  return (
    <div className="flex gap-4">
      <div className="bg-purple-500 h-1.5 w-1.5 min-w-[0.35rem] rounded-full mt-2.5"></div>
      <div>{definition.definition}</div>
    </div>
  );
};

export default CustomBullet;
