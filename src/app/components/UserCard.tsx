import React from "react";

interface UserCardProps {
  userId: number;
}

const UserCard: React.FC<UserCardProps> = ({ userId }) => {
  return (
    <div className="group transition-shadow hover:shadow-lg hover:scale-105 duration-300 ease-in-out transform motion-reduce:transform-none flex flex-col justify-center items-center bg-white bg-opacity-25 h-15 rounded-3xl p-5">
      <img
        src={`/profile-photos/${userId}.png`}
        alt={`User ${userId}`}
        className="w-28 h-28 rounded-full"
      />
      <div className="text-center mt-4">
        <h3 className="text-lg font-semibold">User {userId}</h3>
      </div>
    </div>
  );
};

export default UserCard;
