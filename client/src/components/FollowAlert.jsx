import PropTypes from "prop-types";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import User from "./User";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import "../globals.css";
import { useRef } from "react";

const FollowAlert = ({ primaryHeading, followers, following }) => {
  const { followAlert } = useSelector((state) => state.toggle);

  const usersArray = useRef(null);

  const dispatch = useDispatch();

  if (primaryHeading === "followers") {
    usersArray.current = followers;
  } else if (primaryHeading === "following") {
    usersArray.current = following;
  }

  return (
    <div
      className="fixed z-10 h-screen w-screen bg-[#00000090] flex items-center justify-center"
      onClick={() => {
        dispatch({
          type: "followAlertToggle",
          payload: { alert: false, valueToAlert: undefined },
        });
      }}
    >
      <RxCross2
        className="absolute top-0 right-0 -translate-x-1/2 translate-y-1/2 text-3xl text-white cursor-pointer font-bold"
        onClick={() => {
          dispatch({
            type: "followAlertToggle",
            payload: { alert: false, valueToAlert: undefined },
          });
        }}
      />
      <article
        className="bg-[#353535] text-white rounded-xl"
        onClick={(e) => {
          e.stopPropagation();

          dispatch({
            type: "followAlertToggle",
            payload: { alert: true, valueToAlert: followAlert.valueToAlert },
          });
        }}
      >
        <h1 className="text-center py-3 text-lg">{primaryHeading}</h1>
        <hr />
        <div className="w-[28rem] h-[25rem] pb-5">
          <AutoSizer>
            {({ height, width }) => {
              return (
                <List
                  className="no-scrollbars"
                  height={height}
                  itemCount={usersArray.current.length}
                  itemSize={70}
                  width={width}
                >
                  {({ index, style }) => {
                    const { _id, avatar, username, name } =
                      usersArray.current[index];

                    return (
                      <User
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

FollowAlert.propTypes = {
  primaryHeading: PropTypes.string,
  followers: PropTypes.array,
  following: PropTypes.array,
};

export default FollowAlert;
