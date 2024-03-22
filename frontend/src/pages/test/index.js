"use client";
import React from "react";
import { useRouter } from "next/router";

import { IconName } from "react-icons/bs";

function index({}) {
  const router = useRouter();
  const data = router.query;
  console.log(data.data);

  return <div><BsRobot/></div>;

}

export default index;
