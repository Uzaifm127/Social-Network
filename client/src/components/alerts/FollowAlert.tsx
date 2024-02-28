import React, { useRef } from "react";
import UserComponent from "@components/layouts/User";
import AutoSizer from "react-virtualized-auto-sizer";
import { RxCross2 } from "react-icons/rx";
import { useAppSelector, useAppDispatch } from "@hooks/hooks";
import { FixedSizeList as List } from "react-window";
import { FollowAlertPropTypes } from "@/types/propTypes/index";
import { User } from "@/types/states/user.types";
import { setFollowAlert } from "@slices/toggle.slice";
import "@/globals.css";

const FollowAlert: React.FC<FollowAlertPropTypes> = ({
  primaryHeading,
  followers,
  following,
}) => {
  const { followAlert } = useAppSelector((state) => state.toggle);

  const usersArray = useRef<Array<User> | null>(null);

  const dispatch = useAppDispatch();

  if (primaryHeading === "followers") {
    usersArray.current = followers;
  } else if (primaryHeading === "following") {
    usersArray.current = following;
  }

  return (
    <div
      className="fixed z-10 h-screen w-screen bg-[#00000090] flex items-center justify-center"
      onClick={() => {
        dispatch(setFollowAlert({ alert: false, valueToAlert: "" }));
      }}
    >
      <RxCross2
        className="absolute top-0 right-0 -translate-x-1/2 translate-y-1/2 text-3xl text-white cursor-pointer font-bold"
        onClick={() => {
          dispatch(setFollowAlert({ alert: false, valueToAlert: "" }));
        }}
      />
      <article
        className="bg-[#353535] text-white rounded-xl"
        onClick={(e) => {
          e.stopPropagation();

          const payload = {
            alert: true,
            valueToAlert: followAlert.valueToAlert,
          };

          dispatch(setFollowAlert(payload));
        }}
      >
        <h1 className="text-center py-3 text-lg">{primaryHeading}</h1>
        <hr />
        <div className="w-[28rem] h-[25rem] pb-5">
          <AutoSizer>
            {({ height, width }) => {
              return (
                <List
                  className="scrollbar-hide"
                  height={height}
                  itemCount={usersArray.current?.length || 0}
                  itemSize={70}
                  width={width}
                >
                  {({ index, style }) => {
                    if (usersArray.current) {
                      const { _id, avatar, username, name } =
                        usersArray.current[index];

                      console.log(usersArray.current);

                      return (
                        <UserComponent
                          key={_id}
                          style={style}
                          user={usersArray.current[index]}
                          name={name}
                          hoverBgColor={"hover:bg-[#444]"}
                          username={username}
                          avatar={avatar.url}
                          userId={_id}
                        />
                      );
                    }
                  }}
                </List>
              );
            }}
          </AutoSizer>
        </div>
      </article>
    </div>
  );
};

export default FollowAlert;
