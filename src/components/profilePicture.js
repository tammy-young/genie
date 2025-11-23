import Avatar from "boring-avatars";

export default function ProfilePicture({ username, size = 40 }) {
  return (
    <Avatar name={username} colors={["#A87CFC", "#ee6fb3", "#51c0cb", "#eee447"]} variant="beam" size={size} />
  );
}
  