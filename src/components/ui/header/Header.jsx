import React from "react";
import classes from "./Header.module.scss";
import { useUserItemQuery } from "../../../query/useUserQuery";

const Header = () => {
  const { isLoading, data } = useUserItemQuery(1);

  if (isLoading) return <div className={classes.wrap}></div>;

  return <div className={classes.wrap}>안녕하세요, {data.data.name}님!</div>;
};

export default Header;
